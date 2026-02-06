import React, { useState, useEffect } from 'react';
import { MOCK_COINS, MOCK_NETWORKS, MOCK_HISTORY } from '../services/mockWalletData';
import { Coin, Network } from '../types/wallet';

interface DepositModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialCoin?: string;
}

const DepositModal: React.FC<DepositModalProps> = ({ isOpen, onClose, initialCoin }) => {
    const [selectedCoin, setSelectedCoin] = useState<Coin>(MOCK_COINS.find(c => c.symbol === initialCoin) || MOCK_COINS[0]);
    const [selectedNetwork, setSelectedNetwork] = useState<Network | null>(null);
    const [address, setAddress] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    useEffect(() => {
        if (initialCoin) {
            const coin = MOCK_COINS.find(c => c.symbol === initialCoin);
            if (coin) setSelectedCoin(coin);
        }
    }, [initialCoin]);

    useEffect(() => {
        setSelectedNetwork(null);
        setAddress('');
    }, [selectedCoin]);

    const handleGenerateAddress = () => {
        setIsGenerating(true);
        setTimeout(() => {
            setAddress('1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa'); // Dummy address
            setIsGenerating(false);
        }, 1500);
    };

    if (!isOpen) return null;

    const networks = MOCK_NETWORKS[selectedCoin.symbol] || [];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

            <div className="relative bg-[#1E2329] w-full max-w-2xl rounded-3xl border border-[#2B3139] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                <div className="p-6 border-b border-[#2B3139] flex items-center justify-between">
                    <h3 className="text-xl font-extrabold text-[#EAECEF]">Deposit Crypto</h3>
                    <button onClick={onClose} className="text-[#848E9C] hover:text-white transition">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="p-8 overflow-y-auto flex-1 custom-scrollbar">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            {/* Step 1: Select Coin */}
                            <div>
                                <label className="block text-xs font-bold text-[#848E9C] uppercase mb-2">1. Select Coin</label>
                                <div className="relative group">
                                    <select
                                        value={selectedCoin.symbol}
                                        onChange={(e) => setSelectedCoin(MOCK_COINS.find(c => c.symbol === e.target.value)!)}
                                        className="w-full bg-[#000000] border border-[#2B3139] rounded-xl px-4 py-3 text-sm font-bold appearance-none outline-none focus:border-[#6366F1] transition"
                                    >
                                        {MOCK_COINS.map(coin => (
                                            <option key={coin.symbol} value={coin.symbol}>{coin.symbol} - {coin.name}</option>
                                        ))}
                                    </select>
                                    <svg className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-[#848E9C] pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>

                            {/* Step 2: Select Network */}
                            <div>
                                <label className="block text-xs font-bold text-[#848E9C] uppercase mb-2">2. Select Network</label>
                                <div className="space-y-2">
                                    {networks.map(network => (
                                        <button
                                            key={network.id}
                                            onClick={() => setSelectedNetwork(network)}
                                            className={`w-full p-4 rounded-xl border transition text-left flex justify-between items-center ${selectedNetwork?.id === network.id
                                                    ? 'bg-[#6366F1]/10 border-[#6366F1]'
                                                    : 'bg-[#000000] border-[#2B3139] hover:border-[#848E9C]'
                                                }`}
                                        >
                                            <div>
                                                <div className="text-sm font-bold text-[#EAECEF]">{network.name}</div>
                                                <div className="text-[10px] text-[#848E9C]">Arrival time ≈ 2 mins</div>
                                            </div>
                                            {selectedNetwork?.id === network.id && (
                                                <svg className="w-5 h-5 text-[#6366F1]" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                            )}
                                        </button>
                                    ))}
                                    {networks.length === 0 && <div className="text-xs text-[#F6465D] font-bold">No networks available for this coin.</div>}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {/* Step 3: Address & QR */}
                            <div>
                                <label className="block text-xs font-bold text-[#848E9C] uppercase mb-2">3. Deposit Address</label>
                                {!selectedNetwork ? (
                                    <div className="bg-[#000000] border border-[#2B3139] border-dashed rounded-2xl p-8 text-center flex flex-col items-center justify-center space-y-3">
                                        <svg className="w-10 h-10 text-[#2B3139]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                        <p className="text-xs text-[#848E9C] font-bold">Please select a network to view address</p>
                                    </div>
                                ) : !address ? (
                                    <button
                                        onClick={handleGenerateAddress}
                                        disabled={isGenerating}
                                        className="w-full bg-[#6366F1] text-white py-4 rounded-xl font-bold text-sm hover:opacity-90 transition flex items-center justify-center space-x-2"
                                    >
                                        {isGenerating ? (
                                            <>
                                                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                <span>Generating...</span>
                                            </>
                                        ) : 'Generate Address'}
                                    </button>
                                ) : (
                                    <div className="bg-[#000000] border border-[#2B3139] rounded-2xl p-6 space-y-6">
                                        <div className="flex justify-center">
                                            <div className="w-32 h-32 bg-white p-2 rounded-xl">
                                                {/* Mock QR Code */}
                                                <div className="w-full h-full bg-black flex items-center justify-center text-[8px] text-white text-center font-bold">QR CODE MOCK</div>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="text-[10px] font-bold text-[#848E9C] uppercase">Address</div>
                                            <div className="flex items-center space-x-2">
                                                <div className="flex-1 bg-[#1E2329] p-3 rounded-lg text-[11px] font-mono break-all border border-[#2B3139]">
                                                    {address}
                                                </div>
                                                <button className="p-3 bg-[#2B3139] rounded-lg hover:bg-[#363d47] transition">
                                                    <svg className="w-4 h-4 text-[#6366F1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Recent History Section */}
                            <div className="pt-4">
                                <label className="block text-xs font-bold text-[#848E9C] uppercase mb-3">Recent Deposits</label>
                                <div className="space-y-2">
                                    {MOCK_HISTORY.filter(h => h.type === 'DEPOSIT').slice(0, 2).map(tx => (
                                        <div key={tx.id} className="bg-[#000000]/50 p-3 rounded-xl border border-[#2B3139] flex justify-between items-center">
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DepositModal;
