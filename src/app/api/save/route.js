import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

// Helper to check credentials from Authorization header
function authorize(req) {
  const authHeader = req.headers.get('authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return false
  }
  const token = authHeader.substring(7)
  try {
    const credentials = Buffer.from(token, 'base64').toString('utf-8')
    const [email, password] = credentials.split(':')
    const adminEmail = process.env.ADMIN_EMAIL
    const adminPassword = process.env.ADMIN_PASSWORD
    return email === adminEmail && password === adminPassword
  } catch (e) {
    return false
  }
}

// ─── Single-file GitHub commit (used when only one section changes) ───────────
async function commitSingleToGithub(fileName, content, commitMsg) {
  const token = process.env.GITHUB_TOKEN
  const repo = process.env.GITHUB_REPO
  const branch = process.env.GITHUB_BRANCH || 'main'
  const filePath = `src/data/${fileName}.json`

  if (!token || !repo) throw new Error('GitHub credentials not configured.')

  // Get existing file SHA
  let sha = null
  try {
    const res = await fetch(`https://api.github.com/repos/${repo}/contents/${filePath}?ref=${branch}`, {
      headers: { Authorization: `token ${token}`, Accept: 'application/vnd.github.v3+json', 'User-Agent': 'Portfolio-Admin' }
    })
    if (res.ok) sha = (await res.json()).sha
  } catch {}

  const body = {
    message: commitMsg,
    content: Buffer.from(content).toString('base64'),
    branch
  }
  if (sha) body.sha = sha

  const putRes = await fetch(`https://api.github.com/repos/${repo}/contents/${filePath}`, {
    method: 'PUT',
    headers: { Authorization: `token ${token}`, 'Content-Type': 'application/json', Accept: 'application/vnd.github.v3+json', 'User-Agent': 'Portfolio-Admin' },
    body: JSON.stringify(body)
  })

  if (!putRes.ok) {
    const err = await putRes.text()
    throw new Error(`GitHub API ${putRes.status}: ${err}`)
  }
  return await putRes.json()
}

// ─── Batch GitHub commit via Git Trees API (one commit for multiple files) ───
async function commitBatchToGithub(files, commitMsg) {
  // files: [{ fileName, content }]
  const token = process.env.GITHUB_TOKEN
  const repo = process.env.GITHUB_REPO
  const branch = process.env.GITHUB_BRANCH || 'main'

  if (!token || !repo) throw new Error('GitHub credentials not configured.')

  const ghHeaders = {
    Authorization: `token ${token}`,
    'Content-Type': 'application/json',
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'Portfolio-Admin'
  }
  const base = `https://api.github.com/repos/${repo}`

  // 1. Get the current HEAD commit SHA for the branch
  const refRes = await fetch(`${base}/git/ref/heads/${branch}`, { headers: ghHeaders })
  if (!refRes.ok) throw new Error(`Failed to get branch ref: ${await refRes.text()}`)
  const refData = await refRes.json()
  const latestCommitSha = refData.object.sha

  // 2. Get the tree SHA of the latest commit
  const commitRes = await fetch(`${base}/git/commits/${latestCommitSha}`, { headers: ghHeaders })
  if (!commitRes.ok) throw new Error(`Failed to get commit: ${await commitRes.text()}`)
  const baseTreeSha = (await commitRes.json()).tree.sha

  // 3. Create a new tree with all changed files
  const treeItems = files.map(({ fileName, content }) => ({
    path: `src/data/${fileName}.json`,
    mode: '100644',
    type: 'blob',
    content // plain string, GitHub will encode it
  }))

  const treeRes = await fetch(`${base}/git/trees`, {
    method: 'POST',
    headers: ghHeaders,
    body: JSON.stringify({ base_tree: baseTreeSha, tree: treeItems })
  })
  if (!treeRes.ok) throw new Error(`Failed to create tree: ${await treeRes.text()}`)
  const newTreeSha = (await treeRes.json()).sha

  // 4. Create the commit
  const newCommitRes = await fetch(`${base}/git/commits`, {
    method: 'POST',
    headers: ghHeaders,
    body: JSON.stringify({ message: commitMsg, tree: newTreeSha, parents: [latestCommitSha] })
  })
  if (!newCommitRes.ok) throw new Error(`Failed to create commit: ${await newCommitRes.text()}`)
  const newCommitSha = (await newCommitRes.json()).sha

  // 5. Update the branch ref
  const updateRefRes = await fetch(`${base}/git/refs/heads/${branch}`, {
    method: 'PATCH',
    headers: ghHeaders,
    body: JSON.stringify({ sha: newCommitSha })
  })
  if (!updateRefRes.ok) throw new Error(`Failed to update ref: ${await updateRefRes.text()}`)

  return newCommitSha
}

const validTypes = ['profile', 'about', 'skills', 'projects', 'experiences', 'education']

export async function POST(req) {
  try {
    if (!authorize(req)) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const isDev = process.env.NODE_ENV === 'development'
    const hasGithub = !!(process.env.GITHUB_TOKEN && process.env.GITHUB_REPO)

    // ── Batch save: { batch: [{ type, data }], commitMessage } ───────────────
    if (Array.isArray(body.batch)) {
      const { batch, commitMessage } = body

      // Validate all types up front
      for (const { type } of batch) {
        if (!validTypes.includes(type)) {
          return NextResponse.json({ success: false, error: `Invalid type: ${type}` }, { status: 400 })
        }
      }

      const commitMsg = (commitMessage && commitMessage.trim()) ||
        `Update ${batch.map(b => b.type).join(', ')} via Admin Panel`

      let localSaved = false
      let githubSaved = false

      // A. Write all files locally in dev
      if (isDev || !hasGithub) {
        for (const { type, data } of batch) {
          const filePath = path.join(process.cwd(), 'src', 'data', `${type}.json`)
          fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8')
        }
        localSaved = true
      }

      // B. Single batch GitHub commit
      if (hasGithub) {
        await commitBatchToGithub(
          batch.map(({ type, data }) => ({ fileName: type, content: JSON.stringify(data, null, 2) })),
          commitMsg
        )
        githubSaved = true
      }

      return NextResponse.json({ success: true, localSaved, githubSaved })
    }

    // ── Single save (legacy): { type, data, commitMessage } ──────────────────
    const { type, data, commitMessage } = body

    if (!validTypes.includes(type)) {
      return NextResponse.json({ success: false, error: 'Invalid data type' }, { status: 400 })
    }

    const jsonContent = JSON.stringify(data, null, 2)
    const commitMsg = (commitMessage && commitMessage.trim()) || `Update ${type}.json via Admin Panel`
    let localSaved = false
    let githubSaved = false

    if (isDev || !hasGithub) {
      try {
        fs.writeFileSync(path.join(process.cwd(), 'src', 'data', `${type}.json`), jsonContent, 'utf-8')
        localSaved = true
      } catch (err) {
        if (!hasGithub) throw new Error(`Failed to write local file: ${err.message}`)
      }
    }

    if (hasGithub) {
      await commitSingleToGithub(type, jsonContent, commitMsg)
      githubSaved = true
    }

    return NextResponse.json({ success: true, localSaved, githubSaved })

  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}

export async function GET() {
  try {
    const dataDir = path.join(process.cwd(), 'src', 'data')
    const read = (name) => JSON.parse(fs.readFileSync(path.join(dataDir, `${name}.json`), 'utf-8'))

    return NextResponse.json({
      success: true,
      data: {
        profile: read('profile'),
        about: read('about'),
        skills: read('skills'),
        projects: read('projects'),
        experiences: read('experiences'),
        education: read('education')
      }
    })
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}

