import { NextResponse } from 'next/server'

export async function POST(req) {
  try {
    const { email, password } = await req.json()
    
    // Fallback to defaults if env is not defined
    const adminEmail = process.env.ADMIN_EMAIL
    const adminPassword = process.env.ADMIN_PASSWORD
    if (email === adminEmail && password === adminPassword) {
      // Basic token: base64 of email:password
      const token = Buffer.from(`${email}:${password}`).toString('base64')
      return NextResponse.json({ success: true, token })
    }

    return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 })
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
