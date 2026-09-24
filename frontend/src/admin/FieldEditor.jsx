// Generic editor that renders a form for any JSON value: objects become fieldsets,
// arrays become reorderable lists, strings become inputs/textareas.

const LONG_KEYS = new Set(['summary', 'description', 'details', 'tagline', 'message'])

export function humanize(key) {
  return String(key)
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/^./, (c) => c.toUpperCase())
}

/** An empty value with the same shape, used when adding a new list item. */
function blankLike(value) {
  if (Array.isArray(value)) return []
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, blankLike(v)]))
  }
  if (typeof value === 'number') return 0
  if (typeof value === 'boolean') return false
  return ''
}

function itemTitle(item, index) {
  if (item && typeof item === 'object') {
    const first = Object.values(item).find((v) => typeof v === 'string' && v.trim())
    if (first) return first.length > 60 ? first.slice(0, 57) + '…' : first
  }
  return `Item ${index + 1}`
}

export default function FieldEditor({ name, value, onChange }) {
  if (Array.isArray(value)) return <ArrayEditor name={name} value={value} onChange={onChange} />
  if (value && typeof value === 'object') return <ObjectEditor value={value} onChange={onChange} />

  if (typeof value === 'boolean') {
    return (
      <label className="field check">
        <input type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)} />
        {humanize(name)}
      </label>
    )
  }
  if (typeof value === 'number') {
    return (
      <label className="field">
        <span>{humanize(name)}</span>
        <input type="number" value={value} onChange={(e) => onChange(Number(e.target.value))} />
      </label>
    )
  }

  const str = value ?? ''
  const long = LONG_KEYS.has(name) || str.length > 90 || typeof name === 'number'
  return (
    <label className="field">
      {typeof name !== 'number' && <span>{humanize(name)}</span>}
      {long ? (
        <textarea rows={Math.min(8, Math.max(2, Math.ceil(str.length / 90)))} value={str} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input value={str} onChange={(e) => onChange(e.target.value)} />
      )}
    </label>
  )
}

function ObjectEditor({ value, onChange }) {
  return (
    <div className="obj">
      {Object.entries(value).map(([k, v]) => (
        <FieldEditor key={k} name={k} value={v} onChange={(nv) => onChange({ ...value, [k]: nv })} />
      ))}
    </div>
  )
}

function ArrayEditor({ name, value, onChange }) {
  const simple = value.every((v) => typeof v !== 'object' || v === null)

  const set = (i, v) => onChange(value.map((x, j) => (j === i ? v : x)))
  const remove = (i) => {
    if (confirm('Remove this item?')) onChange(value.filter((_, j) => j !== i))
  }
  const move = (i, d) => {
    const next = [...value]
    ;[next[i], next[i + d]] = [next[i + d], next[i]]
    onChange(next)
  }
  const add = () => onChange([...value, value.length ? blankLike(value[0]) : ''])

  const controls = (i) => (
    // preventDefault stops a click on these buttons from also toggling the enclosing <details>.
    <span className="item-controls" onClick={(e) => e.preventDefault()}>
      <button type="button" onClick={() => move(i, -1)} disabled={i === 0} aria-label="Move up">↑</button>
      <button type="button" onClick={() => move(i, 1)} disabled={i === value.length - 1} aria-label="Move down">↓</button>
      <button type="button" onClick={() => remove(i)} aria-label="Remove" className="danger">✕</button>
    </span>
  )

  return (
    <div className="field arr">
      {typeof name === 'string' && <span>{humanize(name)}</span>}
      {simple ? (
        value.map((v, i) => (
          <div key={i} className="arr-row">
            <FieldEditor name={i} value={v} onChange={(nv) => set(i, nv)} />
            {controls(i)}
          </div>
        ))
      ) : (
        value.map((v, i) => (
          <details key={i} className="arr-item">
            <summary>
              <span>{itemTitle(v, i)}</span>
              {controls(i)}
            </summary>
            <FieldEditor name={i} value={v} onChange={(nv) => set(i, nv)} />
          </details>
        ))
      )}
      <button type="button" className="add" onClick={add}>+ Add {simple ? 'line' : 'item'}</button>
    </div>
  )
}
