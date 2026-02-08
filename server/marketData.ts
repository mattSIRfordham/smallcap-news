/**
 * Market Data Service for Real-Time Bid-Ask Spreads
 * Uses Yahoo Finance API for live market data
 */

interface QuoteData {
  ticker: string;
  companyName: string;
  bid: number;
  ask: number;
  spread: number;
  spreadPercent: number;
  lastPrice: number;
  volume: number;
  marketCap: number;
  timestamp: Date;
}

/**
 * Fetch real-time quote data from Yahoo Finance
 */
export async function fetchRealTimeQuote(ticker: string): Promise<QuoteData | null> {
  try {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${ticker}?interval=1m&range=1d`;
    const response = await fetch(url);
    
    if (!response.ok) {
      console.error(`Failed to fetch quote for ${ticker}: ${response.status}`);
      return null;
    }

    const data = await response.json();
    const result = data.chart?.result?.[0];
    
    if (!result) {
      return null;
    }

    const meta = result.meta;
    const bid = meta.bid || meta.regularMarketPrice * 0.999; // Fallback if bid not available
    const ask = meta.ask || meta.regularMarketPrice * 1.001; // Fallback if ask not available
    const spread = ask - bid;
    const spreadPercent = (spread / bid) * 100;

    return {
      ticker: ticker.toUpperCase(),
      companyName: meta.longName || meta.shortName || ticker,
      bid,
      ask,
      spread,
      spreadPercent,
      lastPrice: meta.regularMarketPrice,
      volume: meta.regularMarketVolume || 0,
      marketCap: meta.marketCap || 0,
      timestamp: new Date(meta.regularMarketTime * 1000),
    };
  } catch (error) {
    console.error(`Error fetching quote for ${ticker}:`, error);
    return null;
  }
}

/**
 * Fetch quotes for multiple tickers
 */
export async function fetchMultipleQuotes(tickers: string[]): Promise<QuoteData[]> {
  const promises = tickers.map(ticker => fetchRealTimeQuote(ticker));
  const results = await Promise.all(promises);
  return results.filter((quote): quote is QuoteData => quote !== null);
}

/**
 * Calculate spread statistics for a list of quotes
 */
export function calculateSpreadStats(quotes: QuoteData[]) {
  if (quotes.length === 0) {
    return {
      avgSpread: 0,
      avgSpreadPercent: 0,
      minSpread: 0,
      maxSpread: 0,
      totalVolume: 0,
    };
  }

  const spreads = quotes.map(q => q.spread);
  const spreadPercents = quotes.map(q => q.spreadPercent);
  const volumes = quotes.map(q => q.volume);

  return {
    avgSpread: spreads.reduce((a, b) => a + b, 0) / spreads.length,
    avgSpreadPercent: spreadPercents.reduce((a, b) => a + b, 0) / spreadPercents.length,
    minSpread: Math.min(...spreads),
    maxSpread: Math.max(...spreads),
    totalVolume: volumes.reduce((a, b) => a + b, 0),
  };
}

/**
 * Get default watchlist of small-cap tickers for dashboard
 */
export function getDefaultWatchlist(): string[] {
  return [
    "AAPL", // Example tickers - replace with actual small-cap stocks
    "MSFT",
    "GOOGL",
    "TSLA",
    "NVDA",
  ];
}
