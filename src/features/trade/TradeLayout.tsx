import React, { useState, useEffect } from 'react';
import Card from '../shared/components/Card';
import MarketListPanel from './components/MarketListPanel';
import ChartPanel from './components/ChartPanel';
import OrderBookPanel from './components/OrderBookPanel';
import OrderPanel from './components/OrderPanel';
import RecentTradesPanel from './components/RecentTradesPanel';
import OpenOrdersPanel from './components/OpenOrdersPanel';
import SymbolInfoBar from './components/SymbolInfoBar';
import AssetTable from '../wallet/components/AssetTable';
import { useWallet } from '../wallet/hooks/useWallet';
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
    const { openDeposit, openWithdraw } = useWallet();

    const handleAssetClick = (symbol: string) => {
        setSymbol(symbol); // Assuming this changes the displayed asset
    };

    const [favorites, setFavorites] = useState<string[]>(() => {
        const saved = localStorage.getItem('finora_favorites');
        return saved ? JSON.parse(saved) : [];
    });

    // Lifted price state for OrderPanel
    const [orderPrice, setOrderPrice] = useState<number | ''>('');
    const [mainTab, setMainTab] = useState<'chart' | 'info' | 'square'>('chart');
    const [bottomTab, setBottomTab] = useState<'open_orders' | 'order_history' | 'funds' | 'bots'>('open_orders');

    useEffect(() => {
        localStorage.setItem('finora_favorites', JSON.stringify(favorites));
    }, [favorites]);

    // Initialize order price with market price
    useEffect(() => {
        if (marketStats?.lastPrice && orderPrice === '') {
            setOrderPrice(marketStats.lastPrice);
        }
    }, [marketStats?.lastPrice]);

    const toggleFavorite = (s: string) => {
        setFavorites(prev =>
            prev.includes(s) ? prev.filter(f => f !== s) : [...prev, s]
        );
    };

    return (
        <div className="bg-[#000000] min-h-screen p-1 sm:p-2 font-sans text-[#EAECEF]">
            {/* Phase 2: Information Intensive Header (Ticker) */}
            <div className="mb-2">
                {marketStats && (
                    <SymbolInfoBar
                        symbol={marketStats.symbol}
                        baseAsset={marketStats.symbol.split('/')[0]}
                        quoteAsset={marketStats.symbol.split('/')[1]}
                        coinName={marketStats.symbol.split('/')[0]}
                        iconUrl={marketStats.icon || null}
                        price={marketStats.lastPrice}
                        pricePrecision={2}
                        change24hPercent={marketStats.change24h}
                        high24h={marketStats.high24h}
                        low24h={marketStats.low24h}
                        volume24hQuote={marketStats.volume24h}
                        isFavorite={favorites.includes(symbol)}
                        onToggleFavorite={() => toggleFavorite(symbol)}
                    />
                )}
            </div>

            <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-1 sm:gap-2">
                {/* Left Column: Order Book (Full Height - Phase 1) */}
                <div className="lg:col-span-3 h-[800px]">
                    <Card title="Order Book" className="h-full no-padding" variant="flat">
                        <OrderBookPanel
                            asks={orderBook.asks}
                            bids={orderBook.bids}
                            loading={loading}
                            onPriceSelect={setOrderPrice}
                        />
                    </Card>
                </div>

                {/* Center Column: Chart & Trade Area */}
                <div className="lg:col-span-6 flex flex-col gap-1 sm:gap-2 min-h-0">
                    <div className="flex-1 min-h-[500px]">
                        <Card className="h-full no-padding overflow-hidden flex flex-col" variant="flat">
                            {/* Phase 3: Main Tabs (Chart / Info / Square) */}
                            <div className="flex items-center gap-6 px-4 py-2 border-b border-dark-border bg-dark-main">
                                {['chart', 'info', 'square'].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setMainTab(tab as any)}
                                        className={`relative py-1 text-sm font-bold transition-colors uppercase tracking-wider ${mainTab === tab ? 'text-primary' : 'text-dark-muted hover:text-white'}`}
                                    >
                                        {tab}
                                        {mainTab === tab && <div className="absolute -bottom-[9px] left-0 right-0 h-0.5 bg-primary rounded-full shadow-[0_0_8px_#7B61FF]" />}
                                    </button>
                                ))}
                            </div>

                            <div className="flex-1">
                                {mainTab === 'chart' && <ChartPanel data={candleData} loading={loading} />}
                                {mainTab === 'info' && (
                                    <div className="p-6 text-dark-muted">
                                        <h3 className="text-white font-bold mb-4">Project Information</h3>
                                        <p className="text-sm leading-relaxed">Fundamental analysis data for {symbol}...</p>
                                    </div>
                                )}
                                {mainTab === 'square' && (
                                    <div className="p-6 text-dark-muted">
                                        <h3 className="text-white font-bold mb-4">Finora Square</h3>
                                        <p className="text-sm leading-relaxed">Real-time social feed and news for {symbol}...</p>
                                    </div>
                                )}
                            </div>
                        </Card>
                    </div>

                    {/* Trade Panel (Phase 1: Dual Column) */}
                    <div className="h-auto">
                        <Card className="no-padding" variant="flat">
                            <OrderPanel
                                symbol={symbol}
                                marketStats={marketStats}
                                onSubmit={submitOrder}
                                price={orderPrice}
                                onPriceChange={setOrderPrice}
                            />
                        </Card>
                    </div>
                </div>

                {/* Right Column: Market List & Market Trades */}
                <div className="lg:col-span-3 flex flex-col gap-1 sm:gap-2 h-[800px]">
                    <div className="flex-1 min-h-[400px]">
                        <Card title="Markets" className="h-full no-padding" variant="flat">
                            <MarketListPanel
                                selectedSymbol={symbol}
                                onSymbolSelect={setSymbol}
                                favorites={favorites}
                                onToggleFavorite={toggleFavorite}
                            />
                        </Card>
                    </div>
                    <div className="flex-1 min-h-[350px]">
                        <Card title="Market Trades" className="h-full no-padding" variant="flat">
                            <RecentTradesPanel trades={recentTrades} loading={loading} />
                        </Card>
                    </div>
                </div>

                {/* Bottom: User Assets & History */}
                <div className="lg:col-span-12 h-[350px]">
                    <Card className="h-full no-padding flex flex-col" variant="flat">
                        {/* Custom Tab Header */}
                        <div className="flex items-center gap-6 px-6 py-3 border-b border-dark-border">
                            {['open_orders', 'order_history', 'funds', 'bots'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setBottomTab(tab as any)}
                                    className={`relative pb-2 text-sm font-bold transition-colors ${bottomTab === tab ? 'text-primary' : 'text-dark-muted hover:text-white'
                                        }`}
                                >
                                    {tab.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                                    {tab === 'open_orders' && openOrders.length > 0 && <span className="ml-2 text-[10px] bg-dark-surface px-1.5 py-0.5 rounded-full text-text">{openOrders.length}</span>}
                                    {bottomTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full transition-all" />}
                                </button>
                            ))}
                        </div>

                        {/* Tab Content */}
                        <div className="flex-1 overflow-hidden relative">
                            {bottomTab === 'open_orders' && (
                                <OpenOrdersPanel orders={openOrders} loading={loading} onCancel={(id) => console.log('Cancel', id)} />
                            )}
                            {bottomTab === 'order_history' && (
                                <div className="w-full h-full flex flex-col items-center justify-center text-dark-muted">
                                    <div className="w-16 h-16 rounded-full bg-dark-surface flex items-center justify-center mb-4">
                                        <span className="text-2xl">🕒</span>
                                    </div>
                                    <p className="text-sm font-bold">No order history available</p>
                                </div>
                            )}
                            {bottomTab === 'funds' && (
                                <div className="overflow-auto h-full">
                                    <div className="p-4">
                                        <AssetTable onDeposit={openDeposit} onWithdraw={openWithdraw} onAssetClick={handleAssetClick} />
                                    </div>
                                </div>
                            )}
                            {bottomTab === 'bots' && (
                                <div className="w-full h-full flex flex-col items-center justify-center text-dark-muted">
                                    <div className="w-16 h-16 rounded-full bg-dark-surface flex items-center justify-center mb-4">
                                        <span className="text-2xl">🤖</span>
                                    </div>
                                    <p className="text-sm font-bold">No trading bots active</p>
                                </div>
                            )}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default TradeLayout;