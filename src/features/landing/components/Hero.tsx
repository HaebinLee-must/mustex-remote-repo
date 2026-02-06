import React, { useState, useEffect } from 'react';
import { useUI } from '@/features/shared/UIContext';
import { Zap } from 'lucide-react';
import { AuroraBeamBackground } from './AuroraBeamBackground';
import { mockMarketData } from '@/features/trade/services/mockMarketData';
import { MarketStats } from '@/features/trade/types/market';

const Hero: React.FC = () => {
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

        return () => {
            clearInterval(interval);
        };
    }, []);

    // Dynamic title rendering for multi-language
    const renderTitle = () => {
        const title = t('heroTitle');

        // English version optimization for design flow
        if (title.includes('Trade Global Assets')) {
            return (
                <h1
                    className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] font-display text-[#0050dd]"
                    style={{ textShadow: '0 0 20px rgba(0, 80, 220, 0.5), 0 0 40px rgba(0, 60, 180, 0.3)' }}
                >
                    Trade Global Assets <br />
                    on Finora without Limits
                </h1>
            );
        }

        return (
            <h1
                className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] font-display text-[#0050dd]"
                style={{ textShadow: '0 0 20px rgba(0, 80, 220, 0.5), 0 0 40px rgba(0, 60, 180, 0.3)' }}
            >
                {title}
            </h1>
        );
    };

    return (
        <section id="hero" className="relative overflow-hidden bg-black font-sans min-h-[75vh] flex items-center">
            {/* Aurora Beam Background (오로라 빔 효과) */}
            <div className="absolute inset-0 z-0">
                <AuroraBeamBackground />
            </div>

            {/* Grain overlay - fine white particles */}
            <div
                className="absolute inset-0 z-[1] pointer-events-none opacity-[0.12]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='5' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncR type='linear' slope='2' intercept='-0.5'/%3E%3CfeFuncG type='linear' slope='2' intercept='-0.5'/%3E%3CfeFuncB type='linear' slope='2' intercept='-0.5'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' fill='white'/%3E%3C/svg%3E")`,
                    mixBlendMode: 'overlay',
                }}
            />

            {/* 중앙에서 자연스럽게 퍼지는 그라데이션 딤 */}
            <div
                className="absolute inset-0 z-[3] pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse 65% 50% at 20% 15%, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.10) 50%, transparent 100%)'
                }}
            />

            <div className="relative z-[3] mx-auto w-full max-w-7xl px-6 py-20 sm:px-8 lg:px-12 md:py-32">
                <div className="flex flex-col items-center text-center">
                    {/* Content 영역 */}
                    <div className="max-w-4xl space-y-8 relative z-10">
                        {renderTitle()}

                        <p
                            className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium text-[#0066cc]"
                            style={{ textShadow: '0 0 15px rgba(0, 100, 200, 0.4)' }}
                        >
                            {t('heroSub')}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-6 justify-center">
                            <button className="bg-[#5b42f3] text-white hover:bg-[#4a35e0] focus:ring-2 focus:ring-[#5b42f3]/50 focus:ring-offset-2 focus:ring-offset-black shadow-xl shadow-[#5b42f3]/50 inline-flex items-center justify-center rounded-xl px-8 py-4 text-base font-bold transition-all duration-200 active:scale-95 w-full sm:w-auto">
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

export default Hero;