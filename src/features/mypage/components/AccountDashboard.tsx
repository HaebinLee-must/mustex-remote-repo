import React from 'react';
import {
    User,
    ShieldCheck,
    ArrowRight,
    Wallet,
    Eye,
    EyeOff,
    TrendingUp,
    ChevronRight,
    Search,
    AlertCircle
} from 'lucide-react';
import { useAuth } from '@/features/auth/AuthContext';

const AccountDashboard: React.FC<{ onStartKyc?: () => void }> = ({ onStartKyc }) => {
    const { user } = useAuth();
    const [showBalance, setShowBalance] = React.useState(true);

    const markets = [
        { pair: 'BTC/USDT', price: '42,123.45', change: '+2.45%', isUp: true },
        { pair: 'ETH/USDT', price: '2,245.12', change: '-1.12%', isUp: false },
        { pair: 'BNB/USDT', price: '312.56', change: '+0.85%', isUp: true },
        { pair: 'SOL/USDT', price: '98.45', change: '+5.67%', isUp: true },
    ];

    return (
        <div className="space-y-6 pb-12 w-full max-w-4xl mx-auto">
            {/* KYC Promotion Banner */}
            <div className="w-full bg-gradient-to-r from-[#593FFF]/20 via-[#593FFF]/10 to-transparent border border-[#593FFF]/30 rounded-2xl p-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#593FFF]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <ShieldCheck className="w-6 h-6 text-[#593FFF]" />
                    </div>
                    <div>
                        <h3 className="text-white font-black text-sm mb-0.5">Identity Verification</h3>
                        <p className="text-[#848E9C] text-[11px] font-medium leading-relaxed">
                            To ensure a secure trading environment and comply with regulations, please complete your identity verification.
                        </p>
                    </div>
                </div>
                <button
                    onClick={onStartKyc}
                    className="flex-shrink-0 bg-[#593FFF] text-white px-5 py-2.5 rounded-xl font-black text-xs hover:opacity-90 transition flex items-center gap-2 shadow-lg shadow-[#593FFF]/20"
                >
                    <span>Verify Now</span>
                    <ArrowRight className="w-4 h-4" />
                </button>
            </div>

            {/* Top Section: User Profile */}
            <div className="w-full bg-black border border-white/10 rounded-2xl p-6 flex items-center gap-6 shadow-xl">
                <div className="w-16 h-16 bg-[#593FFF]/10 rounded-full flex items-center justify-center border border-[#593FFF]/20">
                    <User className="w-8 h-8 text-[#593FFF]" />
                </div>
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                        <h2 className="text-xl font-black text-white">{user?.email?.split('@')[0] || 'User-Finora'}</h2>
                        <span className="bg-white/10 text-[#848E9C] text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider">Regular</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-bold text-[#848E9C]">
                        <span>UID: <span className="text-white">52194823</span></span>
                        <span>VIP Level: <span className="text-white">0</span></span>
                    </div>
                </div>
            </div>

            {/* Get Started Stepper */}
            <div className="w-full bg-black border border-white/10 rounded-2xl shadow-xl overflow-hidden">
                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <h3 className="text-base font-black text-white">Get Started</h3>
                        <span className="text-[10px] font-black text-[#593FFF] bg-[#593FFF]/10 px-2 py-0.5 rounded uppercase">3 Steps</span>
                    </div>
                    <button className="text-[#848E9C] hover:text-white text-xs font-bold transition">View All</button>
                </div>

                <div className="p-8 grid md:grid-cols-3 gap-8 relative items-start">
                    {/* Progress Line Connector */}
                    <div className="hidden md:absolute top-14 left-[15%] right-[15%] h-[1px] bg-white/5 z-0"></div>

                    {/* Step 1 */}
                    <div className="relative z-10 flex flex-col items-center text-center">
                        <div className="w-10 h-10 rounded-full bg-[#593FFF] flex items-center justify-center text-white font-black mb-4 shadow-lg shadow-[#593FFF]/20">1</div>
                        <h4 className="font-bold text-white text-sm mb-4">Account Verified</h4>
                        <div className="bg-[#F6465D]/5 border border-[#F6465D]/10 rounded-xl p-4 w-full">
                            <div className="flex items-center justify-center gap-2 text-[#F6465D] text-[11px] font-black mb-3">
                                <AlertCircle className="w-3.5 h-3.5" />
                                <span>Action Required</span>
                            </div>
                            <button
                                onClick={onStartKyc}
                                className="w-full bg-[#593FFF] text-white py-2.5 rounded-xl text-xs font-black hover:opacity-90 transition active:scale-95 shadow-lg shadow-[#593FFF]/20"
                            >
                                Verify Now
                            </button>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="relative z-10 flex flex-col items-center text-center group">
                        <div className="w-10 h-10 rounded-full border border-white/10 bg-black flex items-center justify-center text-[#848E9C] font-black mb-4 transition-colors group-hover:border-white/20">2</div>
                        <h4 className="font-bold text-[#848E9C] text-sm mb-2 group-hover:text-white transition-colors">Complete Your First Deposit</h4>
                        <p className="text-[#848E9C]/60 text-[10px] font-bold">Add funds to start trading</p>
                    </div>

                    {/* Step 3 */}
                    <div className="relative z-10 flex flex-col items-center text-center group">
                        <div className="w-10 h-10 rounded-full border border-white/10 bg-black flex items-center justify-center text-[#848E9C] font-black mb-4 transition-colors group-hover:border-white/20">3</div>
                        <h4 className="font-bold text-[#848E9C] text-sm mb-2 group-hover:text-white transition-colors">Start Trading</h4>
                        <p className="text-[#848E9C]/60 text-[10px] font-bold">Ready to explore the markets</p>
                    </div>
                </div>
            </div>

            {/* Estimated Balance Card */}
            <div className="w-full bg-black border border-white/10 rounded-2xl p-8 space-y-8 shadow-xl relative overflow-hidden">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-black text-[#848E9C]">Estimated Balance</span>
                        <button onClick={() => setShowBalance(!showBalance)} className="text-[#848E9C] hover:text-white transition">
                            {showBalance ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </button>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[#848E9C] hover:text-white cursor-pointer transition" />
                </div>

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-1">
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-black text-white tracking-tight">
                                {showBalance ? '0.00000000' : '********'}
                            </span>
                            <span className="text-lg font-black text-white/40">BTC</span>
                        </div>
                        <div className="text-[#848E9C] font-bold text-sm">
                            ≈ {showBalance ? '$0.00' : '********'}
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <button className="bg-[#593FFF] text-white px-6 py-2.5 rounded-xl font-black text-xs hover:opacity-90 transition active:scale-95 shadow-lg shadow-[#593FFF]/20">
                            Deposit
                        </button>
                        <button className="bg-white/5 text-white px-6 py-2.5 rounded-xl font-black text-xs hover:bg-white/10 transition border border-white/5">
                            Withdraw
                        </button>
                        <button className="bg-white/5 text-white px-6 py-2.5 rounded-xl font-black text-xs hover:bg-white/10 transition border border-white/5">
                            Transfer
                        </button>
                    </div>
                </div>
            </div>

            {/* Markets Card */}
            <div className="w-full bg-black border border-white/10 rounded-2xl shadow-xl overflow-hidden flex flex-col">
                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                    <div className="flex gap-8">
                        <button className="text-[#593FFF] text-sm font-black border-b-2 border-[#593FFF] pb-2">Hot</button>
                        <button className="text-[#848E9C] text-sm font-bold hover:text-white transition pb-2">New Listing</button>
                    </div>
                    <Search className="w-4 h-4 text-[#848E9C] hover:text-white cursor-pointer transition" />
                </div>

                <div className="flex-1 overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-[#848E9C] text-[10px] font-black uppercase tracking-wider">
                                <th className="px-6 py-4">Pair</th>
                                <th className="px-6 py-4 text-right">Price</th>
                                <th className="px-6 py-4 text-right">24h Change</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {markets.map((m, idx) => (
                                <tr key={idx} className="hover:bg-white/5 transition-colors group cursor-pointer">
                                    <td className="py-4 px-6">
                                        <div className="font-black text-white group-hover:text-[#593FFF] transition-colors">{m.pair}</div>
                                    </td>
                                    <td className="py-4 px-6 font-bold text-white text-right">{m.price}</td>
                                    <td className={`py-4 px-6 text-right font-black ${m.isUp ? 'text-[#00C087]' : 'text-[#F6465D]'}`}>
                                        {m.change}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-4 border-t border-white/5 flex justify-center">
                    <button className="text-[#593FFF] text-xs font-black hover:opacity-80 transition py-2 flex items-center gap-1">
                        View All Markets
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AccountDashboard;
