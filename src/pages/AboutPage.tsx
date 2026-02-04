import React from 'react';
import { Shield, Globe, BarChart3, Lock, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import AuroraBorealisV6 from '@/features/landing/components/AuroraBorealisV6';

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-[#070112] text-white selection:bg-blue-500/30 font-sans">
            {/* Hero Section with Aurora Animation */}
            <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
                <AuroraBorealisV6 className="z-0" />

                <div className="relative z-10 max-w-7xl mx-auto px-4 pt-20 text-center">
                    <div className="flex justify-center gap-2 mb-8 animate-fade-in-up opacity-0 [animation-delay:200ms] [animation-fill-mode:forwards]">
                        {['Security', 'Compliance', 'Liquidity', 'Transparency'].map((chip) => (
                            <span key={chip} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase tracking-widest font-bold text-blue-200/60 backdrop-blur-md">
                                {chip}
                            </span>
                        ))}
                    </div>

                    <h1 className="max-w-4xl mx-auto text-5xl md:text-7xl font-bold tracking-tight text-white mb-8 animate-fade-in-up opacity-0 [animation-delay:400ms] [animation-fill-mode:forwards] drop-shadow-2xl">
                        The Institutional Standard for Digital Asset Exchange.
                    </h1>

                    <p className="max-w-2xl mx-auto text-lg md:text-xl text-blue-100/80 mb-10 leading-relaxed animate-fade-in-up opacity-0 [animation-delay:600ms] [animation-fill-mode:forwards] drop-shadow-lg">
                        FINORA provides retail users, institutional investors, and global partners with a secure, compliant environment to access digital assets.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up opacity-0 [animation-delay:800ms] [animation-fill-mode:forwards]">
                        <button className="group relative px-8 py-4 rounded-full bg-white text-black font-bold shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_rgba(255,255,255,0.5)] hover:-translate-y-0.5 transition-all overflow-hidden">
                            <span className="relative flex items-center gap-2">
                                Start Trading <ArrowRight className="w-4 h-4" />
                            </span>
                        </button>
                        <button className="px-8 py-4 rounded-full bg-white/5 text-white font-semibold border border-white/20 hover:bg-white/10 hover:border-white/40 backdrop-blur-md transition-all flex items-center gap-2 group shadow-lg">
                            Contact Us
                        </button>
                    </div>

                    <div className="mt-16 grid grid-cols-3 gap-8 border-t border-white/10 pt-8 max-w-2xl mx-auto animate-fade-in-up opacity-0 [animation-delay:1000ms] [animation-fill-mode:forwards]">
                        <div>
                            <p className="text-3xl font-bold text-white">10+</p>
                            <p className="text-[10px] text-blue-200/40 uppercase tracking-widest font-bold">Years Fintech Exp.</p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-white">Global</p>
                            <p className="text-[10px] text-blue-200/40 uppercase tracking-widest font-bold">Access Controls</p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-white">100%</p>
                            <p className="text-[10px] text-blue-200/40 uppercase tracking-widest font-bold">Asset Segregation</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision - Highlight Style */}
            <section className="py-32 px-6 bg-[#0B0E11] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Our Commitment to the Future of Finance.</h2>
                        <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
                        <div className="group p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition-all backdrop-blur-sm">
                            <h3 className="text-blue-400 font-bold mb-6 text-2xl tracking-tight uppercase text-sm tracking-[0.2em]">01. Mission</h3>
                            <p className="text-slate-300 text-lg leading-relaxed mb-8">
                                To democratize access to digital assets by building infrastructure that prioritizes user safety over speculative growth.
                            </p>
                            <ul className="space-y-4">
                                {['Regulatory fragmentation', 'Custodial risk', 'Market opacity'].map(item => (
                                    <li key={item} className="flex items-center gap-3 text-sm text-slate-400 font-medium">
                                        <div className="w-5 h-5 rounded-full bg-blue-500/10 flex items-center justify-center">
                                            <CheckCircle2 size={12} className="text-blue-500" />
                                        </div>
                                        Solving {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="group p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition-all backdrop-blur-sm">
                            <h3 className="text-blue-400 font-bold mb-6 text-2xl tracking-tight uppercase text-sm tracking-[0.2em]">02. Vision</h3>
                            <p className="text-slate-300 text-lg leading-relaxed mb-8">
                                To become the primary bridge between traditional finance and digital assets through a globally scalable ecosystem.
                            </p>
                            <div className="p-6 rounded-2xl bg-blue-500/5 border border-blue-500/20">
                                <p className="text-sm text-blue-100/60 leading-relaxed italic">
                                    "Focusing on expanding regional footprints through local partnerships and infrastructure-grade reliability."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Trust Us - Features Style */}
            <section className="py-32 px-6 bg-[#070112]">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
                        <div className="max-w-2xl">
                            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Built on Pillars of Accountability.</h2>
                            <p className="text-blue-100/40 text-lg">We replace market uncertainty with institutional-grade reliability.</p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: BarChart3,
                                title: "Financial Infrastructure",
                                desc: "FINORA is defined as an infrastructure provider first. We prioritize stability and absolute protection over short-term revenue."
                            },
                            {
                                icon: Lock,
                                title: "Security & Compliance",
                                bullets: ["Strict Asset Segregation", "Institutional Cold-Storage", "Compliance by Design"]
                            },
                            {
                                icon: Globe,
                                title: "Fair Market Operations",
                                desc: "Rigorous listing standards and robust internal governance ensure market integrity and user protection."
                            }
                        ].map((item, i) => (
                            <div key={i} className="group relative p-10 rounded-[2rem] bg-gradient-to-b from-white/[0.08] to-transparent border border-white/10 hover:border-white/20 transition-all">
                                <div className="mb-8 w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <item.icon className="text-blue-400" size={28} />
                                </div>
                                <h3 className="text-xl font-bold mb-4 tracking-tight">{item.title}</h3>
                                {item.desc ? (
                                    <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                                ) : (
                                    <ul className="text-slate-400 text-sm space-y-3 font-medium">
                                        {item.bullets?.map(b => <li key={b}>• {b}</li>)}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section - TradeAnywhere Style */}
            <section className="py-32 px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-600/5"></div>
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
                        Join a platform built for the long term.
                    </h2>
                    <p className="text-blue-100/60 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
                        Start trading with the confidence of institutional-grade security and transparent operations.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                        <button className="px-10 py-4 rounded-full bg-white text-black font-bold shadow-2xl hover:scale-105 transition-all">
                            Start Trading Now
                        </button>
                        <button className="text-white font-bold flex items-center gap-2 group border-b border-white/20 pb-1 hover:border-white transition-all">
                            Contact our team <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                    <p className="mt-12 text-[10px] text-blue-200/30 uppercase tracking-[0.3em] font-black">
                        Verification typically completed in {"<"} 3 minutes
                    </p>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;