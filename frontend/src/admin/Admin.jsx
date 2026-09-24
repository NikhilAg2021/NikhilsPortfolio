import { useEffect, useState } from 'react'
import { api } from '../api.js'
import ThemeToggle from '../ThemeToggle.jsx'
import FieldEditor, { humanize } from './FieldEditor.jsx'

const TOKEN_KEY = 'portfolio-admin-token'

function readToken() {
  try {
    return sessionStorage.getItem(TOKEN_KEY) || ''
  } catch {
    return ''
  }
}

function storeToken(t) {
  try {
    if (t) sessionStorage.setItem(TOKEN_KEY, t)
    else sessionStorage.removeItem(TOKEN_KEY)
  } catch {
    /* storage unavailable */
  }
}

export default function Admin() {
  const [token, setToken] = useState(readToken)

  function logout() {
    storeToken('')
    setToken('')
  }

  return (
    <div className="admin">
      <header className="nav">
        <div className="container nav-inner">
          <a href="/" className="brand">← Site</a>
          <strong>Portfolio editor</strong>
          <span className="nav-right">
            {token && <button className="btn ghost small" onClick={logout}>Log out</button>}
            <ThemeToggle />
          </span>
        </div>
      </header>
      <main className="container admin-main">
        {token ? <Dashboard token={token} onUnauthorized={logout} /> : <Login onLogin={(t) => { storeToken(t); setToken(t) }} />}
      </main>
    </div>
  )
}

function Login({ onLogin }) {
  const [value, setValue] = useState('')
  const [error, setError] = useState('')

  async function submit(e) {
    e.preventDefault()
    setError('')
    try {
      await api.login(value)
      onLogin(value)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <form className="card form login" onSubmit={submit}>
      <h2>Admin login</h2>
      <label>Admin token<input type="password" autoFocus value={value} onChange={(e) => setValue(e.target.value)} /></label>
      <button className="btn primary">Log in</button>
      {error && <p className="err">{error}</p>}
      <p className="muted small">The token is the value of <code>PORTFOLIO_ADMIN_TOKEN</code> set when starting the backend.</p>
    </form>
  )
}

function Dashboard({ token, onUnauthorized }) {
  const [tab, setTab] = useState('content')
  const handle = (err) => {
    if (err.status === 401 || err.status === 403) onUnauthorized()
    return err.message
  }

  return (
    <>
      <div className="tabs" role="tablist">
        {[['content', 'Content'], ['json', 'Raw JSON'], ['messages', 'Messages']].map(([id, label]) => (
          <button key={id} role="tab" aria-selected={tab === id} className={tab === id ? 'active' : ''} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>
      {tab === 'messages' ? <Messages token={token} handle={handle} /> : <ContentEditor token={token} handle={handle} raw={tab === 'json'} />}
    </>
  )
}

function ContentEditor({ token, handle, raw }) {
  const [saved, setSaved] = useState(null)
  const [draft, setDraft] = useState(null)
  const [rawText, setRawText] = useState('')
  const [status, setStatus] = useState('')

  useEffect(() => {
    api.getPortfolio().then((d) => {
      setSaved(d)
      setDraft(d)
    }).catch((e) => setStatus(handle(e)))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Re-sync the raw text only when switching into raw mode, so typing isn't reformatted mid-edit.
  useEffect(() => {
    if (raw && draft) setRawText(JSON.stringify(draft, null, 2))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [raw])

  function reset(d) {
    setDraft(d)
    setRawText(JSON.stringify(d, null, 2))
  }

  const dirty = draft && JSON.stringify(draft) !== JSON.stringify(saved)

  useEffect(() => {
    const warn = (e) => { if (dirty) e.preventDefault() }
    window.addEventListener('beforeunload', warn)
    return () => window.removeEventListener('beforeunload', warn)
  }, [dirty])

  if (!draft) return <p className="state">{status || 'Loading…'}</p>

  function applyRaw(text) {
    setRawText(text)
    try {
      const parsed = JSON.parse(text)
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
        setDraft(parsed)
        setStatus('')
      } else {
        setStatus('Top level must be a JSON object')
      }
    } catch (e) {
      setStatus(`Invalid JSON: ${e.message}`)
    }
  }

  async function save() {
    setStatus('Saving…')
    try {
      const result = await api.savePortfolio(token, draft)
      setSaved(result)
      reset(result)
      setStatus('Saved ✓ The live site is updated.')
    } catch (e) {
      setStatus(handle(e))
    }
  }

  return (
    <>
      <div className="savebar">
        <span className={dirty ? 'unsaved' : 'muted'}>{dirty ? 'Unsaved changes' : 'All changes saved'}</span>
        <span className="status">{status}</span>
        <button className="btn ghost small" disabled={!dirty} onClick={() => { reset(saved); setStatus('') }}>Discard</button>
        <button className="btn primary small" disabled={!dirty} onClick={save}>Save</button>
      </div>

      {raw ? (
        <textarea className="raw" spellCheck={false} value={rawText} onChange={(e) => applyRaw(e.target.value)} />
      ) : (
        Object.entries(draft).map(([key, value]) => (
          <details key={key} className="card section-editor" open={key === 'profile'}>
            <summary><h3>{humanize(key)}</h3></summary>
            <FieldEditor name={key} value={value} onChange={(v) => setDraft({ ...draft, [key]: v })} />
          </details>
        ))
      )}
    </>
  )
}

function Messages({ token, handle }) {
  const [messages, setMessages] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    api.getMessages(token).then(setMessages).catch((e) => setError(handle(e)))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  async function remove(id) {
    if (!confirm('Delete this message?')) return
    try {
      await api.deleteMessage(token, id)
      setMessages(messages.filter((m) => m.id !== id))
    } catch (e) {
      setError(handle(e))
    }
  }

  if (error) return <p className="err">{error}</p>
  if (!messages) return <p className="state">Loading…</p>
  if (!messages.length) return <p className="state">No messages yet.</p>

  return (
    <ul className="messages">
      {messages.map((m) => (
        <li key={m.id} className="card">
          <div className="msg-head">
            <strong>{m.name}</strong>
            <a href={`mailto:${m.email}`}>{m.email}</a>
            <span className="muted small">{new Date(m.receivedAt).toLocaleString()}</span>
            <button className="btn ghost small" onClick={() => remove(m.id)}>Delete</button>
          </div>
          <p className="msg-body">{m.message}</p>
        </li>
      ))}
    </ul>
  )
}
