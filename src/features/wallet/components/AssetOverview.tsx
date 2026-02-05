import React, { useState } from 'react';
import { MOCK_SUMMARY, EXCHANGE_RATES } from '../services/mockWalletData';
import { DisplayCurrency } from '../types/wallet';
import Card from '../../shared/components/Card';
import { Eye, EyeOff, ChevronDown } from 'lucide-react';

interface AssetOverviewProps {
    onDepositClick: () => void;
    onWithdrawClick: () => void;
}

const AssetOverview: React.FC<AssetOverviewProps> = ({ onDepositClick, onWithdrawClick }) => {
    const [hideBalance, setHideBalance] = useState(false);
    const [currency, setCurrency] = useState<DisplayCurrency>('USD');

    const toggleHideBalance = () => setHideBalance(!hideBalance);

    const getDisplayValue = (): string => {
        switch (currency) {
            case 'PHP':
                return `₱${(MOCK_SUMMARY.estimatedUSD * EXCHANGE_RATES.USD_TO_PHP).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
            case 'USD':
                return `$${MOCK_SUMMARY.estimatedUSD.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
            case 'USDT':
                return `${MOCK_SUMMARY.estimatedUSD.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
            case 'BTC':
            default:
                return MOCK_SUMMARY.estimatedBTC.toFixed(8);
        }
    };

    return (
        <Card className="p-8 mb-8 shadow-2xl border-border bg-card/50 backdrop-blur-sm" noOverflow>
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-6 lg:space-y-0">
                <div className="space-y-4">
                    <div>
                        <div className="flex items-center space-x-2 mb-2">
                            <h2 className="text-xs font-bold text-muted-foreground tracking-wider uppercase">
                                Estimated Balance
                            </h2>
                            <button
                                onClick={toggleHideBalance}
                                className="text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {hideBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                        <div className="flex items-baseline space-x-3">
                            <span className="text-4xl font-extrabold tabular-nums tracking-tight text-foreground">
                                {hideBalance ? '******' : getDisplayValue()}
                            </span>
                            <div className="relative group">
                                <button className="text-xl font-bold text-primary flex items-center focus:outline-none hover:text-primary/80 transition-colors">
                                    {currency}
                                    <ChevronDown className="w-4 h-4 ml-1" />
                                </button>
                                <div className="absolute left-0 mt-2 w-24 bg-card rounded-xl shadow-2xl border border-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20 overflow-hidden">
                                    {(['USD', 'USDT', 'BTC', 'PHP'] as DisplayCurrency[]).map((c) => (
                                        <button
                                            key={c}
                                            onClick={() => setCurrency(c)}
                                            className="w-full text-left px-4 py-2 text-xs font-bold text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                                        >
                                            {c}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="text-muted-foreground text-sm mt-1 tabular-nums font-medium">
                            ≈ {hideBalance ? '******' : `$${MOCK_SUMMARY.estimatedUSD.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD`}
                        </div>
                    </div>

                    <div className="pt-2 flex items-center space-x-3">
                        <span className="text-xs font-bold text-muted-foreground uppercase">Today's PnL</span>
                        <div className={`text-sm font-bold flex items-center ${MOCK_SUMMARY.todayPnLAmount >= 0 ? 'text-success' : 'text-danger'}`}>
                            {MOCK_SUMMARY.todayPnLAmount >= 0 ? '+' : ''}{MOCK_SUMMARY.todayPnLAmount.toLocaleString()} USD ({MOCK_SUMMARY.todayPnLPercentage}%)
                            <svg className={`w-3 h-3 ml-1 ${MOCK_SUMMARY.todayPnLAmount < 0 ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap gap-3 w-full lg:w-auto">
                    <button
                        onClick={onDepositClick}
                        className="flex-grow lg:flex-none bg-primary text-primary-foreground px-10 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition-all shadow-lg shadow-primary/20 active:scale-95"
                    >
                        Deposit
                    </button>
                    <button
                        onClick={onWithdrawClick}
                        className="flex-grow lg:flex-none bg-accent text-accent-foreground px-10 py-3 rounded-lg font-bold text-sm border border-border hover:bg-accent/80 transition-all active:scale-95"
                    >
                        Withdraw
                    </button>
                    <button
                        className="flex-grow lg:flex-none bg-accent text-accent-foreground px-10 py-3 rounded-lg font-bold text-sm border border-border hover:bg-accent/80 transition-all active:scale-95"
                    >
                        Transfer
                    </button>
                </div>
            </div>
        </Card>

    );
};

export default AssetOverview;

