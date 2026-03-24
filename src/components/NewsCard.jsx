import React, { useState } from 'react'
import { timeAgo, isNew } from '../hooks/useFeeds.js'

const CAT_BORDER = {
  breaking:   'var(--red)',
  regulatory: 'var(--gold)',
  macro:      '#2563EB',
  market:     '#7C3AED',
  cyber:      'var(--orange)',
  esg:        'var(--green)',
  banking:    'var(--navy)',
  general:    'var(--txt4)',
}

export default function NewsCard({ article, showSource = false, delay = 0 }) {
  const { title, link, desc, date, source, cat } = article
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '13px 16px 13px 19px',
        borderBottom: '1px solid var(--border)',
        position: 'relative',
        overflow: 'hidden',
        background: hovered ? 'var(--card-hover)' : 'var(--card)',
        transition: `background var(--duration) var(--ease)`,
        animation: `fadeUp 280ms var(--ease) both`,
        animationDelay: `${delay}ms`,
        cursor: 'default',
      }}
    >
      {/* Left accent bar */}
      <div style={{
        position: 'absolute', left: 0, top: 0,
        width: 3, height: '100%',
        background: CAT_BORDER[cat] || 'var(--txt4)',
        opacity: hovered ? 1 : .7,
        transition: `opacity var(--duration)`,
      }} />

      {/* Top row */}
      <div style={{
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 7, gap: 8,
      }}>
        <span className={`cat-pill ${cat}`}>{cat}</span>
        {showSource && (
          <span style={{
            fontSize: 10, color: 'var(--txt4)',
            fontWeight: 600, fontFamily: 'var(--font-body)',
            whiteSpace: 'nowrap', overflow: 'hidden',
            textOverflow: 'ellipsis', maxWidth: 120,
          }}>{source}</span>
        )}
      </div>

      {/* Headline */}
      <div style={{
        fontFamily: 'var(--font-head)',
        fontSize: 13,
        fontWeight: 600,
        color: hovered ? 'var(--orange)' : 'var(--txt)',
        lineHeight: 1.45,
        marginBottom: desc ? 6 : 0,
        letterSpacing: '-.15px',
        transition: `color var(--duration)`,
      }}>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          {title}
        </a>
        {isNew(date) && <span className="new-badge">New</span>}
      </div>

      {/* Summary */}
      {desc && (
        <div style={{
          fontSize: 12,
          color: 'var(--txt3)',
          lineHeight: 1.6,
          marginBottom: 8,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {desc}
        </div>
      )}

      {/* Footer */}
      <div style={{
        display: 'flex', alignItems: 'center',
        gap: 10, fontSize: 10.5,
      }}>
        {date && (
          <span style={{ color: 'var(--txt4)', fontWeight: 500 }}>{timeAgo(date)}</span>
        )}
        {!showSource && (
          <span style={{ color: 'var(--txt4)', fontWeight: 500 }}>{source}</span>
        )}
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            marginLeft: 'auto',
            color: 'var(--orange)',
            fontWeight: 700,
            textDecoration: 'none',
            display: 'flex', alignItems: 'center', gap: 3,
            transition: `opacity var(--duration)`,
            opacity: hovered ? 1 : .7,
          }}
        >
          Read →
        </a>
      </div>
    </div>
  )
}
