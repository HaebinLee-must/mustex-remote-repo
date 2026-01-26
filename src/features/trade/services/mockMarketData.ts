import { MarketApi } from './marketApi';
import { PricePoint, CandleData, OrderBookRow, TradeRow, OrderRow, MarketStats } from '../types/market';

export const mockMarketData: MarketApi = {
    submitOrder: async (order) => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));

        return {
            id: Math.random().toString(36).substr(2, 9),
            symbol: order.symbol,
            type: order.type,
            side: order.side,
            price: order.price,
            amount: order.amount,
            filled: 0,
            status: 'open',
            timestamp: new Date().toISOString().replace('T', ' ').substr(0, 19)
        };
    },

    fetchPriceHistory: async (symbol) => {
        const points: PricePoint[] = [];
        let basePrice = symbol === 'BTC/USDT' ? 42000 : 2500;
        const now = new Date();

        for (let i = 60; i >= 0; i--) {
            const time = new Date(now.getTime() - i * 60000);
            basePrice += (Math.random() - 0.5) * 100;
            points.push({
                timeLabel: `${time.getHours()}:${time.getMinutes().toString().padStart(2, '0')}`,
                price: parseFloat(basePrice.toFixed(2))
            });
        }
        return points;
    },

    fetchCandles: async (symbol) => {
        const candles: CandleData[] = [];
        let basePrice = symbol === 'BTC/USDT' ? 42000 : 2500;
        const now = new Date();
        now.setSeconds(0, 0);

        for (let i = 100; i >= 0; i--) {
            const time = new Date(now.getTime() - i * 60000);
            const open = basePrice;
            const close = basePrice + (Math.random() - 0.5) * 50;
            const high = Math.max(open, close) + Math.random() * 20;
            const low = Math.min(open, close) - Math.random() * 20;

            candles.push({
                time: time.getTime() / 1000,
                open: parseFloat(open.toFixed(2)),
                high: parseFloat(high.toFixed(2)),
                low: parseFloat(low.toFixed(2)),
                close: parseFloat(close.toFixed(2)),
                volume: Math.floor(Math.random() * 100)
            });
            basePrice = close;
        }
        return candles;
    },

    fetchOrderBook: async (symbol) => {
        const midPrice = symbol === 'BTC/USDT' ? 42500 : 2550;
        const asks: OrderBookRow[] = [];
        const bids: OrderBookRow[] = [];

        for (let i = 0; i < 15; i++) {
            const askPrice = midPrice + (i + 1) * 2.5;
            const bidPrice = midPrice - (i + 1) * 2.5;

            asks.push({
                price: parseFloat(askPrice.toFixed(2)),
                size: parseFloat((Math.random() * 2).toFixed(4)),
                total: 0, // Calculated later
                side: 'sell'
            });

            bids.push({
                price: parseFloat(bidPrice.toFixed(2)),
                size: parseFloat((Math.random() * 2).toFixed(4)),
                total: 0,
                side: 'buy'
            });
        }

        // Calculate totals
        let askSum = 0;
        asks.forEach(a => {
            askSum += a.size;
            a.total = parseFloat(askSum.toFixed(4));
        });

        let bidSum = 0;
        bids.forEach(b => {
            bidSum += b.size;
            b.total = parseFloat(bidSum.toFixed(4));
        });

        return { asks, bids };
    },

    fetchRecentTrades: async (symbol) => {
        const trades: TradeRow[] = [];
        const midPrice = symbol === 'BTC/USDT' ? 42500 : 2550;
        const now = new Date();

        for (let i = 0; i < 20; i++) {
            const time = new Date(now.getTime() - i * 5000);
            trades.push({
                id: Math.random().toString(36).substr(2, 9),
                time: `${time.getHours()}:${time.getMinutes().toString().padStart(2, '0')}:${time.getSeconds().toString().padStart(2, '0')}`,
                price: parseFloat((midPrice + (Math.random() - 0.5) * 10).toFixed(2)),
                amount: parseFloat((Math.random() * 1.5).toFixed(4)),
                side: Math.random() > 0.5 ? 'buy' : 'sell'
            });
        }
        return trades;
    },

    fetchOpenOrders: async (symbol) => {
        return [
            {
                id: '1',
                symbol,
                type: 'limit',
                side: 'buy',
                price: 42100.50,
                amount: 0.05,
                filled: 0,
                status: 'open',
                timestamp: '2026-01-22 15:30:00'
            },
            {
                id: '2',
                symbol,
                type: 'limit',
                side: 'sell',
                price: 43000.00,
                amount: 0.12,
                filled: 0.03,
                status: 'open',
                timestamp: '2026-01-22 15:45:00'
            }
        ];
    },

    fetchMarketStats: async (symbol) => {
        return {
            symbol,
            lastPrice: symbol === 'BTC/USDT' ? 42500.50 : 2550.20,
            change24h: 2.45,
            high24h: symbol === 'BTC/USDT' ? 43100 : 2600,
            low24h: symbol === 'BTC/USDT' ? 41800 : 2480,
            volume24h: symbol === 'BTC/USDT' ? 1250.45 : 8500.12
        };
    }
};
