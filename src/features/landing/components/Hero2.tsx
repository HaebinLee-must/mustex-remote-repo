import React, { useState, useEffect } from 'react';
import { useUI } from '@/features/shared/UIContext';
import { TrendingUp, ShieldCheck, Globe } from 'lucide-react';
import { mockMarketData } from '@/features/trade/services/mockMarketData';
import { MarketStats } from '@/features/trade/types/market';

const Hero2: React.FC = () => {
    const { t } = useUI();
    const [btcStats, setBtcStats] = useState<MarketStats | null>(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const btc = await mockMarketData.fetchMarketStats('BTC/USDT');
                setBtcStats(btc);
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
        const title = t('heroTitle');

        if (title.includes('Trade Global Assets')) {
            return (
                <h1 className="text-5xl md:text-6xl lg:text-[84px] font-extrabold text-white leading-[1.1] tracking-tight">
                    Trade Global Assets <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
                        on Finora without Limits
                    </span>
                </h1>
            );
        }

        const words = title.split(' ');
        if (words.length <= 2) {
            return (
                <h1 className="text-5xl md:text-6xl lg:text-[84px] font-extrabold text-white leading-[1.1] tracking-tight">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
                        {title}
                    </span>
                </h1>
            );
        }
        return (
            <h1 className="text-5xl md:text-6xl lg:text-[84px] font-extrabold text-white leading-[1.1] tracking-tight">
                {words.slice(0, 2).join(' ')} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
                    {words.slice(2).join(' ')}
                </span>
            </h1>
        );
    };

    return (
        <section
            id="hero-v2"
            className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#1A1347]"
            style={{
                background: 'linear-gradient(135deg, #1A1347 0%, #292256 50%, #3D2F7A 100%)'
            }}
        >
            {/* Background Decoration - Radial Gradients from Reference */}
            <div
                className="absolute inset-0 z-0 pointer-events-none"
                style={{
                    background: `
                        radial-gradient(circle at 20% 40%, rgba(99, 82, 205, 0.4) 0%, transparent 40%),
                        radial-gradient(circle at 80% 60%, rgba(255, 172, 42, 0.25) 0%, transparent 40%)
                    `
                }}
            />

            {/* Network Lines SVG */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
                <svg className="w-full h-full" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
                    <line x1="100" y1="200" x2="300" y2="100" stroke="#6352CD" strokeWidth="0.5" />
                    <line x1="800" y1="150" x2="600" y2="300" stroke="#FFAC2A" strokeWidth="0.5" />
                    <line x1="200" y1="700" x2="500" y2="600" stroke="#10B981" strokeWidth="0.5" />
                    <circle cx="100" cy="200" r="3" fill="#6352CD" className="animate-pulse" />
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

                        {/* Glassmorphism Price Bar */}
                        <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 max-w-xl flex items-center justify-between group hover:bg-white/10 transition-all cursor-pointer">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center">
                                    <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-orange-500/50">B</div>
                                </div>
                                <div>
                                    <div className="text-slate-400 text-xs font-bold uppercase tracking-wider">Bitcoin Price</div>
                                    <div className="text-white text-3xl font-bold font-mono">
                                        {formatPrice(btcStats?.lastPrice).replace('$', '')} <span className="text-xl text-slate-400">USDT</span>
                                    </div>
                                </div>
                            </div>
                            <div className="px-4 py-2 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold flex items-center gap-1">
                                <TrendingUp size={18} />
                                <span>+2.4%</span>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-5 pt-4">
                            <button className="h-16 px-10 rounded-2xl bg-primary text-primary-foreground font-bold text-xl hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.5)] transition-all flex items-center gap-3 group">
                                {t('tradeNow')}
                            </button>
                            <button className="h-16 px-10 rounded-2xl bg-white/5 border-2 border-white/20 text-white font-bold text-xl hover:bg-white/10 transition-all">
                                View Markets
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
                            <div className="relative aspect-square w-full max-w-2xl mx-auto flex items-center justify-center">
                                {/* Floating Cards */}
                                <div className="absolute top-10 right-0 p-5 rounded-3xl bg-white backdrop-blur-2xl shadow-2xl z-30 flex items-center gap-4 border border-white/50 animate-float">
                                    <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center">
                                        <ShieldCheck className="text-blue-600" size={28} />
                                    </div>
                                    <div>
                                        <div className="text-slate-400 text-[10px] font-bold uppercase">Total Volume</div>
                                        <div className="text-slate-900 text-2xl font-black leading-none">$2.5B+</div>
                                    </div>
                                    <div className="px-2 py-1 rounded-md bg-emerald-100 text-emerald-600 text-xs font-bold">+12%</div>
                                </div>

                                <div className="absolute bottom-20 left-0 p-5 rounded-3xl bg-white backdrop-blur-2xl shadow-2xl z-30 flex items-center gap-4 border border-white/50 animate-float" style={{ animationDelay: '1s' }}>
                                    <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-xl">🔒</div>
                                    <div>
                                        <div className="text-slate-400 text-[10px] font-bold uppercase">Security Score</div>
                                        <div className="text-slate-900 text-2xl font-black leading-none">99.9%</div>
                                    </div>
                                    <div className="px-2 py-1 rounded-md bg-emerald-100 text-emerald-600 text-xs font-bold">A+</div>
                                </div>

                                <div className="absolute bottom-40 right-10 p-5 rounded-3xl bg-white backdrop-blur-2xl shadow-2xl z-30 flex items-center gap-4 border border-white/50 animate-float" style={{ animationDelay: '2s' }}>
                                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-xl">⚡</div>
                                    <div>
                                        <div className="text-slate-400 text-[10px] font-bold uppercase">Avg Speed</div>
                                        <div className="text-slate-900 text-2xl font-black leading-none">0.1s</div>
                                    </div>
                                    <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center text-[10px]">⚡</div>
                                </div>

                                <div className="relative w-4/5 h-4/5 bg-gradient-to-br from-indigo-500/20 to-purple-600/20 rounded-full blur-[60px] animate-pulse" />
                                <img
                                    src="/img/top2.png"
                                    alt="Hero Illustration"
                                    className="absolute w-full h-auto z-10 drop-shadow-[0_35px_60px_rgba(0,0,0,0.6)]"
                                    onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero2;