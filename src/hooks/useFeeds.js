import { useState, useEffect, useCallback, useRef } from 'react'
import { FEEDS, CATEGORY_RULES, SECTION_CATS, OPP_KEYWORDS } from '../config/feeds.js'

// ── Helpers ──────────────────────────────────────────────────

function stripHtml(s) {
  const d = document.createElement('div')
  d.innerHTML = s || ''
  return (d.textContent || '').replace(/\s+/g, ' ').trim()
}

function classify(title, desc) {
  const t = ((title || '') + ' ' + (desc || '')).toLowerCase()
  for (const { cat, kw } of CATEGORY_RULES) {
    if (kw.some(w => t.includes(w))) return cat
  }
  return 'general'
}

function isOpportunity(title, desc) {
  const t = ((title || '') + ' ' + (desc || '')).toLowerCase()
  return OPP_KEYWORDS.some(w => t.includes(w))
}

export function isNew(dateStr) {
  if (!dateStr) return false
  return (Date.now() - new Date(dateStr).getTime()) < 60 * 60 * 1000
}

export function timeAgo(d) {
  if (!d) return ''
  const diff = Date.now() - new Date(d).getTime()
  const h = Math.floor(diff / 3600000)
  const m = Math.floor(diff / 60000)
  if (isNaN(h) || h < 0) return ''
  if (h > 72) return Math.floor(h / 24) + 'd ago'
  if (h >= 1) return h + 'h ago'
  if (m >= 1) return m + 'm ago'
  return 'just now'
}

function parseRSS(xml, label) {
  try {
    const doc = new DOMParser().parseFromString(xml, 'text/xml')
    if (doc.querySelector('parsererror')) return []
    return [...doc.querySelectorAll('item, entry')].slice(0, 14).map(el => {
      const g = tag => (el.querySelector(tag)?.textContent || '').trim()
      const linkEl = el.querySelector('link')
      const link = g('link') || linkEl?.getAttribute('href') || '#'
      const title = stripHtml(g('title'))
      const raw   = g('description') || g('summary') || g('content') || ''
      const desc  = stripHtml(raw).slice(0, 190)
      const date  = g('pubDate') || g('published') || g('updated') || ''
      if (!title || title.length < 5) return null
      return {
        title,
        link:   link.trim() || '#',
        desc,
        date,
        source: label,
        cat:    classify(title, desc),
        isOpp:  isOpportunity(title, desc),
      }
    }).filter(Boolean)
  } catch {
    return []
  }
}

// ── Main hook ────────────────────────────────────────────────

export function useFeeds() {
  const [pool, setPool]         = useState([])   // all articles
  const [sources, setSources]   = useState({})   // { label: 'ok'|'err'|'loading' }
  const [loaded, setLoaded]     = useState(0)
  const [status, setStatus]     = useState('idle') // idle | loading | done | error
  const timerRef                = useRef(null)

  const fetchFeed = useCallback(async ({ url, label }) => {
    setSources(prev => ({ ...prev, [label]: 'loading' }))
    try {
      // Use our own serverless function — no CORS, no public proxies
      const res = await fetch(`/api/feeds?url=${encodeURIComponent(url)}`, {
        signal: AbortSignal.timeout(12000),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const xml = await res.text()
      const items = parseRSS(xml, label)
      if (!items.length) throw new Error('empty')
      setPool(prev => {
        const seen = new Set(prev.map(a => a.title))
        const fresh = items.filter(a => !seen.has(a.title))
        return [...prev, ...fresh]
      })
      setLoaded(n => n + 1)
      setSources(prev => ({ ...prev, [label]: 'ok' }))
    } catch {
      setSources(prev => ({ ...prev, [label]: 'err' }))
    }
  }, [])

  const loadAll = useCallback(async () => {
    setPool([])
    setLoaded(0)
    setStatus('loading')
    setSources(Object.fromEntries(FEEDS.map(f => [f.label, 'loading'])))

    const tier1 = FEEDS.filter(f => f.tier === 1)
    const tier2 = FEEDS.filter(f => f.tier === 2)

    // Tier 1 in parallel — update UI as each arrives
    await Promise.all(tier1.map(fetchFeed))

    // Tier 2 in background
    Promise.all(tier2.map(fetchFeed)).then(() => setStatus('done'))

    setStatus('done')

    // Auto-refresh every 5 minutes
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(loadAll, 5 * 60 * 1000)
  }, [fetchFeed])

  useEffect(() => {
    loadAll()
    return () => clearTimeout(timerRef.current)
  }, [loadAll])

  // Derive per-section article lists from the shared pool
  const getSection = useCallback((sectionKey) => {
    const cats = SECTION_CATS[sectionKey]
    const seen = new Set()
    return pool.filter(a => {
      if (seen.has(a.title) || !cats.includes(a.cat)) return false
      seen.add(a.title)
      return true
    }).slice(0, 22)
  }, [pool])

  const opportunities = useCallback(() => {
    const seen = new Set()
    return pool.filter(a => {
      if (seen.has(a.title) || !a.isOpp) return false
      seen.add(a.title)
      return true
    }).slice(0, 16)
  }, [pool])

  const search = useCallback((query) => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return pool.filter(a =>
      (a.title + ' ' + a.desc + ' ' + a.source).toLowerCase().includes(q)
    )
  }, [pool])

  return {
    pool, sources, loaded, status,
    loadAll, getSection, opportunities, search,
    totalCount: pool.length,
  }
}
