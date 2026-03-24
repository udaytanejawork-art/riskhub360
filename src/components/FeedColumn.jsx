import React, { useState, useMemo } from 'react'
import NewsCard from './NewsCard.jsx'

const COLUMN_TABS = {
  erm:   ['All', 'Cyber', 'Regulatory', 'ESG'],
  frm:   ['All', 'Banking', 'Market', 'Macro'],
  reg:   ['All', 'Regulatory', 'Breaking', 'Banking'],
  macro: ['All', 'Breaking', 'Economy', 'Market'],
}

const TAB_TO_CAT = {
  'All': 'all', 'Cyber': 'cyber', 'Regulatory': 'regulatory', 'ESG': 'esg',
  'Banking': 'banking', 'Market': 'market', 'Macro': 'macro',
  'Breaking': 'breaking', 'Economy': 'macro',
}

export default function FeedColumn({ sectionKey, title, subtitle, icon, articles = [], showSource = false }) {
  const [activeTab, setActiveTab] = useState('All')
  const tabs = COLUMN_TABS[sectionKey] || ['All']

  const filtered = useMemo(() => {
    const cat = TAB_TO_CAT[activeTab]
    return cat === 'all' ? articles : articles.filter(a => a.cat === cat)
  }, [articles, activeTab])

  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      minWidth: 0,
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-sm)',
      transition: `box-shadow var(--duration) var(--ease)`,
    }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = 'var(--shadow-md)'}
      onMouseLeave={e => e.currentTarget.style.boxShadow = 'var(--shadow-sm)'}
    >

      {/* Column header */}
      <div style={{
        background: 'var(--navy)',
        padding: '14px 16px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
          <div style={{
            width: 32, height: 32,
            background: 'var(--orange)',
            borderRadius: 8,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 15, flexShrink: 0,
          }}>
            {icon}
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{
              fontFamily: 'var(--font-head)',
              fontSize: 13.5, fontWeight: 700,
              color: '#fff', letterSpacing: '-.2px',
              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
            }}>
              {title}
            </div>
            <div style={{
              fontSize: 9.5, color: 'rgba(255,255,255,.45)',
              marginTop: 2, fontFamily: 'var(--font-body)',
              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
            }}>
              {subtitle}
            </div>
          </div>
        </div>

        {/* Article count badge */}
        <div style={{
          flexShrink: 0,
          background: 'rgba(255,255,255,.1)',
          border: '1px solid rgba(255,255,255,.15)',
          borderRadius: 20,
          padding: '3px 10px',
          fontSize: 10.5, fontWeight: 700,
          color: 'rgba(255,255,255,.8)',
          fontFamily: 'var(--font-body)',
          whiteSpace: 'nowrap',
        }}>
          {articles.length}
        </div>
      </div>

      {/* Filter tabs */}
      <div style={{
        background: 'var(--card)',
        borderBottom: '1px solid var(--border)',
        padding: '8px 12px',
        display: 'flex', gap: 5,
        overflowX: 'auto', scrollbarWidth: 'none',
      }}>
        {tabs.map(tab => {
          const active = tab === activeTab
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                flexShrink: 0,
                fontSize: 10.5, fontWeight: 600,
                padding: '4px 12px', borderRadius: 5,
                border: `1px solid ${active ? 'var(--orange)' : 'var(--border)'}`,
                background: active ? 'var(--orange)' : 'rgba(191,191,186,0.07)',
                color: active ? '#fff' : 'var(--txt3)',
                transition: `all var(--duration) var(--ease)`,
                fontFamily: 'var(--font-body)',
                letterSpacing: '.2px',
              }}
            >
              {tab}
            </button>
          )
        })}
      </div>

      {/* Articles */}
      <div style={{
        background: 'var(--card)',
        overflowY: 'auto',
        maxHeight: 520,
        flex: 1,
      }}>
        {filtered.length === 0 ? (
          <div style={{
            padding: '40px 20px',
            textAlign: 'center',
            color: 'var(--txt4)',
            fontSize: 13,
            lineHeight: 1.7,
          }}>
            <div style={{ fontSize: 28, marginBottom: 10 }}>📰</div>
            <div style={{ fontFamily: 'var(--font-head)', fontWeight: 600, marginBottom: 4 }}>
              No articles yet
            </div>
            <div style={{ fontSize: 11.5 }}>
              {articles.length === 0 ? 'Loading feeds…' : 'Try a different filter'}
            </div>
          </div>
        ) : (
          filtered.map((a, i) => (
            <NewsCard
              key={`${a.title}-${i}`}
              article={a}
              showSource={showSource}
              delay={Math.min(i * 35, 400)}
            />
          ))
        )}
      </div>
    </div>
  )
}
