import React from 'react';
import { ArrowRight, PlayCircle } from 'lucide-react';
import { useUI } from '@/features/shared/UIContext';

const HeroBorealisV6: React.FC = () => {
    const { t } = useUI();

    return (
        <div className="relative z-10 flex flex-col items-center justify-center min-h-[85vh] text-center px-4 pt-20">
            {/* Main Headline */}
            <h1 className="max-w-4xl mx-auto text-5xl md:text-7xl font-bold tracking-tight text-white mb-8 animate-fade-in-up opacity-0 [animation-delay:400ms] [animation-fill-mode:forwards] drop-shadow-2xl">
                {t('heroTitle')}
            </h1>

            {/* Subheadline */}
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-blue-100/80 mb-10 leading-relaxed animate-fade-in-up opacity-0 [animation-delay:600ms] [animation-fill-mode:forwards] drop-shadow-lg">
                {t('heroSub')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 animate-fade-in-up opacity-0 [animation-delay:800ms] [animation-fill-mode:forwards]">
                <button className="group relative px-8 py-4 rounded-full bg-white text-black font-bold shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_rgba(255,255,255,0.5)] hover:-translate-y-0.5 transition-all overflow-hidden">
                    <span className="relative flex items-center gap-2">
                        {t('tradeNow')} <ArrowRight className="w-4 h-4" />
                    </span>
                </button>

                <button className="px-8 py-4 rounded-full bg-white/5 text-white font-semibold border border-white/20 hover:bg-white/10 hover:border-white/40 backdrop-blur-md transition-all flex items-center gap-2 group shadow-lg">
                    <PlayCircle className="w-5 h-5 text-gray-200 group-hover:text-white transition-colors" />
                    <span>View Markets</span>
                </button>
            </div>
        </div>
    );
};

export default HeroBorealisV6;