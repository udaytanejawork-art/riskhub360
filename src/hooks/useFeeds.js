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
    // Some feeds return HTML error pages — reject early
    if (xml.trim().startsWith('<!DOCTYPE') || xml.trim().startsWith('<html')) return []

    const doc = new DOMParser().parseFromString(xml, 'text/xml')
    if (doc.querySelector('parsererror')) {
      // Try parsing as HTML as a fallback (some feeds have minor XML errors)
      const doc2 = new DOMParser().parseFromString(xml, 'text/html')
      if (!doc2.querySelectorAll('item, entry').length) return []
    }

    const items = [...doc.querySelectorAll('item, entry')]
    if (!items.length) return []

    return items.slice(0, 15).map(el => {
      const g = tag => {
        const node = el.querySelector(tag)
        return (node?.textContent || node?.getAttribute('href') || '').trim()
      }

      // Handle both RSS <link> text and Atom <link href="...">
      const linkEl  = el.querySelector('link')
      const link    = g('link') || linkEl?.getAttribute('href') || '#'
      const title   = stripHtml(g('title'))

      // Try multiple description fields
      const rawDesc = g('description') || g('summary') || g('content\\:encoded') || g('content') || ''
      const desc    = stripHtml(rawDesc).slice(0, 200)

      // Try multiple date fields
      const date = g('pubDate') || g('published') || g('updated') || g('dc\\:date') || ''

      if (!title || title.length < 4) return null

      const cat = classify(title, desc)

      return {
        title,
        link:  link.trim() || '#',
        desc,
        date,
        source: label,
        cat,
        isOpp: isOpportunity(title, desc),
      }
    }).filter(Boolean)

  } catch (err) {
    console.warn(`[parseRSS] Failed to parse feed from ${label}:`, err.message)
    return []
  }
}

// ── Main hook ────────────────────────────────────────────────

export function useFeeds() {
  const [pool,    setPool]    = useState([])
  const [sources, setSources] = useState({})
  const [loaded,  setLoaded]  = useState(0)
  const [status,  setStatus]  = useState('idle')
  const timerRef              = useRef(null)
  const poolRef               = useRef([])   // ref so fetchFeed closure stays fresh

  // Keep poolRef in sync
  useEffect(() => { poolRef.current = pool }, [pool])

  const fetchFeed = useCallback(async ({ url, label }) => {
    setSources(prev => ({ ...prev, [label]: 'loading' }))
    try {
      const res = await fetch(`/api/feeds?url=${encodeURIComponent(url)}`)

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: `HTTP ${res.status}` }))
        throw new Error(err.error || `HTTP ${res.status}`)
      }

      const xml   = await res.text()
      const items = parseRSS(xml, label)

      if (!items.length) throw new Error('No articles parsed')

      setPool(prev => {
        const seen  = new Set(prev.map(a => a.title))
        const fresh = items.filter(a => !seen.has(a.title))
        return fresh.length ? [...prev, ...fresh] : prev
      })

      setLoaded(n => n + 1)
      setSources(prev => ({ ...prev, [label]: 'ok' }))
      return true

    } catch (err) {
      console.warn(`[useFeeds] ${label} failed:`, err.message)
      setSources(prev => ({ ...prev, [label]: 'err' }))
      return false
    }
  }, [])

  const loadAll = useCallback(async () => {
    setPool([])
    setLoaded(0)
    setStatus('loading')
    setSources(Object.fromEntries(FEEDS.map(f => [f.label, 'loading'])))

    const tier1 = FEEDS.filter(f => f.tier === 1)
    const tier2 = FEEDS.filter(f => f.tier === 2)

    // Tier 1 — await all (fast, updates UI as each arrives)
    await Promise.allSettled(tier1.map(fetchFeed))

    // Tier 2 — fire and forget (slower official sources)
    Promise.allSettled(tier2.map(fetchFeed)).then(() => setStatus('done'))

    setStatus('done')

    // Auto-refresh every 5 minutes
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(loadAll, 5 * 60 * 1000)
  }, [fetchFeed])

  useEffect(() => {
    loadAll()
    return () => clearTimeout(timerRef.current)
  }, [loadAll])

  // Derive per-section lists
  const getSection = useCallback((key) => {
    const cats = SECTION_CATS[key]
    const seen = new Set()
    return pool
      .filter(a => {
        if (seen.has(a.title) || !cats.includes(a.cat)) return false
        seen.add(a.title)
        return true
      })
      .slice(0, 25)
  }, [pool])

  const opportunities = useCallback(() => {
    const seen = new Set()
    return pool
      .filter(a => {
        if (seen.has(a.title) || !a.isOpp) return false
        seen.add(a.title)
        return true
      })
      .slice(0, 18)
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
