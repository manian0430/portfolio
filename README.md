# Ian Managuelod Portfolio Website

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS, featuring an advanced Crypto Research Assistant.

## Portfolio Features

- Modern, responsive design with dark mode support
- Interactive UI components
- Portfolio showcase
- Contact form
- Skills visualization
- Work experience timeline
- Smooth animations and transitions

## Crypto Research Assistant

An integrated cryptocurrency analysis tool that provides real-time insights:

### Real-Time Data Sources
- **Market Data**: Live cryptocurrency prices, market cap, and 24h changes via CoinGecko API
- **News Feeds**: Real-time news aggregation from:
  - CoinTelegraph
  - CryptoNews
  - Decrypt
- **AI Analysis**: Powered by Google's Gemini Pro AI model

### AI Analysis Crew
1. **Market Analyst**
   - Real-time price trends and sentiment analysis
   - Market overview and metrics

2. **Price Predictor**
   - Short-term (24h) forecasts
   - Medium-term (1 week) analysis
   - Long-term (1 month) projections

3. **News Researcher**
   - Real-time crypto news monitoring
   - Sentiment analysis
   - Regulatory updates

4. **Risk Assessor**
   - Market risk evaluation
   - Volatility analysis
   - Liquidity assessment

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide Icons
- **API Integration**: 
  - CoinGecko API
  - RSS Parser
  - Google Gemini Pro

## Prerequisites

Before running this application, make sure you have:
- Node.js (v18.0.0 or higher)
- npm (v8.0.0 or higher) or yarn

## Getting Started

1. **Clone the repository**
```bash
git clone [your-repository-url]
cd fide-ian-code-frontend
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Set up environment variables**
Create a `.env.local` file with:
```
GOOGLE_API_KEY=your-google-api-key
```

4. **Run the development server**
```bash
npm run dev
# or
yarn dev
```

5. **Open the application**
Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `app/` - Next.js app router pages and layouts
- `components/` - Reusable UI components
- `public/` - Static assets
- `lib/` - Utility functions and shared logic

## API Endpoints

### Portfolio Endpoints
- `GET /api/contact` - Contact form submission
- `GET /api/portfolio` - Portfolio data

### Crypto Research Endpoints
- `POST /api/crypto-analysis` - Comprehensive crypto analysis
- `GET /api/test-news` - Latest crypto news

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- CoinGecko API for crypto market data
- News sources: CoinTelegraph, CryptoNews, and Decrypt
- Google Gemini Pro for AI capabilities
- shadcn/ui for beautiful UI components
