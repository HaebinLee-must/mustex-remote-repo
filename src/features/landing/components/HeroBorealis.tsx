import React from 'react';
import { ArrowRight, PlayCircle } from 'lucide-react';

const HeroBorealis: React.FC = () => {
    return (
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4 pt-20">

            {/* Animated Badge */}
            <div className="animate-fade-in-up opacity-0 [animation-delay:200ms] [animation-fill-mode:forwards]">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-8 hover:bg-white/20 transition-colors cursor-pointer group shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                    <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.8)]"></span>
                    <span className="text-xs font-medium text-cyan-100 tracking-wide uppercase">
                        v2.0 is now live
                    </span>
                    <ArrowRight className="w-3 h-3 text-cyan-100 group-hover:translate-x-1 transition-transform" />
                </div>
            </div>

            {/* Main Headline */}
            <h1 className="max-w-4xl mx-auto text-5xl md:text-7xl font-bold tracking-tight text-white mb-8 animate-fade-in-up opacity-0 [animation-delay:400ms] [animation-fill-mode:forwards] drop-shadow-2xl">
                The financial layer for the internet.
            </h1>

            {/* Subheadline */}
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-blue-100/80 mb-10 leading-relaxed animate-fade-in-up opacity-0 [animation-delay:600ms] [animation-fill-mode:forwards] drop-shadow-lg">
                Finora provides the infrastructure for modern platforms to build, launch, and scale financial products. Experience the fluidity of future finance.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 animate-fade-in-up opacity-0 [animation-delay:800ms] [animation-fill-mode:forwards]">
                <button className="group relative px-8 py-4 rounded-full bg-white text-black font-bold shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_rgba(255,255,255,0.5)] hover:-translate-y-0.5 transition-all overflow-hidden">
                    <span className="relative flex items-center gap-2">
                        Start Building Now <ArrowRight className="w-4 h-4" />
                    </span>
                </button>

                <button className="px-8 py-4 rounded-full bg-white/5 text-white font-semibold border border-white/20 hover:bg-white/10 hover:border-white/40 backdrop-blur-md transition-all flex items-center gap-2 group shadow-lg">
                    <PlayCircle className="w-5 h-5 text-gray-200 group-hover:text-white transition-colors" />
                    <span>Watch Demo</span>
                </button>
            </div>

            {/* Trust Badges / Social Proof */}
            <div className="mt-20 pt-10 border-t border-white/10 w-full max-w-5xl animate-fade-in-up opacity-0 [animation-delay:1000ms] [animation-fill-mode:forwards]">
                <p className="text-sm text-gray-400 mb-6 uppercase tracking-wider font-semibold">Trusted by visionary companies</p>
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                    {/* Simple SVG Placeholders for logos */}
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="h-8 w-24 bg-white/30 rounded animate-pulse"></div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HeroBorealis;