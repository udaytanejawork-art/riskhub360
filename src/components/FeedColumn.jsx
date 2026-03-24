import React, { useState, useMemo } from 'react'
import NewsCard from './NewsCard.jsx'

const TABS = {
  erm:   ['all', 'cyber', 'regulatory', 'esg'],
  frm:   ['all', 'banking', 'market', 'macro'],
  reg:   ['all', 'regulatory', 'breaking', 'banking'],
  macro: ['all', 'breaking', 'macro', 'market'],
}

export default function FeedColumn({ sectionKey, title, subtitle, icon, articles = [], showSource = false }) {
  const [activeTab, setActiveTab] = useState('all')
  const tabs = TABS[sectionKey] || ['all']

  const filtered = useMemo(() => {
    if (activeTab === 'all') return articles
    return articles.filter(a => a.cat === activeTab)
  }, [articles, activeTab])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>

      {/* Column header */}
      <div style={{
        background: 'var(--navy)',
        border: '1px solid var(--navy)',
        borderBottom: 'none',
        borderRadius: '10px 10px 0 0',
        padding: '14px 16px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 30, height: 30, background: 'var(--orange)',
            borderRadius: 6, display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: 13, flexShrink: 0,
          }}>
            {icon}
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', letterSpacing: '-.2px' }}>
              {title}
            </div>
            <div style={{ fontSize: 9.5, color: 'rgba(255,255,255,.5)', marginTop: 2, fontWeight: 500 }}>
              {subtitle}
            </div>
          </div>
        </div>
        <span style={{
          fontSize: 10, fontWeight: 700,
          background: 'rgba(255,255,255,.12)', color: 'rgba(255,255,255,.85)',
          padding: '3px 10px', borderRadius: 4,
          border: '1px solid rgba(255,255,255,.2)',
        }}>
          {articles.length} articles
        </span>
      </div>

      {/* Filter tabs */}
      <div style={{
        background: '#fff',
        border: '1px solid var(--border)',
        borderTop: 'none',
        borderBottom: '1px solid var(--border)',
        padding: '8px 12px',
        display: 'flex', gap: 5, flexWrap: 'wrap',
      }}>
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              fontSize: 10, fontWeight: 600,
              padding: '4px 12px', borderRadius: 4,
              border: '1px solid var(--border)',
              background: activeTab === tab ? 'var(--orange)' : 'transparent',
              color:      activeTab === tab ? '#fff' : 'var(--txt3)',
              borderColor: activeTab === tab ? 'var(--orange)' : 'var(--border)',
              cursor: 'pointer', transition: 'all .15s',
              fontFamily: 'var(--font)',
            }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Articles */}
      <div style={{
        background: '#fff',
        border: '1px solid var(--border)',
        borderTop: 'none',
        borderRadius: '0 0 10px 10px',
        overflowY: 'auto',
        maxHeight: 500,
        flex: 1,
      }}>
        {filtered.length === 0 ? (
          <EmptyState />
        ) : (
          filtered.map((a, i) => (
            <NewsCard
              key={a.title + i}
              article={a}
              showSource={showSource}
              style={{ animationDelay: `${i * 0.04}s` }}
            />
          ))
        )}
      </div>
    </div>
  )
}

function EmptyState() {
  return (
    <div style={{ padding: '36px 20px', textAlign: 'center', color: 'var(--txt3)', fontSize: 13, lineHeight: 1.7 }}>
      <div style={{ fontSize: 26, marginBottom: 10 }}>📰</div>
      No matching articles right now.
      <br />
      <small style={{ fontSize: 10 }}>Try another filter or click Refresh.</small>
    </div>
  )
}
