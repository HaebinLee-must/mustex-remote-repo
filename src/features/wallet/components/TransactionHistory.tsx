import React, { useState } from 'react';
import { MOCK_HISTORY } from '../services/mockWalletData';
import { ChevronRight } from 'lucide-react';

interface TransactionHistoryProps {
    onMoreClick?: () => void;
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ onMoreClick }) => {
    const [expandedTxId, setExpandedTxId] = useState<string | null>(null);

    const toggleExpand = (id: string) => {
        setExpandedTxId(expandedTxId === id ? null : id);
    };

    return (
        <div className="bg-card/40 backdrop-blur-sm rounded-xl border border-border overflow-hidden">
            {/* Header Section */}
            <div className="px-6 py-5 flex items-center justify-between border-b border-border">
                <div className="flex items-center space-x-3">
                    <h3 className="font-bold text-lg text-foreground">Recent Transactions</h3>
                    <button
                        onClick={() => onMoreClick?.()}
                        className="text-xs font-bold text-primary hover:text-primary/80 transition-colors flex items-center cursor-pointer"
                    >
                        More <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                    </button>
                </div>
                <button className="flex items-center space-x-1 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors group">
                    <span>Small Amount Exchange</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm tabular-nums">
                    <thead>
                        <tr className="text-muted-foreground text-[12px] font-medium border-b border-border italic">
                            <th className="px-6 py-4 text-left font-normal">Transactions</th>
                            <th className="px-6 py-4 text-right font-normal">Amount</th>
                            <th className="px-6 py-4 text-right font-normal">Date</th>
                            <th className="px-6 py-4 text-right font-normal">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border/30">
                        {MOCK_HISTORY.length > 0 ? (
                            MOCK_HISTORY.map((tx) => (
                                <React.Fragment key={tx.id}>
                                    <tr
                                        onClick={() => toggleExpand(tx.id)}
                                        className={`hover:bg-accent/20 transition-all cursor-pointer group ${expandedTxId === tx.id ? 'bg-accent/10' : ''}`}
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-3">
                                                <div className={`transition-colors ${expandedTxId === tx.id ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'}`}>
                                                    {tx.type === 'DEPOSIT' ? (
                                                        <svg className={`w-5 h-5 transition-transform ${expandedTxId === tx.id ? 'rotate-[-45deg]' : 'rotate-[135deg]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                                        </svg>
                                                    ) : (
                                                        <svg className={`w-5 h-5 transition-transform ${expandedTxId === tx.id ? 'rotate-[135deg]' : '-rotate-45'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                                        </svg>
                                                    )}
                                                </div>
                                                <span className="font-bold text-foreground capitalize">
                                                    {tx.type.toLowerCase()} {tx.coin}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right font-black text-foreground">
                                            {tx.type === 'DEPOSIT' ? '+' : '-'}{tx.amount.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 text-right text-muted-foreground font-medium italic">
                                            {tx.date}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <span className={`font-bold px-2.5 py-1 rounded-md text-[11px] ${tx.status === 'COMPLETED' ? 'bg-success/10 text-success' :
                                                tx.status === 'PENDING' ? 'bg-primary/10 text-primary' : 'bg-danger/10 text-danger'
                                                }`}>
                                                {tx.status === 'COMPLETED' ? 'Completed' : tx.status.charAt(0) + tx.status.slice(1).toLowerCase()}
                                            </span>
                                        </td>
                                    </tr>
                                    {expandedTxId === tx.id && (
                                        <tr className="bg-accent/5 border-b border-border/10">
                                            <td colSpan={4} className="px-6 py-6 animate-in fade-in slide-in-from-top-2 duration-300">
                                                <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                                                    <div className="space-y-1.5">
                                                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest opacity-60">Transaction ID</p>
                                                        <p className="text-xs font-mono font-bold text-foreground break-all bg-background/50 p-2 rounded-lg border border-border/5">
                                                            {tx.details?.txId || 'N/A'}
                                                        </p>
                                                    </div>
                                                    <div className="space-y-1.5">
                                                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest opacity-60">To / From (address)</p>
                                                        <p className="text-xs font-mono font-bold text-foreground break-all bg-background/50 p-2 rounded-lg border border-border/5">
                                                            {tx.type === 'DEPOSIT' ? tx.details?.fromAddress : tx.details?.toAddress || tx.address}
                                                        </p>
                                                    </div>
                                                    <div className="space-y-1.5">
                                                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest opacity-60">Transaction Fee</p>
                                                        <p className="text-xs font-black text-foreground p-2">
                                                            {tx.details?.fee} {tx.details?.feeAsset}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="p-16 text-center">
                                    <div className="flex flex-col items-center justify-center space-y-3 opacity-40">
                                        <svg className="w-12 h-12 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        <p className="text-sm font-bold text-muted-foreground">No transaction history found.</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TransactionHistory;
