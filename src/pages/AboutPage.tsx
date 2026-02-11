import React, { useState, useEffect, useRef } from 'react';
import {
    Shield, Globe, Users, Scale, Lock, CheckCircle, ArrowRight,
    Building, ChevronRight, ChevronLeft
} from 'lucide-react';

/* --- UI Components --- */

const Button = ({ variant = 'primary', className = '', children, ...props }: any) => {
    const baseStyle = "px-6 py-3 rounded-full font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2";
    const variants: any = {
        primary: "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/30",
        secondary: "bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/10",
        outline: "border border-indigo-500 text-indigo-400 hover:bg-indigo-500/10",
        white: "bg-white text-indigo-900 hover:bg-slate-100 shadow-lg",
        small: "px-5 py-2.5 bg-indigo-600 text-white hover:bg-indigo-500 shadow-md shadow-indigo-500/20 rounded-full text-sm font-bold transition-all"
    };
    return <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>{children}</button>;
};

const SectionHeading = ({ subtitle, title, description, align = 'center' }: any) => (
    <div className={`mb-16 ${align === 'left' ? 'text-left' : 'text-center'}`}>
        <span className="inline-block py-1 px-3 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold tracking-wider uppercase mb-4">
            {subtitle}
        </span>
        <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4">
            {title}
        </h2>
        {description && (
            <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
                {description}
            </p>
        )}
    </div>
);

