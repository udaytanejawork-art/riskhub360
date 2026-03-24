// ─────────────────────────────────────────────────────────────
//  RiskHub360 — Feed Configuration
//  Edit this file to add, remove or update any RSS source.
//  tier 1 = fast/reliable,  tier 2 = official/slower
// ─────────────────────────────────────────────────────────────

export const FEEDS = [
  // ── Tier 1: fast, reliable ──────────────────────────────
  { url: 'https://feeds.reuters.com/reuters/businessNews',             label: 'Reuters Business',   tier: 1 },
  { url: 'https://feeds.reuters.com/reuters/technologyNews',           label: 'Reuters Technology', tier: 1 },
  { url: 'https://feeds.reuters.com/reuters/worldNews',                label: 'Reuters World',      tier: 1 },
  { url: 'https://rss.nytimes.com/services/xml/rss/nyt/Business.xml', label: 'NY Times',           tier: 1 },
  { url: 'https://feeds.bbci.co.uk/news/business/rss.xml',            label: 'BBC Business',       tier: 1 },
  { url: 'https://www.ft.com/rss/home/uk',                            label: 'Financial Times',    tier: 1 },
  { url: 'https://feeds.feedburner.com/TheHackersNews',               label: 'Hacker News',        tier: 1 },
  { url: 'https://www.darkreading.com/rss/all.xml',                   label: 'Dark Reading',       tier: 1 },

  // ── Tier 2: official regulatory ─────────────────────────
  { url: 'https://www.federalreserve.gov/feeds/press_all.xml',        label: 'Federal Reserve',    tier: 2 },
  { url: 'https://www.sec.gov/rss/news/press-releases.xml',           label: 'SEC',                tier: 2 },
  { url: 'https://www.bis.org/rss/press.xml',                         label: 'BIS',                tier: 2 },
  { url: 'https://www.fdic.gov/news/news/press/index.xml',            label: 'FDIC',               tier: 2 },
  { url: 'https://www.imf.org/en/Blogs/rss',                          label: 'IMF Blog',           tier: 2 },
  { url: 'https://www.weforum.org/agenda/rss.xml',                    label: 'WEF',                tier: 2 },
]

// ─────────────────────────────────────────────────────────────
//  Keyword rules for auto-classifying articles into sections.
//  Order matters — first match wins.
// ─────────────────────────────────────────────────────────────
export const CATEGORY_RULES = [
  { cat: 'breaking',   kw: ['breaking','urgent','crisis','crash','collapse','surge','plunge','shock','record high','record low','tumbles','soars','emergency'] },
  { cat: 'cyber',      kw: ['cyber','ransomware','hack','breach','malware','phishing','data breach','security incident','ciso','infosec','threat actor','vulnerability','zero-day'] },
  { cat: 'esg',        kw: ['esg','climate','sustainability','carbon','net zero','green','environmental','emissions','renewable','biodiversity'] },
  { cat: 'regulatory', kw: ['regulation','regulatory','compliance','rule','guidance','enforcement','penalty','fine','framework','directive','mandate','legislation','act','law','policy','sanctions'] },
  { cat: 'banking',    kw: ['bank','banking','lender','credit','loan','deposit','capital ratio','stress test','basel','liquidity','central bank','rate hike','rate cut','interest rate','ecb','monetary policy'] },
  { cat: 'market',     kw: ['market','equity','stock','shares','bond','yield','spread','index','volatility','hedge fund','portfolio','investment','asset','ipo','earnings','nasdaq','s&p','dow'] },
  { cat: 'macro',      kw: ['economy','economic','gdp','inflation','recession','growth','unemployment','trade','tariff','geopolit','fiscal','supply chain','global','imf','world bank','wef'] },
]

// Which categories appear in each section
export const SECTION_CATS = {
  erm:   ['cyber', 'esg', 'regulatory', 'breaking', 'general'],
  frm:   ['banking', 'market', 'macro', 'breaking', 'regulatory'],
  reg:   ['regulatory', 'banking', 'breaking', 'general'],
  macro: ['macro', 'market', 'breaking', 'general'],
}

// Opportunity keywords — articles matching these surface in the Opportunities column
export const OPP_KEYWORDS = [
  'opportunity','growth','emerging market','digital transform','ai adoption',
  'moderniz','resilience','new framework','new standard','initiative',
  'reform','innovation','partnership','strategic','expansion',
]
