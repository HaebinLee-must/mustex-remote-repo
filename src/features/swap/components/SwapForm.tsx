import React, { useState } from 'react';
import { ArrowDown, Info } from 'lucide-react';

const SwapForm: React.FC = () => {
    const [fromAmount, setFromAmount] = useState('');
    const [toAmount, setToAmount] = useState('');

    return (
        <div className="max-w-[480px] mx-auto bg-[#1E2329] rounded-3xl border border-[#2B3139] p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-black text-white">Quick Swap</h2>
                <button className="text-[#848E9C] hover:text-white transition">
                    <Info className="w-5 h-5" />
                </button>
            </div>

            {/* From Section */}
            <div className="bg-[#0B0E11] rounded-2xl p-4 border border-transparent focus-within:border-[#6366F1] transition-all mb-2">
                <div className="flex justify-between text-xs font-bold text-[#848E9C] mb-3 uppercase tracking-wider">
                    <span>From</span>
                    <span>Balance: 0.0245 BTC</span>
                </div>
                <div className="flex items-center gap-4">
                    <input
                        type="number"
                        value={fromAmount}
                        onChange={(e) => setFromAmount(e.target.value)}
                        placeholder="0.00"
                        className="bg-transparent border-none outline-none text-2xl font-black text-white w-full placeholder:text-[#2B3139]"
                    />
                    <button className="flex items-center gap-2 bg-[#1E2329] hover:bg-[#2B3139] px-3 py-1.5 rounded-xl border border-[#2B3139] transition">
                        <div className="w-5 h-5 rounded-full bg-[#6366F1] flex items-center justify-center text-[10px] font-black text-white">B</div>
                        <span className="font-bold text-sm">BTC</span>
                    </button>
                </div>
            </div>

            {/* Swap Icon */}
            <div className="flex justify-center -my-3 relative z-10">
                <button className="bg-[#1E2329] border-4 border-[#0B0E11] rounded-xl p-2 text-[#6366F1] hover:scale-110 transition-transform shadow-xl">
                    <ArrowDown className="w-5 h-5" />
                </button>
            </div>

            {/* To Section */}
            <div className="bg-[#0B0E11] rounded-2xl p-4 border border-transparent focus-within:border-[#6366F1] transition-all mb-6">
                <div className="flex justify-between text-xs font-bold text-[#848E9C] mb-3 uppercase tracking-wider">
                    <span>To</span>
                    <span>Estimated</span>
                </div>
                <div className="flex items-center gap-4">
                    <input
                        type="number"
                        value={toAmount}
                        readOnly
                        placeholder="0.00"
                        className="bg-transparent border-none outline-none text-2xl font-black text-white w-full placeholder:text-[#2B3139]"
                    />
                    <button className="flex items-center gap-2 bg-[#1E2329] hover:bg-[#2B3139] px-3 py-1.5 rounded-xl border border-[#2B3139] transition">
                        <div className="w-5 h-5 rounded-full bg-[#00C087] flex items-center justify-center text-[10px] font-black text-white">U</div>
                        <span className="font-bold text-sm">USDT</span>
                    </button>
                </div>
            </div>

            {/* Swap Details */}
            <div className="space-y-3 mb-8 px-1">
                <div className="flex justify-between text-xs font-bold">
                    <span className="text-[#848E9C]">Price</span>
                    <span className="text-white">1 BTC ≈ 42,500.50 USDT</span>
                </div>
                <div className="flex justify-between text-xs font-bold">
                    <span className="text-[#848E9C]">Slippage Tolerance</span>
                    <span className="text-[#00C087]">0.5%</span>
                </div>
            </div>

            <button className="w-full bg-[#6366F1] hover:opacity-90 text-white py-4 rounded-2xl font-black text-lg transition shadow-lg shadow-indigo-500/20 active:scale-[0.98]">
                Swap Assets
            </button>
        </div>
    );
};

export default SwapForm;
