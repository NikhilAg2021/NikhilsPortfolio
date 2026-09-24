import { useEffect, useRef } from 'react'

export const slugify = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

/**
 * Project details in a native <dialog>: gives focus trapping, Esc-to-close and a
 * backdrop for free. Arrow keys / buttons move between projects.
 */
export default function ProjectModal({ project, index, total, onClose, onStep, onPickTag }) {
  const ref = useRef(null)

  useEffect(() => {
    const dlg = ref.current
    if (project && !dlg.open) dlg.showModal()
    if (!project && dlg.open) dlg.close()
  }, [project])

  useEffect(() => {
    if (!project) return
    const onKey = (e) => {
      if (e.target.closest?.('input, textarea')) return
      if (e.key === 'ArrowRight') onStep(1)
      if (e.key === 'ArrowLeft') onStep(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [project, onStep])

  // Esc fires `cancel`; route it through onClose so URL/history stay in sync.
  const onCancel = (e) => {
    e.preventDefault()
    onClose()
  }
  // A click that lands on the <dialog> itself (not its contents) is a backdrop click.
  const onClick = (e) => {
    if (e.target === ref.current) onClose()
  }

  const p = project
  return (
    <dialog ref={ref} className="modal" onCancel={onCancel} onClick={onClick} aria-labelledby="modal-title">
      {p && (
        <div className="modal-body" key={p.name}>
          <div className="modal-top">
            <p className="eyebrow">{p.kind}{p.period && ` · ${p.period}`}</p>
            <button className="icon-btn" onClick={onClose} aria-label="Close">✕</button>
          </div>
          <h3 id="modal-title" className="modal-title">{p.name}</h3>
          <p className="lead">{p.description}</p>

          {p.details && String(p.details).split(/\n\s*\n/).map((para, i) => <p key={i}>{para}</p>)}

          {p.highlights?.length > 0 && (
            <>
              <h4 className="modal-sub">Highlights</h4>
              <ul className="bullets">{p.highlights.map((b, i) => <li key={i}>{b}</li>)}</ul>
            </>
          )}

          {p.tags?.length > 0 && (
            <>
              <h4 className="modal-sub">Tech stack</h4>
              <ul className="tags">
                {p.tags.map((t) => (
                  <li key={t}>
                    <button className="tag-btn" onClick={() => onPickTag(t)} title={`Show all ${t} projects`}>{t}</button>
                  </li>
                ))}
              </ul>
            </>
          )}

          <div className="modal-foot">
            <div className="modal-links">
              {p.repoUrl && <a className="btn small" href={p.repoUrl} target="_blank" rel="noreferrer">View code ↗</a>}
              {p.liveUrl && <a className="btn primary small" href={p.liveUrl} target="_blank" rel="noopener noreferrer">Visit live site ↗</a>}
            </div>
            {total > 1 && (
              <div className="modal-nav">
                <button className="icon-btn" onClick={() => onStep(-1)} aria-label="Previous project">←</button>
                <span className="muted small">{index + 1} / {total}</span>
                <button className="icon-btn" onClick={() => onStep(1)} aria-label="Next project">→</button>
              </div>
            )}
          </div>
        </div>
      )}
    </dialog>
  )
}
