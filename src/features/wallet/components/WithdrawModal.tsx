import React, { useState, useEffect } from 'react';
import { MOCK_COINS, MOCK_NETWORKS, MOCK_HISTORY, MOCK_ASSETS } from '../services/mockWalletData';
import { Coin, Network } from '../types/wallet';

interface WithdrawModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialCoin?: string;
}

const WithdrawModal: React.FC<WithdrawModalProps> = ({ isOpen, onClose, initialCoin }) => {
    const [selectedCoin, setSelectedCoin] = useState<Coin>(MOCK_COINS.find(c => c.symbol === initialCoin) || MOCK_COINS[0]);
    const [selectedNetwork, setSelectedNetwork] = useState<Network | null>(null);
    const [address, setAddress] = useState('');
    const [amount, setAmount] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const asset = MOCK_ASSETS.find(a => a.coin.symbol === selectedCoin.symbol);
    const availableBalance = asset?.available || 0;
    const networks = MOCK_NETWORKS[selectedCoin.symbol] || [];

    useEffect(() => {
        if (initialCoin) {
            const coin = MOCK_COINS.find(c => c.symbol === initialCoin);
            if (coin) setSelectedCoin(coin);
        }
    }, [initialCoin]);

    useEffect(() => {
        setSelectedNetwork(null);
        setAmount('');
        setError(null);
    }, [selectedCoin]);

    const handleMax = () => {
        if (selectedNetwork) {
            const max = Math.max(0, availableBalance);
            setAmount(max.toString());
        }
    };

    const receiveAmount = selectedNetwork && amount ? Math.max(0, parseFloat(amount) - selectedNetwork.fee) : 0;

    const validate = () => {
        if (!address) return "Please enter an address";
        if (!selectedNetwork) return "Please select a network";
        if (!amount || parseFloat(amount) <= 0) return "Please enter an amount";
        if (parseFloat(amount) < (selectedNetwork?.minWithdraw || 0)) return `Minimum withdrawal is ${selectedNetwork?.minWithdraw} ${selectedCoin.symbol}`;
        if (parseFloat(amount) > availableBalance) return "Insufficient balance";
        return null;
    };

    const handleSubmit = () => {
        const err = validate();
        if (err) {
            setError(err);
            return;
        }
        alert(`Withdrawal of ${amount} ${selectedCoin.symbol} to ${address} submitted!`);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

            <div className="relative bg-[#1E2329] w-full max-w-2xl rounded-3xl border border-[#2B3139] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                <div className="p-6 border-b border-[#2B3139] flex items-center justify-between">
                    <h3 className="text-xl font-extrabold text-[#EAECEF]">Withdraw Crypto</h3>
                    <button onClick={onClose} className="text-[#848E9C] hover:text-white transition">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="p-8 overflow-y-auto flex-1 custom-scrollbar">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            {/* Step 1: Coin & Network */}
                            <div>
                                <label className="block text-xs font-bold text-[#848E9C] uppercase mb-2">Select Coin</label>
                                <div className="relative mb-4">
                                    <select
                                        value={selectedCoin.symbol}
                                        onChange={(e) => setSelectedCoin(MOCK_COINS.find(c => c.symbol === e.target.value)!)}
                                        className="w-full bg-[#0B0E11] border border-[#2B3139] rounded-xl px-4 py-3 text-sm font-bold appearance-none outline-none focus:border-[#6366F1] transition"
                                    >
                                        {MOCK_COINS.map(coin => (
                                            <option key={coin.symbol} value={coin.symbol}>{coin.symbol} - {coin.name}</option>
                                        ))}
                                    </select>
                                    <svg className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-[#848E9C] pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>

                                <label className="block text-xs font-bold text-[#848E9C] uppercase mb-2">Select Network</label>
                                <div className="space-y-2">
                                    {networks.map(network => (
                                        <button
                                            key={network.id}
                                            onClick={() => setSelectedNetwork(network)}
                                            className={`w-full p-4 rounded-xl border transition text-left flex justify-between items-center ${selectedNetwork?.id === network.id
                                                    ? 'bg-[#6366F1]/10 border-[#6366F1]'
                                                    : 'bg-[#0B0E11] border-[#2B3139] hover:border-[#848E9C]'
                                                }`}
                                        >
                                            <div>
                                                <div className="text-sm font-bold text-[#EAECEF]">{network.name}</div>
                                                <div className="text-[10px] text-[#848E9C]">Fee: {network.fee} {selectedCoin.symbol}</div>
                                            </div>
                                            {selectedNetwork?.id === network.id && (
                                                <svg className="w-5 h-5 text-[#6366F1]" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Balance Info */}
                            <div className="bg-[#0B0E11]/50 p-4 rounded-xl border border-[#2B3139]">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-[10px] font-bold text-[#848E9C] uppercase">Available Balance</span>
                                    <span className="text-xs font-bold text-[#EAECEF]">{availableBalance.toLocaleString()} {selectedCoin.symbol}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-bold text-[#848E9C] uppercase">Minimum Withdrawal</span>
                                    <span className="text-xs font-bold text-[#EAECEF]">{selectedNetwork?.minWithdraw || 0} {selectedCoin.symbol}</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {/* Address Input */}
                            <div>
                                <label className="block text-xs font-bold text-[#848E9C] uppercase mb-2">Withdraw to Address</label>
                                <input
                                    type="text"
                                    placeholder="Enter or paste address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="w-full bg-[#0B0E11] border border-[#2B3139] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#6366F1] transition"
                                />
                            </div>

                            {/* Amount Input */}
                            <div>
                                <label className="block text-xs font-bold text-[#848E9C] uppercase mb-2">Withdrawal Amount</label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        placeholder="0.00"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        className="w-full bg-[#0B0E11] border border-[#2B3139] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#6366F1] transition tabular-nums"
                                    />
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center space-x-2">
                                        <span className="text-xs font-bold text-[#848E9C]">{selectedCoin.symbol}</span>
                                        <button
                                            onClick={handleMax}
                                            className="text-[10px] font-black text-[#6366F1] hover:underline"
                                        >
                                            MAX
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Summary & Submit */}
                            <div className="space-y-4 pt-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-bold text-[#848E9C]">Receive Amount</span>
                                    <span className="text-lg font-black text-[#EAECEF] tabular-nums">
                                        {receiveAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 8 })} <span className="text-sm font-bold text-[#848E9C]">{selectedCoin.symbol}</span>
                                    </span>
                                </div>

                                {error && <div className="text-[11px] font-bold text-[#F6465D] bg-[#F6465D]/10 p-3 rounded-lg border border-[#F6465D]/20">{error}</div>}

                                <button
                                    onClick={handleSubmit}
                                    className="w-full bg-[#6366F1] text-white py-4 rounded-xl font-black text-sm hover:opacity-90 transition active:scale-[0.98] shadow-lg shadow-indigo-500/20"
                                >
                                    Withdraw
                                </button>
                            </div>

                            {/* Recent Withdrawals */}
                            <div className="pt-4">
                                <label className="block text-xs font-bold text-[#848E9C] uppercase mb-3">Recent Withdrawals</label>
                                <div className="space-y-2">
                                    {MOCK_HISTORY.filter(h => h.type === 'WITHDRAW').slice(0, 2).map(tx => (
                                        <div key={tx.id} className="bg-[#0B0E11]/50 p-3 rounded-xl border border-[#2B3139] flex justify-between items-center">
                                            <div>
                                                <div className="text-[11px] font-bold text-[#EAECEF]">{tx.amount} {tx.coin}</div>
                                                <div className="text-[9px] text-[#848E9C]">{tx.date}</div>
                                            </div>
                                            <div className={`text-[9px] font-black px-2 py-0.5 rounded-full ${tx.status === 'COMPLETED' ? 'bg-[#00C087]/10 text-[#00C087]' :
                                                    tx.status === 'PENDING' ? 'bg-[#F3BA2F]/10 text-[#F3BA2F]' : 'bg-[#F6465D]/10 text-[#F6465D]'
                                                }`}>
                                                {tx.status}
                                            </div>
                                        </div>
                                    ))}
                                    {MOCK_HISTORY.filter(h => h.type === 'WITHDRAW').length === 0 && <div className="text-xs text-[#848E9C] italic">No recent withdrawals</div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WithdrawModal;
