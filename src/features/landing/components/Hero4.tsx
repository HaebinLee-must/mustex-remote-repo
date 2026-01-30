import React from 'react';
import { useUI } from '@/features/shared/UIContext';
import AuroraShaderBackground from './AuroraShaderBackground';

const Hero4: React.FC = () => {
    const { t } = useUI();

    // Dynamic title rendering for multi-language (Based on Hero 1)
    const renderTitle = () => {
        const title = t('heroTitle');

        // English version optimization for design flow
        if (title.includes('Trade Global Assets')) {
            return (
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1] font-display">
                    Trade Global Assets <br />
                    <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#5b42f3] via-[#b6a1ff] to-[#3366ff] bg-[length:200%_auto] animate-gradient-x">
                        Future of Finance <span className="font-sprat">Aurora</span>
                    </span>
                </h1>
            );
        }

        const words = title.split(' ');
        if (words.length <= 2) {
            return (
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1] font-display">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5b42f3] via-[#7b6fe6] to-[#3366ff]">
                        {title}
                    </span>
                </h1>
            );
        }
        return (
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1] font-display">
                {words.slice(0, 2).join(' ')} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5b42f3] via-[#7b6fe6] to-[#3366ff]">
                    {words.slice(2).join(' ')}
                </span>
            </h1>
        );
    };

    return (
        <section id="hero-v4" className="relative overflow-hidden bg-[#020205] font-sans min-h-[80vh] flex items-center">
            {/* Interactive Aurora Shader Background */}
            <div className="absolute inset-0 z-0">
                <AuroraShaderBackground />
                {/* Center Gradient for Title Visibility */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-transparent" />
            </div>

            {/* Content Layer */}
            <div className="relative mx-auto w-full max-w-7xl px-6 py-20 sm:px-8 lg:px-12 md:py-32 z-10">
                <div className="flex flex-col items-center text-center">
                    <div className="max-w-4xl space-y-8">
                        {renderTitle()}

                        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-medium">
                            {t('heroSub')}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-6 justify-center">
                            <button className="bg-[#5b42f3] text-white hover:opacity-90 focus:ring-2 focus:ring-primary focus:ring-offset-2 shadow-xl shadow-primary/20 inline-flex items-center justify-center rounded-xl px-8 py-4 text-base font-bold transition-all duration-200 active:scale-95 w-full sm:w-auto">
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

export default Hero4;