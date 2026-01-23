export type Side = 'buy' | 'sell';
export type OrderType = 'limit' | 'market';
export type OrderStatus = 'open' | 'filled' | 'canceled';

export interface PricePoint {
    timeLabel: string;
    price: number;
}

export interface CandleData {
    time: string | number;
    open: number;
    high: number;
    low: number;
    close: number;
    volume?: number;
}

export interface OrderBookRow {
    price: number;
    size: number;
    total: number;
    side: Side;
}

export interface TradeRow {
    id: string;
    time: string;
    price: number;
    amount: number;
    side: Side;
}

export interface OrderRow {
    id: string;
    symbol: string;
    type: OrderType;
    side: Side;
    price: number | null; // null for market orders
    amount: number;
    filled: number;
    status: OrderStatus;
    timestamp: string;
}

export interface MarketStats {
    symbol: string;
    lastPrice: number;
    change24h: number;
    high24h: number;
    low24h: number;
    volume24h: number;
}
