import React, { useEffect, useRef } from 'react'

export default function Ticker() {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Clean any previous widget
    containerRef.current.innerHTML = ''

    const widgetDiv = document.createElement('div')
    widgetDiv.className = 'tradingview-widget-container__widget'
    containerRef.current.appendChild(widgetDiv)

    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js'
    script.async = true
    script.textContent = JSON.stringify({
      symbols: [
        { proName: 'FOREXCOM:SPXUSD',  title: 'S&P 500'    },
        { proName: 'FOREXCOM:DJUSD',   title: 'Dow Jones'  },
        { proName: 'NASDAQ:NDX',        title: 'Nasdaq 100' },
        { proName: 'FOREXCOM:UK100',    title: 'FTSE 100'   },
        { proName: 'BINANCE:BTCUSDT',   title: 'Bitcoin'    },
        { proName: 'BINANCE:ETHUSDT',   title: 'Ethereum'   },
        { proName: 'COMEX:GC1!',        title: 'Gold'       },
        { proName: 'NYMEX:CL1!',        title: 'WTI Crude'  },
        { proName: 'TVC:US10Y',         title: '10Y Treasury'},
        { proName: 'TVC:DXY',           title: 'USD Index'  },
      ],
      showSymbolLogo:  true,
      isTransparent:   true,
      displayMode:    'compact',
      colorTheme:     'dark',
      locale:         'en',
    })
    containerRef.current.appendChild(script)
  }, [])

  return (
    <div style={{ background: 'var(--navy)', borderBottom: '1px solid rgba(255,255,255,.08)' }}>
      <div className="tradingview-widget-container" ref={containerRef} style={{ width: '100%' }} />
    </div>
  )
}
