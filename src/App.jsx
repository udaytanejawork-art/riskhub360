import React, { useState, useCallback, useMemo } from 'react'
import Header           from './components/Header.jsx'
import Ticker           from './components/Ticker.jsx'
import StatusBar        from './components/StatusBar.jsx'
import SearchBar        from './components/SearchBar.jsx'
import FeedColumn       from './components/FeedColumn.jsx'
import OpportunitiesCol from './components/OpportunitiesCol.jsx'
import MarketSidebar    from './components/MarketSidebar.jsx'
import EmailDigest      from './components/EmailDigest.jsx'
import { useFeeds }     from './hooks/useFeeds.js'

export default function App() {
  const {
    pool, sources, loaded, status,
    loadAll, getSection, opportunities, search,
  } = useFeeds()

  const [query,       setQuery]       = useState('')
  const [digestOpen,  setDigestOpen]  = useState(false)
  const [lastUpdated, setLastUpdated] = useState('')

  const handleRefresh = useCallback(() => {
    loadAll()
    setLastUpdated(new Date().toLocaleString('en-US', {
      month: 'short', day: 'numeric',
      hour: 'numeric', minute: '2-digit', hour12: true,
    }))
  }, [loadAll])

  const searchResults = useMemo(() => query ? search(query) : [], [query, search])
  const isSearching   = Boolean(query.trim())

  const ermArticles   = useMemo(() => getSection('erm'),   [getSection, pool])
  const frmArticles   = useMemo(() => getSection('frm'),   [getSection, pool])
  const regArticles   = useMemo(() => getSection('reg'),   [getSection, pool])
  const macroArticles = useMemo(() => getSection('macro'), [getSection, pool])
  const oppArticles   = useMemo(() => opportunities(),     [opportunities, pool])

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      <Header
        onRefresh={handleRefresh}
        isLoading={status === 'loading'}
        lastUpdated={lastUpdated}
        onDigestOpen={() => setDigestOpen(true)}
      />

      <Ticker />

      <StatusBar sources={sources} loaded={loaded} status={status} pool={pool} />

      <SearchBar
        onSearch={setQuery}
        searchResults={searchResults}
        isSearching={isSearching}
      />

      {/* Main layout */}
      {!isSearching && (
        <div style={{
          display: 'flex',
          flex: 1,
          alignItems: 'flex-start',
          background: 'var(--bg)',
        }}>
          {/* Content area */}
          <div style={{ flex: 1, minWidth: 0, overflowX: 'hidden' }}>

            {/* ── Section 1: Live Feeds ── */}
            <SectionDivider label="Live Intelligence Feeds" />

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'var(--gap)',
              padding: '12px var(--pad)',
            }}>
              <FeedColumn
                sectionKey="erm"
                title="Enterprise Risk"
                subtitle="Cyber · Operational · ESG · AI"
                icon="🛡️"
                articles={ermArticles}
              />
              <FeedColumn
                sectionKey="frm"
                title="Financial Risk"
                subtitle="Credit · Liquidity · Basel · Rates"
                icon="📊"
                articles={frmArticles}
              />
              <FeedColumn
                sectionKey="reg"
                title="Regulatory"
                subtitle="SEC · BIS · Fed · FDIC"
                icon="⚖️"
                articles={regArticles}
                showSource
              />
            </div>

            {/* ── Section 2: Market & Opportunities ── */}
            <SectionDivider label="Market Trends & Opportunities" />

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0,3fr) minmax(0,2fr)',
              gap: 'var(--gap)',
              padding: '0 var(--pad) 40px',
            }}>
              <FeedColumn
                sectionKey="macro"
                title="Market & Macro"
                subtitle="Economy · Central Banks · Trade · Global"
                icon="🌐"
                articles={macroArticles}
                showSource
              />
              <OpportunitiesCol articles={oppArticles} />
            </div>
          </div>

          {/* Market sidebar — hidden on narrow screens via CSS */}
          <div className="sidebar-hide" style={{ width: 'var(--sidebar-w)', flexShrink: 0 }}>
            <MarketSidebar />
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--border)',
        padding: '14px var(--pad)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#fff',
        flexWrap: 'wrap',
        gap: 10,
      }}>
        <div style={{
          fontSize: 11.5,
          color: 'var(--txt3)',
          fontFamily: 'var(--font-body)',
        }}>
          <strong style={{ color: 'var(--navy)', fontFamily: 'var(--font-head)' }}>RiskHub360</strong>
          {' '}· Auto-refreshes every 5 min
          {lastUpdated && <span style={{ color: 'var(--txt4)' }}> · Updated {lastUpdated}</span>}
        </div>
        <div style={{
          fontSize: 10.5,
          color: 'var(--txt4)',
          fontFamily: 'var(--font-body)',
        }}>
          BBC · WSJ · NYT · SEC · BIS · Fed · FDIC · IMF · WEF · TradingView
        </div>
      </footer>

      <EmailDigest pool={pool} isOpen={digestOpen} onClose={() => setDigestOpen(false)} />
    </div>
  )
}

function SectionDivider({ label }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 14,
      padding: '20px var(--pad) 6px',
    }}>
      <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
      <div style={{
        fontFamily: 'var(--font-body)',
        fontSize: 9.5, fontWeight: 700,
        letterSpacing: '2.5px', textTransform: 'uppercase',
        color: '#fff', whiteSpace: 'nowrap',
        background: 'var(--navy)',
        padding: '5px 14px', borderRadius: 5,
      }}>
        {label}
      </div>
      <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
    </div>
  )
}
