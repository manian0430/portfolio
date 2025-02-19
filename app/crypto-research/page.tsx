"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  LineChart, 
  TrendingUp, 
  Newspaper, 
  AlertTriangle,
  Search,
  RefreshCw,
  Download,
  ChevronDown,
  Bot
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import GradientBackground from "@/components/GradientBackground"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface NewsItem {
  title: string;
  url: string;
  source: string;
  published_on: number;
  description: string;
}

interface AnalysisResult {
  coin: string;
  timestamp: string;
  marketData: {
    price: number;
    change24h: number;
    marketCap: number;
    lastUpdated: number;
  };
  newsData: NewsItem[];
  marketAnalysis?: {
    summary: string;
    priceAction: string;
    volume: string;
    marketSentiment: string;
    price: string;
    marketCap: string;
    change24h: string;
  };
  pricePrediction?: {
    shortTerm: string;
    mediumTerm: string;
    longTerm: string;
    keyFactors: string;
    confidenceLevel: string;
  };
  newsAnalysis?: {
    latestNews: string[];
    sentiment: string;
    regulations: string;
  };
  riskAssessment?: {
    riskLevel: string;
    volatility: string;
    keyMetrics: string[];
  };
}

const crews = [
  {
    name: "Market Analyst",
    icon: <LineChart className="w-5 h-5" />,
    description: "Analyzes price trends and market sentiment",
    color: "from-green-500 to-emerald-700"
  },
  {
    name: "Price Predictor",
    icon: <TrendingUp className="w-5 h-5" />,
    description: "Predicts short, medium, and long-term price movements",
    color: "from-blue-500 to-indigo-700"
  },
  {
    name: "News Researcher",
    icon: <Newspaper className="w-5 h-5" />,
    description: "Monitors crypto news and social sentiment",
    color: "from-purple-500 to-violet-700"
  },
  {
    name: "Risk Assessor",
    icon: <AlertTriangle className="w-5 h-5" />,
    description: "Evaluates market risks and metrics",
    color: "from-red-500 to-rose-700"
  }
];

// Popular cryptocurrencies for quick selection
const popularCoins = [
  { symbol: "BTC", name: "Bitcoin" },
  { symbol: "ETH", name: "Ethereum" },
  { symbol: "BNB", name: "Binance Coin" },
  { symbol: "SOL", name: "Solana" },
  { symbol: "XRP", name: "Ripple" },
  { symbol: "ADA", name: "Cardano" }
];

