import React, { useState, useEffect } from 'react';
import { useUI } from '@/features/shared/UIContext';
import { ArrowRight } from 'lucide-react';
import { AuroraBeamBackgroundV8 } from './AuroraBeamBackgroundV8';
import { mockMarketData } from '@/features/trade/services/mockMarketData';
import { MarketStats } from '@/features/trade/types/market';

const HeroBorealisV8: React.FC = () => {
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
        const interval = setInterval(fetchStats, 10000); // Update every 10s
        return () => clearInterval(interval);
    }, []);

    // Dynamic title rendering for multi-language
    const renderTitle = () => {
        const title = t('heroTitle');

        // English version optimization for design flow
        if (title.includes('Trade Global Assets')) {
            return (
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] font-display drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
                    Trade Global Assets <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5b42f3] via-[#7b6fe6] to-[#3366ff] drop-shadow-[0_4px_24px_rgba(91,66,243,0.4)]">
                        on Finora without Limits
                    </span>
                </h1>
            );
        }

        const words = title.split(' ');
        if (words.length <= 2) {
            return (
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] font-display drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5b42f3] via-[#7b6fe6] to-[#3366ff] drop-shadow-[0_4px_24px_rgba(91,66,243,0.4)]">
                        {title}
                    </span>
                </h1>
            );
        }
        return (
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] font-display drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
                {words.slice(0, 2).join(' ')} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5b42f3] via-[#7b6fe6] to-[#3366ff] drop-shadow-[0_4px_24px_rgba(91,66,243,0.4)]">
                    {words.slice(2).join(' ')}
                </span>
            </h1>
        );
    };

    return (
        <section id="hero" className="relative overflow-hidden bg-[#050508] font-sans min-h-[75vh] flex items-center w-full">
            {/* 1. Background Layer: Aurora Beam Background (오로라 빔 효과) - 격리된 V8 버전 사용 */}
            <div className="absolute inset-0 z-0">
                <AuroraBeamBackgroundV8 />
            </div>

            {/* 2. Texture Layer: Grain overlay - consistent with Studio feel (from 컬러-수정1 App.tsx) */}
            <div
                className="absolute inset-0 z-[1] pointer-events-none opacity-[0.03] mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'repeat',
                }}
            />

            {/* 3. Content Layer */}
            <div className="relative z-[3] mx-auto w-full max-w-7xl px-6 py-20 sm:px-8 lg:px-12 md:py-32">
                <div className="flex flex-col items-center text-center">
                    <div className="max-w-4xl space-y-8 relative z-10">
                        {renderTitle()}

                        <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed font-medium drop-shadow-[0_2px_16px_rgba(0,0,0,0.6)] animate-fade-in-up opacity-0 [animation-delay:600ms] [animation-fill-mode:forwards]">
                            {t('heroSub')}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-6 justify-center animate-fade-in-up opacity-0 [animation-delay:800ms] [animation-fill-mode:forwards]">
                            <button className="bg-[#5b42f3] text-white hover:bg-[#4a35e0] focus:ring-2 focus:ring-[#5b42f3]/50 focus:ring-offset-2 focus:ring-offset-black shadow-xl shadow-[#5b42f3]/40 inline-flex items-center justify-center rounded-xl px-8 py-4 text-base font-bold transition-all duration-200 active:scale-95 w-full sm:w-auto">
                                {t('tradeNow')}
                            </button>
                            <button className="bg-white/10 text-white hover:bg-white/20 border border-white/30 backdrop-blur-md inline-flex items-center justify-center rounded-xl px-8 py-4 text-base font-bold transition-all duration-200 active:scale-95 w-full sm:w-auto">
                                View Markets
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroBorealisV8;