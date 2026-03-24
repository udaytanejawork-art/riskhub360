import React, { useState, useCallback, useRef } from 'react'
import NewsCard from './NewsCard.jsx'

export default function SearchBar({ onSearch, searchResults, isSearching }) {
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)
  const debounceRef = useRef(null)

  const handleChange = useCallback((e) => {
    const val = e.target.value
    setQuery(val)
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => onSearch(val), 250)
  }, [onSearch])

  const clear = () => {
    setQuery('')
    onSearch('')
  }

  return (
    <>
      {/* Search input bar */}
      <div style={{
        background: 'var(--card)',
        borderBottom: '1px solid var(--border)',
        padding: '9px var(--pad)',
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        {/* Search icon */}
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
          stroke="var(--txt3)" strokeWidth="2.5" style={{ flexShrink: 0 }}>
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.35-4.35"/>
        </svg>

        <input
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Search all articles — Basel, cyber, inflation, ESG..."
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            fontSize: 13.5,
            fontFamily: 'var(--font-body)',
            color: 'var(--txt)',
            background: 'transparent',
          }}
        />

        {query && (
          <button
            onClick={clear}
            style={{
              fontSize: 11, fontWeight: 600,
              color: 'var(--txt3)', background: 'var(--bg)',
              border: '1px solid var(--border)',
              padding: '3px 10px', borderRadius: 5,
              transition: `all var(--duration)`,
            }}
          >
            Clear
          </button>
        )}

        {query && (
          <span style={{
            fontSize: 11, color: 'var(--txt4)',
            fontFamily: 'var(--font-body)', whiteSpace: 'nowrap',
          }}>
            {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* Results */}
      {isSearching && (
        <div style={{ padding: 'var(--pad)', background: 'var(--bg)' }}>
          <div style={{
            fontFamily: 'var(--font-head)',
            fontSize: 11, fontWeight: 700,
            letterSpacing: '2px', textTransform: 'uppercase',
            color: 'var(--txt3)', marginBottom: 14,
          }}>
            Results for "{query}"
          </div>

          {searchResults.length === 0 ? (
            <div style={{
              padding: '40px 20px', textAlign: 'center',
              color: 'var(--txt4)', fontSize: 14,
            }}>
              <div style={{ fontSize: 32, marginBottom: 10 }}>🔍</div>
              No articles match <strong>"{query}"</strong>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: 'var(--gap)',
            }}>
              {searchResults.map((a, i) => (
                <div key={`${a.title}-${i}`} style={{
                  background: 'var(--card)',
                  borderRadius: 'var(--radius)',
                  border: '1px solid var(--border)',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-sm)',
                }}>
                  <NewsCard article={a} showSource delay={i * 25} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  )
}
