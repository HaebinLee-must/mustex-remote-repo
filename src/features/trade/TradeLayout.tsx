import React, { useState, useEffect } from 'react';
import Card from '../shared/components/Card';
import MarketListPanel from './components/MarketListPanel';
import ChartPanel from './components/ChartPanel';
import OrderBookPanel from './components/OrderBookPanel';
import OrderPanel from './components/OrderPanel';
import RecentTradesPanel from './components/RecentTradesPanel';
import OpenOrdersPanel from './components/OpenOrdersPanel';
import SymbolInfoBar from './components/SymbolInfoBar';
import { useMarketData } from './hooks/useMarketData';

const TradeLayout: React.FC = () => {
    const [symbol, setSymbol] = useState('BTC/USDT');
    const {
        candleData,
        orderBook,
        recentTrades,
        openOrders,
        marketStats,
        loading,
        submitOrder
    } = useMarketData(symbol);
    const [favorites, setFavorites] = useState<string[]>(() => {
        const saved = localStorage.getItem('mustex_favorites');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('mustex_favorites', JSON.stringify(favorites));
    }, [favorites]);

    const toggleFavorite = (s: string) => {
        setFavorites(prev =>
            prev.includes(s) ? prev.filter(f => f !== s) : [...prev, s]
        );
    };

    return (
        <div className="bg-[#0B0E11] min-h-screen p-2 sm:p-4">
            <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-2 sm:gap-4">
                {/* Market List */}
                <div className="lg:col-span-3 h-[400px] lg:h-[800px]">
                    <Card title="Markets" className="h-full no-padding">
                        <MarketListPanel
                            selectedSymbol={symbol}
                            onSymbolSelect={setSymbol}
                            favorites={favorites}
                            onToggleFavorite={toggleFavorite}
                        />
                    </Card>
                </div>

                {/* Center Column: Chart & Orders */}
                <div className="lg:col-span-6 flex flex-col gap-2 sm:gap-4 min-h-0">
                    <div className="h-[400px] lg:h-[500px] min-h-[400px]">
                        <Card className="h-full no-padding overflow-hidden flex flex-col">
                            {marketStats && (
                                <SymbolInfoBar
                                    symbol={marketStats.symbol}
                                    baseAsset={marketStats.symbol.split('/')[0]}
                                    quoteAsset={marketStats.symbol.split('/')[1]}
                                    coinName={marketStats.symbol.split('/')[0] === 'BTC' ? 'Bitcoin' : 'Ethereum'}
                                    iconUrl={null}
                                    price={marketStats.lastPrice}
                                    pricePrecision={2}
                                    change24hPercent={marketStats.change24h}
                                    volume24hQuote={marketStats.volume24h}
                                    isFavorite={favorites.includes(symbol)}
                                    onToggleFavorite={() => toggleFavorite(symbol)}
                                />
                            )}
                            <div className="flex-1">
                                <ChartPanel data={candleData} loading={loading} />
                            </div>
                        </Card>
                    </div>
                    <div className="flex-1 min-h-[300px]">
                        <Card title="Order" className="h-full no-padding">
                            <OrderPanel
                                symbol={symbol}
                                marketStats={marketStats}
                                onSubmit={submitOrder}
                            />
                        </Card>
                    </div>
                </div>

                {/* Right Column: Order Book & Recent Trades */}
                <div className="lg:col-span-3 flex flex-col gap-2 sm:gap-4 h-auto lg:h-[800px]">
                    <div className="h-[400px] lg:h-[500px]">
                        <Card title="Order Book" className="h-full no-padding">
                            <OrderBookPanel asks={orderBook.asks} bids={orderBook.bids} loading={loading} />
                        </Card>
                    </div>
                    <div className="flex-1 min-h-[300px]">
                        <Card title="Recent Trades" className="h-full no-padding">
                            <RecentTradesPanel trades={recentTrades} loading={loading} />
                        </Card>
                    </div>
                </div>

                {/* Bottom: Open Orders */}
                <div className="lg:col-span-12 h-[350px]">
                    <Card title="Open Orders" className="h-full no-padding">
                        <OpenOrdersPanel orders={openOrders} loading={loading} onCancel={(id) => console.log('Cancel', id)} />
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default TradeLayout;
