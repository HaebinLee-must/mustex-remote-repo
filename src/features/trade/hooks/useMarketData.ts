import { useState, useEffect, useCallback } from 'react';
import { mockMarketData } from '../services/mockMarketData';
import { CandleData, OrderBookRow, TradeRow, OrderRow, MarketStats, Side, OrderType } from '../types/market';

export const useMarketData = (symbol: string) => {
    const [candleData, setCandleData] = useState<CandleData[]>([]);
    const [orderBook, setOrderBook] = useState<{ asks: OrderBookRow[], bids: OrderBookRow[] }>({ asks: [], bids: [] });
    const [recentTrades, setRecentTrades] = useState<TradeRow[]>([]);
    const [openOrders, setOpenOrders] = useState<OrderRow[]>([]);
    const [marketStats, setMarketStats] = useState<MarketStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                setLoading(true);
                const [candles, book, trades, orders, stats] = await Promise.all([
                    mockMarketData.fetchCandles(symbol),
                    mockMarketData.fetchOrderBook(symbol),
                    mockMarketData.fetchRecentTrades(symbol),
                    mockMarketData.fetchOpenOrders(symbol),
                    mockMarketData.fetchMarketStats(symbol)
                ]);

                setCandleData(candles);
                setOrderBook(book);
                setRecentTrades(trades);
                setOpenOrders(orders);
                setMarketStats(stats);
            } catch (error) {
                console.error('Failed to load market data', error);
            } finally {
                setLoading(false);
            }
        };

        loadInitialData();

        // Real-time Simulation with Randomized Jitter for natural feel
        let timeoutId: NodeJS.Timeout;

        const updateData = async () => {
            try {
                const [book, trades, stats] = await Promise.all([
                    mockMarketData.fetchOrderBook(symbol),
                    mockMarketData.fetchRecentTrades(symbol),
                    mockMarketData.fetchMarketStats(symbol)
                ]);
                setOrderBook(book);
                setRecentTrades(trades);
                setMarketStats(stats);

                setCandleData(prev => {
                    if (prev.length === 0) return prev;
                    const lastCandle = { ...prev[prev.length - 1] };
                    const newPrice = stats.lastPrice;
                    lastCandle.close = newPrice;
                    lastCandle.high = Math.max(lastCandle.high, newPrice);
                    lastCandle.low = Math.min(lastCandle.low, newPrice);
                    return [...prev.slice(0, -1), lastCandle];
                });

                // Random interval between 500ms and 2500ms
                const nextTick = Math.random() * 2000 + 500;
                timeoutId = setTimeout(updateData, nextTick);
            } catch (error) {
                console.error('Failed to update market data', error);
                timeoutId = setTimeout(updateData, 3000);
            }
        };

        timeoutId = setTimeout(updateData, 1000);

        return () => clearTimeout(timeoutId);
    }, [symbol]);

    const submitOrder = useCallback(async (order: {
        side: Side;
        type: OrderType;
        price: number | null;
        amount: number;
    }) => {
        try {
            const newOrder = await mockMarketData.submitOrder({
                symbol,
                ...order
            });
            setOpenOrders(prev => [newOrder, ...prev]);
            return newOrder;
        } catch (error) {
            console.error('Failed to submit order', error);
            throw error;
        }
    }, [symbol]);

    return {
        candleData,
        orderBook,
        recentTrades,
        openOrders,
        marketStats,
        loading,
        submitOrder
    };
};
