import React from 'react';
import { MOCK_HISTORY } from '../services/mockWalletData';

const TransactionHistory: React.FC = () => {
    return (
        <div className="space-y-4 p-6 border border-white/[0.04] rounded-sm bg-[#1E2329]/20">
            <div className="flex items-center justify-between">
                <h3 className="font-bold text-[20px] text-[#EAECEF]">Recent Transactions</h3>
                <button className="text-[13px] font-medium text-[#8B5CF6] hover:opacity-80 transition-opacity">
                    View More
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-[13px] tabular-nums">
                    <thead>
                        <tr className="text-left text-[#848E9C] border-b border-white/[0.04]">
                            <th className="py-3 px-1 font-medium">Time</th>
                            <th className="py-3 px-1 font-medium">Type</th>
                            <th className="py-3 px-1 font-medium">Asset</th>
                            <th className="py-3 px-1 font-medium">Amount</th>
                            <th className="py-3 px-1 font-medium">Destination/Source</th>
                            <th className="py-3 px-1 font-medium text-right">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.04]">
                        {MOCK_HISTORY.length > 0 ? (
                            MOCK_HISTORY.map((tx) => (
                                <tr key={tx.id} className="hover:bg-[#2B3139]/40 transition-colors">
                                    <td className="py-4 px-1 text-[#848E9C] font-medium whitespace-nowrap">{tx.date}</td>
                                    <td className="py-4 px-1">
                                        <span className={`font-semibold ${tx.type === 'DEPOSIT' ? 'text-[#02C076]' : 'text-[#F6465D]'}`}>
                                            {tx.type}
                                        </span>
                                    </td>
                                    <td className="py-4 px-1 font-bold text-[#EAECEF]">{tx.coin}</td>
                                    <td className="py-4 px-1 font-semibold text-[#EAECEF]">{tx.amount.toLocaleString()}</td>
                                    <td className="py-4 px-1 font-mono text-[11px] text-[#848E9C] max-w-[150px] truncate">{tx.address}</td>
                                    <td className="py-4 px-1 text-right">
                                        <span className={`text-[12px] font-semibold ${tx.status === 'COMPLETED' ? 'text-[#02C076]' :
                                            tx.status === 'PENDING' ? 'text-[#F3BA2F]' : 'text-[#F6465D]'
                                            }`}>
                                            {tx.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="py-20 text-center">
                                    <div className="flex flex-col items-center justify-center space-y-3">
                                        <svg className="w-12 h-12 text-[#2B3139]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        <p className="text-[14px] font-medium text-[#474D57]">No transaction history found.</p>
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
