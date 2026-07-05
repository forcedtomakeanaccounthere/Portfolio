import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

function authorize(req) {
  const authHeader = req.headers.get('authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) return false
  try {
    const credentials = Buffer.from(authHeader.substring(7), 'base64').toString('utf-8')
    const [email, password] = credentials.split(':')
    const adminEmail = process.env.ADMIN_EMAIL
    const adminPassword = process.env.ADMIN_PASSWORD
    return email === adminEmail && password === adminPassword
  } catch {
    return false
  }
}

// Upload file to GitHub (for Vercel production)
async function uploadToGithub(fileName, base64Content) {
  const token = process.env.GITHUB_TOKEN
  const repo = process.env.GITHUB_REPO
  const branch = process.env.GITHUB_BRANCH || 'main'
  const filePath = `public/uploads/${fileName}`

  if (!token || !repo) throw new Error('GitHub credentials not configured')

  // Get SHA if file already exists
  let sha = null
  try {
    const getRes = await fetch(`https://api.github.com/repos/${repo}/contents/${filePath}?ref=${branch}`, {
      headers: {
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github.v3+json',
        'User-Agent': 'Portfolio-Admin'
      }
    })
    if (getRes.ok) {
      const data = await getRes.json()
      sha = data.sha
    }
  } catch {}

  const body = {
    message: `Upload ${fileName} via Admin Panel`,
    content: base64Content,
    branch
  }
  if (sha) body.sha = sha

  const putRes = await fetch(`https://api.github.com/repos/${repo}/contents/${filePath}`, {
    method: 'PUT',
    headers: {
      Authorization: `token ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/vnd.github.v3+json',
      'User-Agent': 'Portfolio-Admin'
    },
    body: JSON.stringify(body)
  })

  if (!putRes.ok) {
    const err = await putRes.text()
    throw new Error(`GitHub API ${putRes.status}: ${err}`)
  }

  return `/uploads/${fileName}`
}

export async function POST(req) {
  try {
    if (!authorize(req)) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await req.formData()
    const file = formData.get('file')

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64Content = buffer.toString('base64')

    // Sanitise filename: keep ext, replace spaces/special chars
    const ext = file.name.split('.').pop().toLowerCase()
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_').replace(/\s+/g, '_')
    const uniqueName = `${Date.now()}_${safeName}`

    const isDev = process.env.NODE_ENV === 'development'
    let publicUrl = ''

    if (isDev || !process.env.GITHUB_TOKEN) {
      // Local: write to public/uploads/
      const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true })
      }
      fs.writeFileSync(path.join(uploadsDir, uniqueName), buffer)
      publicUrl = `/uploads/${uniqueName}`
    }

    if (process.env.GITHUB_TOKEN && process.env.GITHUB_REPO) {
      publicUrl = await uploadToGithub(uniqueName, base64Content)
    }

    return NextResponse.json({ success: true, url: publicUrl })
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
