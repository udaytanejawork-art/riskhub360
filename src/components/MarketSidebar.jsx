import React, { useEffect, useRef } from 'react'

function TVWidget({ id, widgetFile, config }) {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    ref.current.innerHTML = ''

    const widgetDiv = document.createElement('div')
    widgetDiv.className = 'tradingview-widget-container__widget'
    ref.current.appendChild(widgetDiv)

    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = `https://s3.tradingview.com/external-embedding/${widgetFile}.js`
    script.async = true
    script.textContent = JSON.stringify(config)
    ref.current.appendChild(script)
  }, [widgetFile, id])

  return (
    <div style={{ padding: '0 12px 4px' }}>
      <div
        className="tradingview-widget-container"
        ref={ref}
        style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid var(--border)' }}
      />
    </div>
  )
}

export default function MarketSidebar() {
  return (
    <aside style={{
      width: 320, flexShrink: 0,
      background: 'var(--card)',
      borderLeft: '1px solid var(--border)',
      position: 'sticky', top: 64,
      height: 'calc(100vh - 64px)',
      overflowY: 'auto', scrollbarWidth: 'thin',
      paddingBottom: 24,
    }}>
      {/* Sidebar header */}
      <div style={{
        padding: '14px 16px 12px',
        borderBottom: '1px solid var(--border)',
        position: 'sticky', top: 0,
        background: 'var(--card)', zIndex: 10,
        display: 'flex', alignItems: 'center',
      }}>
        <span style={{ fontSize: 14, marginRight: 7 }}>📡</span>
        <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--orange)', letterSpacing: '-.1px' }}>
          Live Market Conditions
        </span>
      </div>

      <SectionLabel>Market Overview</SectionLabel>
      <TVWidget
        id="market-overview"
        widgetFile="embed-widget-market-overview"
        config={{
          colorTheme: 'light', dateRange: '1D', showChart: true,
          locale: 'en', isTransparent: false, showSymbolLogo: true,
          width: '100%', height: 420,
          tabs: [
            { title: 'Indices', originalTitle: 'Indices', symbols: [
              { s: 'FOREXCOM:SPXUSD', d: 'S&P 500'    },
              { s: 'FOREXCOM:DJUSD',  d: 'Dow Jones'  },
              { s: 'NASDAQ:NDX',       d: 'Nasdaq 100' },
              { s: 'FOREXCOM:UK100',   d: 'FTSE 100'   },
              { s: 'FOREXCOM:DEU40',   d: 'DAX'        },
              { s: 'INDEX:NKY',        d: 'Nikkei 225' },
            ]},
            { title: 'Crypto', originalTitle: 'Crypto', symbols: [
              { s: 'BINANCE:BTCUSDT', d: 'Bitcoin'  },
              { s: 'BINANCE:ETHUSDT', d: 'Ethereum' },
              { s: 'BINANCE:SOLUSDT', d: 'Solana'   },
              { s: 'BINANCE:BNBUSDT', d: 'BNB'      },
              { s: 'BINANCE:XRPUSDT', d: 'XRP'      },
            ]},
            { title: 'Bonds', originalTitle: 'Bonds', symbols: [
              { s: 'TVC:US10Y', d: '10Y Treasury' },
              { s: 'TVC:US02Y', d: '2Y Treasury'  },
              { s: 'TVC:US30Y', d: '30Y Treasury' },
              { s: 'TVC:DE10Y', d: 'Germany 10Y'  },
              { s: 'TVC:GB10Y', d: 'UK 10Y'       },
            ]},
            { title: 'Forex', originalTitle: 'Forex', symbols: [
              { s: 'FOREXCOM:EURUSD', d: 'EUR/USD'  },
              { s: 'FOREXCOM:GBPUSD', d: 'GBP/USD'  },
              { s: 'FOREXCOM:USDJPY', d: 'USD/JPY'  },
              { s: 'TVC:DXY',         d: 'USD Index' },
            ]},
          ],
        }}
      />

      <Divider />
      <SectionLabel>Sector Performance</SectionLabel>
      <TVWidget
        id="sector-map"
        widgetFile="embed-widget-stock-heatmap"
        config={{
          exchanges: [], dataSource: 'SPX500', grouping: 'sector',
          blockSize: 'market_cap_basic', blockColor: 'change',
          locale: 'en', colorTheme: 'light', hasTopBar: true,
          isZoomEnabled: true, hasSymbolTooltip: true, isMonoSize: false,
          width: '100%', height: 260,
        }}
      />

      <Divider />
      <SectionLabel>Economic Calendar</SectionLabel>
      <TVWidget
        id="econ-cal"
        widgetFile="embed-widget-events"
        config={{
          colorTheme: 'light', isTransparent: false,
          width: '100%', height: 280, locale: 'en',
          importanceFilter: '0,1', countryFilter: 'us,eu,gb,jp,cn',
        }}
      />
    </aside>
  )
}

function SectionLabel({ children }) {
  return (
    <div style={{
      fontSize: 9, fontWeight: 700, letterSpacing: 2,
      textTransform: 'uppercase', color: 'var(--txt3)',
      padding: '14px 16px 6px', display: 'block',
    }}>
      {children}
    </div>
  )
}

function Divider() {
  return <div style={{ height: 1, background: 'var(--border)', margin: '8px 12px 0' }} />
}
