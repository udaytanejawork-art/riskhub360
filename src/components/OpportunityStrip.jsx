import React, { useRef } from 'react'
import { timeAgo } from '../hooks/useFeeds.js'

// ─────────────────────────────────────────────────────────────
//  OpportunityStrip
//  A compact horizontally-scrolling bar placed prominently
//  just above the intelligence feed columns. Each opportunity
//  is a card showing the headline + source. Clicking opens
//  the full article in a new tab.
// ─────────────────────────────────────────────────────────────

export default function OpportunityStrip({ articles = [] }) {
  const scrollRef = useRef(null)

  // Drag-to-scroll behaviour
  const dragState = useRef({ dragging: false, startX: 0, scrollLeft: 0 })

  const onMouseDown = (e) => {
    dragState.current = {
      dragging: true,
      startX: e.pageX - scrollRef.current.offsetLeft,
      scrollLeft: scrollRef.current.scrollLeft,
    }
    scrollRef.current.style.cursor = 'grabbing'
  }
  const onMouseUp = () => {
    dragState.current.dragging = false
    if (scrollRef.current) scrollRef.current.style.cursor = 'grab'
  }
  const onMouseMove = (e) => {
    if (!dragState.current.dragging) return
    e.preventDefault()
    const x    = e.pageX - scrollRef.current.offsetLeft
    const walk = (x - dragState.current.startX) * 1.2
    scrollRef.current.scrollLeft = dragState.current.scrollLeft - walk
  }

  return (
    <div style={{
      background: 'var(--card)',
      borderBottom: '1px solid var(--border)',
    }}>
      {/* Header row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '8px var(--pad) 0',
      }}>
        {/* Pulsing dot + label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, flexShrink: 0 }}>
          <div style={{
            width: 7, height: 7,
            borderRadius: '50%',
            background: 'var(--orange)',
            animation: 'pulse 2s infinite',
          }} />
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: 'var(--orange)',
          }}>
            Emerging Opportunities
          </span>
        </div>

        {/* Pill count */}
        <span style={{
          fontFamily: 'var(--font-body)',
          fontSize: 10,
          fontWeight: 700,
          background: 'var(--orange)',
          color: '#fff',
          padding: '2px 8px',
          borderRadius: 20,
          letterSpacing: '.3px',
        }}>
          {articles.length} signals
        </span>

        {/* Scroll hint — fades out once user scrolls */}
        <span style={{
          marginLeft: 'auto',
          fontSize: 10,
          color: 'var(--txt4)',
          fontFamily: 'var(--font-body)',
          display: 'flex',
          alignItems: 'center',
          gap: 4,
        }}>
          Drag to scroll
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </span>
      </div>

      {/* Scrollable card row */}
      <div
        ref={scrollRef}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onMouseMove={onMouseMove}
        style={{
          display: 'flex',
          gap: 10,
          padding: '8px var(--pad) 10px',
          overflowX: 'auto',
          scrollbarWidth: 'none',
          cursor: 'grab',
          userSelect: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {articles.length === 0 ? (
          // Skeleton placeholders while loading
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} style={{
              flexShrink: 0,
              width: 240,
              height: 66,
              borderRadius: 8,
              background: 'var(--bg)',
              border: '1px solid var(--border)',
            }} />
          ))
        ) : (
          articles.map((a, i) => (
            <OppCard key={`${a.title}-${i}`} article={a} index={i} />
          ))
        )}
      </div>
    </div>
  )
}

function OppCard({ article, index }) {
  const { title, link, source, date, cat } = article

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      title={title}
      style={{
        flexShrink: 0,
        width: 260,
        padding: '10px 14px',
        borderRadius: 8,
        border: '1px solid var(--border)',
        background: 'var(--bg)',
        textDecoration: 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: 5,
        transition: 'all 160ms var(--ease)',
        animation: `fadeUp 260ms var(--ease) both`,
        animationDelay: `${Math.min(index * 40, 500)}ms`,
        // Left accent bar via border-left
        borderLeft: '3px solid var(--orange)',
        cursor: 'pointer',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = 'var(--card-hover)'
        e.currentTarget.style.borderColor = 'var(--navy3)'
        e.currentTarget.style.borderLeftColor = 'var(--orange)'
        e.currentTarget.style.boxShadow = 'var(--shadow-md)'
        e.currentTarget.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'var(--bg2)'
        e.currentTarget.style.borderColor = 'var(--border)'
        e.currentTarget.style.borderLeftColor = 'var(--orange)'
        e.currentTarget.style.boxShadow = 'none'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      {/* Source + time */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 6,
      }}>
        <span style={{
          fontSize: 9,
          fontWeight: 700,
          letterSpacing: '1px',
          textTransform: 'uppercase',
          color: 'var(--txt2)',
          fontFamily: 'var(--font-body)',
        }}>
          {source}
        </span>
        {date && (
          <span style={{ fontSize: 9.5, color: 'var(--txt4)', fontFamily: 'var(--font-body)' }}>
            {timeAgo(date)}
          </span>
        )}
      </div>

      {/* Headline — clamped to 2 lines */}
      <div style={{
        fontFamily: 'var(--font-head)',
        fontSize: 12,
        fontWeight: 600,
        color: 'var(--txt)',
        lineHeight: 1.4,
        letterSpacing: '-.1px',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
      }}>
        {title}
      </div>

      {/* Read link */}
      <div style={{
        fontSize: 10,
        fontWeight: 700,
        color: 'var(--orange)',
        fontFamily: 'var(--font-body)',
        display: 'flex',
        alignItems: 'center',
        gap: 3,
        marginTop: 'auto',
      }}>
        Read →
      </div>
    </a>
  )
}
