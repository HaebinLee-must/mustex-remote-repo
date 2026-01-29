import React from 'react';
import { MOCK_HISTORY } from '../services/mockWalletData';
import Card from '../../shared/components/Card';

const TransactionHistory: React.FC = () => {
    return (
        <Card className="shadow-2xl font-roboto">
            <div className="p-6 border-b border-dark-border font-roboto">
                <h3 className="font-extrabold text-lg">Recent Transactions</h3>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm tabular-nums">
                    <thead className="text-[#848E9C] bg-dark-main/30 border-b border-dark-border">
                        <tr className="text-left font-bold text-[11px] uppercase tracking-wider">
                            <th className="p-5">Time</th>
                            <th className="p-5">Type</th>
                            <th className="p-5">Asset</th>
                            <th className="p-5">Amount</th>
                            <th className="p-5">Destination/Source</th>
                            <th className="p-5">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-dark-border">
                        {MOCK_HISTORY.length > 0 ? (
                            MOCK_HISTORY.map((tx) => (
                                <tr key={tx.id} className="hover:bg-[#0B0E11]/50 transition">
                                    <td className="p-5 text-[#848E9C] font-medium whitespace-nowrap">{tx.date}</td>
                                    <td className="p-5">
                                        <span className={`font-bold ${tx.type === 'DEPOSIT' ? 'text-[#00C087]' : 'text-[#F6465D]'}`}>
                                            {tx.type}
                                        </span>
                                    </td>
                                    <td className="p-5 font-extrabold text-[#EAECEF]">{tx.coin}</td>
                                    <td className="p-5 font-bold text-[#EAECEF]">{tx.amount.toLocaleString()}</td>
                                    <td className="p-5 font-mono text-[10px] text-[#848E9C] max-w-[150px] truncate">{tx.address}</td>
                                    <td className="p-5">
                                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-black tracking-tight ${tx.status === 'COMPLETED' ? 'bg-[#00C087]/10 text-[#00C087]' :
                                            tx.status === 'PENDING' ? 'bg-[#F3BA2F]/10 text-[#F3BA2F]' : 'bg-[#F6465D]/10 text-[#F6465D]'
                                            }`}>
                                            {tx.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="p-16 text-center">
                                    <div className="flex flex-col items-center justify-center space-y-3 opacity-40">
                                        <svg className="w-12 h-12 text-[#848E9C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        <p className="text-sm font-bold text-[#848E9C]">No transaction history found.</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};

export default TransactionHistory;
