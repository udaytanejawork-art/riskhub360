import React from 'react'
import { timeAgo } from '../hooks/useFeeds.js'

export default function OpportunitiesCol({ articles = [] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>

      {/* Header */}
      <div style={{
        background: 'var(--navy)',
        border: '1px solid var(--navy)',
        borderBottom: 'none',
        borderRadius: '10px 10px 0 0',
        padding: '14px 16px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 8, height: 8, background: 'var(--orange)',
            borderRadius: '50%', animation: 'pulse 2s infinite',
          }} />
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', letterSpacing: '-.1px' }}>
              Emerging Opportunities
            </div>
            <div style={{ fontSize: 9.5, color: 'rgba(255,255,255,.5)', marginTop: 2, fontWeight: 500 }}>
              Auto-detected · Growth · Reform · Innovation
            </div>
          </div>
        </div>
        <span style={{
          fontSize: 10, fontWeight: 700,
          background: 'rgba(255,255,255,.12)', color: 'rgba(255,255,255,.85)',
          padding: '3px 10px', borderRadius: 4,
          border: '1px solid rgba(255,255,255,.2)',
        }}>
          {articles.length} signals
        </span>
      </div>

      {/* Cards */}
      <div style={{
        background: '#fff',
        border: '1px solid var(--border)',
        borderTop: 'none',
        borderRadius: '0 0 10px 10px',
        overflowY: 'auto',
        maxHeight: 500,
      }}>
        {articles.length === 0 ? (
          <div style={{ padding: '36px 20px', textAlign: 'center', color: 'var(--txt3)', fontSize: 13 }}>
            <div style={{ fontSize: 26, marginBottom: 10 }}>🔍</div>
            Scanning for opportunity signals…
          </div>
        ) : (
          articles.map((a, i) => (
            <OppCard key={a.title + i} article={a} delay={i * 0.05} />
          ))
        )}
      </div>
    </div>
  )
}

function OppCard({ article, delay }) {
  const { title, link, desc, source, date } = article
  return (
    <div
      style={{
        padding: '13px 16px',
        borderBottom: '1px solid var(--border)',
        transition: 'background .12s',
        animation: 'fadeUp .3s ease both',
        animationDelay: `${delay}s`,
      }}
      onMouseEnter={e => e.currentTarget.style.background = '#F9FBFF'}
      onMouseLeave={e => e.currentTarget.style.background = ''}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 6 }}>
        <span style={{ fontSize: 13 }}>💡</span>
        <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--navy2)' }}>
          {source}
        </span>
      </div>
      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--txt)', lineHeight: 1.45, marginBottom: 5 }}>
        <a
          href={link} target="_blank" rel="noopener noreferrer"
          style={{ color: 'inherit', textDecoration: 'none' }}
          onMouseEnter={e => e.target.style.color = 'var(--orange)'}
          onMouseLeave={e => e.target.style.color = 'inherit'}
        >
          {title}
        </a>
      </div>
      {desc && (
        <div style={{ fontSize: 11.5, color: 'var(--txt2)', lineHeight: 1.65 }}>{desc}…</div>
      )}
      <div style={{ fontSize: 10, color: 'var(--txt3)', marginTop: 6 }}>
        {timeAgo(date)} · <a href={link} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--orange)', fontWeight: 700, textDecoration: 'none' }}>Read →</a>
      </div>
    </div>
  )
}
