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

export async function GET() {
  try {
    // Fetch news from multiple sources in parallel
    const newsPromises = CRYPTO_RSS_FEEDS.map(async feed => {
      try {
        const feedData = await parser.parseURL(feed.url);
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
    });

    const allNews = await Promise.all(newsPromises);
    const combinedNews = allNews
      .flat()
      .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())
      .slice(0, 10); // Get latest 10 news items

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