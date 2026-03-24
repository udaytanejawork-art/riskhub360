import React from 'react'

export default function Header({ onRefresh, isLoading, lastUpdated, onDigestOpen }) {
  return (
    <header style={{
      background: 'var(--navy)',
      borderBottom: '3px solid var(--orange)',
      padding: '0 36px', height: 64,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      position: 'sticky', top: 0, zIndex: 300,
      boxShadow: '0 2px 16px rgba(0,43,91,.22)',
    }}>
      {/* Left: logo + title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <div style={{ fontFamily: 'var(--font)', fontWeight: 800, fontSize: 20, color: '#fff', letterSpacing: '-.5px', lineHeight: 1 }}>
          RiskHub<span style={{ color: 'var(--orange)' }}>360</span>
        </div>
        <div style={{ width: 1, height: 24, background: 'rgba(255,255,255,.18)' }} />
        <div className="hide-mobile" style={{ fontSize: 10, fontWeight: 600, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(255,255,255,.45)' }}>
          Risk Intelligence Dashboard
        </div>
      </div>

      {/* Right: live pill + timestamp + buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {/* Live pill */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.18)',
          padding: '5px 13px', borderRadius: 20,
          fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,.75)',
          letterSpacing: '.8px', textTransform: 'uppercase',
        }}>
          <div style={{ width: 6, height: 6, background: 'var(--orange)', borderRadius: '50%', animation: 'pulse 2s infinite' }} />
          <span className="hide-small">LIVE FEEDS</span>
        </div>

        {/* Timestamp */}
        {lastUpdated && (
          <span className="hide-mobile" style={{ fontSize: 11, color: 'rgba(255,255,255,.45)' }}>
            Updated {lastUpdated}
          </span>
        )}

        {/* Email digest button */}
        <button
          onClick={onDigestOpen}
          style={{
            display: 'flex', alignItems: 'center', gap: 7,
            background: 'rgba(255,255,255,.1)', color: 'rgba(255,255,255,.8)',
            border: '1px solid rgba(255,255,255,.18)',
            padding: '8px 18px', borderRadius: 7,
            fontFamily: 'var(--font)', fontWeight: 600, fontSize: 12.5,
            cursor: 'pointer', transition: 'all .2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,.18)'; e.currentTarget.style.color = '#fff' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,.1)'; e.currentTarget.style.color = 'rgba(255,255,255,.8)' }}
        >
          📧 <span className="hide-mobile">Email Digest</span>
        </button>

        {/* Refresh button */}
        <button
          onClick={onRefresh}
          disabled={isLoading}
          style={{
            display: 'flex', alignItems: 'center', gap: 7,
            background: 'var(--orange)', color: '#fff', border: 'none',
            padding: '9px 20px', borderRadius: 7,
            fontFamily: 'var(--font)', fontWeight: 700, fontSize: 12.5,
            cursor: isLoading ? 'not-allowed' : 'pointer',
            opacity: isLoading ? .5 : 1, transition: 'all .2s',
          }}
        >
          <span style={{ display: 'inline-block', animation: isLoading ? 'spin .8s linear infinite' : 'none' }}>↻</span>
          <span className="hide-small">Refresh</span>
        </button>
      </div>
    </header>
  )
}
