import React, { useContext } from 'react';
import { LanguageContext } from '../../../App';

const Hero: React.FC = () => {
    const { t } = useContext(LanguageContext);

    // Dynamic title rendering for multi-language
    const renderTitle = () => {
        const title = t('heroTitle');
        const words = title.split(' ');
        if (words.length <= 2) {
            return (
                <h1 className="text-5xl md:text-7xl font-black leading-[1.1] tracking-tighter text-white font-display uppercase">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366F1] to-[#0066B3]">{title}</span>
                </h1>
            );
        }
        return (
            <h1 className="text-5xl md:text-7xl font-black leading-[1.1] tracking-tighter text-white font-display uppercase">
                {words.slice(0, 2).join(' ')} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366F1] to-[#0066B3]">
                    {words.slice(2).join(' ')}
                </span>
            </h1>
        );
    };

    return (
        <section className="relative overflow-hidden flex flex-col items-center justify-center p-12 md:p-32 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.15)_0%,transparent_70%)]">
            <div className="max-w-7xl w-full grid md:grid-cols-2 gap-20 items-center">
                <div className="flex flex-col items-start gap-8 text-left">
                    <div className="flex flex-col gap-4">
                        {renderTitle()}
                        <p className="text-xl text-[#848E9C] max-w-md font-medium leading-relaxed">
                            {t('heroSub')}
                        </p>
                    </div>

                    <div className="flex items-center gap-3 text-xs bg-[#1E2329] px-5 py-2.5 rounded-full border border-[#2B3139] shadow-inner">
                        <span className="text-[#848E9C] font-black uppercase tracking-widest">BTC/USDT</span>
                        <span className="text-[#00C087] font-black tabular-nums tracking-tighter text-sm">42,500.50</span>
                        <span className="text-[#00C087] font-bold tabular-nums">+2.45%</span>
                    </div>

                    <button className="bg-[#6366F1] text-white px-10 py-5 rounded-2xl text-lg font-black hover:scale-105 transition transform shadow-2xl shadow-indigo-500/30 active:scale-95 uppercase tracking-widest font-display">
                        {t('tradeNow')}
                    </button>
                </div>

                <div className="relative flex items-center justify-center">
                    <div className="w-full aspect-square bg-gradient-to-br from-[#6366F1]/20 to-[#0066B3]/10 rounded-[3rem] border border-[#6366F1]/20 flex items-center justify-center p-10 relative shadow-2xl text-left">
                        <div className="absolute inset-0 blur-[100px] bg-[#6366F1]/10 -z-10"></div>
                        <div className="w-full h-full border-2 border-[#2B3139] rounded-[2rem] bg-[#0B0E11] shadow-2xl overflow-hidden relative flex flex-col">
                            <div className="p-5 border-b border-[#2B3139] flex items-center justify-between bg-dark-main/50">
                                <div className="flex gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#FF4D4F]/40"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#6366F1]/40"></div>
                                </div>
                                <div className="h-2 w-24 bg-[#2B3139] rounded-full"></div>
                            </div>
                            <div className="p-8 flex flex-col gap-6 flex-grow">
                                <div className="h-48 w-full bg-[#6366F1]/5 rounded-2xl border border-[#6366F1]/10 flex items-end gap-3 p-6">
                                    <div className="flex-grow bg-[#6366F1]/20 h-1/4 rounded-lg"></div>
                                    <div className="flex-grow bg-[#6366F1]/40 h-2/4 rounded-lg"></div>
                                    <div className="flex-grow bg-[#6366F1]/20 h-1/3 rounded-lg"></div>
                                    <div className="flex-grow bg-[#6366F1]/60 h-full rounded-lg shadow-lg"></div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="h-12 bg-[#1E2329] rounded-xl border border-dark-border"></div>
                                    <div className="h-12 bg-[#1E2329] rounded-xl border border-dark-border"></div>
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
