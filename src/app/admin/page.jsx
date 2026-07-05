'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

// ─────────────────────────────────────────────────────────────────────────────
// MediaUploader – drag-and-drop + URL input, with live preview
// ─────────────────────────────────────────────────────────────────────────────
function MediaUploader({ label, value, onChange, accept = 'image/*', token, hint }) {
  const [tab, setTab] = useState('upload') // 'upload' | 'url'
  const [dragging, setDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const [urlInput, setUrlInput] = useState(value || '')
  const inputRef = useRef(null)

  // Sync url tab when external value changes (e.g. editing existing record)
  useEffect(() => {
    setUrlInput(value || '')
    // If existing value looks like a URL/path, default to url tab
    if (value && value.trim()) setTab('url')
  }, [value])

  const isImage = accept.includes('image')
  const isPdf = accept.includes('pdf')

  const uploadFile = useCallback(async (file) => {
    setUploading(true)
    setUploadError('')
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: fd
      })
      const json = await res.json()
      if (json.success) {
        onChange(json.url)
      } else {
        setUploadError(json.error || 'Upload failed')
      }
    } catch (err) {
      setUploadError('Upload error: ' + err.message)
    } finally {
      setUploading(false)
    }
  }, [token, onChange])

  const handleDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) uploadFile(file)
  }

  const handleFileInput = (e) => {
    const file = e.target.files?.[0]
    if (file) uploadFile(file)
  }

  const handleUrlSave = () => {
    onChange(urlInput)
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-[1.1rem] font-bold text-[var(--label-color)] mb-0">{label}</label>
        <div className="flex gap-1 bg-[var(--tab-bg)] rounded-lg p-0.5">
          <button
            type="button"
            onClick={() => setTab('upload')}
            className={`px-3 py-1 rounded-md text-[1.1rem] font-semibold transition-all duration-200 ${
              tab === 'upload' ? 'bg-[#DC143C] text-white' : 'text-[var(--label-color)] hover:text-[var(--text-color)]'
            }`}
          >
            Upload
          </button>
          <button
            type="button"
            onClick={() => setTab('url')}
            className={`px-3 py-1 rounded-md text-[1.1rem] font-semibold transition-all duration-200 ${
              tab === 'url' ? 'bg-[#DC143C] text-white' : 'text-[var(--label-color)] hover:text-[var(--text-color)]'
            }`}
          >
            URL
          </button>
        </div>
      </div>

      {tab === 'upload' && (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`relative cursor-pointer rounded-2xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center gap-2 py-6 px-4 text-center ${
            dragging
              ? 'border-[#DC143C] bg-[#DC143C]/10'
              : 'border-[var(--border-color)] hover:border-[#DC143C]/60 hover:bg-[var(--hover-bg)]'
          }`}
        >
          <input ref={inputRef} type="file" accept={accept} className="hidden" onChange={handleFileInput} />
          
          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 rounded-full border-2 border-t-[#DC143C] border-[var(--border-color)] animate-spin" />
              <span className="text-[1.2rem] text-[var(--label-color)]">Uploading...</span>
            </div>
          ) : (
            <>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#DC143C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              <p className="text-[1.3rem] text-[var(--label-color)]">
                <span className="font-bold text-[#DC143C]">Click to upload</span> or drag & drop
              </p>
              {hint && <p className="text-[1.1rem] text-[var(--muted-color)]">{hint}</p>}
            </>
          )}
          
          {uploadError && <p className="text-[1.1rem] text-red-400 mt-1">{uploadError}</p>}
        </div>
      )}

      {tab === 'url' && (
        <div className="flex gap-2">
          <input
            type="text"
            value={urlInput}
            onChange={e => setUrlInput(e.target.value)}
            placeholder={isImage ? 'https://... or /img/photo.jpg' : '/Resume.pdf or https://...'}
            className="flex-1 admin-input text-[1.3rem]"
          />
          <button
            type="button"
            onClick={handleUrlSave}
            className="px-4 py-2 bg-[#DC143C] hover:bg-[#b00f30] text-white rounded-xl font-bold text-[1.2rem] transition-colors shrink-0"
          >
            Set
          </button>
        </div>
      )}

      {/* Preview */}
      {value && (
        <div className="mt-2">
          {isImage ? (
            <div className="relative w-full h-[140px] rounded-xl overflow-hidden border border-[var(--border-color)]">
              <img src={value} alt="preview" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => { onChange(''); setUrlInput('') }}
                className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-red-700 rounded-lg text-white transition-colors"
                title="Remove image"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M18 6L6 18M6 6l12 12" /></svg>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[var(--card-bg)] border border-[var(--border-color)]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#DC143C" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
              <span className="text-[1.2rem] text-[var(--label-color)] truncate flex-1">{value}</span>
              <button
                type="button"
                onClick={() => { onChange(''); setUrlInput('') }}
                className="text-slate-400 hover:text-red-400 transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M18 6L6 18M6 6l12 12" /></svg>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Theme-aware CSS variables injected at the root
// ─────────────────────────────────────────────────────────────────────────────
const DARK_VARS = `
  --bg: #07090e;
  --sidebar-bg: #0b0e14;
  --card-bg: #0c0f17;
  --input-bg: #131824;
  --border-color: #1e2535;
  --text-color: #f1f5f9;
  --label-color: #94a3b8;
  --muted-color: #475569;
  --tab-bg: #131824;
  --hover-bg: rgba(220,20,60,0.06);
  --tag-industry-bg: rgba(37,99,235,0.15);
  --tag-industry-text: #93c5fd;
  --tag-community-bg: rgba(124,58,237,0.15);
  --tag-community-text: #c4b5fd;
`

const LIGHT_VARS = `
  --bg: #f4f6fb;
  --sidebar-bg: #ffffff;
  --card-bg: #ffffff;
  --input-bg: #f0f2f8;
  --border-color: #e2e8f0;
  --text-color: #0f172a;
  --label-color: #475569;
  --muted-color: #94a3b8;
  --tab-bg: #e2e8f0;
  --hover-bg: rgba(220,20,60,0.04);
  --tag-industry-bg: #dbeafe;
  --tag-industry-text: #1d4ed8;
  --tag-community-bg: #ede9fe;
  --tag-community-text: #7c3aed;
`

export default function AdminPage() {
  const [token, setToken] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)

  // Theme
  const [isDark, setIsDark] = useState(true)

  // Data
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('profile')
  const [data, setData] = useState({ profile: null, about: null, skills: null, projects: null, experiences: null })

  // UI Status
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' })
  const [saveLoading, setSaveLoading] = useState(false)

  // Modals
  const [expModal, setExpModal] = useState({ isOpen: false, item: null, isEdit: false })
  const [projectModal, setProjectModal] = useState({ isOpen: false, item: null, isEdit: false })

  useEffect(() => {
    const savedToken = localStorage.getItem('portfolio_admin_token')
    const savedTheme = localStorage.getItem('portfolio_admin_theme')
    if (savedTheme) setIsDark(savedTheme === 'dark')
    if (savedToken) {
      setToken(savedToken)
      setIsLoggedIn(true)
      fetchData()
    } else {
      setLoading(false)
    }
  }, [])

  const toggleTheme = () => {
    setIsDark(prev => {
      const next = !prev
      localStorage.setItem('portfolio_admin_theme', next ? 'dark' : 'light')
      return next
    })
  }

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/save')
      const json = await res.json()
      if (json.success) setData(json.data)
      else showStatus('error', 'Failed to fetch data: ' + json.error)
    } catch (err) {
      showStatus('error', 'Error: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const showStatus = (type, text) => {
    setStatusMessage({ type, text })
    setTimeout(() => setStatusMessage({ type: '', text: '' }), 6000)
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoginLoading(true)
    setLoginError('')
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const json = await res.json()
      if (res.ok && json.success) {
        localStorage.setItem('portfolio_admin_token', json.token)
        setToken(json.token)
        setIsLoggedIn(true)
        await fetchData()
      } else {
        setLoginError(json.error || 'Invalid credentials')
      }
    } catch (err) {
      setLoginError('Server error: ' + err.message)
    } finally {
      setLoginLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('portfolio_admin_token')
    setToken('')
    setIsLoggedIn(false)
  }

  const handleSave = async (type, updatedContent) => {
    setSaveLoading(true)
    try {
      const res = await fetch('/api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ type, data: updatedContent })
      })
      const json = await res.json()
      if (res.ok && json.success) {
        setData(prev => ({ ...prev, [type]: updatedContent }))
        showStatus('success', json.githubSaved ? 'Saved & committed to GitHub! Site is redeploying...' : 'Saved successfully!')
      } else {
        showStatus('error', 'Failed to save: ' + (json.error || 'Server error'))
      }
    } catch (err) {
      showStatus('error', 'Connection error: ' + err.message)
    } finally {
      setSaveLoading(false)
    }
  }

  // Profile
  const handleProfileChange = (field, value, isSocial = false) => {
    setData(prev => {
      const p = { ...prev.profile }
      if (isSocial) p.socials = { ...p.socials, [field]: value }
      else p[field] = value
      return { ...prev, profile: p }
    })
  }

  // About
  const handleAboutChange = (field, value) => setData(prev => ({ ...prev, about: { ...prev.about, [field]: value } }))

  // Skills
  const handleSkillChange = (index, field, value) => {
    setData(prev => {
      const s = [...prev.skills]
      s[index] = { ...s[index], [field]: value }
      return { ...prev, skills: s }
    })
  }
  const addSkillCategory = () => setData(prev => ({ ...prev, skills: [...prev.skills, { category: 'New Category', skills: '' }] }))
  const deleteSkillCategory = (i) => {
    if (!confirm('Delete this category?')) return
    setData(prev => ({ ...prev, skills: prev.skills.filter((_, idx) => idx !== i) }))
  }

  // Experiences
  const openAddExp = () => setExpModal({
    isOpen: true, isEdit: false,
    item: { id: Date.now(), company: '', role: '', duration: '', type: 'industry', tech: '', summary: '', detailed: '', image: '', url: '' }
  })
  const openEditExp = (exp) => setExpModal({
    isOpen: true, isEdit: true,
    item: { ...exp, tech: exp.tech.join(', '), detailed: exp.detailed.join('\n') }
  })
  const closeExpModal = () => setExpModal({ isOpen: false, item: null, isEdit: false })
  const handleExpSave = (e) => {
    e.preventDefault()
    const item = expModal.item
    const parsed = {
      ...item,
      tech: item.tech.split(',').map(s => s.trim()).filter(Boolean),
      detailed: item.detailed.split('\n').map(s => s.trim()).filter(Boolean),
      url: item.url || null
    }
    const list = expModal.isEdit
      ? data.experiences.map(x => x.id === parsed.id ? parsed : x)
      : [...data.experiences, parsed]
    handleSave('experiences', list)
    closeExpModal()
  }
  const deleteExp = (id) => {
    if (confirm('Delete this experience?')) handleSave('experiences', data.experiences.filter(x => x.id !== id))
  }

  // Projects
  const openAddProject = () => setProjectModal({
    isOpen: true, isEdit: false,
    item: { id: '', name: '', tagline: '', description: '', fullDescription: '', techStack: '', githubLink: '', liveLink: '', image: '', gallery: '' }
  })
  const openEditProject = (proj) => setProjectModal({
    isOpen: true, isEdit: true,
    item: { ...proj, techStack: proj.techStack.join(', '), fullDescription: (proj.fullDescription || []).join('\n'), gallery: (proj.gallery || []).join('\n') }
  })
  const closeProjectModal = () => setProjectModal({ isOpen: false, item: null, isEdit: false })
  const handleProjectSave = (e) => {
    e.preventDefault()
    const item = projectModal.item
    const id = item.id ? item.id.toLowerCase().replace(/\s+/g, '-') : item.name.toLowerCase().replace(/\s+/g, '-')
    const parsed = {
      ...item, id,
      techStack: item.techStack.split(',').map(s => s.trim()).filter(Boolean),
      fullDescription: item.fullDescription.split('\n').map(s => s.trim()).filter(Boolean),
      gallery: item.gallery.split('\n').map(s => s.trim()).filter(Boolean),
      githubLink: item.githubLink || null,
      liveLink: item.liveLink || null
    }
    const list = projectModal.isEdit
      ? data.projects.map(x => x.id === item.id ? parsed : x)
      : [...data.projects, parsed]
    handleSave('projects', list)
    closeProjectModal()
  }
  const deleteProject = (id) => {
    if (confirm('Delete this project?')) handleSave('projects', data.projects.filter(x => x.id !== id))
  }

  // ── Shared input className generator ──────────────────────────────────────
  const inp = 'w-full admin-input text-[1.4rem]'
  const inpSm = 'w-full admin-input text-[1.3rem]'

  // ─────────────────────────────────────────────────────────────────────────
  // Theme-injected style
  // ─────────────────────────────────────────────────────────────────────────
  const themeVars = isDark ? DARK_VARS : LIGHT_VARS
  const adminStyle = `
    .admin-root { background: var(--bg); color: var(--text-color); }
    .admin-sidebar { background: var(--sidebar-bg); border-color: var(--border-color); }
    .admin-card { background: var(--card-bg); border-color: var(--border-color); }
    .admin-inner-card { background: var(--input-bg); border-color: var(--border-color); }
    .admin-input {
      background: var(--input-bg);
      border: 1px solid var(--border-color);
      color: var(--text-color);
      border-radius: 0.75rem;
      padding: 0.6rem 1rem;
      outline: none;
      transition: border-color 0.2s;
      font-family: inherit;
    }
    .admin-input:focus { border-color: #DC143C; }
    .admin-input::placeholder { color: var(--muted-color); }
    .admin-border { border-color: var(--border-color); }
    .admin-label { color: var(--label-color); }
    .admin-muted { color: var(--muted-color); }
    .admin-nav-inactive { color: var(--label-color); }
    .admin-nav-inactive:hover { background: var(--input-bg); color: var(--text-color); }
    .admin-list-row { background: var(--card-bg); border-color: var(--border-color); }
    .admin-list-row:hover { border-color: var(--label-color); }
    .admin-btn-ghost { border: 1px solid var(--border-color); color: var(--text-color); }
    .admin-btn-ghost:hover { border-color: #DC143C; }
    .admin-modal { background: var(--card-bg); border-color: var(--border-color); }
    .admin-btn-secondary { background: var(--input-bg); color: var(--label-color); }
    .admin-btn-secondary:hover { color: var(--text-color); }
    .admin-edit-btn { background: var(--input-bg); color: var(--label-color); }
    .admin-edit-btn:hover { background: var(--border-color); color: var(--text-color); }
    select.admin-input option { background: var(--card-bg); color: var(--text-color); }
  `

  // ─────────────────────────────────────────────────────────────────────────
  // ThemeToggle button JSX
  // ─────────────────────────────────────────────────────────────────────────
  const ThemeBtn = () => (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-xl transition-all duration-300 admin-edit-btn"
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {isDark ? (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ) : (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  )

  // ─────────────────────────────────────────────────────────────────────────
  // Login Screen
  // ─────────────────────────────────────────────────────────────────────────
  if (!isLoggedIn) {
    return (
      <>
        <style>{`:root { ${themeVars} } ${adminStyle}`}</style>
        <main className="admin-root min-h-screen flex items-center justify-center px-4 font-sans relative">
          <button
            onClick={toggleTheme}
            className="absolute top-6 right-6 p-2.5 rounded-xl admin-edit-btn"
            title={isDark ? 'Light Mode' : 'Dark Mode'}
          >
            {isDark ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          <div className="w-full max-w-[420px] admin-card border rounded-3xl p-10 shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
            <div className="text-center mb-8">
              <h1 className="text-[3.2rem] font-bold tracking-tight">
                <span className="text-[#DC143C]">A</span>dmin Panel
              </h1>
              <p className="text-[1.4rem] admin-label mt-2">Sign in to manage your portfolio</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-[1.2rem] font-medium admin-label mb-2">Email</label>
                <input
                  id="email" type="email" required value={email}
                  onChange={e => setEmail(e.target.value)}
                  className={`${inp} focus:ring-1 focus:ring-[#DC143C]`}
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-[1.2rem] font-medium admin-label mb-2">Password</label>
                <input
                  id="password" type="password" required value={password}
                  onChange={e => setPassword(e.target.value)}
                  className={`${inp} focus:ring-1 focus:ring-[#DC143C]`}
                  placeholder="••••••••"
                />
              </div>
              {loginError && (
                <p className="text-[1.3rem] text-[#DC143C] text-center font-medium bg-[#DC143C]/10 py-2.5 rounded-xl">{loginError}</p>
              )}
              <button
                type="submit" disabled={loginLoading}
                className="w-full bg-[#DC143C] hover:bg-[#b00f30] disabled:opacity-50 text-white font-bold py-3 rounded-xl text-[1.4rem] tracking-wide transition-all duration-300"
              >
                {loginLoading ? 'Authenticating...' : 'Sign In'}
              </button>
            </form>
          </div>
        </main>
      </>
    )
  }

  // Loading
  if (loading) {
    return (
      <>
        <style>{`:root { ${themeVars} } ${adminStyle}`}</style>
        <div className="admin-root min-h-screen flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-full border-2 border-t-[#DC143C] admin-border animate-spin mb-4" />
          <p className="text-[1.6rem] font-light admin-label">Loading Admin Console...</p>
        </div>
      </>
    )
  }

  // ─────────────────────────────────────────────────────────────────────────
  // Main Dashboard
  // ─────────────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{`:root { ${themeVars} } ${adminStyle}`}</style>
      <main className="admin-root min-h-screen font-sans flex">

        {/* Toast */}
        {statusMessage.text && (
          <div className={`fixed top-6 right-6 z-[3000] px-6 py-4 rounded-2xl shadow-2xl text-[1.4rem] font-medium border ${
            statusMessage.type === 'success'
              ? 'bg-green-50 text-green-700 border-green-200 dark:bg-[#102a1c] dark:text-[#4ade80] dark:border-[#155734]'
              : 'bg-red-50 text-red-700 border-red-200'
          }`}>
            {statusMessage.text}
          </div>
        )}

        {/* Sidebar */}
        <aside className="admin-sidebar w-[260px] border-r flex flex-col shrink-0 min-h-screen">
          <div className="px-6 py-7 admin-border border-b flex items-center justify-between">
            <div>
              <h1 className="text-[2rem] font-black tracking-tight leading-none">
                <span className="text-[#DC143C]">A</span>dmin
              </h1>
              <p className="text-[1.1rem] admin-muted mt-1 uppercase tracking-wider font-bold">Console</p>
            </div>
            <div className="flex gap-2">
              <ThemeBtn />
              <button
                onClick={handleLogout}
                className="p-2 rounded-xl admin-edit-btn transition-colors"
                title="Log Out"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
                </svg>
              </button>
            </div>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-2">
            {['profile', 'about', 'skills', 'experiences', 'projects'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-[1.4rem] rounded-xl capitalize font-medium transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-[#DC143C] text-white font-bold shadow-[0_4px_12px_rgba(220,20,60,0.2)]'
                    : 'admin-nav-inactive'
                }`}
              >
                {tab === 'experiences' ? 'Experience' : tab}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main */}
        <section className="flex-1 overflow-y-auto px-10 py-12">
          <div className="max-w-[800px]">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-[3.2rem] font-bold tracking-tight capitalize">
                {activeTab === 'experiences' ? 'Experience' : activeTab === 'projects' ? 'Projects' : activeTab}
              </h2>
              {saveLoading && (
                <span className="flex items-center gap-2 text-[1.3rem] text-[#DC143C] font-semibold">
                  <span className="w-4 h-4 rounded-full border border-t-transparent border-[#DC143C] animate-spin" />
                  Saving...
                </span>
              )}
            </div>

            {/* ── TAB: Profile ── */}
            {activeTab === 'profile' && data.profile && (
              <form onSubmit={e => { e.preventDefault(); handleSave('profile', data.profile) }}
                className="space-y-8 admin-card border rounded-3xl p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { label: 'Display Name', field: 'name', type: 'text', required: true },
                    { label: 'Role / Title', field: 'title', type: 'text', required: true },
                    { label: 'Email', field: 'email', type: 'email', required: true },
                    { label: 'Phone', field: 'phone', type: 'text', required: true },
                  ].map(({ label, field, type, required }) => (
                    <div key={field}>
                      <label className="block text-[1.2rem] font-bold admin-label mb-2">{label}</label>
                      <input type={type} required={required} value={data.profile[field]}
                        onChange={e => handleProfileChange(field, e.target.value)} className={inp} />
                    </div>
                  ))}
                  <div className="md:col-span-2">
                    <label className="block text-[1.2rem] font-bold admin-label mb-2">Location</label>
                    <input type="text" required value={data.profile.location}
                      onChange={e => handleProfileChange('location', e.target.value)} className={inp} />
                  </div>
                </div>

                {/* Resume PDF */}
                <div className="admin-border border-t pt-6">
                  <h3 className="text-[1.6rem] font-bold mb-5">Resume</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <MediaUploader
                      label="Resume PDF"
                      value={data.profile.resumeLink}
                      onChange={v => handleProfileChange('resumeLink', v)}
                      accept=".pdf,application/pdf"
                      token={token}
                      hint="PDF file, max 10 MB"
                    />
                    <MediaUploader
                      label="Resume Preview Image"
                      value={data.profile.resumePreview}
                      onChange={v => handleProfileChange('resumePreview', v)}
                      accept="image/*"
                      token={token}
                      hint="PNG or JPG thumbnail"
                    />
                  </div>
                </div>

                {/* Socials */}
                <div className="admin-border border-t pt-6">
                  <h3 className="text-[1.6rem] font-bold mb-5">Social Links</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {['github', 'linkedin', 'instagram'].map(s => (
                      <div key={s}>
                        <label className="block text-[1.1rem] font-bold admin-label mb-2 capitalize">{s}</label>
                        <input type="url" value={data.profile.socials[s]}
                          onChange={e => handleProfileChange(s, e.target.value, true)} className={inpSm} />
                      </div>
                    ))}
                  </div>
                </div>

                <button type="submit" disabled={saveLoading}
                  className="bg-[#DC143C] hover:bg-[#b00f30] text-white font-bold px-6 py-3 rounded-xl text-[1.4rem] transition-colors">
                  Save Profile
                </button>
              </form>
            )}

            {/* ── TAB: About ── */}
            {activeTab === 'about' && data.about && (
              <form onSubmit={e => { e.preventDefault(); handleSave('about', data.about) }}
                className="space-y-6 admin-card border rounded-3xl p-8">
                <div>
                  <label className="block text-[1.2rem] font-bold admin-label mb-2">Subheading</label>
                  <input type="text" required value={data.about.title}
                    onChange={e => handleAboutChange('title', e.target.value)} className={inp} />
                </div>
                <div>
                  <label className="block text-[1.2rem] font-bold admin-label mb-2">
                    Bio <span className="admin-muted font-normal">(Press Enter for paragraph spacing)</span>
                  </label>
                  <textarea required value={data.about.text}
                    onChange={e => handleAboutChange('text', e.target.value)}
                    className={`${inp} h-80 resize-y`} />
                </div>
                <button type="submit" disabled={saveLoading}
                  className="bg-[#DC143C] hover:bg-[#b00f30] text-white font-bold px-6 py-3 rounded-xl text-[1.4rem] transition-colors">
                  Save About
                </button>
              </form>
            )}

            {/* ── TAB: Skills ── */}
            {activeTab === 'skills' && data.skills && (
              <div className="space-y-6 admin-card border rounded-3xl p-8">
                <div className="space-y-5">
                  {data.skills.map((item, i) => (
                    <div key={i} className="admin-inner-card border rounded-2xl p-6 relative">
                      <button type="button" onClick={() => deleteSkillCategory(i)}
                        className="absolute top-5 right-5 admin-label hover:text-[#DC143C] transition-colors" title="Delete">
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                      </button>
                      <div className="grid grid-cols-1 gap-4 max-w-[92%]">
                        <div>
                          <label className="block text-[1.1rem] font-bold admin-label mb-1">Domain Name</label>
                          <input type="text" value={item.category}
                            onChange={e => handleSkillChange(i, 'category', e.target.value)} className={inpSm} />
                        </div>
                        <div>
                          <label className="block text-[1.1rem] font-bold admin-label mb-1">Skills (comma-separated)</label>
                          <textarea value={item.skills}
                            onChange={e => handleSkillChange(i, 'skills', e.target.value)}
                            className={`${inpSm} h-20 resize-y`} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-4 admin-border border-t pt-6">
                  <button type="button" onClick={addSkillCategory}
                    className="admin-btn-ghost px-5 py-3 rounded-xl text-[1.3rem] font-bold transition-colors">
                    + Add Domain
                  </button>
                  <button type="button" onClick={() => handleSave('skills', data.skills)} disabled={saveLoading}
                    className="bg-[#DC143C] hover:bg-[#b00f30] text-white font-bold px-6 py-3 rounded-xl text-[1.3rem] transition-colors">
                    Save Skills
                  </button>
                </div>
              </div>
            )}

            {/* ── TAB: Experiences ── */}
            {activeTab === 'experiences' && data.experiences && (
              <div className="space-y-5">
                <div className="flex justify-end">
                  <button onClick={openAddExp}
                    className="bg-[#DC143C] hover:bg-[#b00f30] text-white font-bold px-5 py-3 rounded-xl text-[1.3rem] transition-colors">
                    + Add Experience
                  </button>
                </div>
                {data.experiences.map(exp => (
                  <div key={exp.id} className="admin-list-row border rounded-2xl p-6 flex justify-between items-center transition-all duration-300">
                    <div className="flex items-center gap-4">
                      {exp.image && <img src={exp.image} alt={exp.company} className="w-14 h-14 rounded-xl object-cover shrink-0" />}
                      <div>
                        <h4 className="text-[1.6rem] font-bold">{exp.role}</h4>
                        <p className="text-[1.3rem] admin-label mt-0.5">
                          <span className="text-[#DC143C] font-semibold">{exp.company}</span> · {exp.duration}
                        </p>
                        <span className={`inline-block text-[1rem] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full mt-2 ${
                          exp.type === 'industry'
                            ? 'bg-[var(--tag-industry-bg)] text-[var(--tag-industry-text)]'
                            : 'bg-[var(--tag-community-bg)] text-[var(--tag-community-text)]'
                        }`}>{exp.type}</span>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button onClick={() => openEditExp(exp)} className="p-2.5 admin-edit-btn rounded-xl transition-colors" title="Edit">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                      </button>
                      <button onClick={() => deleteExp(exp.id)} className="p-2.5 bg-red-50 text-red-500 hover:bg-red-100 rounded-xl transition-colors" title="Delete">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ── TAB: Projects ── */}
            {activeTab === 'projects' && data.projects && (
              <div className="space-y-5">
                <div className="flex justify-end">
                  <button onClick={openAddProject}
                    className="bg-[#DC143C] hover:bg-[#b00f30] text-white font-bold px-5 py-3 rounded-xl text-[1.3rem] transition-colors">
                    + Add Project
                  </button>
                </div>
                {data.projects.map(proj => (
                  <div key={proj.id} className="admin-list-row border rounded-2xl p-6 flex justify-between items-center transition-all duration-300">
                    <div className="flex items-center gap-4">
                      {proj.image && <img src={proj.image} alt={proj.name} className="w-20 h-14 rounded-xl object-cover shrink-0" />}
                      <div>
                        <h4 className="text-[1.6rem] font-bold">{proj.name}</h4>
                        <p className="text-[1.3rem] admin-label mt-0.5 truncate max-w-[360px]">{proj.tagline || proj.description}</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button onClick={() => openEditProject(proj)} className="p-2.5 admin-edit-btn rounded-xl transition-colors" title="Edit">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                      </button>
                      <button onClick={() => deleteProject(proj.id)} className="p-2.5 bg-red-50 text-red-500 hover:bg-red-100 rounded-xl transition-colors" title="Delete">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ── Experience Modal ── */}
        {expModal.isOpen && (
          <ModalWrapper onClose={closeExpModal} title={expModal.isEdit ? 'Edit Experience' : 'Add Experience'} isDark={isDark}>
            <form onSubmit={handleExpSave} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Field label="Company Name">
                  <input type="text" required value={expModal.item.company}
                    onChange={e => setExpModal(p => ({ ...p, item: { ...p.item, company: e.target.value } }))} className={inpSm} />
                </Field>
                <Field label="Job Role">
                  <input type="text" required value={expModal.item.role}
                    onChange={e => setExpModal(p => ({ ...p, item: { ...p.item, role: e.target.value } }))} className={inpSm} />
                </Field>
                <Field label="Duration (e.g. Aug 2025 – Present)">
                  <input type="text" required value={expModal.item.duration}
                    onChange={e => setExpModal(p => ({ ...p, item: { ...p.item, duration: e.target.value } }))} className={inpSm} />
                </Field>
                <Field label="Type">
                  <select value={expModal.item.type}
                    onChange={e => setExpModal(p => ({ ...p, item: { ...p.item, type: e.target.value } }))} className={`${inpSm} admin-input`}>
                    <option value="industry">Industry</option>
                    <option value="community">Community</option>
                  </select>
                </Field>
                <div className="md:col-span-2">
                  <Field label="Tech Stack (comma-separated)">
                    <input type="text" required placeholder="React, Node.js..." value={expModal.item.tech}
                      onChange={e => setExpModal(p => ({ ...p, item: { ...p.item, tech: e.target.value } }))} className={inpSm} />
                  </Field>
                </div>
                <div className="md:col-span-2">
                  <Field label="Short Summary">
                    <textarea required value={expModal.item.summary}
                      onChange={e => setExpModal(p => ({ ...p, item: { ...p.item, summary: e.target.value } }))} className={`${inpSm} h-20 resize-y`} />
                  </Field>
                </div>
                <div className="md:col-span-2">
                  <Field label="Detailed Points (one per line)">
                    <textarea required placeholder="Built Admin panel...&#10;Reduced latency..." value={expModal.item.detailed}
                      onChange={e => setExpModal(p => ({ ...p, item: { ...p.item, detailed: e.target.value } }))} className={`${inpSm} h-28 resize-y`} />
                  </Field>
                </div>
                <div className="md:col-span-2">
                  <MediaUploader
                    label="Company / Cover Image"
                    value={expModal.item.image}
                    onChange={v => setExpModal(p => ({ ...p, item: { ...p.item, image: v } }))}
                    accept="image/*"
                    token={token}
                    hint="Company photo or logo"
                  />
                </div>
                <div className="md:col-span-2">
                  <Field label="Project Link (Optional)">
                    <input type="text" value={expModal.item.url || ''}
                      onChange={e => setExpModal(p => ({ ...p, item: { ...p.item, url: e.target.value } }))} className={inpSm} />
                  </Field>
                </div>
              </div>
              <ModalFooter onCancel={closeExpModal} label={expModal.isEdit ? 'Save Changes' : 'Add Experience'} />
            </form>
          </ModalWrapper>
        )}

        {/* ── Project Modal ── */}
        {projectModal.isOpen && (
          <ModalWrapper onClose={closeProjectModal} title={projectModal.isEdit ? 'Edit Project' : 'Add Project'} isDark={isDark}>
            <form onSubmit={handleProjectSave} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Field label="ID/Slug (auto if blank)">
                  <input type="text" placeholder="youtube-mate" value={projectModal.item.id} disabled={projectModal.isEdit}
                    onChange={e => setProjectModal(p => ({ ...p, item: { ...p.item, id: e.target.value } }))}
                    className={`${inpSm} disabled:opacity-40`} />
                </Field>
                <Field label="Project Name">
                  <input type="text" required value={projectModal.item.name}
                    onChange={e => setProjectModal(p => ({ ...p, item: { ...p.item, name: e.target.value } }))} className={inpSm} />
                </Field>
                <div className="md:col-span-2">
                  <Field label="Tagline">
                    <input type="text" value={projectModal.item.tagline}
                      onChange={e => setProjectModal(p => ({ ...p, item: { ...p.item, tagline: e.target.value } }))} className={inpSm} />
                  </Field>
                </div>
                <div className="md:col-span-2">
                  <Field label="Short Description">
                    <textarea required value={projectModal.item.description}
                      onChange={e => setProjectModal(p => ({ ...p, item: { ...p.item, description: e.target.value } }))} className={`${inpSm} h-20 resize-y`} />
                  </Field>
                </div>
                <div className="md:col-span-2">
                  <Field label="Full Description (one point per line)">
                    <textarea required placeholder="Built REST API...&#10;Integrated OAuth..." value={projectModal.item.fullDescription}
                      onChange={e => setProjectModal(p => ({ ...p, item: { ...p.item, fullDescription: e.target.value } }))} className={`${inpSm} h-28 resize-y`} />
                  </Field>
                </div>
                <div className="md:col-span-2">
                  <Field label="Tech Stack (comma-separated)">
                    <input type="text" required placeholder="Next.js, MongoDB..." value={projectModal.item.techStack}
                      onChange={e => setProjectModal(p => ({ ...p, item: { ...p.item, techStack: e.target.value } }))} className={inpSm} />
                  </Field>
                </div>
                <Field label="GitHub Link (Optional)">
                  <input type="url" value={projectModal.item.githubLink || ''}
                    onChange={e => setProjectModal(p => ({ ...p, item: { ...p.item, githubLink: e.target.value } }))} className={inpSm} />
                </Field>
                <Field label="Live Link (Optional)">
                  <input type="url" value={projectModal.item.liveLink || ''}
                    onChange={e => setProjectModal(p => ({ ...p, item: { ...p.item, liveLink: e.target.value } }))} className={inpSm} />
                </Field>
                <div className="md:col-span-2">
                  <MediaUploader
                    label="Cover Image"
                    value={projectModal.item.image}
                    onChange={v => setProjectModal(p => ({ ...p, item: { ...p.item, image: v } }))}
                    accept="image/*"
                    token={token}
                    hint="Main project thumbnail"
                  />
                </div>
                <div className="md:col-span-2">
                  <Field label="Gallery URLs (one per line, Optional)">
                    <textarea placeholder="https://...&#10;https://..." value={projectModal.item.gallery}
                      onChange={e => setProjectModal(p => ({ ...p, item: { ...p.item, gallery: e.target.value } }))} className={`${inpSm} h-24 resize-y`} />
                  </Field>
                </div>
              </div>
              <ModalFooter onCancel={closeProjectModal} label={projectModal.isEdit ? 'Save Changes' : 'Add Project'} />
            </form>
          </ModalWrapper>
        )}
      </main>
    </>
  )
}

// ── Small helpers ─────────────────────────────────────────────────────────────
function Field({ label, children }) {
  return (
    <div className="space-y-1">
      <label className="block text-[1.1rem] font-bold admin-label">{label}</label>
      {children}
    </div>
  )
}

function ModalWrapper({ onClose, title, children }) {
  return (
    <div className="fixed inset-0 z-[2000] flex items-start justify-center p-4 pt-10 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="admin-modal border rounded-3xl w-full max-w-[640px] p-8 shadow-2xl mb-10">
        <div className="flex justify-between items-center mb-7">
          <h3 className="text-[2.2rem] font-bold">{title}</h3>
          <button onClick={onClose} className="admin-label hover:text-[#DC143C] transition-colors text-[2.2rem] leading-none">&times;</button>
        </div>
        {children}
      </div>
    </div>
  )
}

function ModalFooter({ onCancel, label }) {
  return (
    <div className="flex justify-end gap-3 admin-border border-t pt-5">
      <button type="button" onClick={onCancel} className="admin-btn-ghost px-5 py-2.5 rounded-xl text-[1.3rem] font-medium transition-colors">Cancel</button>
      <button type="submit" className="bg-[#DC143C] hover:bg-[#b00f30] text-white font-bold px-6 py-2.5 rounded-xl text-[1.3rem] transition-colors">{label}</button>
    </div>
  )
}
