import React, { useState, useEffect } from 'react';
import { useUI } from '@/features/shared/UIContext';
import { TrendingUp, ShieldCheck, Globe } from 'lucide-react';
import { mockMarketData } from '@/features/trade/services/mockMarketData';
import { MarketStats } from '@/features/trade/types/market';

const Hero2: React.FC = () => {
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

    const formatPrice = (price?: number) => {
        if (!price) return '---';
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
    };

    // Dynamic title rendering for multi-language (Standardizing logic from Version 1)
    const renderTitle = () => {
        return (
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
                Bright your trading <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
                    powerful on Finora.
                </span>
            </h1>
        );
    };

    return (
        <section
            id="hero-v2"
            className="relative min-h-[90vh] flex items-center pt-24 pb-12 overflow-hidden bg-[#0F0A2E]"
        >
            {/* Background Layer 1: Base Gradient */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    background: 'linear-gradient(135deg, #0F0A2E 0%, #1A1347 50%, #292256 100%)'
                }}
            />

            {/* Background Layer 2: Animated Aurora Blurs (Seamless Loop) */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div
                    className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full blur-[120px] opacity-40 animate-aurora-slow"
                    style={{ background: 'radial-gradient(circle, #6352CD 0%, transparent 70%)' }}
                />
                <div
                    className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full blur-[120px] opacity-30 animate-aurora-slow"
                    style={{ background: 'radial-gradient(circle, #FFAC2A 0%, transparent 70%)', animationDirection: 'reverse', animationDelay: '-5s' }}
                />
                <div
                    className="absolute top-[20%] right-[10%] w-[40%] h-[40%] rounded-full blur-[100px] opacity-20 animate-aurora-slow"
                    style={{ background: 'radial-gradient(circle, #3D2F7A 0%, transparent 70%)', animationDelay: '-10s' }}
                />
            </div>

            {/* Network Lines SVG (Moved slightly for better composition) */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
                <svg className="w-full h-full" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
                    <line x1="100" y1="200" x2="300" y2="100" stroke="#6352CD" strokeWidth="0.5" />
                    <line x1="800" y1="150" x2="600" y2="300" stroke="#FFAC2A" strokeWidth="0.5" />
                    <line x1="200" y1="700" x2="500" y2="600" stroke="#10B981" strokeWidth="0.5" />
                    <circle cx="100" cy="200" r="3" fill="#6352CD" />
                    <circle cx="300" cy="100" r="3" fill="#FFAC2A" />
                    <circle cx="800" cy="150" r="3" fill="#10B981" />
                </svg>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left Content */}
                    <div className="space-y-10 text-left animate-in fade-in slide-in-from-left duration-700">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-semibold animate-bounce shadow-lg">
                            <span className="text-orange-400">★</span>
                            <span>Trusted by 500,000+ users worldwide</span>
                        </div>

                        {renderTitle()}

                        <p className="text-xl md:text-2xl text-slate-300 max-w-xl leading-relaxed font-medium">
                            {t('heroSub')}
                        </p>

                        <div className="flex flex-wrap gap-5 pt-4">
                            <button className="h-16 px-10 rounded-2xl bg-primary text-primary-foreground font-bold text-xl hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.5)] transition-all flex items-center gap-3 group text-center justify-center">
                                Trade Bitcoin Now
                            </button>
                            <button className="h-16 px-10 rounded-2xl bg-white/5 border-2 border-white/20 text-white font-bold text-xl hover:bg-white/10 transition-all text-center justify-center">
                                Get Started
                            </button>
                        </div>

                        <div className="flex items-center gap-10 pt-6">
                            <div className="flex items-center gap-2 text-white/80 font-medium">
                                <span className="text-orange-400 font-bold">★</span>
                                <span>Regulated Exchange</span>
                            </div>
                            <div className="flex items-center gap-2 text-white/80 font-medium">
                                <ShieldCheck className="text-emerald-500" size={22} />
                                <span>Bank-Level Security</span>
                            </div>
                            <div className="flex items-center gap-2 text-white/80 font-medium">
                                <Globe className="text-blue-400" size={22} />
                                <span>24/7 Support</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Visual Element */}
                    <div className="relative animate-in fade-in zoom-in duration-1000 delay-200">
                        <div className="relative z-20">
                            <div className="relative w-full max-w-2xl mx-auto flex items-center justify-center">
                                {/* Main Chart Card */}
                                <div className="relative z-10 w-full bg-[#1e1a41]/80 backdrop-blur-3xl border border-white/10 rounded-[32px] p-6 shadow-2xl overflow-hidden">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                                                <TrendingUp size={20} />
                                            </div>
                                            <div>
                                                <div className="text-white font-bold">Market Overview</div>
                                                <div className="text-slate-400 text-xs">Real-time Performance</div>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            {['1H', '1D', '1W'].map((t) => (
                                                <button key={t} className={`px-3 py-1 rounded-lg text-[10px] font-bold ${t === '1D' ? 'bg-primary text-white' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}>
                                                    {t}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Mock Chart SVG */}
                                    <div className="h-[240px] w-full relative">
                                        <svg viewBox="0 0 400 150" className="w-full h-full">
                                            <defs>
                                                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="0%" stopColor="#6352CD" stopOpacity="0.3" />
                                                    <stop offset="100%" stopColor="#6352CD" stopOpacity="0" />
                                                </linearGradient>
                                            </defs>
                                            <path
                                                d="M0,120 Q50,110 80,130 T150,100 T220,110 T300,70 T400,80"
                                                fill="transparent"
                                                stroke="#6352CD"
                                                strokeWidth="3"
                                                strokeLinecap="round"
                                            />
                                            <path
                                                d="M0,120 Q50,110 80,130 T150,100 T220,110 T300,70 T400,80 V150 H0 Z"
                                                fill="url(#chartGradient)"
                                            />
                                            <circle cx="300" cy="70" r="4" fill="#6352CD" className="animate-pulse" />
                                        </svg>

                                        {/* BTC Floating Element */}
                                        <div className="absolute top-0 right-4 p-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 flex items-center gap-3 animate-float">
                                            <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-[10px]">B</div>
                                            <div>
                                                <div className="text-white text-sm font-bold">{formatPrice(btcStats?.lastPrice).replace('$', '')}</div>
                                                <div className="text-emerald-400 text-[10px] font-medium">+{btcStats?.change24h?.toFixed(2)}%</div>
                                            </div>
                                        </div>

                                        {/* ETH Floating Element */}
                                        <div className="absolute bottom-8 left-4 p-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 flex items-center gap-3 animate-float" style={{ animationDelay: '1.5s' }}>
                                            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-[10px]">E</div>
                                            <div>
                                                <div className="text-white text-sm font-bold">{formatPrice(ethStats?.lastPrice).replace('$', '')}</div>
                                                <div className="text-emerald-400 text-[10px] font-medium">+{ethStats?.change24h?.toFixed(2)}%</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/5">
                                        {[
                                            { label: '24h Vol', value: '$1.2B' },
                                            { label: 'Market Cap', value: '$2.4T' },
                                            { label: 'Active Users', value: '500K+' }
                                        ].map((stat) => (
                                            <div key={stat.label}>
                                                <div className="text-slate-500 text-[10px] font-medium mb-1 uppercase tracking-wider">{stat.label}</div>
                                                <div className="text-white font-bold text-sm">{stat.value}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Background Glow */}
                                <div className="absolute inset-0 z-0 bg-gradient-to-br from-indigo-500/20 to-purple-600/20 rounded-full blur-[100px] animate-pulse" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero2;