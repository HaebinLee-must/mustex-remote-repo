import React from 'react';
import { ShieldCheck, Zap, Headphones } from 'lucide-react';

const Features: React.FC = () => {
    const items = [
        {
            icon: <ShieldCheck className="w-8 h-8" />,
            title: "Secure Wallets",
            desc: "Multi-tier & multi-cluster system architecture and SAFU fund to protect your assets."
        },
        {
            icon: <Zap className="w-8 h-8" />,
            title: "Operating Speed",
            desc: "Our matching engine supports up to 1,400,000 orders per second, ensuring trades are instant."
        },
        {
            icon: <Headphones className="w-8 h-8" />,
            title: "24/7 Support",
            desc: "Our global support team is available around the clock to help you with any issues."
        }
    ];

    return (
        <section className="py-24 bg-dark-surface/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center gap-20">
                <div className="grid md:grid-cols-3 gap-10 w-full">
                    {items.map((item, idx) => (
                        <div key={idx} className="p-10 bg-dark-main rounded-[2.5rem] border border-dark-border hover:border-primary/50 transition-all duration-500 group flex flex-col gap-8 text-left shadow-xl">
                            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-xl shadow-indigo-500/5 shrink-0">
                                {item.icon}
                            </div>
                            <div className="flex flex-col gap-4">
                                <h3 className="text-2xl font-black tracking-tight text-white font-sans">{item.title}</h3>
                                <p className="text-dark-muted text-sm leading-relaxed font-medium">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
