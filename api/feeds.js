// Vercel Serverless Function — /api/feeds
// Fetches any RSS URL server-side so the browser never hits a CORS wall.
// Usage: GET /api/feeds?url=https://feeds.reuters.com/...

export default async function handler(req, res) {
  // Allow the frontend to call this
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET')

  const { url } = req.query
  if (!url) {
    return res.status(400).json({ error: 'Missing ?url= parameter' })
  }

  // Basic safety check — only allow http/https RSS feeds
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return res.status(400).json({ error: 'Invalid URL' })
  }

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'RiskHub360/1.0 RSS Reader',
        'Accept': 'application/rss+xml, application/xml, text/xml, */*',
      },
      signal: AbortSignal.timeout(10000), // 10 second timeout
    })

    if (!response.ok) {
      return res.status(502).json({ error: `Upstream error: ${response.status}` })
    }

    const xml = await response.text()

    // Pass the raw XML back to the frontend
    res.setHeader('Content-Type', 'application/xml')
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=60') // cache 5 min on Vercel edge
    return res.status(200).send(xml)

  } catch (err) {
    return res.status(502).json({ error: err.message || 'Fetch failed' })
  }
}
