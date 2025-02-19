import { GoogleGenerativeAI } from '@google/generative-ai';
import Parser from 'rss-parser';

interface NewsItem {
  title: string;
  url: string;
  source: string;
  published_on: number;
  description: string;
}

interface RSSItem {
  title?: string;
  link?: string;
  pubDate?: string;
  contentSnippet?: string;
}

// Initialize Gemini Pro
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

// Function to fetch real-time crypto data
async function fetchCryptoData(coin: string) {
  try {
    // Map common names to CoinGecko IDs
    const coinMapping: { [key: string]: string } = {
      'Bitcoin': 'bitcoin',
      'Ethereum': 'ethereum',
      'Binance Coin': 'binancecoin',
      'Solana': 'solana',
      'Ripple': 'ripple',
      'Cardano': 'cardano',
    };

    const coinId = coinMapping[coin] || coin.toLowerCase().replace(' ', '-');
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd&include_24hr_change=true&include_market_cap=true&include_last_updated_at=true`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch crypto data');
    }

    const data = await response.json();
    if (!data[coinId]) {
      throw new Error('Cryptocurrency not found');
    }

    return {
      price: data[coinId].usd,
      change24h: data[coinId].usd_24h_change,
      marketCap: data[coinId].usd_market_cap,
      lastUpdated: data[coinId].last_updated_at
    };
  } catch (error) {
    console.error('Error fetching crypto data:', error);
    throw new Error('Failed to fetch market data'); // Instead of returning default values, throw error
  }
}

// Function to fetch real-time crypto news
async function fetchCryptoNews(coin: string): Promise<NewsItem[]> {
  try {
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

    const parser = new Parser();
    
    // Fetch news from multiple sources in parallel
    const newsPromises = CRYPTO_RSS_FEEDS.map(async feed => {
      try {
        const feedData = await parser.parseURL(feed.url);
        return feedData.items
          .filter(item => {
            const content = `${item.title} ${item.contentSnippet}`.toLowerCase();
            return content.includes(coin.toLowerCase());
          })
          .map(item => ({
            title: item.title || '',
            url: item.link || '',
            source: feed.source,
            published_on: new Date(item.pubDate || '').getTime() / 1000,
            description: item.contentSnippet || ''
          }));
      } catch (error) {
        console.error(`Error fetching from ${feed.source}:`, error);
        return [];
      }
    });

    const allNews = await Promise.all(newsPromises);
    let combinedNews = allNews
      .flat()
      .sort((a, b) => b.published_on - a.published_on)
      .slice(0, 10); // Get latest 10 news items

    // If no specific news found for the coin, get general crypto news
    if (combinedNews.length === 0) {
      const generalNewsPromises = CRYPTO_RSS_FEEDS.map(async feed => {
        try {
          const feedData = await parser.parseURL(feed.url);
          return feedData.items.map(item => ({
            title: item.title || '',
            url: item.link || '',
            source: feed.source,
            published_on: new Date(item.pubDate || '').getTime() / 1000,
            description: item.contentSnippet || ''
          }));
        } catch (error) {
          console.error(`Error fetching from ${feed.source}:`, error);
          return [];
        }
      });

      const allGeneralNews = await Promise.all(generalNewsPromises);
      combinedNews = allGeneralNews
        .flat()
        .sort((a, b) => b.published_on - a.published_on)
        .slice(0, 10);
    }

    return combinedNews;
  } catch (error) {
    console.error('Error fetching crypto news:', error);
    throw new Error('Failed to fetch news data');
  }
}

// Helper function to create a specialized analyst
const createAnalyst = (role: string) => {
  return async (query: string, marketData: any, newsData: any = []) => {
    let promptTemplate = '';
    const timestamp = new Date().toISOString();
    const currentPrice = marketData?.price || 'N/A';
    const change24h = marketData?.change24h || 'N/A';
    
    switch (role) {
      case 'Market Analyst':
        promptTemplate = `You are a Cryptocurrency Market Analyst. Your task is to analyze ${query}

Current Data (as of ${timestamp}):
- Price: $${currentPrice}
- 24h Change: ${change24h}%

Please respond with EXACTLY this format (replace text in brackets, keep the exact headings):

Summary: [market overview]
Price Action: [price movements]
Volume: [trading volume]
Sentiment: [market sentiment]
Price: $${currentPrice}
Market Cap: [market cap]
24h Change: ${change24h}%

Do not add any other text or formatting.`;
        break;
        
      case 'Price Predictor':
        promptTemplate = `You are a Cryptocurrency Price Prediction Analyst. Your task is to analyze ${query}

Current Price: $${currentPrice} (as of ${timestamp})

Please respond with EXACTLY this format (replace text in brackets, keep the exact headings):

Short Term (24h): [price prediction and reasoning based on current price of $${currentPrice}]
Medium Term (1 week): [price prediction and reasoning]
Long Term (1 month): [price prediction and reasoning]
Key Factors: [list main factors affecting future price]
Confidence Level: [prediction confidence level]

Do not add any other text or formatting.`;
        break;
        
      case 'News Researcher':
        // Format recent news for the prompt
        const recentNews = newsData
          .slice(0, 5)
          .map((news: any) => `- ${news.headline || news.title} (${new Date(news.published_at || news.published_on).toLocaleString()}) - ${news.source || 'CoinDesk'}`)
          .join('\n');

        promptTemplate = `You are a Cryptocurrency News Researcher. Your task is to analyze ${query}

Recent News Headlines:
${recentNews || '- No recent news available'}

Please respond with EXACTLY this format (replace text in brackets, keep the exact headings):

Latest News:
${recentNews || '- No recent news available'}
Sentiment: [analyze the overall sentiment from these news items: Bullish/Neutral/Bearish]
Regulations: [extract any regulatory implications from the news]

Do not add any other text or formatting.`;
        break;
        
      case 'Risk Assessor':
        promptTemplate = `You are a Cryptocurrency Risk Assessor. Your task is to analyze ${query}

Current Price: $${currentPrice}
24h Change: ${change24h}%

Please respond with EXACTLY this format (replace text in brackets, keep the exact headings):

Risk Level: [Low/Medium/High based on current metrics]
Volatility: [analysis of price volatility]
Key Metrics:
- Price volatility: [current volatility level]
- Market liquidity: [liquidity assessment]
- Network health: [network metrics]

Do not add any other text or formatting.`;
        break;
    }

    try {
      const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: promptTemplate }]}],
        generationConfig: {
          temperature: 0.7,
          topK: 1,
          topP: 1,
          maxOutputTokens: 1000,
        },
      });
      
      const response = await result.response;
      const text = response.text();
      
      // Debug logging
      console.log(`${role} Raw Response:`, text);
      
      return text;
    } catch (error) {
      console.error(`Error in ${role} analysis:`, error);
      throw error;
    }
  };
};

export async function POST(req: Request) {
  try {
    const { coin } = await req.json();
    console.log('Analyzing coin:', coin);

    // Fetch real-time market data and news in parallel
    const [marketData, newsData] = await Promise.all([
      fetchCryptoData(coin),
      fetchCryptoNews(coin)
    ]);

    if (!marketData || !newsData) {
      throw new Error('Failed to fetch required data');
    }

    console.log('Market Data:', marketData);
    console.log('News Data:', newsData);

    // Create specialized analysts
    const marketAnalyst = createAnalyst('Market Analyst');
    const pricePredictor = createAnalyst('Price Predictor');
    const newsResearcher = createAnalyst('News Researcher');
    const riskAssessor = createAnalyst('Risk Assessor');

    // Execute parallel analysis with real data
    const [marketAnalysis, pricePrediction, newsAnalysis, riskAnalysis] = await Promise.all([
      marketAnalyst(`current market position of ${coin}. Provide real-time market data including price trends, trading volume, and market sentiment.`, marketData),
      pricePredictor(`future price movements of ${coin}. Consider market trends, upcoming events, and overall market conditions.`, marketData),
      newsResearcher(`latest news and developments about ${coin}. Focus on recent announcements, partnerships, and market sentiment.`, marketData, newsData),
      riskAssessor(`risk profile of ${coin}. Evaluate volatility, market exposure, and potential risk factors.`, marketData)
    ]);

    // Process and structure the results
    const structuredResults = {
      coin,
      timestamp: new Date().toISOString(),
      marketData,
      newsData: newsData, // Include all fetched news items
      marketAnalysis: processMarketAnalysis(marketAnalysis),
      pricePrediction: processPricePrediction(pricePrediction),
      newsAnalysis: processNewsAnalysis(newsAnalysis),
      riskAssessment: processRiskAssessment(riskAnalysis)
    };

    return Response.json(structuredResults);
  } catch (error: any) {
    console.error('Analysis error:', error);
    return Response.json(
      { error: error.message || 'Failed to analyze cryptocurrency' },
      { status: 500 }
    );
  }
}

// Helper functions to process raw analysis results
function processMarketAnalysis(raw: string) {
  try {
    if (!raw) {
      console.error('Empty market analysis response');
      return {
        summary: '', priceAction: '', volume: '', marketSentiment: '',
        price: '', marketCap: '', change24h: ''
      };
    }

    console.log('Processing market analysis:', raw);
    const lines = raw.split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);  // Remove empty lines
    
    const result = {
      summary: extractValue(lines, 'Summary:'),
      priceAction: extractValue(lines, 'Price Action:'),
      volume: extractValue(lines, 'Volume:'),
      marketSentiment: extractValue(lines, 'Sentiment:'),
      price: extractValue(lines, 'Price:'),
      marketCap: extractValue(lines, 'Market Cap:'),
      change24h: extractValue(lines, '24h Change:')
    };

    console.log('Processed market analysis:', result);
    return result;
  } catch (error) {
    console.error('Error processing market analysis:', error);
    return {
      summary: '', priceAction: '', volume: '', marketSentiment: '',
      price: '', marketCap: '', change24h: ''
    };
  }
}

function processPricePrediction(raw: string) {
  try {
    if (!raw) {
      console.error('Empty price prediction response');
      return {
        shortTerm: '',
        mediumTerm: '',
        longTerm: '',
        keyFactors: '',
        confidenceLevel: ''
      };
    }

    console.log('Processing price prediction:', raw);
    const lines = raw.split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);  // Remove empty lines
    
    const result = {
      shortTerm: extractValue(lines, 'Short Term (24h):'),
      mediumTerm: extractValue(lines, 'Medium Term (1 week):'),
      longTerm: extractValue(lines, 'Long Term (1 month):'),
      keyFactors: extractValue(lines, 'Key Factors:'),
      confidenceLevel: extractValue(lines, 'Confidence Level:')
    };

    console.log('Processed price prediction:', result);
    return result;
  } catch (error) {
    console.error('Error processing price prediction:', error);
    return {
      shortTerm: '',
      mediumTerm: '',
      longTerm: '',
      keyFactors: '',
      confidenceLevel: ''
    };
  }
}

// Helper function to extract values from lines with better error handling
function extractValue(lines: string[], key: string): string {
  try {
    const line = lines.find(l => l.startsWith(key));
    if (!line) {
      console.log(`Key not found: ${key} in lines:`, lines);
      return '';
    }
    const value = line.substring(key.length).trim();
    console.log(`Extracted ${key}`, value);
    return value;
  } catch (error) {
    console.error(`Error extracting ${key}:`, error);
    return '';
  }
}

function processNewsAnalysis(raw: string) {
  try {
    const lines = raw.split('\n').map(line => line.trim());
    const newsItems = lines
      .filter(line => line.startsWith('-'))
      .map(line => line.replace('-', '').trim());
    
    return {
      latestNews: newsItems,
      sentiment: lines.find(l => l.startsWith('Sentiment:'))?.replace('Sentiment:', '')?.trim() || '',
      regulations: lines.find(l => l.startsWith('Regulations:'))?.replace('Regulations:', '')?.trim() || ''
    };
  } catch (error) {
    console.error('Error processing news analysis:', error);
    return { latestNews: [], sentiment: '', regulations: '' };
  }
}

function processRiskAssessment(raw: string) {
  try {
    const lines = raw.split('\n').map(line => line.trim());
    const metrics = lines
      .filter(line => line.startsWith('-'))
      .map(line => line.replace('-', '').trim());
    
    return {
      riskLevel: lines.find(l => l.startsWith('Risk Level:'))?.replace('Risk Level:', '')?.trim() || '',
      volatility: lines.find(l => l.startsWith('Volatility:'))?.replace('Volatility:', '')?.trim() || '',
      keyMetrics: metrics
    };
  } catch (error) {
    console.error('Error processing risk assessment:', error);
    return { riskLevel: '', volatility: '', keyMetrics: [] };
  }
} 