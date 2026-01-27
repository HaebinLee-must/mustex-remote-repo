import React from 'react';
import { Shield, Zap, Headphones, CheckCircle2 } from 'lucide-react';

const Features: React.FC = () => {
    const items = [
        {
            icon: <Shield />,
            title: "Secure Wallets",
            desc: "멀티시그 및 콜드 월렛 시스템으로 귀하의 자산을 철통같이 보호합니다."
        },
        {
            icon: <Zap />,
            title: "High-Speed Engine",
            desc: "초당 100만 건 이상의 주문을 처리하는 고성능 매칭 엔진을 탑재했습니다."
        },
        {
            icon: <Headphones />,
            title: "24/7 Support",
            desc: "글로벌 고객 지원팀이 연중무휴 실시간으로 문제를 해결해 드립니다."
        },
        {
            icon: <CheckCircle2 />,
            title: "Compliance-Ready",
            desc: "글로벌 규제를 준수하며, 투명하고 신뢰할 수 있는 운영을 약속합니다."
        }
    ];

    return (
        <section id="features" className="w-full py-16 md:py-24 px-4 md:px-6 bg-slate-900/20 border-y border-slate-800/50">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 space-y-4 max-w-2xl mx-auto">
                    <h2 className="text-3xl font-bold text-white uppercase tracking-tight">FINORA CORE FEATURES</h2>
                    <p className="text-slate-400 text-lg">최상의 거래 경험을 위해 설계된 강력한 기능들을 만나보세요.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {items.map((feat, i) => (
                        <div key={i} className="p-8 rounded-2xl bg-slate-950 border border-slate-800 hover:border-primary/50 hover:bg-slate-900 transition-all duration-300 group relative overflow-hidden text-left">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-[100px] -mr-4 -mt-4 transition-transform group-hover:scale-150"></div>
                            <div className="w-14 h-14 rounded-xl bg-slate-900 border border-slate-800 text-primary flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white group-hover:border-transparent transition-all shadow-lg">
                                {React.cloneElement(feat.icon as React.ReactElement, { className: "w-6 h-6" })}
                            </div>
                            <h3 className="text-lg font-bold text-white mb-3">{feat.title}</h3>
                            <p className="text-sm text-slate-400 leading-relaxed">{feat.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;