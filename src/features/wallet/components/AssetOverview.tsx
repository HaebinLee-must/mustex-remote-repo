import React, { useState } from 'react';
import { MOCK_SUMMARY } from '../services/mockWalletData';

interface AssetOverviewProps {
    onDepositClick: () => void;
    onWithdrawClick: () => void;
}

const AssetOverview: React.FC<AssetOverviewProps> = ({ onDepositClick, onWithdrawClick }) => {
    const [hideBalance, setHideBalance] = useState(false);
    const [currency, setCurrency] = useState<'BTC' | 'USD' | 'USDT'>('BTC');

    const toggleHideBalance = () => setHideBalance(!hideBalance);

    return (
        <div className="p-6 border border-white/[0.04] rounded-sm bg-[#1E2329]/20">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end space-y-8 lg:space-y-0">
                <div className="space-y-6">
                    <div>
                        <div className="flex items-center space-x-3 mb-3">
                            <h2 className="text-[13px] font-medium text-[#848E9C] uppercase tracking-wider">
                                Estimated Balance
                            </h2>
                            <button
                                onClick={toggleHideBalance}
                                className="text-[#848E9C] hover:text-[#EAECEF] transition-colors focus:outline-none"
                            >
                                {hideBalance ? (
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                                    </svg>
                                ) : (
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                        <div className="flex items-baseline space-x-4">
                            <span className="text-[40px] font-bold tabular-nums leading-none tracking-tight text-[#EAECEF]">
                                {hideBalance ? '******' : (currency === 'BTC' ? MOCK_SUMMARY.estimatedBTC.toFixed(8) : MOCK_SUMMARY.estimatedUSD.toLocaleString())}
                            </span>
                            <div className="relative group">
                                <button className="text-xl font-semibold text-[#8B5CF6] flex items-center focus:outline-none hover:opacity-80 transition-opacity">
                                    {currency}
                                    <svg className="w-4 h-4 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                <div className="absolute left-0 mt-2 w-28 bg-[#1E2329] rounded-sm shadow-xl border border-white/[0.08] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20">
                                    {(['BTC', 'USD', 'USDT'] as const).map((c) => (
                                        <button
                                            key={c}
                                            onClick={() => setCurrency(c)}
                                            className="w-full text-left px-4 py-2.5 text-[13px] font-medium text-[#EAECEF] hover:bg-[#2B3139] transition-colors"
                                        >
                                            {c}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="text-[#848E9C] text-[15px] mt-3 tabular-nums font-medium">
                            ≈ {hideBalance ? '******' : `$${MOCK_SUMMARY.estimatedUSD.toLocaleString()}`} USD
                        </div>
                    </div>

                    <div className="flex items-center space-x-8">
                        <div>
                            <div className="text-[12px] font-medium text-[#848E9C] mb-1.5 uppercase tracking-wider">Today's PnL</div>
                            <div className={`text-[15px] font-semibold flex items-center ${MOCK_SUMMARY.todayPnLAmount >= 0 ? 'text-[#02C076]' : 'text-[#F6465D]'}`}>
                                {MOCK_SUMMARY.todayPnLAmount >= 0 ? '+' : ''}{MOCK_SUMMARY.todayPnLAmount.toLocaleString()} USD ({MOCK_SUMMARY.todayPnLPercentage}%)
                                <svg className={`w-3.5 h-3.5 ml-1.5 ${MOCK_SUMMARY.todayPnLAmount < 0 ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap gap-3 w-full lg:w-auto">
                    <button
                        onClick={onDepositClick}
                        className="flex-grow lg:flex-none bg-[#8B5CF6] text-white px-8 py-2.5 rounded-sm font-semibold text-[14px] hover:opacity-90 transition-all active:scale-[0.98]"
                    >
                        Deposit
                    </button>
                    <button
                        onClick={onWithdrawClick}
                        className="flex-grow lg:flex-none bg-[#2B3139] text-[#EAECEF] px-8 py-2.5 rounded-sm font-semibold text-[14px] hover:bg-[#363d47] transition-all active:scale-[0.98]"
                    >
                        Withdraw
                    </button>
                    <button
                        className="flex-grow lg:flex-none bg-[#2B3139] text-[#EAECEF] px-8 py-2.5 rounded-sm font-semibold text-[14px] hover:bg-[#363d47] transition-all active:scale-[0.98]"
                    >
                        Transfer
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AssetOverview;
