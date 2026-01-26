import { PricePoint, CandleData, OrderBookRow, TradeRow, OrderRow, MarketStats, Side, OrderType } from '../types/market';

export interface MarketApi {
    submitOrder(order: {
        symbol: string;
        side: Side;
        type: OrderType;
        price: number | null;
        amount: number;
    }): Promise<OrderRow>;
    fetchPriceHistory(symbol: string): Promise<PricePoint[]>;
    fetchCandles(symbol: string): Promise<CandleData[]>;
    fetchOrderBook(symbol: string): Promise<{ asks: OrderBookRow[], bids: OrderBookRow[] }>;
    fetchRecentTrades(symbol: string): Promise<TradeRow[]>;
    fetchOpenOrders(symbol: string): Promise<OrderRow[]>;
    fetchMarketStats(symbol: string): Promise<MarketStats>;
}
