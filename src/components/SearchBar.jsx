import React, { useState, useCallback } from 'react'
import NewsCard from './NewsCard.jsx'

export default function SearchBar({ onSearch, searchResults, isSearching }) {
  const [query, setQuery] = useState('')

  const handleChange = useCallback((e) => {
    const val = e.target.value
    setQuery(val)
    onSearch(val)
  }, [onSearch])

  const clear = () => { setQuery(''); onSearch('') }

  return (
    <>
      <div style={{
        background: '#fff', borderBottom: '1px solid var(--border)',
        padding: '10px 36px', display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search all articles… (e.g. Basel, cyber, inflation, ESG)"
          style={{
            flex: 1, maxWidth: 520,
            background: '#F4F7FB', border: '1.5px solid var(--border)',
            borderRadius: 7, padding: '9px 14px 9px 38px',
            fontFamily: 'var(--font)', fontSize: 12.5, fontWeight: 500,
            color: 'var(--txt)', outline: 'none',
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%237A90AA' stroke-width='2.5'%3E%3Ccircle cx='11' cy='11' r='8'/%3E%3Cpath d='m21 21-4.35-4.35'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat', backgroundPosition: '12px center',
          }}
          onFocus={e => { e.target.style.borderColor = 'var(--navy2)'; e.target.style.background = '#fff' }}
          onBlur={e  => { e.target.style.borderColor = 'var(--border)'; e.target.style.background = '#F4F7FB' }}
        />
        {query && (
          <button
            onClick={clear}
            style={{ fontSize: 11, fontWeight: 600, color: 'var(--txt3)', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            ✕ Clear
          </button>
        )}
        {query && (
          <span style={{ fontSize: 11, color: 'var(--txt3)', marginLeft: 'auto' }}>
            {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* Search results overlay */}
      {isSearching && (
        <div style={{ padding: '0 36px 40px', background: 'var(--bg)' }}>
          <div style={{
            fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase',
            color: 'var(--txt3)', padding: '18px 0 8px', display: 'block',
          }}>
            Search results for "{query}"
          </div>
          {searchResults.length === 0 ? (
            <div style={{ padding: '36px 20px', textAlign: 'center', color: 'var(--txt3)', fontSize: 13 }}>
              No results found.
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 12 }}>
              {searchResults.map((a, i) => (
                <div key={a.title + i} style={{ background: '#fff', borderRadius: 10, border: '1px solid var(--border)', overflow: 'hidden' }}>
                  <NewsCard article={a} showSource style={{ animationDelay: `${i * 0.03}s` }} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  )
}
