import { useEffect, useRef, useState } from 'react'

export const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Adds `.in` to every [data-reveal] element as it scrolls into view. Re-scans when `deps` change. */
export function useReveal(deps = []) {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]:not(.in)')
    if (reducedMotion() || !('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('in'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in')
          io.unobserve(e.target)
        }
      }),
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

/** Returns the id of the section currently under the nav bar. Re-checks when `ready` flips (content loaded). */
export function useActiveSection(ids, ready) {
  const [active, setActive] = useState('')
  useEffect(() => {
    const onScroll = () => {
      let current = ''
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= 120) current = id
      }
      // At the very bottom, the last section wins even if it's short. Only once actually
      // scrolled, so the short loading screen doesn't count as "at the bottom".
      if (window.scrollY > 0 && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) current = ids[ids.length - 1]
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [ids, ready])
  return active
}

/** Scroll progress 0..1 and whether the page is scrolled past the hero. */
export function useScroll() {
  const [state, setState] = useState({ progress: 0, scrolled: false })
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setState({ progress: max > 0 ? window.scrollY / max : 0, scrolled: window.scrollY > 600 })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return state
}

/** Types out each phrase, pauses, deletes it, and moves to the next. */
export function useTypewriter(phrases) {
  const [text, setText] = useState(phrases?.[0] ?? '')
  useEffect(() => {
    if (!phrases?.length) return
    if (reducedMotion() || phrases.length === 1) {
      setText(phrases[0])
      return
    }
    let i = 0
    let len = 0
    let deleting = false
    let timer
    const tick = () => {
      const word = phrases[i]
      len += deleting ? -1 : 1
      setText(word.slice(0, len))
      let delay = deleting ? 35 : 70
      if (!deleting && len === word.length) {
        deleting = true
        delay = 1800
      } else if (deleting && len === 0) {
        deleting = false
        i = (i + 1) % phrases.length
        delay = 350
      }
      timer = setTimeout(tick, delay)
    }
    setText('')
    timer = setTimeout(tick, 500)
    return () => clearTimeout(timer)
  }, [phrases])
  return text
}

/**
 * Animates a stat like "1000+", "8.71" or "2 yrs" from 0 up to its value once visible.
 * Values without a leading number are shown as-is.
 */
export function CountUp({ value }) {
  const ref = useRef(null)
  const match = /^(\d+(?:\.\d+)?)(.*)$/.exec(String(value).trim())
  const [shown, setShown] = useState(match && !reducedMotion() ? '0' + match[2] : value)

  useEffect(() => {
    if (!match || reducedMotion()) {
      setShown(value)
      return
    }
    const target = parseFloat(match[1])
    const decimals = (match[1].split('.')[1] || '').length
    const suffix = match[2]
    let raf
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      io.disconnect()
      const start = performance.now()
      const step = (now) => {
        const t = Math.min(1, (now - start) / 1400)
        const eased = 1 - Math.pow(1 - t, 3)
        setShown((target * eased).toFixed(decimals) + suffix)
        if (t < 1) raf = requestAnimationFrame(step)
      }
      raf = requestAnimationFrame(step)
    }, { threshold: 0.4 })
    io.observe(ref.current)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return <span ref={ref}>{shown}</span>
}

/** Feeds the pointer position into --mx/--my on any .spot element so CSS can draw a spotlight. */
export function useSpotlight() {
  useEffect(() => {
    if (!window.matchMedia('(hover: hover)').matches) return
    const onMove = (e) => {
      const el = e.target.closest?.('.spot')
      if (!el) return
      const r = el.getBoundingClientRect()
      el.style.setProperty('--mx', `${e.clientX - r.left}px`)
      el.style.setProperty('--my', `${e.clientY - r.top}px`)
    }
    document.addEventListener('pointermove', onMove, { passive: true })
    return () => document.removeEventListener('pointermove', onMove)
  }, [])
}
