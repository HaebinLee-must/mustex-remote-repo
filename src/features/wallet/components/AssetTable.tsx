import React, { useState } from 'react';
import { MOCK_ASSETS } from '../services/mockWalletData';
import { Asset } from '../types/wallet';

interface AssetTableProps {
    onDeposit: (symbol: string) => void;
    onWithdraw: (symbol: string) => void;
}

const AssetTable: React.FC<AssetTableProps> = ({ onDeposit, onWithdraw }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [hideLowBalance, setHideLowBalance] = useState(false);

    const filteredAssets = MOCK_ASSETS.filter((asset) => {
        const matchesSearch = asset.coin.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
            asset.coin.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesBalance = hideLowBalance ? asset.total > 0.001 : true;
        return matchesSearch && matchesBalance;
    });

    return (
        <div className="space-y-4 p-6 border border-white/[0.04] rounded-sm bg-[#1E2329]/20">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-6">
                    <h3 className="font-bold text-[20px] text-[#EAECEF]">Fiat and Spot</h3>
                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="hide-low"
                            checked={hideLowBalance}
                            onChange={(e) => setHideLowBalance(e.target.checked)}
                            className="accent-[#8B5CF6] w-3.5 h-3.5 rounded-sm cursor-pointer"
                        />
                        <label htmlFor="hide-low"
                            className="text-[13px] font-medium text-[#848E9C] cursor-pointer hover:text-[#EAECEF] transition-colors">
                            Hide assets {'<'} 1 USD
                        </label>
                    </div>
                </div>
                <div className="relative w-full sm:w-72">
                    <input
                        type="text"
                        placeholder="Search asset"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-[#1E2329] border border-white/[0.08] rounded-sm pl-9 pr-4 py-1.5 text-[13px] text-[#EAECEF] outline-none focus:border-[#8B5CF6] transition-colors placeholder:text-[#474D57]"
                    />
                    <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#474D57]"
                        fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-[13px] tabular-nums">
                    <thead>
                        <tr className="text-left text-[#848E9C] border-b border-white/[0.04]">
                            <th className="py-3 px-1 font-medium">Coin</th>
                            <th className="py-3 px-1 font-medium text-right">Total</th>
                            <th className="py-3 px-1 font-medium text-right">Available</th>
                            <th className="py-3 px-1 font-medium text-right">In Order</th>
                            <th className="py-3 px-1 font-medium text-right">BTC Value</th>
                            <th className="py-3 px-1 font-medium text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.04]">
                        {filteredAssets.length > 0 ? (
                            filteredAssets.map((asset) => (
                                <tr key={asset.coin.symbol} className="hover:bg-[#2B3139]/40 transition-colors group">
                                    <td className="py-4 px-1">
                                        <div className="flex items-center space-x-3">
                                            <div
                                                style={{ backgroundColor: `${asset.coin.color}15`, color: asset.coin.color }}
                                                className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold"
                                            >
                                                {asset.coin.symbol[0]}
                                            </div>
                                            <div>
                                                <span className="font-bold block text-[#EAECEF] leading-tight">{asset.coin.symbol}</span>
                                                <span className="text-[11px] font-medium text-[#848E9C]">{asset.coin.name}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-1 text-right font-semibold text-[#EAECEF]">{asset.total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 8 })}</td>
                                    <td className="py-4 px-1 text-right font-medium text-[#EAECEF]">{asset.available.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 8 })}</td>
                                    <td className="py-4 px-1 text-right font-medium text-[#EAECEF]">{asset.inOrder.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 8 })}</td>
                                    <td className="py-4 px-1 text-right font-bold text-[#EAECEF]">{asset.btcValue.toFixed(8)}</td>
                                    <td className="py-4 px-1 text-right space-x-4">
                                        <button
                                            onClick={() => onDeposit(asset.coin.symbol)}
                                            className="text-[#8B5CF6] font-semibold hover:opacity-80 transition-opacity"
                                        >
                                            Deposit
                                        </button>
                                        <button
                                            onClick={() => onWithdraw(asset.coin.symbol)}
                                            className="text-[#8B5CF6] font-semibold hover:opacity-80 transition-opacity"
                                        >
                                            Withdraw
                                        </button>
                                        <button className="text-[#EAECEF] font-semibold hover:text-[#8B5CF6] transition-colors">Trade</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="py-12 text-center text-[#848E9C] font-medium">
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
