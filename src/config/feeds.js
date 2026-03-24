// ─────────────────────────────────────────────────────────────
//  RiskHub360 — Feed Configuration
//  To add a feed: copy any entry, change url + label.
//  tier 1 = fast/reliable,  tier 2 = official/slower
//
//  forceCat: when set, ALL articles from this source are tagged
//  with this category before keyword matching even runs.
//  Use this for sources where content type is predictable.
// ─────────────────────────────────────────────────────────────

export const FEEDS = [

  // ── Tier 1: Fast & reliable ──────────────────────────────────
  {
    url:   'https://feeds.bbci.co.uk/news/business/rss.xml',
    label: 'BBC Business',
    tier:  1,
    // no forceCat — BBC covers everything, let keywords decide
  },
  {
    url:   'https://rss.nytimes.com/services/xml/rss/nyt/Business.xml',
    label: 'NY Times Business',
    tier:  1,
  },
  {
    url:   'https://rss.nytimes.com/services/xml/rss/nyt/Economy.xml',
    label: 'NY Times Economy',
    tier:  1,
    forceCat: 'macro', // Economy section is always macro/market
  },
  {
    url:   'https://feeds.a.dj.com/rss/RSSMarketsMain.xml',
    label: 'WSJ Markets',
    tier:  1,
    forceCat: 'market', // Always market data
  },
  {
    url:   'https://feeds.a.dj.com/rss/WSJcomUSBusiness.xml',
    label: 'WSJ Business',
    tier:  1,
    // Mixed content — let keywords decide
  },
  {
    url:   'https://feeds.feedburner.com/TheHackersNews',
    label: 'Hacker News',
    tier:  1,
    forceCat: 'cyber', // Always cybersecurity
  },
  {
    url:   'https://www.bleepingcomputer.com/feed/',
    label: 'BleepingComputer',
    tier:  1,
    forceCat: 'cyber', // Always cybersecurity
  },
  {
    url:   'https://krebsonsecurity.com/feed/',
    label: 'Krebs Security',
    tier:  1,
    forceCat: 'cyber', // Always cybersecurity
  },

  // ── Tier 2: Official regulatory ──────────────────────────────
  {
    url:   'https://www.federalreserve.gov/feeds/press_all.xml',
    label: 'Federal Reserve',
    tier:  2,
    forceCat: 'regulatory', // Always regulatory/banking
  },
  {
    url:   'https://www.sec.gov/rss/news/press-releases.xml',
    label: 'SEC',
    tier:  2,
    forceCat: 'regulatory', // Always regulatory
  },
  {
    url:   'https://www.bis.org/rss/press.xml',
    label: 'BIS',
    tier:  2,
    forceCat: 'regulatory', // Always regulatory/banking
  },
  {
    url:   'https://www.fdic.gov/news/news/press/index.xml',
    label: 'FDIC',
    tier:  2,
    forceCat: 'regulatory', // Always regulatory
  },
  {
    url:   'https://www.imf.org/en/Blogs/rss',
    label: 'IMF Blog',
    tier:  2,
    forceCat: 'macro', // Always macro/global economy
  },
  {
    url:   'https://www.weforum.org/agenda/rss.xml',
    label: 'WEF',
    tier:  2,
    // WEF covers ESG, macro, cyber — let keywords decide
  },
  {
    url:   'https://www.risk.net/rss',
    label: 'Risk.net',
    tier:  2,
    // Mixed risk content — let keywords decide
  },
  {
    url:   'https://blogs.worldbank.org/en/all-rss.xml',
    label: 'World Bank',
    tier:  2,
    forceCat: 'macro', // Always macro/development economics
  },
]

// ─────────────────────────────────────────────────────────────
//  Keyword classification rules.
//  Only runs when a feed has NO forceCat set.
//  Order matters — first match wins.
//  Keep 'breaking' LAST so it doesn't hijack financial articles
//  that happen to contain words like "shock" or "surge".
// ─────────────────────────────────────────────────────────────
export const CATEGORY_RULES = [
  {
    // Cyber first — very distinct vocabulary, rarely mismatches
    cat: 'cyber',
    kw:  ['cyber','ransomware','malware','phishing','data breach',
          'security incident','ciso','infosec','threat actor',
          'vulnerability','zero-day','exploit','botnet','ddos',
          'hacker','hacked','breach','intrusion'],
  },
  {
    // ESG — distinct vocabulary too
    cat: 'esg',
    kw:  ['esg','climate','sustainability','carbon','net zero',
          'environmental','emissions','renewable','biodiversity',
          'climate risk','sustainable finance','green bond',
          'decarboni','paris agreement','scope 3'],
  },
  {
    // Regulatory — check before banking so SEC/Fed articles land here
    cat: 'regulatory',
    kw:  ['regulation','regulatory','compliance','enforcement',
          'penalty','fine','directive','mandate','legislation',
          'consent order','rule-making','rulemaking','guidance issued',
          'press release','supervisory','examination','settlement'],
  },
  {
    // Banking & financial risk
    cat: 'banking',
    kw:  ['bank','banking','lender','credit','loan','deposit',
          'capital ratio','stress test','liquidity','central bank',
          'rate hike','rate cut','interest rate','monetary policy',
          'fed funds','treasury yield','mortgage','lending',
          'basel','ecb','federal reserve','boe','boj'],
  },
  {
    // Markets
    cat: 'market',
    kw:  ['equity','stock market','shares','bond market','yield',
          'spread','index','volatility','hedge fund','portfolio',
          'ipo','earnings','nasdaq','s&p 500','dow jones',
          'futures','options','derivatives','etf','commodit'],
  },
  {
    // Macro — broad economic topics
    cat: 'macro',
    kw:  ['gdp','inflation','recession','unemployment','trade deficit',
          'tariff','fiscal','supply chain','geopolit','trade war',
          'debt ceiling','federal budget','consumer price','cpi','ppi',
          'purchasing managers','pmi','economic growth','labour market'],
  },
  {
    // Breaking — checked LAST so it only catches genuinely breaking news
    // that didn't match a more specific category above
    cat: 'breaking',
    kw:  ['breaking news','breaking:','just in','urgent:',
          'flash:','alert:','emergency declared','market crash',
          'bank run','bank failure','market halt','trading halted',
          'circuit breaker'],
  },
]

// ─────────────────────────────────────────────────────────────
//  Section routing — which categories appear in each section.
//  'general' removed from ERM and Regulatory to reduce noise.
// ─────────────────────────────────────────────────────────────
export const SECTION_CATS = {
  // ERM: cyber & ESG are primary, regulatory + breaking supplement
  erm:   ['cyber', 'esg', 'regulatory', 'breaking'],

  // FRM: banking & market are primary, macro + regulatory supplement
  frm:   ['banking', 'market', 'macro', 'breaking', 'regulatory'],

  // Regulatory: only explicitly regulatory + banking (tightest filter)
  reg:   ['regulatory', 'banking'],

  // Macro: broad economic picture
  macro: ['macro', 'market', 'breaking'],
}

// ─────────────────────────────────────────────────────────────
//  Opportunity detection keywords
// ─────────────────────────────────────────────────────────────
export const OPP_KEYWORDS = [
  'opportunity','emerging market','digital transform','ai adoption',
  'moderniz','new framework','new standard','initiative',
  'reform','innovation','partnership','strategic investment',
  'expansion','new product','investment surge','market gap',
  'untapped','growth potential','new regulation opens',
]
