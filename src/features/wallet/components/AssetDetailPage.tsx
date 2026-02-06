import React, { useState } from 'react';
import { ArrowLeft, ArrowDownToLine, ArrowUpFromLine, TrendingUp, Lock, AlertCircle, ExternalLink, Copy } from 'lucide-react';
import Card from '../../shared/components/Card';
import { MOCK_ASSETS, MOCK_HISTORY, EXCHANGE_RATES } from '../services/mockWalletData';
import { Asset, Transaction } from '../types/wallet';
import { useUI } from '../../shared/UIContext';

interface AssetDetailPageProps {
    symbol: string;
    onBack: () => void;
    onDeposit: (symbol: string) => void;
    onWithdraw: (symbol: string) => void;
}

// Related trading pairs for each asset
const RELATED_MARKETS: Record<string, { pair: string; price: number; change: number }[]> = {
    BTC: [
        { pair: 'BTC/USDT', price: 42500.50, change: 2.45 },
        { pair: 'BTC/USDC', price: 42498.00, change: 2.42 },
        { pair: 'BTC/EUR', price: 39200.00, change: 2.38 },
    ],
    ETH: [
        { pair: 'ETH/USDT', price: 2250.75, change: -1.23 },
        { pair: 'ETH/BTC', price: 0.053, change: -0.85 },
        { pair: 'ETH/USDC', price: 2249.50, change: -1.25 },
    ],
    USDT: [
        { pair: 'BTC/USDT', price: 42500.50, change: 2.45 },
        { pair: 'ETH/USDT', price: 2250.75, change: -1.23 },
        { pair: 'BNB/USDT', price: 315.00, change: 5.67 },
    ],
    BNB: [
        { pair: 'BNB/USDT', price: 315.00, change: 5.67 },
        { pair: 'BNB/BTC', price: 0.0074, change: 3.21 },
        { pair: 'BNB/USDC', price: 314.85, change: 5.62 },
    ],
};