/* --- About Page --- */
const AboutPage = () => {
    const [currentReview, setCurrentReview] = useState(0);

    const reviews = [
        {
            id: 1,
            quote: "FINORA has set a new standard for crypto exchange security. Their proactive approach to regulation and transparent operations makes them a preferred partner for institutional investors.",
            author: "Bloomberg News",
            type: "Media Review",
            logo: (
                <div className="w-12 h-12 bg-white rounded flex items-center justify-center font-bold text-black text-xs shrink-0">BN</div>
            )
        },
        {
            id: 2,
            quote: "We've been happily trading on FINORA and highly value our business relationship and look forward to carrying on.",
            author: "Nibbio Partners",
            type: "Partners",
            logo: (
                <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-indigo-400 italic">nibbio</span>
                </div>
            )
        }
    ];

    const nextReview = () => {
        setCurrentReview((prev) => (prev + 1) % reviews.length);
    };

    const prevReview = () => {
        setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
    };

    return (
        <div className="bg-[#0B0E14] text-white font-sans pt-20">

            {/* 1. Identity Hero */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 bg-[#0B0E14]">
                    {/* Subtle Grid Background */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                    <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-b from-indigo-900/10 to-transparent pointer-events-none"></div>
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold tracking-wider uppercase mb-6 border border-indigo-500/20">
                            Institutional Grade Infrastructure
                        </div>
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-8 leading-tight text-white">
                            Secure, Compliant, and <br />
                            <span className="text-indigo-500">Accessible Digital Asset Exchange</span>
                        </h1>
                        <div className="text-xl text-slate-400 leading-relaxed mb-12 border-l-4 border-indigo-500 pl-6">
                            FINORA는 단순한 거래소가 아닙니다.<br className="hidden md:block" />
                            우리는 규제 불확실성을 해소하고, 가장 투명한 방식으로<br className="hidden md:block" />
                            디지털 자산 시장의 신뢰를 구축하는 금융 인프라입니다.
                        </div>

                        <div className="flex flex-wrap gap-8 text-sm font-medium text-slate-400">
                            <div className="flex items-center gap-2">
                                <Shield className="w-5 h-5 text-indigo-500" /> User Protection Fund
                            </div>
                            <div className="flex items-center gap-2">
                                <Scale className="w-5 h-5 text-indigo-500" /> Fully Regulated
                            </div>
                            <div className="flex items-center gap-2">
                                <Lock className="w-5 h-5 text-indigo-500" /> ISO/IEC 27001
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Mission & Vision */}
            <section className="py-24 bg-[#0F1218]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col gap-8">
                        {/* Mission Card */}
                        <div className="p-10 md:p-12 rounded-3xl bg-[#151921] border border-white/5 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                            <div className="relative z-10">
                                <h3 className="text-indigo-400 font-bold uppercase tracking-wider text-sm mb-4">Our Mission</h3>
                                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">신뢰를 전제로 한<br />거래 환경 구축</h2>
                                <p className="text-slate-400 leading-relaxed mb-10 max-w-3xl text-lg">
                                    단기적인 수익을 위해 보안을 타협하지 않습니다.
                                    우리는 사용자의 자산 보호를 최우선 가치로 두며,
                                    제도권 금융 수준의 컴플라이언스 기준을 준수합니다.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                    {['투명한 자산 내역 공개 (PoR)', '엄격한 상장 심사 기준', '24/7 이상징후 모니터링'].map((item, i) => (
                                        <div key={i} className="flex items-center gap-3 text-slate-300 font-medium bg-black/20 p-4 rounded-xl border border-white/5">
                                            <CheckCircle className="w-5 h-5 text-indigo-500 flex-shrink-0" /> {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Vision Card */}
                        <div className="p-10 md:p-12 rounded-3xl bg-indigo-900/10 border border-indigo-500/10 relative overflow-hidden flex flex-col justify-center">
                            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
                            <div className="relative z-10">
                                <h3 className="text-purple-400 font-bold uppercase tracking-wider text-sm mb-4">Our Vision</h3>
                                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">규제 친화적<br />글로벌 금융 인프라</h2>
                                <p className="text-slate-400 leading-relaxed mb-0 max-w-3xl text-lg">
                                    FINORA는 디지털 자산이 미래 금융의 핵심이 될 것이라 믿습니다.
                                    은행, 기관, 그리고 개인이 모두 안심하고 사용할 수 있는
                                    가장 안전한 연결 고리가 되겠습니다.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Trust & Compliance */}
            <section className="py-24 bg-[#0B0E14]">
                <div className="max-w-7xl mx-auto px-6">
                    <SectionHeading subtitle="Transparency" title="Our Advantage" />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-[#151921] p-8 rounded-2xl border border-white/5 hover:border-indigo-500/30 transition-colors">
                            <div className="w-14 h-14 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-6">
                                <Building className="w-7 h-7 text-indigo-500" />
                            </div>
                            <h4 className="text-xl font-bold mb-4 text-white">100% Reserve</h4>
                            <p className="text-slate-400 text-sm leading-relaxed mb-6">
                                고객의 자산은 회사 자산과 철저히 분리되어 보관됩니다.
                                Merkle Tree 기반의 지급준비금 증명(PoR)을 정기적으로 제공합니다.
                            </p>
                            <a href="#" className="text-indigo-400 text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all">View Proof of Reserves <ArrowRight className="w-4 h-4" /></a>
                        </div>

                        <div className="bg-[#151921] p-8 rounded-2xl border border-white/5 hover:border-indigo-500/30 transition-colors">
                            <div className="w-14 h-14 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-6">
                                <Shield className="w-7 h-7 text-indigo-500" />
                            </div>
                            <h4 className="text-xl font-bold mb-4 text-white">Security First</h4>
                            <p className="text-slate-400 text-sm leading-relaxed mb-6">
                                업계 최고 수준의 커스터디 파트너와 협력하여 콜드 월렛 보관,
                                멀티 시그(Multi-sig) 기술을 통해 해킹 위협을 원천 차단합니다.
                            </p>
                        </div>

                        <div className="bg-[#151921] p-8 rounded-2xl border border-white/5 hover:border-indigo-500/30 transition-colors">
                            <div className="w-14 h-14 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-6">
                                <Scale className="w-7 h-7 text-indigo-500" />
                            </div>
                            <h4 className="text-xl font-bold mb-4 text-white">Global Compliance</h4>
                            <p className="text-slate-400 text-sm leading-relaxed mb-6">
                                자금세탁방지(AML) 및 고객확인제도(KYC)를 철저히 준수하며,
                                각 국가의 규제 당국과 긴밀히 협력하여 라이선스를 취득합니다.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Media & Partners */}
            <section className="py-24 bg-[#0F1218] border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col gap-24">

                        {/* Partners List */}
                        <div>
                            <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
                                <div>
                                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-3 text-white">
                                        Strategic Partners <div className="h-px w-12 bg-indigo-500"></div>
                                    </h3>
                                    <p className="text-slate-400 max-w-2xl text-lg">
                                        우리는 글로벌 규제 기관, 보안 감사 업체, 그리고 일류 금융 파트너들과 함께<br className="hidden md:block" />
                                        가장 안전한 생태계를 만들어갑니다.
                                    </p>
                                </div>

                                <div className="text-right">
                                    <h4 className="font-bold text-white mb-2 text-sm uppercase tracking-wide">Institutional Inquiries</h4>
                                    <a href="#" className="text-indigo-400 font-bold text-sm hover:text-indigo-300 flex items-center justify-end gap-1">
                                        Contact Business Team <ArrowRight className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                {[
                                    { name: 'Custody Partner', type: 'Security' },
                                    { name: 'Audit Firm', type: 'Finance' },
                                    { name: 'Legal Advisor', type: 'Compliance' },
                                    { name: 'Banking Partner', type: 'Payment' }
                                ].map((p, i) => (
                                    <div key={i} className="h-32 border border-white/10 rounded-2xl flex flex-col items-center justify-center bg-[#1A1D26] hover:bg-[#20242e] hover:border-indigo-500/30 transition-all cursor-pointer group">
                                        <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center mb-3 group-hover:bg-indigo-500 group-hover:text-white transition-colors text-slate-500">
                                            <Users className="w-5 h-5" />
                                        </div>
                                        <span className="text-slate-300 font-bold text-lg">{p.name}</span>
                                        <span className="text-xs text-slate-500 mt-1 uppercase tracking-wider">{p.type}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Reviews */}
                        <div>
                            <div className="flex justify-between items-end mb-8">
                                <h3 className="text-3xl font-bold text-white">
                                    What others are saying?
                                </h3>
                                <div className="flex gap-2">
                                    <button
                                        onClick={prevReview}
                                        className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={nextReview}
                                        className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
                                    >
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            <div className="bg-[#151921] p-12 md:p-20 rounded-3xl border border-white/5 flex flex-col items-center text-center relative overflow-hidden transition-all duration-300">
                                <blockquote className="text-xl md:text-3xl text-slate-200 font-medium leading-relaxed max-w-4xl mx-auto relative z-10 mb-10 transition-all">
                                    "{reviews[currentReview].quote}"
                                </blockquote>

                                <div className="flex flex-col items-center gap-4 relative z-10">
                                    <div className="h-8 flex items-center justify-center min-w-[120px]">
                                        {reviews[currentReview].logo}
                                    </div>
                                    <div>
                                        <p className="text-lg font-bold text-white mb-1">{reviews[currentReview].author}</p>
                                        <span className="text-sm font-bold text-slate-500 uppercase tracking-widest border-t border-white/10 pt-2 px-4 inline-block">
                                            {reviews[currentReview].type}
                                        </span>
                                    </div>
                                </div>

                                {/* Dots Indicator */}
                                <div className="flex gap-2 mt-12">
                                    {reviews.map((_, index) => (
                                        <div
                                            key={index}
                                            className={`h-1.5 rounded-full transition-all duration-300 ${index === currentReview ? 'w-8 bg-indigo-500' : 'w-1.5 bg-white/20'}`}
                                        ></div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* 5. CTA */}
            <section className="py-24 bg-gradient-to-r from-indigo-900 to-[#0B0E14] border-t border-white/5">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-6 text-white">Ready to partner with FINORA?</h2>
                    <p className="text-indigo-200 mb-10 max-w-2xl mx-auto">
                        안전하고 투명한 디지털 자산 인프라가 필요한 기업 및 기관 파트너를 기다립니다.
                    </p>
                    <div className="flex justify-center">
                        <Button variant="white">Contact Partnership</Button>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default AboutPage;