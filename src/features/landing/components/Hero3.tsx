import React, { useState, useEffect } from 'react';
import { useUI } from '@/features/shared/UIContext';
import { TrendingUp } from 'lucide-react';
import WaveBackground from './WaveBackground';
import { mockMarketData } from '@/features/trade/services/mockMarketData';
import { MarketStats } from '@/features/trade/types/market';

const Hero3: React.FC = () => {
    const { t } = useUI();
    const [btcStats, setBtcStats] = useState<MarketStats | null>(null);
    const [ethStats, setEthStats] = useState<MarketStats | null>(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [btc, eth] = await Promise.all([
                    mockMarketData.fetchMarketStats('BTC/USDT'),
                    mockMarketData.fetchMarketStats('ETH/USDT')
                ]);
                setBtcStats(btc);
                setEthStats(eth);
            } catch (err) {
                console.error('Failed to fetch hero stats', err);
            }
        };
        fetchStats();
        const interval = setInterval(fetchStats, 10000);
        return () => clearInterval(interval);
    }, []);

    const renderTitle = () => {
        const title = t('heroTitle');

        // Always prioritize Trade Global Assets / Future of Finance 2-line structure
        return (
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.1] font-display text-left">
                Trade Global Assets <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5b42f3] via-[#7b6fe6] to-[#3366ff]">
                    Future of Finance
                </span>
            </h1>
        );
    };

    return (
        <section id="hero-v3" className="relative overflow-hidden bg-[#0B0E11] font-sans min-h-screen flex items-center">
            {/* Three.js Wave Background - Lowest Z-index - Adjusted to prevent clipping */}
            <div className="absolute inset-x-0 bottom-0 top-0 z-0 opacity-80">
                <div className="absolute inset-0 h-full w-full">
                    <WaveBackground />
                </div>
            </div>

            {/* Subtle Overlay to ensure content readability - Mid Z-index */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0B0E11]/40 via-transparent to-[#0B0E11]/80 z-[1] pointer-events-none" />

            {/* Main Content - Highest Z-index */}
            <div className="relative mx-auto w-full max-w-[1600px] px-8 sm:px-12 lg:px-20 py-12 md:py-24 z-10 pointer-events-none">
                <div className="grid lg:grid-cols-2 gap-20 items-center pointer-events-auto">
                    {/* Left Content */}
                    <div className="space-y-8 animate-in fade-in slide-in-from-left duration-700">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-xs font-semibold text-primary mb-2 animate-pulse">
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
                            </span>
                            Professional Standard
                        </div>

                        {renderTitle()}

                        <p className="text-lg md:text-xl text-gray-400 max-w-xl leading-relaxed font-medium text-left">
                            {t('heroSub')}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-start">
                            <button className="bg-[#5b42f3] text-white hover:bg-[#4a32d3] focus:ring-2 focus:ring-primary focus:ring-offset-2 inline-flex items-center justify-center rounded-xl px-8 py-3.5 text-base font-bold transition-all duration-300 active:scale-95 w-full sm:w-auto">
                                {t('tradeNow')}
                            </button>
                            <button className="bg-white/5 text-white hover:bg-white/10 border border-white/10 backdrop-blur-md inline-flex items-center justify-center rounded-xl px-8 py-3.5 text-base font-bold transition-all duration-300 active:scale-95 w-full sm:w-auto">
                                View Markets
                            </button>
                        </div>
                    </div>

                    {/* Right Visual Element */}
                    <div className="relative animate-in fade-in zoom-in duration-1000 delay-200">
                        <div className="relative">
                            <div className="relative w-full max-w-xl mx-auto flex items-center justify-center">
                                {/* Main Chart Card - overflow-visible to prevent clipping of floating cards */}
                                <div className="relative z-10 w-full bg-[#1e1a41]/60 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 shadow-2xl">
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                                                <TrendingUp size={20} />
                                            </div>
                                            <div>
                                                <div className="text-white font-bold text-lg">Market Overview</div>
                                                <div className="text-slate-400 text-xs">Real-time Trading Pairs</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Market List Implementation */}
                                    <div className="space-y-4 mb-8">
                                        {[
                                            { symbol: 'BTC', name: 'Bitcoin', stats: btcStats, color: 'bg-orange-500' },
                                            { symbol: 'ETH', name: 'Ethereum', stats: ethStats, color: 'bg-blue-500' },
                                            { symbol: 'BNB', name: 'BNB', stats: { lastPrice: 312.45, change24h: 1.25 }, color: 'bg-yellow-500' }
                                        ].map((market) => (
                                            <div key={market.symbol} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group">
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-10 h-10 rounded-full ${market.color} flex items-center justify-center text-white font-bold text-xs`}>
                                                        {market.symbol[0]}
                                                    </div>
                                                    <div>
                                                        <div className="text-white font-bold">{market.symbol}/USDT</div>
                                                        <div className="text-slate-500 text-xs">{market.name}</div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-white font-bold tabular-nums">
                                                        ${Number(market.stats?.lastPrice || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                                    </div>
                                                    <div className={`text-xs font-bold ${Number(market.stats?.change24h || 0) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                                        {Number(market.stats?.change24h || 0) >= 0 ? '+' : ''}{market.stats?.change24h.toFixed(2)}%
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Mock Chart Area */}
                                    <div className="h-[120px] w-full relative mb-4 opacity-50">
                                        <svg viewBox="0 0 400 150" className="w-full h-full">
                                            <path
                                                d="M0,120 Q50,110 80,130 T150,100 T220,110 T300,70 T400,80"
                                                fill="transparent"
                                                stroke="#5b42f3"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                    </div>

                                    {/* Floating BTC Stats - Top Right - Higher Z-index and relative to section to avoid clipping */}
                                    {btcStats && (
                                        <div className="absolute -top-8 -right-8 p-5 rounded-2xl bg-[#1e1a41]/90 backdrop-blur-xl border border-white/20 flex items-center gap-4 animate-float shadow-[0_20px_50px_rgba(0,0,0,0.6)] z-30 pointer-events-auto">
                                            <div className="w-12 h-12 rounded-full bg-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.4)] flex items-center justify-center text-white font-bold text-sm">BTC</div>
                                            <div>
                                                <div className="text-white text-lg font-bold tabular-nums">
                                                    ${Number(btcStats.lastPrice).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                                                </div>
                                                <div className={`text-xs font-bold flex items-center gap-1 ${btcStats.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                                    {btcStats.change24h >= 0 ? '▲' : '▼'} {Math.abs(btcStats.change24h).toFixed(2)}%
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Floating ETH Stats - Bottom Left - Higher Z-index */}
                                    {ethStats && (
                                        <div className="absolute -bottom-8 -left-8 p-5 rounded-2xl bg-[#1e1a41]/90 backdrop-blur-xl border border-white/20 flex items-center gap-4 animate-float shadow-[0_20px_50px_rgba(0,0,0,0.6)] z-30 pointer-events-auto" style={{ animationDelay: '1.5s' }}>
                                            <div className="w-12 h-12 rounded-full bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.4)] flex items-center justify-center text-white font-bold text-sm">ETH</div>
                                            <div>
                                                <div className="text-white text-lg font-bold tabular-nums">
                                                    ${Number(ethStats.lastPrice).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                                                </div>
                                                <div className={`text-xs font-bold flex items-center gap-1 ${ethStats.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                                    {ethStats.change24h >= 0 ? '▲' : '▼'} {Math.abs(ethStats.change24h).toFixed(2)}%
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Background Glow */}
                                <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#5b42f3]/20 to-blue-600/20 rounded-full blur-[100px] animate-pulse" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero3;