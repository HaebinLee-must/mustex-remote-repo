import React from 'react';
import { Shield, Globe, Users, BarChart3, Lock, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-[#0A0A0B] text-white selection:bg-blue-500/30">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 overflow-hidden">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                    <div className="relative z-10">
                        <div className="flex gap-2 mb-6 flex-wrap">
                            {['Security', 'Compliance', 'Liquidity', 'Transparency'].map((chip) => (
                                <span key={chip} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-slate-300">
                                    {chip}
                                </span>
                            ))}
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
                            The Institutional Standard for Digital Asset Exchange.
                        </h1>
                        <p className="text-xl text-slate-400 mb-8 max-w-lg leading-relaxed">
                            FINORA provides retail users, institutional investors, and global partners with a secure, compliant environment to access digital assets.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Button size="lg" className="bg-white text-black hover:bg-slate-200 px-8">
                                Start Trading
                            </Button>
                            <Button size="lg" variant="outline" className="border-white/10 hover:bg-white/5 px-8">
                                Contact Us
                            </Button>
                        </div>

                        <div className="mt-12 grid grid-cols-3 gap-8 border-t border-white/5 pt-8">
                            <div>
                                <p className="text-2xl font-bold text-white">10+</p>
                                <p className="text-xs text-slate-500 uppercase tracking-wider">Years Fintech Exp.</p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-white">Global</p>
                                <p className="text-xs text-slate-500 uppercase tracking-wider">Access Controls</p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-white">100%</p>
                                <p className="text-xs text-slate-500 uppercase tracking-wider">Asset Segregation</p>
                            </div>
                        </div>
                    </div>
                    <div className="relative hidden lg:block">
                        {/* Abstract Visual Placeholder */}
                        <div className="absolute inset-0 bg-blue-500/10 blur-[120px] rounded-full"></div>
                        <div className="relative aspect-square border border-white/5 rounded-2xl bg-gradient-to-br from-white/5 to-transparent flex items-center justify-center overflow-hidden">
                            <div className="grid grid-cols-3 gap-4 opacity-20">
                                {[...Array(9)].map((_, i) => (
                                    <div key={i} className="w-16 h-16 border border-white/20 rounded-lg"></div>
                                ))}
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Shield size={120} className="text-white/10 stroke-[1]" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-24 px-6 border-y border-white/5">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-16">Our Commitment to the Future of Finance.</h2>
                    <div className="grid md:grid-cols-2 gap-16 text-left">
                        <div>
                            <h3 className="text-white font-semibold mb-4 text-xl">Mission</h3>
                            <p className="text-slate-400 leading-relaxed mb-6">
                                To democratize access to digital assets by building infrastructure that prioritizes user safety over speculative growth.
                            </p>
                            <ul className="space-y-3">
                                {['Regulatory fragmentation', 'Custodial risk', 'Market opacity'].map(item => (
                                    <li key={item} className="flex items-center gap-2 text-sm text-slate-500">
                                        <CheckCircle2 size={14} className="text-blue-500" /> Solving {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-white font-semibold mb-4 text-xl">Vision</h3>
                            <p className="text-slate-400 leading-relaxed mb-6">
                                To become the primary bridge between traditional finance and digital assets through a globally scalable ecosystem.
                            </p>
                            <p className="text-sm text-slate-500 italic border-l-2 border-blue-500/50 pl-4">
                                Focus on expanding regional footprints through local partnerships and infrastructure-grade reliability.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Trust Us */}
            <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold mb-12 text-center">Built on Pillars of Accountability.</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <Card className="p-8 bg-white/5 border-white/10">
                            <BarChart3 className="mb-6 text-blue-400" size={32} />
                            <h3 className="text-xl font-semibold mb-4">Financial Infrastructure</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                FINORA is defined as an infrastructure provider first. We prioritize stability and absolute protection over short-term revenue.
                            </p>
                        </Card>
                        <Card className="p-8 bg-white/5 border-white/10">
                            <Lock className="mb-6 text-blue-400" size={32} />
                            <h3 className="text-xl font-semibold mb-4">Security & Compliance</h3>
                            <ul className="text-slate-400 text-sm space-y-3">
                                <li>• Strict Asset Segregation</li>
                                <li>• Institutional Cold-Storage Custody</li>
                                <li>• Compliance by Design (KYC/AML)</li>
                            </ul>
                        </Card>
                        <Card className="p-8 bg-white/5 border-white/10">
                            <Globe className="mb-6 text-blue-400" size={32} />
                            <h3 className="text-xl font-semibold mb-4">Fair Market Operations</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Rigorous listing standards and robust internal governance ensure market integrity and user protection.
                            </p>
                        </Card>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-6 bg-gradient-to-t from-blue-600/5 to-transparent">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-6">Join a platform built for the long term.</h2>
                    <p className="text-slate-400 mb-10">Start trading with the confidence of institutional-grade security.</p>
                    <div className="flex justify-center gap-4">
                        <Button size="lg" className="bg-white text-black hover:bg-slate-200">Start Trading</Button>
                        <Button size="lg" variant="outline" className="border-white/10 hover:bg-white/5">Contact Us</Button>
                    </div>
                    <p className="mt-6 text-xs text-slate-500 uppercase tracking-widest italic">Takes less than 3 minutes to verify.</p>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;