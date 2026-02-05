import React from 'react';
import {
    X,
    Info,
    ChevronRight,
    ArrowDownToLine,
    ArrowUpFromLine,
    ChevronDown
} from 'lucide-react';
import {
    Sheet,
    SheetContent
} from '@/components/ui/sheet';
import { MOCK_ASSETS, MOCK_HISTORY } from '../services/mockWalletData';
import { useUI } from '../../shared/UIContext';

interface AssetDetailSidebarProps {
    symbol: string | null;
    isOpen: boolean;
    onClose: () => void;
    onDeposit: (symbol: string) => void;
    onWithdraw: (symbol: string) => void;
}

const AssetDetailSidebar: React.FC<AssetDetailSidebarProps> = ({
    symbol,
    isOpen,
    onClose,
    onDeposit,
    onWithdraw
}) => {
    const { setCurrentView } = useUI();

    if (!symbol) return null;

    const asset = MOCK_ASSETS.find(a => a.coin.symbol === symbol);
    const transactions = MOCK_HISTORY.filter(tx => tx.coin === symbol).slice(0, 3);

    if (!asset) return null;

    return (
        <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <SheetContent
                side="right"
                className="w-full sm:max-w-md bg-[#161A1E] border-border p-0 flex flex-col h-full text-foreground border-l shadow-2xl"
            >
                {/* Header */}
                <div className="p-6 flex items-center justify-between border-b border-border/10 bg-[#161A1E]/80 backdrop-blur-md sticky top-0 z-10">
                    <div className="flex items-center space-x-3">
                        <div
                            className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-lg"
                            style={{ backgroundColor: asset.coin.color }}
                        >
                            <span className="text-white drop-shadow-md">{asset.coin.symbol[0]}</span>
                        </div>
                        <div>
                            <div className="flex items-center space-x-2">
                                <h3 className="font-bold text-lg">{asset.coin.symbol}</h3>
                            </div>
                            <p className="text-xs text-muted-foreground">{asset.coin.name}</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-accent/20 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5 text-muted-foreground" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {/* Balance Section */}
                    <div className="p-6 space-y-1">
                        <h1 className="text-4xl font-extrabold tracking-tight tabular-nums">
                            {asset.total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 8 })}
                        </h1>
                        <p className="text-lg font-bold text-muted-foreground">
                            ≈ ${asset.usdValue?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>
                    </div>

                    {/* Today's PnL */}
                    <div className="px-6 pb-6">
                        <div className="flex items-center space-x-2 text-xs font-bold">
                            <span className="text-muted-foreground flex items-center group cursor-pointer">
                                Today's PnL
                                <Info className="w-3.5 h-3.5 ml-1 opacity-50 group-hover:opacity-100 transition-opacity" />
                            </span>
                            <span className={`flex items-center ${(asset.change24h ?? 0) >= 0 ? 'text-success' : 'text-danger'}`}>
                                {(asset.change24h ?? 0) >= 0 ? '+' : '-'}${Math.abs((asset.usdValue || 0) * (asset.change24h || 0) / 100).toFixed(2)}({(asset.change24h ?? 0).toFixed(2)}%)
                                <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                            </span>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="px-6 pb-8 flex space-x-3">
                        <button
                            onClick={() => onDeposit(symbol)}
                            className="flex-1 bg-accent/20 hover:bg-accent/40 text-foreground h-11 rounded-xl font-bold text-xs transition-all flex items-center justify-center space-x-2 border border-border/10"
                        >
                            <ArrowDownToLine className="w-4 h-4" />
                            <span>Deposit</span>
                        </button>
                        <button
                            onClick={() => onWithdraw(symbol)}
                            className="flex-1 bg-accent/20 hover:bg-accent/40 text-foreground h-11 rounded-xl font-bold text-xs transition-all flex items-center justify-center space-x-2 border border-border/10"
                        >
                            <ArrowUpFromLine className="w-4 h-4" />
                            <span>Withdraw</span>
                        </button>
                    </div>

                    {/* Available Balance Simplified */}
                    <div className="px-6 pb-8">
                        <div className="flex items-center justify-between text-sm py-4 border-y border-border/5">
                            <span className="text-muted-foreground font-bold">Available</span>
                            <span className="font-black tabular-nums">{asset.available.toLocaleString()} {asset.coin.symbol}</span>
                        </div>
                    </div>

                    {/* History */}
                    <div className="px-6 pb-8">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="font-bold text-sm">History</h4>
                            <button className="text-xs font-bold text-muted-foreground flex items-center hover:text-foreground">
                                All <ChevronDown className="w-3 h-3 ml-1" />
                            </button>
                        </div>
                        <div className="space-y-5">
                            {transactions.length > 0 ? (
                                transactions.map((tx) => (
                                    <div key={tx.id} className="flex items-center justify-between group cursor-pointer hover:bg-accent/5 -mx-2 px-2 py-1 rounded-lg transition-colors">
                                        <div className="flex items-center space-x-3">
                                            <div className="text-muted-foreground">
                                                {tx.type === 'DEPOSIT' ? (
                                                    <svg className="w-4 h-4 rotate-[135deg]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                                    </svg>
                                                ) : (
                                                    <svg className="w-4 h-4 -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                                    </svg>
                                                )}
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold group-hover:text-primary transition-colors capitalize">{tx.type.toLowerCase()}</p>
                                                <p className="text-[10px] text-muted-foreground mt-0.5">Market</p>
                                                <p className="text-[10px] text-muted-foreground mt-0.5">{tx.date.split(' ')[0]}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs font-black tabular-nums">
                                                {tx.type === 'DEPOSIT' ? '+' : '-'}{tx.amount} {tx.coin}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-xs text-muted-foreground py-4 text-center">No recent history</p>
                            )}
                        </div>
                        <div className="mt-8 pt-4 border-t border-border/10">
                            <p className="text-[10px] text-muted-foreground leading-relaxed">
                                Data of last 6 months.<br />
                                Please go to the spot history page for more information.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="p-4 border-t border-border/10 bg-accent/5 flex items-center justify-between px-8 bg-[#161A1E] sticky bottom-0">
                    <div /> {/* Spacer */}
                    <button
                        onClick={() => setCurrentView('exchange')}
                        className="text-sm font-bold text-primary hover:text-primary/80 transition-colors"
                    >
                        Trade
                    </button>
                    <button className="text-muted-foreground hover:text-foreground transition-colors">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                            <circle cx="5" cy="12" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="19" cy="12" r="2" />
                        </svg>
                    </button>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default AssetDetailSidebar;
