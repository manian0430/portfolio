# Crypto Research Assistant

A modern web application that provides real-time cryptocurrency analysis powered by AI. The application combines market data, news feeds, and AI-driven analysis to provide comprehensive insights for cryptocurrency research.

## Features

### Real-Time Data Sources
- **Market Data**: Live cryptocurrency prices, market cap, and 24h changes via CoinGecko API
- **News Feeds**: Real-time news aggregation from multiple sources:
  - CoinTelegraph
  - CryptoNews
  - Decrypt
- **AI Analysis**: Powered by Google's Gemini Pro AI model

### Analysis Crew
The application features four specialized AI analysts:

1. **Market Analyst**
   - Analyzes price trends and market sentiment
   - Provides real-time market overview
   - Tracks trading volume and market metrics

2. **Price Predictor**
   - Forecasts short-term (24h) price movements
   - Analyzes medium-term (1 week) trends
   - Projects long-term (1 month) price directions
   - Evaluates confidence levels

3. **News Researcher**
   - Monitors crypto news in real-time
   - Analyzes news sentiment
   - Tracks regulatory developments
   - Provides source-verified news links

4. **Risk Assessor**
   - Evaluates market risks
   - Analyzes price volatility
   - Assesses market liquidity
   - Monitors network health

### User Interface
- Modern, responsive design with dark mode
- Real-time data updates
- Interactive news cards
- Visual market indicators
- Quick-select popular cryptocurrencies

## Technology Stack

- **Frontend**: Next.js 14 with React
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with shadcn/ui
- **Animations**: Framer Motion
- **API Integration**: 
  - CoinGecko API for market data
  - RSS Parser for news feeds
  - Google Gemini Pro for AI analysis

## Getting Started

1. Clone the repository
```bash
git clone [repository-url]
cd [repository-name]
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
Create a `.env.local` file with:
```
GOOGLE_API_KEY=your-google-api-key
```

4. Run the development server
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## API Endpoints

### POST /api/crypto-analysis
Analyzes a cryptocurrency and returns comprehensive data:
- Market metrics
- Latest news
- AI-driven analysis
- Risk assessment

Request body:
```json
{
  "coin": "Bitcoin"
}
```

### GET /api/test-news
Returns the latest cryptocurrency news from multiple sources.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- CoinGecko API for market data
- News sources: CoinTelegraph, CryptoNews, and Decrypt
- Google Gemini Pro for AI capabilities
