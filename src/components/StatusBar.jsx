import React from 'react'
import { FEEDS } from '../config/feeds.js'

export default function StatusBar({ sources, loaded, status, pool }) {
  const msg = status === 'loading'
    ? `Loading… ${loaded} of ${FEEDS.length} sources`
    : `${loaded} sources live · ${pool.length} articles indexed · Auto-refreshes every 5 min`

  const dotClass = status === 'loading' ? '' : loaded > 0 ? 'ok' : 'err'

  return (
    <div style={{
      background: '#fff', borderBottom: '1px solid var(--border)',
      padding: '6px 36px', fontSize: 11, color: 'var(--txt3)',
      display: 'flex', alignItems: 'center', gap: 10, minHeight: 30,
      flexWrap: 'wrap',
    }}>
      <span className={`status-dot ${dotClass}`} />
      <span>{msg}</span>

      {/* Source chips */}
      <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginLeft: 'auto' }}>
        {FEEDS.map(f => {
          const s = sources[f.label] || 'loading'
          return (
            <span
              key={f.label}
              style={{
                fontSize: 9.5, fontWeight: 600,
                padding: '2px 8px', borderRadius: 4,
                border: `1px solid ${s === 'ok' ? 'rgba(21,128,61,.3)' : s === 'err' ? 'rgba(185,28,28,.3)' : 'var(--border)'}`,
                color: s === 'ok' ? 'var(--green)' : s === 'err' ? 'var(--red)' : 'var(--txt3)',
                background: '#F4F7FB',
              }}
            >
              {f.label}
            </span>
          )
        })}
      </div>
    </div>
  )
}
