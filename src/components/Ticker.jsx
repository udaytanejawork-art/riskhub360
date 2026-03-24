import React, { useEffect, useRef } from 'react'

// All symbols confirmed working with TradingView ticker-tape widget.
// Futures notation (GC1!, CL1!) is NOT supported — use TVC equivalents.
const TICKER_SYMBOLS = [
  { proName: 'FOREXCOM:SPXUSD',  title: 'S&P 500'      },
  { proName: 'FOREXCOM:DJUSD',   title: 'Dow Jones'    },
  { proName: 'NASDAQ:NDX',        title: 'Nasdaq 100'   },
  { proName: 'FOREXCOM:UK100',    title: 'FTSE 100'     },
  { proName: 'FOREXCOM:DEU40',    title: 'DAX'          },
  { proName: 'BINANCE:BTCUSDT',   title: 'Bitcoin'      },
  { proName: 'BINANCE:ETHUSDT',   title: 'Ethereum'     },
  { proName: 'TVC:GOLD',          title: 'Gold'         },
  { proName: 'TVC:USOIL',         title: 'WTI Crude'    },
  { proName: 'TVC:US10Y',         title: '10Y Treasury' },
  { proName: 'TVC:DXY',           title: 'USD Index'    },
  { proName: 'FOREXCOM:EURUSD',   title: 'EUR/USD'      },
  { proName: 'CBOE:VIX',          title: 'VIX'          },
]

export default function Ticker() {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return
    containerRef.current.innerHTML = ''

    const widgetDiv = document.createElement('div')
    widgetDiv.className = 'tradingview-widget-container__widget'
    containerRef.current.appendChild(widgetDiv)

    const script = document.createElement('script')
    script.type  = 'text/javascript'
    script.src   = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js'
    script.async = true
    script.textContent = JSON.stringify({
      symbols:        TICKER_SYMBOLS,
      showSymbolLogo: true,
      isTransparent:  true,
      displayMode:   'adaptive',
      colorTheme:    'dark',
      locale:        'en',
    })
    containerRef.current.appendChild(script)

    return () => { if (containerRef.current) containerRef.current.innerHTML = '' }
  }, [])

  return (
    <div style={{ background: 'var(--navy)', borderBottom: '1px solid rgba(255,255,255,.08)', minHeight: 46 }}>
      <div className="tradingview-widget-container" ref={containerRef} style={{ width: '100%' }} />
    </div>
  )
}
