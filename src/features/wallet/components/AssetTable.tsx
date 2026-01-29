import React, { useState } from 'react';
import { MOCK_ASSETS } from '../services/mockWalletData';
import { Asset } from '../types/wallet';
import Card from '../../shared/components/Card';

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
        <Card className="shadow-2xl mb-8 font-roboto">
            <div className="p-6 border-b border-dark-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-roboto">
                <div className="flex items-center gap-4 sm:gap-6 whitespace-nowrap overflow-x-auto no-scrollbar w-full sm:w-auto">
                    <h3 className="font-extrabold text-base sm:text-lg">Fiat and Spot</h3>
                    <div className="flex items-center space-x-2 flex-shrink-0">
                        <input
                            type="checkbox"
                            id="hide-low"
                            checked={hideLowBalance}
                            onChange={(e) => setHideLowBalance(e.target.checked)}
                            className="accent-[#6366F1] w-3.5 h-3.5 sm:w-4 sm:h-4 rounded cursor-pointer"
                        />
                        <label htmlFor="hide-low"
                            className="text-[10px] sm:text-xs font-bold text-[#848E9C] cursor-pointer hover:text-[#EAECEF] transition">
                            Hide assets {'<'}1 USD
                        </label>
                    </div>
                </div>
                <div className="relative w-full sm:w-64 group">
                    <input
                        type="text"
                        placeholder="Search asset"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-dark-main border border-dark-border rounded-xl px-10 py-2.5 text-sm outline-none focus:border-[#6366F1] transition group-hover:border-[#848E9C]"
                    />
                    <svg className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#848E9C] transition"
                        fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm tabular-nums">
                    <thead className="text-[#848E9C] bg-dark-main/30 border-b border-dark-border">
                        <tr className="text-left font-bold text-[11px] uppercase tracking-wider">
                            <th className="p-5">Coin</th>
                            <th className="p-5 text-right">Total</th>
                            <th className="p-5 text-right">Available</th>
                            <th className="p-5 text-right">In Order</th>
                            <th className="p-5 text-right">BTC Value</th>
                            <th className="p-5 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-dark-border">
                        {filteredAssets.length > 0 ? (
                            filteredAssets.map((asset) => (
                                <tr key={asset.coin.symbol} className="hover:bg-[#0B0E11]/50 transition cursor-pointer group">
                                    <td className="p-5 flex items-center space-x-4">
                                        <div
                                            style={{ backgroundColor: `${asset.coin.color}20`, color: asset.coin.color }}
                                            className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-black"
                                        >
                                            {asset.coin.symbol[0]}
                                        </div>
                                        <div>
                                            <span className="font-extrabold block text-[#EAECEF] group-hover:text-[#6366F1] transition">{asset.coin.symbol}</span>
                                            <span className="text-[10px] font-bold text-[#848E9C] uppercase">{asset.coin.name}</span>
                                        </div>
                                    </td>
                                    <td className="p-5 text-right font-bold text-[#EAECEF]">{asset.total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 8 })}</td>
                                    <td className="p-5 text-right font-medium text-[#848E9C]">{asset.available.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 8 })}</td>
                                    <td className="p-5 text-right font-medium text-[#848E9C]">{asset.inOrder.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 8 })}</td>
                                    <td className="p-5 text-right font-bold text-[#EAECEF] tracking-tight">{asset.btcValue.toFixed(8)}</td>
                                    <td className="p-5 text-right space-x-4 text-xs">
                                        <button
                                            onClick={() => onDeposit(asset.coin.symbol)}
                                            className="text-[#6366F1] font-black hover:text-[#818cf8] transition"
                                        >
                                            Deposit
                                        </button>
                                        <button
                                            onClick={() => onWithdraw(asset.coin.symbol)}
                                            className="text-[#6366F1] font-black hover:text-[#818cf8] transition"
                                        >
                                            Withdraw
                                        </button>
                                        <button className="text-[#848E9C] font-black hover:text-white transition">Trade</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="p-10 text-center text-[#848E9C] font-medium">
                                    No assets found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};

export default AssetTable;
