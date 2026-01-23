import { PricePoint, CandleData, OrderBookRow, TradeRow, OrderRow, MarketStats } from '../types/market';

export interface MarketApi {
    fetchPriceHistory(symbol: string): Promise<PricePoint[]>;
    fetchCandles(symbol: string): Promise<CandleData[]>;
    fetchOrderBook(symbol: string): Promise<{ asks: OrderBookRow[], bids: OrderBookRow[] }>;
    fetchRecentTrades(symbol: string): Promise<TradeRow[]>;
    fetchOpenOrders(symbol: string): Promise<OrderRow[]>;
    fetchMarketStats(symbol: string): Promise<MarketStats>;
}