export default function CryptoResearch() {
  const [query, setQuery] = useState("")
  const [selectedCoin, setSelectedCoin] = useState<string>("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [results, setResults] = useState<AnalysisResult | null>(null)

  const handleCoinSelect = (coin: string) => {
    setSelectedCoin(coin);
    setQuery(`Analyze ${coin}'s current market position`);
  };

  const handleAnalysis = async () => {
    if (!query.trim()) return;
    
    setIsAnalyzing(true);
    // Extract coin name from query or use selected coin
    const coinToAnalyze = selectedCoin || query.split(' ')[1] || 'Bitcoin';
    
    try {
      const response = await fetch('/api/crypto-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ coin: coinToAnalyze }),
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const results = await response.json();
      setResults(results);
    } catch (error) {
      console.error('Analysis error:', error);
      // Handle error state here
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-4 relative">
      <GradientBackground />
      
      <div className="z-10 w-full max-w-6xl mx-auto pt-20 pb-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Crypto Research Assistant</h1>
          <p className="text-white/70">Powered by AI Crew Analysis</p>
        </div>

        {/* Search Section */}
        <Card className="bg-black/40 backdrop-blur-sm border-white/10 mb-4">
          <CardContent className="p-4">
            <div className="flex flex-col gap-4">
              {/* Popular Coins */}
              <div className="flex flex-wrap gap-2">
                {popularCoins.map((coin) => (
                  <Button
                    key={coin.symbol}
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCoinSelect(coin.name)}
                    className={cn(
                      "text-white/70 hover:text-white border border-white/10 hover:border-white/20",
                      selectedCoin === coin.name && "bg-white/10 text-white"
                    )}
                  >
                    {coin.symbol}
                  </Button>
                ))}
              </div>
              
              <div className="flex gap-4">
                <Input
                  placeholder="Enter your crypto research query... (e.g., Analyze Ethereum's current position)"
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAnalysis()}
                />
                <Button
                  onClick={handleAnalysis}
                  disabled={!query.trim() || isAnalyzing}
                  className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white"
                >
                  {isAnalyzing ? (
                    <RefreshCw className="w-4 h-4 animate-spin mr-2" />
                  ) : (
                    <Search className="w-4 h-4 mr-2" />
                  )}
                  Analyze
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Crew Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {crews.map((crew) => (
            <Card 
              key={crew.name}
              className="bg-black/40 backdrop-blur-sm border-white/10 hover:bg-black/50 transition-all duration-300 group"
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${crew.color} group-hover:scale-110 transition-transform duration-300`}>
                    {crew.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-white">{crew.name}</h3>
                    <p className="text-sm text-white/60">{crew.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Analysis Results */}
        <AnimatePresence>
          {results && (
            <>
              <div className="mb-4 text-center">
                <p className="text-white/60 text-sm">
                  Analysis performed at: {new Date(results.timestamp).toLocaleString()}
                </p>
                <p className="text-white/60 text-sm">
                  Market data as of: {new Date(results.marketData.lastUpdated * 1000).toLocaleString()}
                </p>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {/* Market Analysis */}
                <Card className="bg-black/40 backdrop-blur-sm border-white/10">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <LineChart className="w-5 h-5 text-green-400" />
                        <h3 className="font-medium text-white">Market Analysis</h3>
                      </div>
                      <Badge variant="gradient-subtle">{results.marketAnalysis?.marketSentiment}</Badge>
                    </div>
                    <div className="space-y-2 text-white/80">
                      <p>{results.marketAnalysis?.summary}</p>
                      <div className="grid grid-cols-2 gap-2 mt-4">
                        <div>
                          <p className="text-white/60 text-sm">Current Price</p>
                          <p className="font-medium">${results.marketData.price.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-white/60 text-sm">24h Change</p>
                          <p className={cn(
                            "font-medium",
                            results.marketData.change24h >= 0 ? "text-green-400" : "text-red-400"
                          )}>
                            {results.marketData.change24h.toFixed(2)}%
                          </p>
                        </div>
                        <div>
                          <p className="text-white/60 text-sm">Volume</p>
                          <p className="font-medium">{results.marketAnalysis?.volume}</p>
                        </div>
                        <div>
                          <p className="text-white/60 text-sm">Market Cap</p>
                          <p className="font-medium">${(results.marketData.marketCap / 1e9).toFixed(2)}B</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Price Prediction */}
                <Card className="bg-black/40 backdrop-blur-sm border-white/10">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <TrendingUp className="w-5 h-5 text-blue-400" />
                      <h3 className="font-medium text-white">Price Prediction</h3>
                      <Badge variant="gradient-subtle" className="ml-auto">
                        {results.pricePrediction?.confidenceLevel}
                      </Badge>
                    </div>
                    <div className="space-y-4 text-white/80">
                      <div>
                        <p className="text-white/60 text-sm mb-1">Short Term (24h)</p>
                        <p>{results.pricePrediction?.shortTerm}</p>
                      </div>
                      <div>
                        <p className="text-white/60 text-sm mb-1">Medium Term (1 week)</p>
                        <p>{results.pricePrediction?.mediumTerm}</p>
                      </div>
                      <div>
                        <p className="text-white/60 text-sm mb-1">Long Term (1 month)</p>
                        <p>{results.pricePrediction?.longTerm}</p>
                      </div>
                      <div>
                        <p className="text-white/60 text-sm mb-1">Key Factors</p>
                        <p>{results.pricePrediction?.keyFactors}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* News Analysis */}
                <Card className="bg-black/40 backdrop-blur-sm border-white/10">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Newspaper className="w-5 h-5 text-purple-400" />
                        <h3 className="font-medium text-white">News Analysis</h3>
                      </div>
                      <Badge variant="gradient-subtle">
                        {results.newsAnalysis?.sentiment}
                      </Badge>
                    </div>
                    <div className="space-y-4">
                      {/* Real-time News */}
                      <div className="space-y-2">
                        {results.newsData.map((news, index) => (
                          <a
                            key={index}
                            href={news.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block p-2 rounded-lg hover:bg-white/5 transition-colors"
                          >
                            <div className="flex justify-between items-start gap-2">
                              <div className="flex-1">
                                <p className="text-white/80 text-sm mb-1">{news.title}</p>
                                <p className="text-white/60 text-xs line-clamp-2">{news.description}</p>
                              </div>
                              <div className="flex flex-col items-end">
                                <span className="text-white/40 text-xs">{news.source}</span>
                                <span className="text-white/40 text-xs">
                                  {new Date(news.published_on * 1000).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </a>
                        ))}
                      </div>
                      
                      {/* AI Analysis */}
                      <div className="border-t border-white/10 pt-4 mt-4">
                        <p className="text-white/60 text-sm mb-2">Analysis</p>
                        <p className="text-white/80 mb-2">{results.newsAnalysis?.sentiment}</p>
                        <div className="mt-4">
                          <p className="text-white/60 text-sm mb-2">Regulatory Impact</p>
                          <p className="text-white/80">{results.newsAnalysis?.regulations}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Risk Assessment */}
                <Card className="bg-black/40 backdrop-blur-sm border-white/10">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-red-400" />
                        <h3 className="font-medium text-white">Risk Assessment</h3>
                      </div>
                      <Badge 
                        variant="gradient-subtle" 
                        className="bg-red-500/20"
                      >
                        {results.riskAssessment?.riskLevel}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <p className="text-white/80">{results.riskAssessment?.volatility}</p>
                      <ul className="list-disc list-inside space-y-1">
                        {results.riskAssessment?.keyMetrics.map((metric, index) => (
                          <li key={index} className="text-white/70">{metric}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
} 