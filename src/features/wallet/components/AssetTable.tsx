import React, { useState } from 'react';
import { MOCK_ASSETS } from '../services/mockWalletData';
import { useUI } from '../../shared/UIContext';
import { Search, Info, RotateCw, ChevronUp, ChevronDown } from 'lucide-react';

interface AssetTableProps {
    onAssetClick: (symbol: string) => void;
    onDeposit: (symbol?: string) => void;
    onWithdraw: (symbol?: string) => void;
}

const AssetTable: React.FC<AssetTableProps> = ({ onAssetClick }) => {
    const { setCurrentView } = useUI();
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState<'coin' | 'account'>('coin');
    const [hideLowBalance, setHideLowBalance] = useState(false);

    const filteredAssets = MOCK_ASSETS.filter((asset) => {
        const matchesSearch = asset.coin.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
            asset.coin.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesBalance = hideLowBalance ? asset.total > 0.001 : true;
        return matchesSearch && matchesBalance;
    });

    return (
        <div className="bg-card/40 backdrop-blur-sm rounded-xl border border-border overflow-hidden">
            {/* Header Section */}
            <div className="px-6 pt-6 pb-2">
                <h2 className="text-xl font-bold mb-6 text-foreground">My Assets</h2>
                <div className="flex items-center justify-between border-b border-border">
                    <div className="flex space-x-8">
                        <button
                            onClick={() => setActiveTab('coin')}
                            className={`pb-3 text-sm font-bold relative transition-colors ${activeTab === 'coin' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            Coin View
                            {activeTab === 'coin' && (
                                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-primary"></div>
                            )}
                        </button>
                        <button
                            onClick={() => setActiveTab('account')}
                            className={`pb-3 text-sm font-bold relative transition-colors ${activeTab === 'account' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            Account View
                            {activeTab === 'account' && (
                                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-primary"></div>
                            )}
                        </button>
                    </div>
                    <div className="flex items-center space-x-6 pb-3">
                        <div className="flex items-center text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
                            <Search className="w-4 h-4" />
                        </div>
                        <div className="flex items-center space-x-2 text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
                            <RotateCw className="w-4 h-4" />
                            <span className="text-xs font-bold">Small Amount Exchange</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="small-exchange-check"
                                checked={hideLowBalance}
                                onChange={(e) => setHideLowBalance(e.target.checked)}
                                className="accent-primary w-4 h-4 rounded border-border bg-transparent cursor-pointer"
                            />
                            <label htmlFor="small-exchange-check" className="text-xs font-bold text-muted-foreground cursor-pointer">
                                Small Amount Exchange
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            {/* Table Section */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm tabular-nums">
                    <thead>
                        <tr className="text-muted-foreground text-[12px] font-medium border-b border-border">
                            <th className="px-6 py-4 text-left font-normal">
                                <div className="flex items-center space-x-1">
                                    <span>Coin</span>
                                    <Info className="w-3 h-3 cursor-help" />
                                </div>
                            </th>
                            <th className="px-6 py-4 text-right font-normal">
                                <div className="flex items-center justify-end space-x-1 group/header cursor-pointer">
                                    <span>Amount</span>
                                    <div className="flex flex-col -space-y-1 ml-1 opacity-40 group-hover/header:opacity-100 transition">
                                        <ChevronUp className="w-2.5 h-2.5" />
                                        <ChevronDown className="w-2.5 h-2.5" />
                                    </div>
                                    <Info className="w-3 h-3 cursor-help" />
                                </div>
                            </th>
                            <th className="px-6 py-4 text-right font-normal">
                                <div className="flex items-center justify-end space-x-1 group/header cursor-pointer">
                                    <span>Coin Price / Cost Price</span>
                                    <div className="flex flex-col -space-y-1 ml-1 opacity-40 group-hover/header:opacity-100 transition">
                                        <ChevronUp className="w-2.5 h-2.5" />
                                        <ChevronDown className="w-2.5 h-2.5" />
                                    </div>
                                    <Info className="w-3 h-3 cursor-help" />
                                </div>
                            </th>
                            <th className="px-6 py-4 text-right font-normal">
                                <div className="flex items-center justify-end space-x-1 group/header cursor-pointer">
                                    <span>Today's PnL</span>
                                    <div className="flex flex-col -space-y-1 ml-1 opacity-40 group-hover/header:opacity-100 transition">
                                        <ChevronUp className="w-2.5 h-2.5" />
                                        <ChevronDown className="w-2.5 h-2.5" />
                                    </div>
                                    <Info className="w-3 h-3 cursor-help" />
                                </div>
                            </th>
                            <th className="px-6 py-4 text-right font-normal">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border/30">
                        {filteredAssets.length > 0 ? (
                            filteredAssets.map((asset) => (
                                <tr
                                    key={asset.coin.symbol}
                                    onClick={() => onAssetClick(asset.coin.symbol)}
                                    className="hover:bg-accent/20 transition-colors cursor-pointer group"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-3">
                                            <div
                                                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold overflow-hidden"
                                                style={{ backgroundColor: `${asset.coin.color}` }}
                                            >
                                                <span className="text-white drop-shadow-sm">{asset.coin.symbol[0]}</span>
                                            </div>
                                            <div>
                                                <div className="font-bold text-foreground group-hover:text-primary transition-colors">{asset.coin.symbol}</div>
                                                <div className="text-[11px] text-muted-foreground">{asset.coin.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="font-medium text-foreground font-mono">{asset.total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 8 })}</div>
                                        <div className="text-[11px] text-muted-foreground font-mono">≈ ${(asset.total * (asset.coin.symbol === 'BTC' ? 43000 : 1)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="font-medium text-foreground font-mono">${(asset.coin.symbol === 'BTC' ? 43125.50 : 1.00).toLocaleString()}</div>
                                        <div className="text-[11px] text-muted-foreground font-mono text-center">-</div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className={`font-medium font-mono ${(asset.change24h ?? 0) >= 0 ? 'text-success' : 'text-danger'}`}>
                                            {(asset.change24h ?? 0) >= 0 ? '+' : ''}${((asset.total * (asset.change24h ?? 0)) / 100).toFixed(2)}
                                        </div>
                                        <div className={`text-[11px] font-mono ${(asset.change24h ?? 0) >= 0 ? 'text-success' : 'text-danger'}`}>
                                            ({(asset.change24h ?? 0) >= 0 ? '+' : ''}{(asset.change24h ?? 0).toFixed(2)}%)
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setCurrentView('exchange');
                                            }}
                                            className="bg-primary hover:opacity-90 text-primary-foreground px-4 py-1.5 rounded-md text-xs font-bold transition-all active:scale-95 shadow-sm shadow-primary/10"
                                        >
                                            Trade
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="p-12 text-center text-muted-foreground font-medium">
                                    No assets found.
                                </td>
                            </tr>
                        )}

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AssetTable;
