import React from 'react';

const MarketData: React.FC = () => {
    const markets = [
        { symbol: 'BTC/USDT', price: '42,500.50', volume: '1.2B', change: '+2.5%', isUp: true },
        { symbol: 'ETH/USDT', price: '2,250.10', volume: '840M', change: '-1.2%', isUp: false },
        { symbol: 'BNB/USDT', price: '312.45', volume: '150M', change: '+0.8%', isUp: true },
    ];

    return (
        <section className="py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col gap-16 text-left">
                <h2 className="text-4xl font-black tracking-tight text-white uppercase tracking-widest border-l-4 border-primary pl-6 font-sans">Market Trends</h2>

                <div className="grid lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-1 bg-dark-surface p-10 rounded-[2.5rem] border border-dark-border shadow-2xl flex flex-col gap-10">
                        <div className="flex justify-between items-center text-left">
                            <div className="flex flex-col gap-1">
                                <div className="text-[10px] font-black uppercase text-dark-muted tracking-widest font-sans">Current Price</div>
                                <div className="text-3xl font-black tabular-nums text-white">$42,500.50</div>
                            </div>
                            <div className="bg-success/10 px-4 py-1.5 rounded-xl border border-success/20">
                                <div className="text-xs text-success font-black tracking-widest">+2.45%</div>
                            </div>
                        </div>
                        <div className="h-40 flex items-end gap-2 px-1">
                            {[30, 45, 40, 60, 55, 80, 100].map((h, i) => (
                                <div
                                    key={i}
                                    className={`flex-grow rounded-t-xl transition-all duration-1000 ${i === 6 ? 'bg-primary shadow-lg shadow-indigo-500/20' : 'bg-primary/20'}`}
                                    style={{ height: `${h}%` }}
                                ></div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-2 bg-dark-surface rounded-[2.5rem] border border-dark-border overflow-hidden shadow-2xl">
                        <table className="w-full text-left">
                            <thead className="bg-dark-main text-dark-muted text-[10px] font-black uppercase tracking-[0.2em] font-sans">
                                <tr>
                                    <th className="px-10 py-6">Currency</th>
                                    <th className="px-10 py-6 text-right">Price</th>
                                    <th className="px-10 py-6 text-right">Volume 24h</th>
                                    <th className="px-10 py-6 text-right">Change 24h</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-dark-border tabular-nums text-sm font-bold">
                                {markets.map((m) => (
                                    <tr key={m.symbol} className="hover:bg-dark-main/50 transition group cursor-pointer">
                                        <td className="px-10 py-8 flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-2xl bg-dark-main border border-dark-border flex items-center justify-center text-xs font-black group-hover:border-primary group-hover:text-primary transition-all duration-500">
                                                {m.symbol[0]}
                                            </div>
                                            <span className="text-white">{m.symbol}</span>
                                        </td>
                                        <td className="px-10 py-8 text-right font-black tracking-tight text-white">{m.price}</td>
                                        <td className="px-10 py-8 text-right text-dark-muted font-medium uppercase tracking-tighter">{m.volume}</td>
                                        <td className={`px-10 py-8 text-right font-black tracking-widest ${m.isUp ? 'text-success' : 'text-danger'}`}>{m.change}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MarketData;
