import Parser from 'rss-parser';

interface SourceData {
  [key: string]: any;  // Generic object properties
}

interface CategoryData {
  [key: string]: any;  // Generic array item properties
}

interface NewsArticle {
  title: string;
  link: string;
  pubDate: string;
  source: string;
  description: string;
}

const parser = new Parser();

const CRYPTO_RSS_FEEDS = [
  {
    url: 'https://cointelegraph.com/rss',
    source: 'CoinTelegraph'
  },
  {
    url: 'https://cryptonews.com/news/feed/',
    source: 'CryptoNews'
  },
  {
    url: 'https://decrypt.co/feed',
    source: 'Decrypt'
  }
];

// Helper function to fetch with timeout
async function fetchWithTimeout(feed: typeof CRYPTO_RSS_FEEDS[0], timeoutMs: number = 5000) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);
    
    const feedData = await parser.parseURL(feed.url);
    clearTimeout(timeout);
    
    return feedData.items.map(item => ({
      title: item.title || '',
      link: item.link || '',
      pubDate: item.pubDate || '',
      source: feed.source,
      description: item.contentSnippet || ''
    }));
  } catch (error) {
    console.error(`Error fetching from ${feed.source}:`, error);
    return [];
  }
}

export async function GET() {
  try {
    // Fetch news from multiple sources in parallel with timeout
    const newsPromises = CRYPTO_RSS_FEEDS.map(feed => fetchWithTimeout(feed));
    
    const allNews = await Promise.all(newsPromises);
    const combinedNews = allNews
      .flat()
      .filter(news => news.title && news.link) // Filter out invalid entries
      .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())
      .slice(0, 10); // Get latest 10 news items

    if (combinedNews.length === 0) {
      return Response.json({ 
        error: 'No news available at the moment',
        Data: []
      }, { status: 404 });
    }

    return Response.json({
      Data: combinedNews
    });
  } catch (error: any) {
    console.error('Test error:', error);
    return Response.json({ 
      error: 'Failed to fetch news', 
      details: error.message || 'Unknown error'
    }, { status: 500 });
  }
} 