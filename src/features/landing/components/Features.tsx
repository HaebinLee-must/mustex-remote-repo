import React from 'react';
import { Shield, Zap, Globe, MessageSquare } from 'lucide-react';
import { useLanguage } from '../../shared/hooks/useLanguage';

const Features = () => {
    const { t } = useLanguage();

    const features = [
        {
            icon: <Shield className="w-6 h-6 text-indigo-400" />,
            title: t('landing.features.security.title'),
            desc: t('landing.features.security.desc')
        },
        {
            icon: <Zap className="w-6 h-6 text-indigo-400" />,
            title: t('landing.features.speed.title'),
            desc: t('landing.features.speed.desc')
        },
        {
            icon: <MessageSquare className="w-6 h-6 text-indigo-400" />,
            title: t('landing.features.support.title'),
            desc: t('landing.features.support.desc')
        },
        {
            icon: <Globe className="w-6 h-6 text-indigo-400" />,
            title: t('landing.features.compliance.title'),
            desc: t('landing.features.compliance.desc')
        }
    ];

    return (
        <section className="py-24 bg-slate-950 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-white tracking-tight">{t('landing.features.title')}</h2>
                    <p className="text-slate-400 text-lg">{t('landing.features.subtitle')}</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feat, i) => (
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