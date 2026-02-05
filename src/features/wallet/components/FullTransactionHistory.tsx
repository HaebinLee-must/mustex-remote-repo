import React, { useState } from 'react';
import { MOCK_HISTORY } from '../services/mockWalletData';
import { Search, RotateCcw } from 'lucide-react';

const FullTransactionHistory: React.FC = () => {
    const [filterType, setFilterType] = useState('All');

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col space-y-2">
                <h2 className="text-2xl font-black text-foreground">Transaction History</h2>
                <p className="text-sm text-muted-foreground italic">View and manage your transaction history</p>
            </div>

            {/* Filters Area */}
            <div className="flex flex-wrap items-center gap-4 bg-card/20 backdrop-blur-sm p-6 rounded-2xl border border-border/50">
                <div className="flex flex-col space-y-1.5">
                    <label className="text-[10px] font-black text-muted-foreground uppercase tracking-wider ml-1">Type</label>
                    <div className="relative group">
                        <select
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            className="bg-background border border-border/20 rounded-xl px-4 py-2.5 text-sm font-bold appearance-none min-w-[140px] focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all hover:bg-accent/10"
                        >
                            <option>All</option>
                            <option>Deposit</option>
                            <option>Withdraw</option>
                            <option>Transfer</option>
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col space-y-1.5 flex-1 min-w-[200px]">
                    <label className="text-[10px] font-black text-muted-foreground uppercase tracking-wider ml-1">Date Range</label>
                    <div className="flex items-center space-x-2">
                        <input type="date" className="bg-background border border-border/20 rounded-xl px-4 py-2 text-sm font-bold flex-1 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
                        <span className="text-muted-foreground opacity-30">→</span>
                        <input type="date" className="bg-background border border-border/20 rounded-xl px-4 py-2 text-sm font-bold flex-1 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
                    </div>
                </div>

                <div className="flex items-end space-x-2 pb-0.5 mt-auto">
                    <button className="bg-primary hover:bg-primary/90 text-primary-foreground font-black px-8 py-2.5 rounded-xl text-sm transition-all shadow-lg active:scale-95">
                        Search
                    </button>
                    <button className="p-2.5 rounded-xl border border-border/20 hover:bg-accent/20 transition-colors text-muted-foreground">
                        <RotateCcw className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Table Area */}
            <div className="bg-card/40 backdrop-blur-sm rounded-2xl border border-border/50 overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm tabular-nums">
                        <thead>
                            <tr className="text-muted-foreground text-[11px] font-bold uppercase tracking-widest border-b border-border/10 italic">
                                <th className="px-6 py-5 text-left font-normal">Time</th>
                                <th className="px-6 py-5 text-left font-normal">Type</th>
                                <th className="px-6 py-5 text-left font-normal">To/From</th>
                                <th className="px-6 py-5 text-right font-normal">Amount</th>
                                <th className="px-6 py-5 text-left font-normal">Currency</th>
                                <th className="px-6 py-5 text-center font-normal">Status</th>
                                <th className="px-6 py-5 text-right font-normal">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/5">
                            {MOCK_HISTORY.map((tx) => (
                                <tr key={tx.id} className="hover:bg-accent/10 transition-colors group">
                                    <td className="px-6 py-5 text-muted-foreground font-medium italic">{tx.date}</td>
                                    <td className="px-6 py-5">
                                        <span className={`font-black text-[11px] px-2 py-0.5 rounded uppercase ${tx.type === 'DEPOSIT' ? 'text-success' : 'text-danger'
                                            }`}>
                                            {tx.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex flex-col">
                                            <span className="font-bold text-foreground truncate max-w-[150px]">
                                                {tx.type === 'DEPOSIT' ? tx.details?.fromAddress : tx.details?.toAddress || tx.address}
                                            </span>
                                            <span className="text-[10px] text-muted-foreground opacity-50 font-mono">{tx.network}</span>
                                        </div>
                                    </td>
                                    <td className={`px-6 py-5 text-right font-black ${tx.type === 'DEPOSIT' ? 'text-success' : 'text-foreground'
                                        }`}>
                                        {tx.type === 'DEPOSIT' ? '+' : '-'}{tx.amount.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-5 font-black text-foreground">{tx.coin}</td>
                                    <td className="px-6 py-5 text-center">
                                        <span className={`px-3 py-1 rounded-full text-[11px] font-black ${tx.status === 'COMPLETED' ? 'bg-success/10 text-success' :
                                                tx.status === 'PENDING' ? 'bg-primary/10 text-primary' : 'bg-danger/10 text-danger'
                                            }`}>
                                            {tx.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <button className="text-primary hover:text-primary/80 font-black text-xs transition-colors">Details</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="p-6 border-t border-border/10 flex items-center justify-between">
                    <div className="text-xs text-muted-foreground font-bold">Showing 1-10 of 25 transactions</div>
                    <div className="flex items-center space-x-2">
                        <button className="p-2 rounded-lg border border-border/20 hover:bg-accent/20 transition-colors disabled:opacity-30" disabled>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                        </button>
                        {[1, 2, 3].map(p => (
                            <button key={p} className={`w-8 h-8 rounded-lg font-black text-xs transition-all ${p === 1 ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' : 'hover:bg-accent/20 text-muted-foreground'}`}>
                                {p}
                            </button>
                        ))}
                        <button className="p-2 rounded-lg border border-border/20 hover:bg-accent/20 transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FullTransactionHistory;
