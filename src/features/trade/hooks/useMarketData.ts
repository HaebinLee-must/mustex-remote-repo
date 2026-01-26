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
