import React from 'react';
import { useUI } from '@/features/shared/UIContext';
import { Zap } from 'lucide-react';

const Hero: React.FC = () => {
    const { t } = useUI();

    // Dynamic title rendering for multi-language
    const renderTitle = () => {
        const title = t('heroTitle');
        const words = title.split(' ');
        if (words.length <= 2) {
            return (
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
                        {title}
                    </span>
                </h1>
            );
        }
        return (
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
                {words.slice(0, 2).join(' ')} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
                    {words.slice(2).join(' ')}
                </span>
            </h1>
        );
    };

    return (
        <section id="hero" className="w-full pt-32 pb-20 md:pt-48 md:pb-32 px-4 md:px-6 relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
                {/* Left: Content */}
                <div className="space-y-8 relative z-10 text-center md:text-left">
                    {renderTitle()}

                    <p className="text-lg text-slate-400 max-w-lg mx-auto md:mx-0 leading-relaxed font-medium">
                        {t('heroSub')}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-2 justify-center md:justify-start">
                        <button className="bg-primary text-white hover:opacity-90 focus:ring-primary shadow-lg shadow-primary/20 hover:shadow-primary/30 border border-transparent inline-flex items-center justify-center rounded-lg px-8 py-4 text-base font-bold transition-all duration-200 active:scale-95 w-full sm:w-auto">
                            {t('tradeNow')}
                        </button>
                        <button className="bg-slate-800 text-slate-100 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 inline-flex items-center justify-center rounded-lg px-8 py-4 text-base font-bold transition-all duration-200 active:scale-95 w-full sm:w-auto">
                            View Markets
                        </button>
                    </div>

                    {/* Live Ticker Mock */}
                    <div className="pt-8 flex gap-8 text-sm justify-center md:justify-start border-t border-slate-900/50 mt-8">
                        <div className="flex flex-col text-left">
                            <span className="text-slate-500 text-xs font-semibold mb-1">BTC/USDT</span>
                            <span className="text-white font-bold flex gap-2 items-baseline text-lg">
                                42,500.50 <span className="text-green-400 text-xs bg-green-400/10 px-1.5 py-0.5 rounded">+2.45%</span>
                            </span>
                        </div>
                        <div className="w-[1px] bg-slate-800"></div>
                        <div className="flex flex-col text-left">
                            <span className="text-slate-500 text-xs font-semibold mb-1">ETH/USDT</span>
                            <span className="text-white font-bold flex gap-2 items-baseline text-lg">
                                2,250.10 <span className="text-red-400 text-xs bg-red-400/10 px-1.5 py-0.5 rounded">-1.20%</span>
                            </span>
                        </div>
                    </div>
                </div>

                {/* Right: Visual Mockup */}
                <div className="relative z-10 mt-8 md:mt-0 [perspective:1000px]">
                    {/* Glow Effect */}
                    <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-full blur-3xl opacity-50 animate-pulse-slow"></div>

                    <div className="relative bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden transform md:[transform:rotateY(12deg)_rotateX(6deg)] hover:[transform:rotateY(0deg)_rotateX(0deg)] transition-all duration-700 ease-out group">
                        {/* Mockup Top Bar */}
                        <div className="flex justify-between items-center px-4 py-3 border-b border-slate-800 bg-slate-900/50 backdrop-blur">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                            </div>
                            <div className="text-[10px] font-mono text-slate-500">FINORA PRO TERMINAL v2.0</div>
                        </div>

                        {/* Mockup Content */}
                        <div className="p-1 bg-slate-950">
                            <div className="grid grid-cols-3 gap-1 h-64 md:h-80 text-left">
                                {/* Chart Area */}
                                <div className="col-span-2 bg-slate-900/50 rounded p-4 relative overflow-hidden border border-slate-800/50">
                                    <div className="flex justify-between mb-4">
                                        <div className="flex gap-2">
                                            <div className="h-6 w-16 bg-slate-800 rounded"></div>
                                            <div className="h-6 w-10 bg-slate-800 rounded"></div>
                                        </div>
                                        <div className="h-6 w-24 bg-slate-800 rounded"></div>
                                    </div>
                                    {/* Fake Candles */}
                                    <div className="flex items-end justify-between h-32 md:h-48 gap-1 opacity-80">
                                        {[40, 60, 45, 70, 50, 80, 65, 90, 75, 55, 60, 85, 95, 80].map((h, i) => (
                                            <div key={i} style={{ height: `${h}%` }} className={`flex-1 rounded-sm ${i % 2 === 0 ? 'bg-green-500/40' : 'bg-red-500/40'}`}></div>
                                        ))}
                                    </div>
                                </div>
                                {/* Orderbook Area */}
                                <div className="col-span-1 bg-slate-900/50 rounded border border-slate-800/50 p-2 space-y-1">
                                    {[...Array(12)].map((_, i) => (
                                        <div key={i} className="flex justify-between text-[10px]">
                                            <span className="text-slate-500">42,{500 + i * 15}</span>
                                            <span className={`${i < 6 ? 'text-red-400' : 'text-green-400'}`}>0.{Math.floor(Math.random() * 900)}</span>
                                        </div>
                                    ))}
                                    <div className="mt-2 pt-2 border-t border-slate-800">
                                        <div className="h-8 bg-primary rounded flex items-center justify-center text-xs font-bold text-white">Buy BTC</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;