import React, { useState } from 'react'
import { timeAgo } from '../hooks/useFeeds.js'

export default function OpportunitiesCol({ articles = [] }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-sm)',
      transition: `box-shadow var(--duration) var(--ease)`,
    }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = 'var(--shadow-md)'}
      onMouseLeave={e => e.currentTarget.style.boxShadow = 'var(--shadow-sm)'}
    >
      {/* Header */}
      <div style={{
        background: 'var(--navy)',
        padding: '14px 16px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32, height: 32,
            background: 'var(--orange)',
            borderRadius: 8,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 15, flexShrink: 0,
          }}>
            💡
          </div>
          <div>
            <div style={{
              fontFamily: 'var(--font-head)',
              fontSize: 13.5, fontWeight: 700,
              color: '#fff', letterSpacing: '-.2px',
            }}>
              Opportunities
            </div>
            <div style={{
              fontSize: 9.5, color: 'rgba(255,255,255,.45)',
              marginTop: 2, fontFamily: 'var(--font-body)',
            }}>
              Auto-detected · Growth · Reform
            </div>
          </div>
        </div>
        <div style={{
          background: 'rgba(255,255,255,.1)',
          border: '1px solid rgba(255,255,255,.15)',
          borderRadius: 20, padding: '3px 10px',
          fontSize: 10.5, fontWeight: 700,
          color: 'rgba(255,255,255,.8)',
          fontFamily: 'var(--font-body)',
        }}>
          {articles.length}
        </div>
      </div>

      {/* Cards */}
      <div style={{
        background: 'var(--card)',
        overflowY: 'auto', maxHeight: 520, flex: 1,
      }}>
        {articles.length === 0 ? (
          <div style={{
            padding: '40px 20px', textAlign: 'center',
            color: 'var(--txt4)', fontSize: 13, lineHeight: 1.7,
          }}>
            <div style={{ fontSize: 28, marginBottom: 10 }}>🔍</div>
            <div style={{ fontFamily: 'var(--font-head)', fontWeight: 600, marginBottom: 4 }}>
              Scanning signals
            </div>
            <div style={{ fontSize: 11.5 }}>Opportunities appear as feeds load</div>
          </div>
        ) : (
          articles.map((a, i) => <OppCard key={`${a.title}-${i}`} article={a} delay={i * 35} />)
        )}
      </div>
    </div>
  )
}

function OppCard({ article, delay }) {
  const { title, link, desc, source, date } = article
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '13px 16px 13px 19px',
        borderBottom: '1px solid var(--border)',
        background: hovered ? 'var(--card-hover)' : 'var(--card)',
        transition: `background var(--duration) var(--ease)`,
        animation: `fadeUp 280ms var(--ease) both`,
        animationDelay: `${delay}ms`,
        position: 'relative',
      }}
    >
      {/* Orange left bar */}
      <div style={{
        position: 'absolute', left: 0, top: 0,
        width: 3, height: '100%',
        background: 'var(--orange)',
        opacity: hovered ? 1 : .6,
        transition: `opacity var(--duration)`,
      }} />

      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
        <span style={{ fontSize: 12 }}>💡</span>
        <span style={{
          fontSize: 9, fontWeight: 700,
          letterSpacing: '1px', textTransform: 'uppercase',
          color: 'var(--txt2)', fontFamily: 'var(--font-body)',
        }}>{source}</span>
      </div>

      <div style={{
        fontFamily: 'var(--font-head)',
        fontSize: 13, fontWeight: 600,
        color: hovered ? 'var(--orange)' : 'var(--txt)',
        lineHeight: 1.45, marginBottom: desc ? 6 : 0,
        letterSpacing: '-.15px',
        transition: `color var(--duration)`,
      }}>
        <a
          href={link} target="_blank" rel="noopener noreferrer"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          {title}
        </a>
      </div>

      {desc && (
        <div style={{
          fontSize: 12, color: 'var(--txt3)', lineHeight: 1.6,
          marginBottom: 8,
          display: '-webkit-box', WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>
          {desc}
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 10.5 }}>
        {date && <span style={{ color: 'var(--txt4)' }}>{timeAgo(date)}</span>}
        <a href={link} target="_blank" rel="noopener noreferrer" style={{
          marginLeft: 'auto', color: 'var(--orange)', fontWeight: 700,
          textDecoration: 'none', opacity: hovered ? 1 : .7,
          transition: `opacity var(--duration)`,
        }}>Read →</a>
      </div>
    </div>
  )
}
