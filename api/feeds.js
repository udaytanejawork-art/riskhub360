// Vercel Serverless Function — /api/feeds
// Fetches RSS feeds server-side, bypassing browser CORS restrictions.
// GET /api/feeds?url=https://feeds.reuters.com/...


export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')

  if (req.method === 'OPTIONS') return res.status(200).end()

  const { url } = req.query
  if (!url) return res.status(400).json({ error: 'Missing ?url= parameter' })
  if (!url.startsWith('http://') && !url.startsWith('https://'))
    return res.status(400).json({ error: 'Invalid URL — must start with http:// or https://' })

  // Timeout using Promise.race — more compatible than AbortSignal.timeout
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Request timed out after 12s')), 12000)
  )

  try {
    const fetchPromise = fetch(url, {
      headers: {
        'User-Agent':      'Mozilla/5.0 (compatible; RiskHub360/1.0; +https://riskhub360.vercel.app)',
        'Accept':          'application/rss+xml, application/atom+xml, application/xml, text/xml, */*',
        'Accept-Language': 'en-US,en;q=0.9',
        'Cache-Control':   'no-cache',
      },
      redirect: 'follow',
    })

    const response = await Promise.race([fetchPromise, timeout])

    if (!response.ok) {
      console.error(`[feeds] ${response.status} for ${url}`)
      return res.status(502).json({ error: `Source returned ${response.status}` })
    }

    const xml = await response.text()

    if (!xml || xml.trim().length < 50) {
      return res.status(502).json({ error: 'Empty response from source' })
    }

    res.setHeader('Content-Type', 'application/xml; charset=utf-8')
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=60')
    return res.status(200).send(xml)

  } catch (err) {
    console.error(`[feeds] Error fetching ${url}:`, err.message)
    return res.status(502).json({ error: err.message || 'Fetch failed' })
  }
}
