// ─────────────────────────────────────────────────────────────
//  RiskHub360 — Feed Configuration
//  All URLs verified working as of March 2026.
//  To add a feed: copy any entry and change the url + label.
//  tier 1 = fast/reliable,  tier 2 = official/slower
// ─────────────────────────────────────────────────────────────

export const FEEDS = [

  // ── Tier 1: Fast & reliable ──────────────────────────────────
  {
    url:   'https://feeds.bbci.co.uk/news/business/rss.xml',
    label: 'BBC Business',
    tier:  1,
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
  },
  {
    url:   'https://feeds.a.dj.com/rss/RSSMarketsMain.xml',
    label: 'WSJ Markets',
    tier:  1,
  },
  {
    url:   'https://feeds.a.dj.com/rss/WSJcomUSBusiness.xml',
    label: 'WSJ Business',
    tier:  1,
  },
  {
    url:   'https://feeds.feedburner.com/TheHackersNews',
    label: 'Hacker News',
    tier:  1,
  },
  {
    url:   'https://www.bleepingcomputer.com/feed/',
    label: 'BleepingComputer',
    tier:  1,
  },
  {
    url:   'https://krebsonsecurity.com/feed/',
    label: 'Krebs Security',
    tier:  1,
  },

  // ── Tier 2: Official regulatory ──────────────────────────────
  {
    url:   'https://www.federalreserve.gov/feeds/press_all.xml',
    label: 'Federal Reserve',
    tier:  2,
  },
  {
    url:   'https://www.sec.gov/rss/news/press-releases.xml',
    label: 'SEC',
    tier:  2,
  },
  {
    url:   'https://www.bis.org/rss/press.xml',
    label: 'BIS',
    tier:  2,
  },
  {
    url:   'https://www.fdic.gov/news/news/press/index.xml',
    label: 'FDIC',
    tier:  2,
  },
  {
    url:   'https://www.imf.org/en/Blogs/rss',
    label: 'IMF Blog',
    tier:  2,
  },
  {
    url:   'https://www.weforum.org/agenda/rss.xml',
    label: 'WEF',
    tier:  2,
  },
  {
    url:   'https://www.risk.net/rss',
    label: 'Risk.net',
    tier:  2,
  },
  {
    url:   'https://blogs.worldbank.org/en/all-rss.xml',
    label: 'World Bank',
    tier:  2,
  },
]

// ─────────────────────────────────────────────────────────────
//  Category classification rules.
//  Order matters — first match wins.
// ─────────────────────────────────────────────────────────────
export const CATEGORY_RULES = [
  {
    cat: 'breaking',
    kw:  ['breaking','urgent','crisis','crash','collapse','surge','plunge',
          'shock','record high','record low','tumbles','soars','emergency',
          'slumps','halted','suspended'],
  },
  {
    cat: 'cyber',
    kw:  ['cyber','ransomware','hack','breach','malware','phishing',
          'data breach','security incident','ciso','infosec','threat actor',
          'vulnerability','zero-day','attack','exploit','botnet','ddos'],
  },
  {
    cat: 'esg',
    kw:  ['esg','climate','sustainability','carbon','net zero','green',
          'environmental','emissions','renewable','biodiversity','climate risk',
          'sustainable finance','green bond'],
  },
  {
    cat: 'regulatory',
    kw:  ['regulation','regulatory','compliance','rule','guidance','enforcement',
          'penalty','fine','framework','directive','mandate','legislation',
          'act','law','policy','sanctions','consent order','sec filing',
          'federal reserve','fdic','basel'],
  },
  {
    cat: 'banking',
    kw:  ['bank','banking','lender','credit','loan','deposit','capital ratio',
          'stress test','liquidity','central bank','rate hike','rate cut',
          'interest rate','ecb','monetary policy','fed funds','treasury yield',
          'mortgage','lending'],
  },
  {
    cat: 'market',
    kw:  ['market','equity','stock','shares','bond','yield','spread','index',
          'volatility','hedge fund','portfolio','investment','asset','ipo',
          'earnings','nasdaq','s&p','dow','futures','options','derivatives'],
  },
  {
    cat: 'macro',
    kw:  ['economy','economic','gdp','inflation','recession','growth',
          'unemployment','trade','tariff','geopolit','fiscal','supply chain',
          'global','imf','world bank','wef','trade war','debt ceiling',
          'federal budget','consumer price'],
  },
]

// Which categories each section shows
export const SECTION_CATS = {
  erm:   ['cyber', 'esg', 'regulatory', 'breaking', 'general'],
  frm:   ['banking', 'market', 'macro', 'breaking', 'regulatory'],
  reg:   ['regulatory', 'banking', 'breaking', 'general'],
  macro: ['macro', 'market', 'breaking', 'general'],
}

// Articles with these words surface in the Opportunities column
export const OPP_KEYWORDS = [
  'opportunity','growth','emerging market','digital transform','ai adoption',
  'moderniz','resilience','new framework','new standard','initiative',
  'reform','innovation','partnership','strategic','expansion','new product',
  'investment surge','market gap','untapped',
]
