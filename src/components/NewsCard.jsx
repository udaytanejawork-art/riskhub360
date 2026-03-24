import React from 'react'
import { timeAgo, isNew } from '../hooks/useFeeds.js'

export default function NewsCard({ article, showSource = false, style = {} }) {
  const { title, link, desc, date, source, cat } = article

  return (
    <div
      className="news-card"
      data-cat={cat}
      style={{
        padding: '14px 16px',
        borderBottom: '1px solid var(--border)',
        position: 'relative',
        overflow: 'hidden',
        transition: 'background .12s',
        animation: 'fadeUp .3s ease both',
        cursor: 'default',
        ...style,
      }}
      onMouseEnter={e => e.currentTarget.style.background = '#F9FBFF'}
      onMouseLeave={e => e.currentTarget.style.background = ''}
    >
      {/* Left colour bar */}
      <div style={{
        position: 'absolute', left: 0, top: 0,
        width: 3, height: '100%',
        background: CAT_COLORS[cat] || 'var(--txt3)',
      }} />

      {/* Top row: pill + source */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 7 }}>
        <span className={`cat-pill ${cat}`}>{cat}</span>
        {showSource && (
          <span style={{ fontSize: 10, color: 'var(--txt3)', fontWeight: 600 }}>{source}</span>
        )}
      </div>

      {/* Headline */}
      <div style={{
        fontFamily: 'var(--font)', fontSize: 13, fontWeight: 700,
        color: 'var(--txt)', lineHeight: 1.45, marginBottom: 5, letterSpacing: '-.2px',
      }}>
        <a
          href={link} target="_blank" rel="noopener noreferrer"
          style={{ color: 'inherit', textDecoration: 'none' }}
          onMouseEnter={e => e.target.style.color = 'var(--orange)'}
          onMouseLeave={e => e.target.style.color = 'inherit'}
        >
          {title}
        </a>
        {isNew(date) && <span className="new-badge">NEW</span>}
      </div>

      {/* Summary */}
      {desc && (
        <div style={{ fontSize: 11.5, color: 'var(--txt2)', lineHeight: 1.65 }}>
          {desc}…
        </div>
      )}

      {/* Footer */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
        {date && (
          <span style={{ fontSize: 10, color: 'var(--txt3)', fontWeight: 500 }}>{timeAgo(date)}</span>
        )}
        <a
          href={link} target="_blank" rel="noopener noreferrer"
          style={{ fontSize: 10, color: 'var(--orange)', textDecoration: 'none', fontWeight: 700 }}
        >
          Read →
        </a>
        {!showSource && (
          <span style={{ fontSize: 10, color: 'var(--txt3)', marginLeft: 'auto' }}>{source}</span>
        )}
      </div>
    </div>
  )
}

const CAT_COLORS = {
  breaking:   'var(--red)',
  regulatory: 'var(--gold)',
  macro:      '#2563EB',
  market:     '#7C3AED',
  cyber:      'var(--orange)',
  esg:        'var(--green)',
  banking:    'var(--navy)',
  general:    'var(--txt3)',
}
