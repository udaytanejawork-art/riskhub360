import React, { useState, useCallback, useMemo } from 'react'
import Header        from './components/Header.jsx'
import Ticker        from './components/Ticker.jsx'
import StatusBar     from './components/StatusBar.jsx'
import SearchBar     from './components/SearchBar.jsx'
import FeedColumn    from './components/FeedColumn.jsx'
import OpportunitiesCol from './components/OpportunitiesCol.jsx'
import MarketSidebar from './components/MarketSidebar.jsx'
import EmailDigest   from './components/EmailDigest.jsx'
import { useFeeds }  from './hooks/useFeeds.js'

export default function App() {
  const { pool, sources, loaded, status, loadAll, getSection, opportunities, search, totalCount } = useFeeds()

  const [query,       setQuery]       = useState('')
  const [digestOpen,  setDigestOpen]  = useState(false)
  const [lastUpdated, setLastUpdated] = useState('')

  // Refresh handler — also sets the timestamp
  const handleRefresh = useCallback(() => {
    loadAll()
    setLastUpdated(new Date().toLocaleString('en-US', {
      month: 'short', day: 'numeric',
      hour: 'numeric', minute: '2-digit', hour12: true,
    }))
  }, [loadAll])

  // Search results
  const searchResults = useMemo(() => query ? search(query) : [], [query, search])
  const isSearching   = Boolean(query.trim())

  // Per-section articles
  const ermArticles   = useMemo(() => getSection('erm'),   [getSection, pool])
  const frmArticles   = useMemo(() => getSection('frm'),   [getSection, pool])
  const regArticles   = useMemo(() => getSection('reg'),   [getSection, pool])
  const macroArticles = useMemo(() => getSection('macro'), [getSection, pool])
  const oppArticles   = useMemo(() => opportunities(),     [opportunities, pool])

  return (
    <>
      {/* Sticky header */}
      <Header
        onRefresh={handleRefresh}
        isLoading={status === 'loading'}
        lastUpdated={lastUpdated}
        onDigestOpen={() => setDigestOpen(true)}
      />

      {/* TradingView ticker tape */}
      <Ticker />

      {/* Status bar */}
      <StatusBar sources={sources} loaded={loaded} status={status} pool={pool} />

      {/* Search bar */}
      <SearchBar
        onSearch={setQuery}
        searchResults={searchResults}
        isSearching={isSearching}
      />

      {/* Main content + right sidebar */}
      {!isSearching && (
        <div style={{ display: 'flex', alignItems: 'flex-start', background: 'var(--bg)' }}>

          {/* Left: all feeds */}
          <div style={{ flex: 1, minWidth: 0, overflow: 'hidden' }}>

            {/* Section: Live Intelligence Feeds */}
            <SectionDivider label="Live Intelligence Feeds" />
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 18, padding: '12px 36px',
              background: 'var(--bg)',
            }}>
              <FeedColumn
                sectionKey="erm"
                title="Enterprise Risk"
                subtitle="Cyber · Operational · ESG · AI Governance"
                icon="🛡️"
                articles={ermArticles}
              />
              <FeedColumn
                sectionKey="frm"
                title="Financial Risk"
                subtitle="Credit · Liquidity · Basel IV · Rates"
                icon="📊"
                articles={frmArticles}
              />
              <FeedColumn
                sectionKey="reg"
                title="Regulatory & Compliance"
                subtitle="SEC · BIS · Fed · FDIC · Policy"
                icon="⚖️"
                articles={regArticles}
                showSource
              />
            </div>

            {/* Section: Market Trends */}
            <SectionDivider label="Market Trends & Opportunities" />
            <div style={{
              display: 'grid',
              gridTemplateColumns: '3fr 2fr',
              gap: 18, padding: '0 36px 40px',
              background: 'var(--bg)',
            }}>
              <FeedColumn
                sectionKey="macro"
                title="Market & Macro Trends"
                subtitle="Economy · Central Banks · Trade · Global Outlook"
                icon="🌐"
                articles={macroArticles}
                showSource
              />
              <OpportunitiesCol articles={oppArticles} />
            </div>
          </div>

          {/* Right sidebar */}
          <MarketSidebar />
        </div>
      )}

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--border)', padding: '16px 36px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: '#fff', flexWrap: 'wrap', gap: 12,
      }}>
        <div style={{ fontSize: 11, color: 'var(--txt3)', lineHeight: 1.7 }}>
          <strong style={{ color: 'var(--navy)' }}>RiskHub360</strong> · Auto-refreshes every 5 min
          {lastUpdated && <><br />Last refresh: {lastUpdated}</>}
        </div>
        <div style={{ fontSize: 10, color: 'var(--txt3)' }}>
          Reuters · BBC · FT · NYT · SEC · BIS · Fed · FDIC · IMF · WEF · TradingView
        </div>
      </footer>

      {/* Email digest modal */}
      <EmailDigest pool={pool} isOpen={digestOpen} onClose={() => setDigestOpen(false)} />
    </>
  )
}

function SectionDivider({ label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '22px 36px 8px', background: 'var(--bg)' }}>
      <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
      <div style={{
        fontSize: 9.5, fontWeight: 700, letterSpacing: 2.5,
        textTransform: 'uppercase', color: '#fff', whiteSpace: 'nowrap',
        background: 'var(--navy)', padding: '5px 14px', borderRadius: 4,
      }}>
        {label}
      </div>
      <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
    </div>
  )
}
