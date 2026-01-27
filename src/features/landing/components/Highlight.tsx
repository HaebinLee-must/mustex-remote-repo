import React from 'react';
import { Check } from 'lucide-react';

const Highlight: React.FC = () => {
    return (
        <section id="why" className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-6">
            <div className="bg-gradient-to-r from-primary/20 to-indigo-900/40 border border-primary/20 rounded-3xl p-8 md:p-16 relative overflow-hidden text-left">
                {/* Background Patterns */}
                <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[radial-gradient(hsl(var(--primary))_1px,transparent_1px)] [background-size:16px_16px]"></div>

                <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
                    <div className="space-y-8">
                        <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight uppercase">
                            WHY CHOOSE <span className="text-primary">FINORA</span>?
                        </h2>
                        <div className="space-y-6">
                            {[
                                { title: "Stable Trading Environment", desc: "99.99% 가동률을 보장하는 인프라." },
                                { title: "Lowest Fees in Industry", desc: "메이커 0%, 테이커 0.01%의 업계 최저 수수료." },
                                { title: "Deep Liquidity", desc: "슬리피지 걱정 없는 풍부한 유동성 제공." },
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4 items-start">
                                    <div className="mt-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center shrink-0 shadow-lg shadow-primary/30">
                                        <Check className="w-3.5 h-3.5 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                                        <p className="text-slate-400 text-sm">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="pt-4">
                            <button className="bg-white text-blue-900 hover:bg-blue-50 hover:text-blue-950 font-bold px-8 py-4 w-full md:w-auto text-base shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all rounded-lg">
                                Create Free Account
                            </button>
                        </div>
                    </div>

                    {/* Abstract Visual Right */}
                    <div className="relative hidden md:block">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/30 rounded-full blur-[80px]"></div>
                        <div className="relative grid grid-cols-2 gap-4">
                            <div className="space-y-4 mt-12">
                                <div className="bg-slate-900/80 backdrop-blur border border-slate-700/50 p-6 rounded-2xl h-40 w-full animate-pulse-slow">
                                    <div className="w-10 h-10 bg-primary/20 rounded-lg mb-4"></div>
                                    <div className="w-full h-2 bg-slate-700 rounded mb-2"></div>
                                    <div className="w-2/3 h-2 bg-slate-700 rounded"></div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="bg-slate-800/80 backdrop-blur border border-slate-700/50 p-6 rounded-2xl h-48 w-full shadow-2xl">
                                    <div className="flex justify-between items-center mb-6">
                                        <div className="w-8 h-8 rounded-full bg-green-500/20"></div>
                                        <span className="text-green-400 text-xs">+12.5%</span>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="w-full h-16 bg-gradient-to-t from-green-500/20 to-transparent rounded-lg border-b border-green-500/30"></div>
                                    </div>
                                </div>
                                <div className="bg-slate-900/60 backdrop-blur border border-slate-700/50 p-4 rounded-2xl h-24 w-full"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Highlight;