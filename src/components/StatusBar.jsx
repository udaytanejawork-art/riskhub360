import React from 'react'
import { FEEDS } from '../config/feeds.js'

export default function StatusBar({ sources, loaded, status, pool }) {
  const total   = FEEDS.length
  const okCount = Object.values(sources).filter(s => s === 'ok').length
  const pct     = total > 0 ? Math.round((okCount / total) * 100) : 0

  const msg = status === 'loading'
    ? `Fetching sources… ${loaded} of ${total}`
    : `${okCount} of ${total} sources live · ${pool.length} articles`

  return (
    <div style={{
      background: 'var(--card)',
      borderBottom: '1px solid var(--border)',
      padding: '0 var(--pad)',
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      height: 36,
      overflow: 'hidden',
    }}>

      {/* Dot + message */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
        <span className={`status-dot ${status === 'loading' ? '' : okCount > 0 ? 'ok' : 'err'}`} />
        <span style={{ fontSize: 11.5, color: 'var(--txt3)', fontFamily: 'var(--font-body)', fontWeight: 500 }}>
          {msg}
        </span>
      </div>

      {/* Progress bar (only while loading) */}
      {status === 'loading' && (
        <div style={{ width: 80, height: 3, background: 'var(--bg)', borderRadius: 99, overflow: 'hidden', flexShrink: 0 }}>
          <div style={{
            height: '100%',
            width: `${pct}%`,
            background: 'var(--orange)',
            borderRadius: 99,
            transition: 'width .4s var(--ease)',
          }} />
        </div>
      )}

      {/* Source chips — scrollable row */}
      <div style={{
        display: 'flex', gap: 5,
        overflowX: 'auto', scrollbarWidth: 'none',
        marginLeft: 'auto',
        paddingRight: 4,
        flexShrink: 1,
      }}>
        {FEEDS.map(f => {
          const s = sources[f.label] || 'loading'
          return (
            <span key={f.label} style={{
              flexShrink: 0,
              fontSize: 9.5,
              fontWeight: 600,
              padding: '2px 8px',
              borderRadius: 4,
              fontFamily: 'var(--font-body)',
              background: s === 'ok'  ? 'rgba(21,128,61,.07)'
                        : s === 'err' ? 'rgba(185,28,28,.06)'
                        : 'var(--bg)',
              border: `1px solid ${
                s === 'ok'  ? 'rgba(21,128,61,.22)'
              : s === 'err' ? 'rgba(185,28,28,.22)'
              : 'var(--border)'}`,
              color: s === 'ok'  ? 'var(--green)'
                   : s === 'err' ? 'var(--red)'
                   : 'var(--txt4)',
              transition: 'all .3s var(--ease)',
            }}>
              {f.label}
            </span>
          )
        })}
      </div>
    </div>
  )
}