const AssetDetailPage: React.FC<AssetDetailPageProps> = ({ symbol, onBack, onDeposit, onWithdraw }) => {
    const { setCurrentView } = useUI();
    const [activeTab, setActiveTab] = useState<'transactions' | 'orders'>('transactions');

    // Find the asset data
    const asset = MOCK_ASSETS.find(a => a.coin.symbol === symbol);

    if (!asset) {
        return (
            <div className="max-w-7xl w-full mx-auto p-4 md:p-8">
                <button onClick={onBack} className="flex items-center gap-2 text-[#848E9C] hover:text-white transition mb-6">
                    <ArrowLeft className="w-5 h-5" />
                    <span className="font-bold">Back to Assets</span>
                </button>
                <Card className="p-8 text-center">
                    <p className="text-[#848E9C]">Asset not found</p>
                </Card>
            </div>
        );
    }

    // Filter transactions for this asset
    const assetTransactions = MOCK_HISTORY.filter(tx => tx.coin === symbol);

    // Get related markets
    const relatedMarkets = RELATED_MARKETS[symbol] || [];

    // Calculate values
    const usdValue = asset.usdValue || (asset.btcValue * 42500);
    const phpValue = usdValue * EXCHANGE_RATES.USD_TO_PHP;

    // Check for locked balance reasons
    const hasLockedBalance = asset.inOrder > 0;

    const handleTradeClick = (pair: string) => {
        setCurrentView('exchange');
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    return (
        <div className="max-w-7xl w-full mx-auto p-4 md:p-8 space-y-6">
            {/* Header with Back Button */}
            <button
                onClick={onBack}
                className="flex items-center gap-2 text-[#848E9C] hover:text-white transition"
            >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-bold">Back to Assets</span>
            </button>

            {/* Asset Summary Card */}
            <Card className="p-6 shadow-xl">
                <div className="flex flex-col lg:flex-row justify-between gap-6">
                    {/* Left: Asset Info */}
                    <div className="flex items-start gap-6">
                        <div
                            style={{ backgroundColor: `${asset.coin.color}20`, color: asset.coin.color }}
                            className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-black"
                        >
                            {asset.coin.symbol[0]}
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <h1 className="text-2xl font-black text-white">{asset.coin.name}</h1>
                                <span className="text-sm font-bold text-[#848E9C] bg-[#2B3139] px-2 py-0.5 rounded">
                                    {asset.coin.symbol}
                                </span>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className={`text-sm font-bold flex items-center gap-1 ${
                                    (asset.change24h ?? 0) >= 0 ? 'text-[#00C087]' : 'text-[#FF4D4F]'
                                }`}>
                                    {(asset.change24h ?? 0) >= 0 ? '+' : ''}{(asset.change24h ?? 0).toFixed(2)}% (24h)
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Action Buttons */}
                    <div className="flex flex-wrap gap-3">
                        <button
                            onClick={() => onDeposit(symbol)}
                            className="flex items-center gap-2 bg-[#6366F1] text-white px-6 py-3 rounded-lg font-bold text-sm hover:bg-[#5254e0] transition shadow-lg shadow-indigo-500/20 active:scale-95"
                        >
                            <ArrowDownToLine className="w-4 h-4" />
                            Deposit
                        </button>
                        <button
                            onClick={() => onWithdraw(symbol)}
                            className="flex items-center gap-2 bg-[#1E2329] text-white px-6 py-3 rounded-lg font-bold text-sm border border-[#2B3139] hover:bg-[#2B3139] transition active:scale-95"
                        >
                            <ArrowUpFromLine className="w-4 h-4" />
                            Withdraw
                        </button>
                        <button
                            onClick={() => setCurrentView('exchange')}
                            className="flex items-center gap-2 bg-[#00C087] text-white px-6 py-3 rounded-lg font-bold text-sm hover:bg-[#00a070] transition shadow-lg shadow-green-500/20 active:scale-95"
                        >
                            <TrendingUp className="w-4 h-4" />
                            Trade
                        </button>
                    </div>
                </div>
            </Card>

            {/* Holdings & Value Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Total Balance */}
                <Card className="p-5">
                    <p className="text-xs font-bold text-[#848E9C] uppercase tracking-wider mb-2">Total Balance</p>
                    <p className="text-xl font-black text-white tabular-nums">
                        {asset.total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 8 })}
                        <span className="text-sm text-[#848E9C] ml-2">{symbol}</span>
                    </p>
                </Card>

                {/* Available */}
                <Card className="p-5">
                    <p className="text-xs font-bold text-[#848E9C] uppercase tracking-wider mb-2">Available</p>
                    <p className="text-xl font-black text-[#00C087] tabular-nums">
                        {asset.available.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 8 })}
                        <span className="text-sm text-[#848E9C] ml-2">{symbol}</span>
                    </p>
                </Card>

                {/* USD Value */}
                <Card className="p-5">
                    <p className="text-xs font-bold text-[#848E9C] uppercase tracking-wider mb-2">USD Value</p>
                    <p className="text-xl font-black text-white tabular-nums">
                        ${usdValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                </Card>

                {/* PHP Value */}
                <Card className="p-5">
                    <p className="text-xs font-bold text-[#848E9C] uppercase tracking-wider mb-2">PHP Value</p>
                    <p className="text-xl font-black text-white tabular-nums">
                        ₱{phpValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                </Card>
            </div>

            {/* Locked Balance Alert */}
            {hasLockedBalance && (
                <Card className="p-4 bg-[#F3BA2F]/5 border-[#F3BA2F]/20">
                    <div className="flex items-start gap-4">
                        <Lock className="w-5 h-5 text-[#F3BA2F] flex-shrink-0 mt-0.5" />
                        <div>
                            <h4 className="text-sm font-bold text-[#F3BA2F] mb-1">Locked Balance</h4>
                            <p className="text-xs text-[#848E9C]">
                                <span className="text-white font-bold">{asset.inOrder.toLocaleString()} {symbol}</span> is currently locked in open orders.
                                Cancel your orders to make this balance available.
                            </p>
                        </div>
                    </div>
                </Card>
            )}

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-3 gap-6">
                {/* Left: Transaction History */}
                <div className="lg:col-span-2">
                    <Card className="shadow-xl">
                        <div className="p-5 border-b border-[#2B3139]">
                            <div className="flex gap-6">
                                <button
                                    onClick={() => setActiveTab('transactions')}
                                    className={`text-sm font-bold pb-2 border-b-2 transition ${
                                        activeTab === 'transactions'
                                            ? 'text-white border-[#6366F1]'
                                            : 'text-[#848E9C] border-transparent hover:text-white'
                                    }`}
                                >
                                    Transactions
                                </button>
                                <button
                                    onClick={() => setActiveTab('orders')}
                                    className={`text-sm font-bold pb-2 border-b-2 transition ${
                                        activeTab === 'orders'
                                            ? 'text-white border-[#6366F1]'
                                            : 'text-[#848E9C] border-transparent hover:text-white'
                                    }`}
                                >
                                    Open Orders
                                </button>
                            </div>
                        </div>

                        <div className="p-5">
                            {activeTab === 'transactions' && (
                                <div className="space-y-3">
                                    {assetTransactions.length > 0 ? (
                                        assetTransactions.map((tx) => (
                                            <div
                                                key={tx.id}
                                                className="flex items-center justify-between p-4 bg-[#000000]/50 rounded-lg hover:bg-[#000000] transition"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                                        tx.type === 'DEPOSIT' ? 'bg-[#00C087]/10' : 'bg-[#FF4D4F]/10'
                                                    }`}>
                                                        {tx.type === 'DEPOSIT' ? (
                                                            <ArrowDownToLine className="w-5 h-5 text-[#00C087]" />
                                                        ) : (
                                                            <ArrowUpFromLine className="w-5 h-5 text-[#FF4D4F]" />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-white">{tx.type}</p>
                                                        <p className="text-xs text-[#848E9C]">{tx.date}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className={`text-sm font-bold ${
                                                        tx.type === 'DEPOSIT' ? 'text-[#00C087]' : 'text-[#FF4D4F]'
                                                    }`}>
                                                        {tx.type === 'DEPOSIT' ? '+' : '-'}{tx.amount} {tx.coin}
                                                    </p>
                                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                                        tx.status === 'COMPLETED' ? 'bg-[#00C087]/10 text-[#00C087]' :
                                                        tx.status === 'PENDING' ? 'bg-[#F3BA2F]/10 text-[#F3BA2F]' :
                                                        'bg-[#FF4D4F]/10 text-[#FF4D4F]'
                                                    }`}>
                                                        {tx.status}
                                                    </span>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-12">
                                            <p className="text-[#848E9C] text-sm">No transactions for {symbol}</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {activeTab === 'orders' && (
                                <div className="text-center py-12">
                                    <p className="text-[#848E9C] text-sm">No open orders for {symbol}</p>
                                </div>
                            )}
                        </div>
                    </Card>
                </div>

                {/* Right: Related Markets */}
                <div>
                    <Card className="shadow-xl">
                        <div className="p-5 border-b border-[#2B3139]">
                            <h3 className="font-bold text-white">Trade {symbol}</h3>
                            <p className="text-xs text-[#848E9C] mt-1">Available trading pairs</p>
                        </div>
                        <div className="p-4 space-y-2">
                            {relatedMarkets.length > 0 ? (
                                relatedMarkets.map((market) => (
                                    <button
                                        key={market.pair}
                                        onClick={() => handleTradeClick(market.pair)}
                                        className="w-full flex items-center justify-between p-3 bg-[#000000]/50 rounded-lg hover:bg-[#000000] transition group"
                                    >
                                        <div>
                                            <p className="text-sm font-bold text-white group-hover:text-[#6366F1] transition">
                                                {market.pair}
                                            </p>
                                            <p className="text-xs text-[#848E9C] tabular-nums">
                                                ${market.price.toLocaleString()}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <span className={`text-sm font-bold ${
                                                market.change >= 0 ? 'text-[#00C087]' : 'text-[#FF4D4F]'
                                            }`}>
                                                {market.change >= 0 ? '+' : ''}{market.change.toFixed(2)}%
                                            </span>
                                        </div>
                                    </button>
                                ))
                            ) : (
                                <p className="text-center text-[#848E9C] text-sm py-4">No trading pairs available</p>
                            )}
                        </div>
                    </Card>

                    {/* Network Info */}
                    <Card className="shadow-xl mt-4">
                        <div className="p-5 border-b border-[#2B3139]">
                            <h3 className="font-bold text-white">Network Info</h3>
                        </div>
                        <div className="p-4 space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-[#848E9C]">Min. Deposit</span>
                                <span className="text-white font-bold">0.0001 {symbol}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-[#848E9C]">Min. Withdraw</span>
                                <span className="text-white font-bold">0.001 {symbol}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-[#848E9C]">Withdraw Fee</span>
                                <span className="text-white font-bold">0.0005 {symbol}</span>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default AssetDetailPage;
