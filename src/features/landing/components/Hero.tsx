import React, { useState, useEffect } from 'react';
import { useUI } from '@/features/shared/UIContext';
import { Zap } from 'lucide-react';
import { AuroraBackground } from './AuroraBackground';
import { mockMarketData } from '@/features/trade/services/mockMarketData';
import { MarketStats } from '@/features/trade/types/market';

interface HeroProps {
    transparentBg?: boolean;
}

const Hero: React.FC<HeroProps> = ({ transparentBg }) => {
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
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] font-display">
                    Trade Global Assets <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5b42f3] via-[#7b6fe6] to-[#3366ff]">
                        on Finora without Limits
                    </span>
                </h1>
            );
        }

        const words = title.split(' ');
        if (words.length <= 2) {
            return (
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] font-display">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5b42f3] via-[#7b6fe6] to-[#3366ff]">
                        {title}
                    </span>
                </h1>
            );
        }
        return (
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] font-display">
                {words.slice(0, 2).join(' ')} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5b42f3] via-[#7b6fe6] to-[#3366ff]">
                    {words.slice(2).join(' ')}
                </span>
            </h1>
        );
    };

    return (
        <section id="hero" className={`relative overflow-hidden font-sans min-h-[75vh] flex items-center ${transparentBg ? 'bg-transparent' : 'bg-background'}`}>
            {/* Aurora Background (성운 느낌 그라데이션) */}
            {!transparentBg && (
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <AuroraBackground />
                    <div className="absolute inset-0 bg-background/40"></div>
                </div>
            )}

            <div className="relative mx-auto w-full max-w-7xl px-6 py-20 sm:px-8 lg:px-12 md:py-32">
                <div className="flex flex-col items-center text-center">
                    {/* Content 영역 */}
                    <div className="max-w-4xl space-y-8 relative z-10">
                        {renderTitle()}

                        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium">
                            {t('heroSub')}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-6 justify-center">
                            <button className="bg-[#5b42f3] text-white hover:opacity-90 focus:ring-2 focus:ring-ring focus:ring-offset-2 shadow-xl shadow-primary/20 inline-flex items-center justify-center rounded-xl px-8 py-4 text-base font-bold transition-all duration-200 active:scale-95 w-full sm:w-auto">
                                {t('tradeNow')}
                            </button>
                            <button className="bg-white/5 text-white hover:bg-white/10 border border-white/10 backdrop-blur-md inline-flex items-center justify-center rounded-xl px-8 py-4 text-base font-bold transition-all duration-200 active:scale-95 w-full sm:w-auto">
                                View Markets
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;