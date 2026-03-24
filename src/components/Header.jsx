import React, { useState } from 'react'

export default function Header({ onRefresh, isLoading, lastUpdated, onDigestOpen }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header style={{
      background: 'var(--navy)',
      borderBottom: '3px solid var(--orange)',
      height: 'var(--header-h)',
      padding: '0 var(--pad)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 400,
      boxShadow: '0 2px 20px rgba(0,43,91,.3)',
      gap: 12,
    }}>

      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0 }}>
        <div style={{
          fontFamily: 'var(--font-head)',
          fontWeight: 800,
          fontSize: 19,
          color: '#fff',
          letterSpacing: '-0.5px',
          lineHeight: 1,
        }}>
          Risk<span style={{ color: 'var(--orange)' }}>Hub</span>
          <span style={{
            background: 'var(--orange)',
            color: '#fff',
            fontSize: 11,
            fontWeight: 700,
            padding: '2px 6px',
            borderRadius: 4,
            marginLeft: 3,
            verticalAlign: 'middle',
            letterSpacing: 0,
          }}>360</span>
        </div>

        <div className="mobile-hide" style={{
          width: 1, height: 22,
          background: 'rgba(255,255,255,.15)',
        }} />

        <div className="mobile-hide" style={{
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: '2.5px',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,.38)',
          fontFamily: 'var(--font-body)',
        }}>
          Risk Intelligence Dashboard
        </div>
      </div>

      {/* Right controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>

        {/* Live indicator */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: 'rgba(255,255,255,.07)',
          border: '1px solid rgba(255,255,255,.12)',
          padding: '5px 12px', borderRadius: 20,
          fontSize: 10, fontWeight: 700,
          color: 'rgba(255,255,255,.65)',
          letterSpacing: '1px', textTransform: 'uppercase',
          fontFamily: 'var(--font-body)',
        }}>
          <div style={{
            width: 6, height: 6,
            background: 'var(--orange)',
            borderRadius: '50%',
            animation: 'pulse 2s infinite',
          }} />
          <span className="small-hide">Live</span>
        </div>

        {/* Last updated */}
        {lastUpdated && (
          <span className="mobile-hide" style={{
            fontSize: 11,
            color: 'rgba(255,255,255,.35)',
            fontFamily: 'var(--font-body)',
          }}>
            {lastUpdated}
          </span>
        )}

        {/* Email digest */}
        <button
          onClick={onDigestOpen}
          className="mobile-hide"
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: 'rgba(255,255,255,.08)',
            color: 'rgba(255,255,255,.72)',
            border: '1px solid rgba(255,255,255,.14)',
            padding: '7px 16px', borderRadius: 'var(--radius-sm)',
            fontSize: 12, fontWeight: 600,
            transition: 'all var(--duration) var(--ease)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(255,255,255,.14)'
            e.currentTarget.style.color = '#fff'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(255,255,255,.08)'
            e.currentTarget.style.color = 'rgba(255,255,255,.72)'
          }}
        >
          📧 Digest
        </button>

        {/* Refresh */}
        <button
          onClick={onRefresh}
          disabled={isLoading}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: isLoading ? 'rgba(255,91,53,.6)' : 'var(--orange)',
            color: '#fff', border: 'none',
            padding: '7px 18px', borderRadius: 'var(--radius-sm)',
            fontSize: 12, fontWeight: 700,
            transition: 'all var(--duration) var(--ease)',
            boxShadow: isLoading ? 'none' : '0 2px 12px rgba(255,91,53,.35)',
          }}
          onMouseEnter={e => { if (!isLoading) e.currentTarget.style.background = 'var(--orange-dk)' }}
          onMouseLeave={e => { if (!isLoading) e.currentTarget.style.background = 'var(--orange)' }}
        >
          <span style={{
            display: 'inline-block',
            animation: isLoading ? 'spin .7s linear infinite' : 'none',
            fontSize: 13,
          }}>↻</span>
          <span className="small-hide">Refresh</span>
        </button>
      </div>
    </header>
  )
}
