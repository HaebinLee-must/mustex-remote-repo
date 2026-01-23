import React, { useContext } from 'react';
import { LanguageContext } from '../../../App';

const Highlight: React.FC = () => {
    const { lang } = useContext(LanguageContext);

    return (
        <section className="py-24 bg-dark-surface/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-32 items-center text-left">
                <div className="order-2 md:order-1 relative flex items-center justify-center">
                    <div className="absolute inset-0 bg-primary/20 blur-[120px] -z-10 transition duration-1000"></div>
                    <img
                        src="screens/mustex_trade.png"
                        alt="Product UI"
                        className="rounded-[3rem] shadow-2xl border border-dark-border opacity-90 hover:opacity-100 transition-all duration-700 transform hover:scale-[1.02]"
                    />
                </div>
                <div className="flex flex-col gap-10 order-1 md:order-2 text-left font-sans">
                    <div className="flex flex-col gap-6">
                        <h2 className="text-5xl font-black tracking-tight leading-tight text-white uppercase">
                            {lang === 'ko' ? '사용자 친화적이고' : (lang === 'mn' ? 'Хэрэглэхэд хялбар' : 'User-friendly and')} <br />
                            <span className="text-primary italic">{lang === 'ko' ? '빠른 인터페이스' : (lang === 'mn' ? 'хурдан интерфэйс' : 'fast interface')}</span>
                        </h2>
                        <p className="text-dark-muted leading-relaxed text-lg font-medium">
                            {lang === 'ko'
                                ? '당사의 거래 터미널은 초당 수천 개의 주문을 처리할 수 있는 고성능 엔진을 기반으로 구축되었습니다. 모든 장치에서 지연 없는 실시간 업데이트를 경험하십시오.'
                                : (lang === 'mn'
                                    ? 'Манай арилжааны терминал нь секундэд мянга мянган захиалга боловсруулах чадвартай өндөр гүйцэтгэлтэй систем дээр суурилсан.'
                                    : 'Our trading terminal is built on a high-performance engine capable of processing thousands of orders per second. Experience zero lag and real-time updates across all your devices.')}
                        </p>
                    </div>

                    <div className="h-px bg-dark-border w-24"></div>

                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-4 text-sm text-primary font-black uppercase tracking-[0.2em]">
                            <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
                            <span>Deep Liquidity</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-primary font-black uppercase tracking-[0.2em] opacity-80">
                            <div className="w-2 h-2 rounded-full bg-primary opacity-50"></div>
                            <span>Pro Charting Tools</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-primary font-black uppercase tracking-[0.2em] opacity-60">
                            <div className="w-2 h-2 rounded-full bg-primary opacity-30"></div>
                            <span>Zero Lag execution</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Highlight;
