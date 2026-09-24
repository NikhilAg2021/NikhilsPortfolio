import { useCallback, useEffect, useMemo, useState } from 'react'
import { api, assetUrl, STATIC_SITE } from './api.js'
import ThemeToggle from './ThemeToggle.jsx'
import ProjectModal, { slugify } from './ProjectModal.jsx'
import { CountUp, useActiveSection, useReveal, useScroll, useSpotlight, useTypewriter } from './interactions.jsx'

const SECTIONS = [
  ['about', 'About'],
  ['experience', 'Experience'],
  ['projects', 'Projects'],
  ['skills', 'Skills'],
  ['education', 'Education'],
  ['contact', 'Contact'],
]
const SECTION_IDS = SECTIONS.map(([id]) => id)

const hasUrl = (item) => item && typeof item.url === 'string' && item.url.trim() !== ''
const norm = (s) => String(s).trim().toLowerCase()

export default function Site() {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState('All')
  const [menuOpen, setMenuOpen] = useState(false)
  const { progress, scrolled } = useScroll()

  useEffect(() => {
    api.getPortfolio().then(setData).catch((e) => setError(e.message))
  }, [])
  const active = useActiveSection(SECTION_IDS, !!data)

  useEffect(() => {
    if (data?.profile?.name) document.title = `${data.profile.name} · ${data.profile.title?.split('·')[0].trim() ?? ''}`
  }, [data])

  useReveal([data, filter])
  useSpotlight()

  const projects = useMemo(() => data?.projects ?? [], [data])
  const projectTags = useMemo(() => {
    const counts = new Map()
    projects.forEach((p) => (p.tags ?? []).forEach((t) => counts.set(t, (counts.get(t) ?? 0) + 1)))
    // Tags shared by several projects first, so the filter row leads with the useful ones.
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([t]) => t)
  }, [projects])
  const projectTagSet = useMemo(() => new Set(projectTags.map(norm)), [projectTags])

  // Open project lives in the URL (#project-<slug>) so it can be shared and the back button closes it.
  const [openSlug, setOpenSlug] = useState(null)
  const openIndex = projects.findIndex((p) => slugify(p.name) === openSlug)

  useEffect(() => {
    if (!data) return
    const fromHash = () => (location.hash.startsWith('#project-') ? decodeURIComponent(location.hash.slice(9)) : null)
    const initial = fromHash()
    if (initial) {
      // Put a plain entry underneath, so closing a deep-linked modal stays on the site.
      history.replaceState(null, '', location.pathname)
      history.pushState({ project: true }, '', `#project-${initial}`)
      setOpenSlug(initial)
      document.getElementById('projects')?.scrollIntoView()
    }
    const onPop = () => setOpenSlug(fromHash())
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [data])

  function openProject(slug) {
    if (openSlug) history.replaceState({ project: true }, '', `#project-${slug}`)
    else history.pushState({ project: true }, '', `#project-${slug}`)
    setOpenSlug(slug)
  }

  const closeProject = useCallback(() => {
    if (history.state?.project) {
      history.back() // popstate clears openSlug
    } else {
      history.replaceState(null, '', location.pathname)
      setOpenSlug(null)
    }
  }, [])

  const stepProject = useCallback((dir) => {
    setOpenSlug((current) => {
      const i = projects.findIndex((p) => slugify(p.name) === current)
      if (i < 0) return current
      const next = slugify(projects[(i + dir + projects.length) % projects.length].name)
      history.replaceState({ project: true }, '', `#project-${next}`)
      return next
    })
  }, [projects])

  if (error) return <div className="state">Couldn't load portfolio: {error}</div>
  if (!data) return <div className="state"><span className="spinner" /></div>

  const { profile = {}, links = [], stats = [], experience = [], skills = [], education = [], certifications = [] } = data
  const visibleLinks = links.filter(hasUrl)
  const shownProjects = filter === 'All' ? projects : projects.filter((p) => (p.tags ?? []).some((t) => norm(t) === norm(filter)))

  function showProjectsFor(tag) {
    const match = projectTags.find((t) => norm(t) === norm(tag))
    if (!match) return
    setFilter(match)
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <div className="progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
      <header className="nav">
        <div className="container nav-inner">
          <a href="#top" className="brand grad-text">{initials(profile.name)}</a>
          <nav className={`nav-links ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(false)}>
            {SECTIONS.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={active === id ? 'active' : ''} aria-current={active === id ? 'true' : undefined}>
                {label}
              </a>
            ))}
          </nav>
          <ThemeToggle />
          <button className="menu-btn" aria-label="Menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero container">
          {profile.openToWork && <span className="badge rise" style={{ '--d': 0 }}><span className="dot" /> Open to new opportunities</span>}
          <h1 className="rise" style={{ '--d': 1 }}>{profile.name}</h1>
          <p className="hero-title grad-text rise" style={{ '--d': 2 }}>{profile.title}</p>
          <Typed profile={profile} />
          <div className="hero-actions rise" style={{ '--d': 4 }}>
            <a className="btn primary" href="#contact">Get in touch <span className="arrow">→</span></a>
            {profile.resumeUrl && <a className="btn" href={assetUrl(profile.resumeUrl)} target="_blank" rel="noreferrer">Download résumé</a>}
            {visibleLinks.map((l) => (
              <a key={l.label} className="btn ghost" href={l.url} target="_blank" rel="noreferrer">{l.label} ↗</a>
            ))}
          </div>
          <p className="hero-meta rise" style={{ '--d': 5 }}>{profile.location}</p>

          {stats.length > 0 && (
            <dl className="stats rise" style={{ '--d': 6 }}>
              {stats.map((s) => (
                <div key={s.label} className="stat spot">
                  <dt>{s.label}</dt>
                  <dd className="grad-text"><CountUp value={s.value} /></dd>
                </div>
              ))}
            </dl>
          )}
          <a href="#about" className="scroll-cue" aria-label="Scroll to About"><span /></a>
        </section>

        <Section id="about" title="About">
          <p className="lead" data-reveal>{profile.summary}</p>
        </Section>

        <Section id="experience" title="Experience">
          <ol className="timeline">
            {experience.map((job) => (
              <li key={`${job.company}-${job.start}`} className="timeline-item" data-reveal>
                <div className="timeline-when">{job.start} – {job.end}</div>
                <div className="card spot">
                  <h3>{job.role}</h3>
                  <p className="muted">{job.company}{job.location && ` · ${job.location}`}</p>
                  <Bullets items={job.highlights} collapseAfter={3} />
                  <Tags items={job.tags} onPick={showProjectsFor} pickable={projectTagSet} />
                </div>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="projects" title="Projects">
          {projectTags.length > 1 && (
            <div className="filters" role="group" aria-label="Filter projects by technology">
              {chipList(projectTags, filter).map((t) => (
                <button key={t} className={`chip ${filter === t ? 'on' : ''}`} aria-pressed={filter === t} onClick={() => setFilter(t)}>
                  {t}
                </button>
              ))}
            </div>
          )}
          <div className="grid" key={filter}>
            {shownProjects.map((p, i) => (
              <article key={p.name} className="card project spot" data-reveal style={{ '--d': i }}>
                <p className="eyebrow">{p.kind}{p.period && ` · ${p.period}`}</p>
                <h3>
                  {/* Stretched button: its ::after covers the whole card, so the card is one big click target. */}
                  <button className="stretch" onClick={() => openProject(slugify(p.name))} aria-haspopup="dialog">
                    {p.name}
                  </button>
                </h3>
                <p>{p.description}</p>
                <PreviewTags items={p.tags} max={4} />
                <div className="card-foot">
                  <span className="view-more" aria-hidden="true">View details <span className="arrow">→</span></span>
                  {p.liveUrl && (
                    <a className="card-live" href={p.liveUrl} target="_blank" rel="noopener noreferrer">Visit site ↗</a>
                  )}
                </div>
              </article>
            ))}
          </div>
          <ProjectModal
            project={openIndex >= 0 ? projects[openIndex] : null}
            index={openIndex}
            total={projects.length}
            onClose={closeProject}
            onStep={stepProject}
            onPickTag={(t) => {
              closeProject()
              setFilter(t)
              setTimeout(() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }), 60)
            }}
          />
        </Section>

        <Section id="skills" title="Skills">
          <p className="hint muted" data-reveal>Tip: highlighted skills are clickable and jump to the projects that use them.</p>
          <div className="skills">
            {skills.map((g, i) => (
              <div key={g.group} className="skill-group" data-reveal style={{ '--d': i % 2 }}>
                <h4>{g.group}</h4>
                <Tags items={g.items} onPick={showProjectsFor} pickable={projectTagSet} />
              </div>
            ))}
          </div>
        </Section>

        <Section id="education" title="Education & Certifications">
          <div className="two-col">
            <div>
              {education.map((e) => (
                <div key={e.school} className="card compact spot" data-reveal>
                  <h3>{e.school}</h3>
                  <p>{e.degree}</p>
                  <p className="muted">{[e.period, e.score].filter(Boolean).join(' · ')}</p>
                </div>
              ))}
            </div>
            <ul className="certs">
              {certifications.map((c, i) => (
                <li key={c.name} className="card compact spot" data-reveal style={{ '--d': i }}>
                  <h3>{hasUrl(c) ? <a href={c.url} target="_blank" rel="noreferrer">{c.name} ↗</a> : c.name}</h3>
                  <p className="muted">{[c.issuer, c.date].filter(Boolean).join(' · ')}</p>
                </li>
              ))}
            </ul>
          </div>
        </Section>

        <Section id="contact" title="Contact">
          <div className="two-col">
            <div data-reveal>
              <p className="lead">Have a role, a project, or just want to talk shop? Send a message and I'll get back to you.</p>
              <CopyLine value={profile.email} href={`mailto:${profile.email}`} />
              {profile.phone && <CopyLine value={profile.phone} href={`tel:${profile.phone.replace(/\s/g, '')}`} />}
            </div>
            <ContactForm to={profile.email} />
          </div>
        </Section>
      </main>

      <footer className="footer container">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span className="muted">Built with React + Spring Boot</span>
      </footer>

      <a href="#top" className={`to-top ${scrolled ? 'show' : ''}`} aria-label="Back to top">↑</a>
    </>
  )
}

function Typed({ profile }) {
  const roles = profile.roles
  const text = useTypewriter(roles)
  if (!roles?.length) return <p className="hero-tagline rise" style={{ '--d': 3 }}>{profile.tagline}</p>
  return (
    <p className="hero-tagline rise" style={{ '--d': 3 }} aria-label={`${profile.rolesPrefix ?? 'I build'} ${roles.join(', ')}`}>
      <span aria-hidden="true">
        {profile.rolesPrefix ?? 'I build'} <span className="typed">{text}</span><span className="caret" />
      </span>
    </p>
  )
}

function Section({ id, title, children }) {
  return (
    <section id={id} className="section container">
      <h2 data-reveal>{title}</h2>
      {children}
    </section>
  )
}

function Bullets({ items, collapseAfter }) {
  const [open, setOpen] = useState(false)
  if (!items?.length) return null
  const collapsible = collapseAfter && items.length > collapseAfter + 1
  const shown = collapsible && !open ? items.slice(0, collapseAfter) : items
  return (
    <>
      <ul className="bullets">{shown.map((b, i) => <li key={i}>{b}</li>)}</ul>
      {collapsible && (
        <button className="more" onClick={() => setOpen(!open)} aria-expanded={open}>
          {open ? 'Show less' : `Show ${items.length - collapseAfter} more`}
        </button>
      )}
    </>
  )
}

/**
 * Tag chips. With `onPick`, chips become buttons; `pickable` limits that to tags
 * (lower-cased) that actually match something, and `active` highlights the current one.
 */
function Tags({ items, onPick, pickable, active }) {
  if (!items?.length) return null
  return (
    <ul className="tags">
      {items.map((t) => {
        const canPick = onPick && (!pickable || pickable.has(norm(t)))
        return (
          <li key={t}>
            {canPick ? (
              <button className={`tag-btn ${active === t ? 'on' : ''}`} onClick={() => onPick(t)}>{t}</button>
            ) : (
              <span>{t}</span>
            )}
          </li>
        )
      })}
    </ul>
  )
}

/** Compact, non-interactive tag row for project cards: first `max` tags plus a "+N" count. */
function PreviewTags({ items, max }) {
  if (!items?.length) return null
  const extra = items.length - max
  return (
    <ul className="tags">
      {items.slice(0, max).map((t) => <li key={t}><span>{t}</span></li>)}
      {extra > 0 && <li><span className="more-count">+{extra}</span></li>}
    </ul>
  )
}

function CopyLine({ value, href }) {
  const [copied, setCopied] = useState(false)
  async function copy() {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      window.location.href = href
    }
  }
  return (
    <p className="copy-line">
      <a className="contact-line" href={href}>{value}</a>
      <button className={`copy-btn ${copied ? 'done' : ''}`} onClick={copy} aria-label={`Copy ${value}`}>
        {copied ? 'Copied ✓' : 'Copy'}
      </button>
    </p>
  )
}

/** The 10 most common tags, plus the active filter if it was picked from elsewhere (e.g. a skill). */
function chipList(tags, filter) {
  const top = tags.slice(0, 10)
  return ['All', ...top, ...(filter !== 'All' && !top.includes(filter) ? [filter] : [])]
}

function initials(name = '') {
  return name.split(/\s+/).filter(Boolean).map((w) => w[0]).join('').slice(0, 3).toUpperCase()
}

// mailto: links get unreliable past ~2000 characters, so the static build caps the message lower.
const MAX_MESSAGE = STATIC_SITE ? 1500 : 5000

function ContactForm({ to }) {
  const empty = { name: '', email: '', message: '', website: '' }
  const [form, setForm] = useState(empty)
  const [status, setStatus] = useState({ state: 'idle' })

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  async function submit(e) {
    e.preventDefault()
    if (STATIC_SITE) {
      // No backend on GitHub Pages: hand the message to the visitor's email app instead.
      const subject = `Portfolio enquiry from ${form.name}`
      const body = `${form.message}\n\n— ${form.name} (${form.email})`
      window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
      setStatus({ state: 'mailto' })
      return
    }
    setStatus({ state: 'sending' })
    try {
      await api.sendMessage(form)
      setForm(empty)
      setStatus({ state: 'sent' })
    } catch (err) {
      setStatus({ state: 'error', message: err.status === 400 ? 'Please check your name, email and message.' : err.message })
    }
  }

  return (
    <form className="card form spot" onSubmit={submit} data-reveal>
      <label>Name<input required maxLength={100} value={form.name} onChange={update('name')} /></label>
      <label>Email<input required type="email" maxLength={200} value={form.email} onChange={update('email')} /></label>
      <label>
        Message
        <textarea required rows={5} maxLength={MAX_MESSAGE} value={form.message} onChange={update('message')} />
        <span className="counter muted">{form.message.length}/{MAX_MESSAGE}</span>
      </label>
      <input className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" value={form.website} onChange={update('website')} />
      <button className={`btn primary ${status.state === 'sent' ? 'sent' : ''}`} disabled={status.state === 'sending'}>
        {status.state === 'sending' ? 'Sending…' : status.state === 'sent' ? 'Sent ✓' : STATIC_SITE ? 'Send via email' : 'Send message'}
      </button>
      {status.state === 'sent' && <p className="ok">Thanks! Your message has been received.</p>}
      {status.state === 'mailto' && (
        <p className="ok">Your email app should open with the message ready to send. If it didn't, write to <a href={`mailto:${to}`}>{to}</a>.</p>
      )}
      {status.state === 'error' && <p className="err">{status.message}</p>}
    </form>
  )
}
