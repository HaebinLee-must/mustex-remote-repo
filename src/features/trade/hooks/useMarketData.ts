import { useState, useEffect } from 'react';
import { mockMarketData } from '../services/mockMarketData';
import { CandleData, OrderBookRow, TradeRow, OrderRow, MarketStats } from '../types/market';

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

    return {
        candleData,
        orderBook,
        recentTrades,
        openOrders,
        marketStats,
        loading
    };
};
