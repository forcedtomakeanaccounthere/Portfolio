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

// Helper function to push changes to GitHub
async function commitToGithub(fileName, content) {
  const token = process.env.GITHUB_TOKEN
  const repo = process.env.GITHUB_REPO
  const branch = process.env.GITHUB_BRANCH || 'main'
  const filePath = `src/data/${fileName}.json`

  if (!token || !repo) {
    throw new Error('GITHUB_TOKEN or GITHUB_REPO environment variables are not configured.')
  }

  // 1. Fetch file SHA if it exists
  const getUrl = `https://api.github.com/repos/${repo}/contents/${filePath}?ref=${branch}`
  let sha = null

  try {
    const res = await fetch(getUrl, {
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Portfolio-Admin'
      }
    })
    if (res.ok) {
      const metadata = await res.json()
      sha = metadata.sha
    }
  } catch (e) {
    console.error('Failed to retrieve file SHA from GitHub:', e)
  }

  // 2. Commit update to GitHub
  const putUrl = `https://api.github.com/repos/${repo}/contents/${filePath}`
  const body = {
    message: `Update ${fileName}.json via Admin Panel`,
    content: Buffer.from(content).toString('base64'),
    branch: branch
  }
  if (sha) {
    body.sha = sha
  }

  const putRes = await fetch(putUrl, {
    method: 'PUT',
    headers: {
      'Authorization': `token ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'Portfolio-Admin'
    },
    body: JSON.stringify(body)
  })

  if (!putRes.ok) {
    const errText = await putRes.text()
    throw new Error(`GitHub API returned ${putRes.status}: ${errText}`)
  }

  return await putRes.json()
}

export async function POST(req) {
  try {
    if (!authorize(req)) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const { type, data } = await req.json()
    const validTypes = ['profile', 'about', 'skills', 'projects', 'experiences']

    if (!validTypes.includes(type)) {
      return NextResponse.json({ success: false, error: 'Invalid data type' }, { status: 400 })
    }

    const jsonContent = JSON.stringify(data, null, 2)
    let localSaved = false
    let githubSaved = false

    // A. Local save (if running in dev mode or locally)
    const isDev = process.env.NODE_ENV === 'development'
    if (isDev || !process.env.GITHUB_TOKEN) {
      try {
        const filePath = path.join(process.cwd(), 'src', 'data', `${type}.json`)
        fs.writeFileSync(filePath, jsonContent, 'utf-8')
        localSaved = true
      } catch (err) {
        console.error('Error writing to local file system:', err)
        // If we are on Vercel (read-only), local save will fail, but we can continue if GitHub API is configured
        if (!process.env.GITHUB_TOKEN) {
          throw new Error(`Failed to write local file: ${err.message}`)
        }
      }
    }

    // B. GitHub commit (if credentials are set)
    if (process.env.GITHUB_TOKEN && process.env.GITHUB_REPO) {
      await commitToGithub(type, jsonContent)
      githubSaved = true
    }

    return NextResponse.json({
      success: true,
      message: 'Data saved successfully.',
      localSaved,
      githubSaved
    })

  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}

export async function GET() {
  try {
    const profilePath = path.join(process.cwd(), 'src', 'data', 'profile.json')
    const aboutPath = path.join(process.cwd(), 'src', 'data', 'about.json')
    const skillsPath = path.join(process.cwd(), 'src', 'data', 'skills.json')
    const projectsPath = path.join(process.cwd(), 'src', 'data', 'projects.json')
    const experiencesPath = path.join(process.cwd(), 'src', 'data', 'experiences.json')

    const profile = JSON.parse(fs.readFileSync(profilePath, 'utf-8'))
    const about = JSON.parse(fs.readFileSync(aboutPath, 'utf-8'))
    const skills = JSON.parse(fs.readFileSync(skillsPath, 'utf-8'))
    const projects = JSON.parse(fs.readFileSync(projectsPath, 'utf-8'))
    const experiences = JSON.parse(fs.readFileSync(experiencesPath, 'utf-8'))

    return NextResponse.json({
      success: true,
      data: { profile, about, skills, projects, experiences }
    })
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
