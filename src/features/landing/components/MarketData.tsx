import React from 'react';
import { ChevronRight } from 'lucide-react';

const Badge = ({ children, isPositive }: { children: React.ReactNode, isPositive: boolean }) => (
    <span className={`px-2 py-0.5 rounded text-xs font-bold tracking-wide ${isPositive ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
        {children}
    </span>
);

const MarketData: React.FC = () => {
    const markets = [
        { name: "BTC", sym: "USDT", price: "42,500.50", vol: "1.28B", change: 2.5 },
        { name: "ETH", sym: "USDT", price: "2,250.10", vol: "840M", change: -1.2 },
        { name: "BNB", sym: "USDT", price: "312.45", vol: "150M", change: 0.8 },
        { name: "SOL", sym: "USDT", price: "98.20", vol: "420M", change: 5.4 },
        { name: "XRP", sym: "USDT", price: "0.56", vol: "90M", change: -0.5 },
    ];

    return (
        <div className="w-full bg-black">
            {/* Trust Metrics Strip - Black Glass */}
            <div className="border-y border-white/5 bg-black/50 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x-0 md:divide-x divide-white/5">
                        {[
                            { label: "24h Volume (USDT)", value: "700,703,761" },
                            { label: "Active Users", value: "1.2M+" },
                            { label: "Assets Supported", value: "600+" },
                            { label: "Avg. Latency", value: "< 50ms" }
                        ].map((item, idx) => (
                            <div key={idx} className="flex flex-col gap-2 px-2">
                                <span className="text-2xl md:text-3xl font-bold text-white tracking-tight cursor-default">{item.value}</span>
                                <span className="text-sm text-slate-500 font-medium">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Market Trends Section */}
            <section id="market" className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8 space-y-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 text-left">
                    <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Market Trends</h2>
                    <a href="#" className="text-white text-sm font-semibold hover:opacity-80 flex items-center gap-1 group transition-all">
                        View More
                        <span className="group-hover:translate-x-1 transition-transform"><ChevronRight className="w-4 h-4" /></span>
                    </a>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Left: Highlight Card - Black Surface */}
                    <div className="bg-black backdrop-blur-xl rounded-2xl p-6 border border-white/5 flex flex-col justify-between h-full relative overflow-hidden group hover:border-white/10 transition-all text-left shadow-2xl">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110 duration-500"></div>
                        <div className="relative z-10">
                            <div className="text-slate-400 mb-2 flex items-center gap-2 font-medium">
                                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">₿</div>
                                Bitcoin <span className="text-slate-600">BTC</span>
                            </div>
                            <div className="text-3xl md:text-4xl font-bold text-white mb-2">$42,500.50</div>
                            <Badge isPositive={true}>+2.45%</Badge>
                        </div>
                        <div className="h-24 mt-8 flex items-end gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                            {[40, 60, 45, 70, 50, 80, 65, 90, 75, 100].map((h, i) => (
                                <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-gradient-to-t from-blue-600/20 to-blue-500/50 rounded-t-sm hover:from-blue-500 hover:to-blue-400 transition-colors"></div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Table - Black Surface */}
                    <div className="lg:col-span-2 bg-black backdrop-blur-xl rounded-2xl border border-white/5 overflow-hidden shadow-2xl">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-[#1E2329]/30 text-slate-400 text-xs uppercase tracking-wider border-b border-white/5">
                                    <tr>
                                        <th className="px-6 py-4 font-semibold">Currency</th>
                                        <th className="px-6 py-4 font-semibold">Price</th>
                                        <th className="px-6 py-4 font-semibold hidden sm:table-cell">24H Volume</th>
                                        <th className="px-6 py-4 font-semibold text-right">Change</th>
                                        <th className="px-4 py-4"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {markets.map((row, i) => (
                                        <tr key={i} className="hover:bg-white/[0.03] transition-colors group cursor-pointer">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-xs font-bold text-slate-400 group-hover:text-white group-hover:bg-primary transition-colors">
                                                        {row.name[0]}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-white group-hover:text-primary transition-colors">{row.name}</div>
                                                        <div className="text-xs text-slate-500">{row.sym}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-slate-300 font-medium">${row.price}</td>
                                            <td className="px-6 py-4 text-slate-500 hidden sm:table-cell">{row.vol}</td>
                                            <td className="px-6 py-4 text-right">
                                                <span className={`font-medium ${row.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                                                    {row.change > 0 ? '+' : ''}{row.change}%
                                                </span>
                                            </td>
                                            <td className="px-4 py-4 text-right">
                                                <div className="h-8 w-8 inline-flex items-center justify-center rounded-full text-slate-500 group-hover:text-white group-hover:bg-white/5 transition-all">
                                                    <ChevronRight className="w-4 h-4" />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MarketData;