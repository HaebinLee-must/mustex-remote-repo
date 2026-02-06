import React from 'react';
import { Shield, Smartphone, QrCode, Copy, CheckCircle, Lock, ArrowUpRight, Wallet, TrendingUp, Zap } from 'lucide-react';
import { StepCard } from '../components/StepCard';
import { Button } from '@/components/ui/button';

interface StepProps {
    onNext: () => void;
}

export const SEC01_Security2FA: React.FC<StepProps> = ({ onNext }) => {
    return (
        <StepCard
            footer={
                <Button onClick={onNext} className="w-full bg-indigo-600 hover:bg-indigo-700 h-14 rounded-2xl text-lg font-black">
                    Enable 2FA
                </Button>
            }
        >
            <div className="space-y-8">
                <div className="text-center space-y-2">
                    <h2 className="text-xl font-black text-white">Account Security</h2>
                    <p className="text-sm text-[#848E9C]">Enable Two-Factor Authentication (2FA) to protect your assets.</p>
                </div>

                <div className="bg-[#000000] p-8 rounded-3xl border border-white/10 flex flex-col items-center gap-8 shadow-inner">
                    <div className="p-4 bg-white rounded-2xl shadow-2xl shadow-white/10">
                        <QrCode className="w-40 h-40 text-[#000000]" />
                    </div>
                    <div className="w-full space-y-3">
                        <label className="text-[10px] uppercase tracking-[0.2em] font-black text-indigo-400">Your Secret Key</label>
                        <div className="flex gap-3">
                            <div className="flex-1 bg-white/5 border border-white/10 rounded-xl p-4 text-sm font-mono text-white tracking-widest flex items-center justify-center">
                                JBSW Y3DP EBLX S6Z4
                            </div>
                            <button className="p-4 bg-indigo-600/10 border border-indigo-600/20 rounded-xl text-indigo-400 hover:bg-indigo-600/20 transition-all">
                                <Copy className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="space-y-3">
                    <label className="text-xs font-bold text-[#848E9C] uppercase tracking-widest">6-Digit Authenticator Code</label>
                    <input
                        type="text"
                        placeholder="000 000"
                        className="w-full bg-[#000000] border border-white/10 rounded-2xl h-16 text-center text-3xl font-black tracking-[0.3em] text-white focus:border-indigo-600 outline-none transition-all shadow-inner"
                    />
                </div>
            </div>
        </StepCard>
    );
};

export const FEA01_FeatureUnlock: React.FC<StepProps> = ({ onNext }) => {
    const privileges = [
        { icon: Wallet, label: 'Fiat Deposit', status: 'Enabled', limit: '$50,000 / Day', color: 'text-green-500', bg: 'bg-green-500/10' },
        { icon: TrendingUp, label: 'Spot Trading', status: 'Enabled', limit: 'Unlimited', color: 'text-green-500', bg: 'bg-green-500/10' },
        { icon: ArrowUpRight, label: 'Withdrawals', status: 'Locked', limit: 'Requires Approval', color: 'text-[#848E9C]', bg: 'bg-white/5' },
    ];

    return (
        <StepCard
            footer={
                <Button onClick={onNext} className="w-full bg-indigo-600 hover:bg-indigo-700 h-14 rounded-2xl text-lg font-black shadow-lg shadow-indigo-600/30">
                    Enter Exchange
                </Button>
            }
        >
            <div className="space-y-8">
                <div className="text-center space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 rounded-full border border-indigo-500/20 mb-2">
                        <Zap className="w-3 h-3 text-indigo-400 fill-indigo-400" />
                        <span className="text-[10px] font-black text-indigo-300 uppercase tracking-widest">KYC Level 1 Active</span>
                    </div>
                    <h2 className="text-2xl font-black text-white">Privileges Unlocked</h2>
                    <p className="text-sm text-[#848E9C]">You are now authorized to trade on Finora.</p>
                </div>

                <div className="space-y-3">
                    {privileges.map((p, i) => (
                        <div key={i} className="flex items-center gap-5 p-5 bg-white/[0.02] border border-white/[0.05] rounded-2xl hover:bg-white/[0.04] transition-all">
                            <div className={`w-14 h-14 rounded-2xl ${p.bg} flex items-center justify-center ${p.color} shrink-0 shadow-inner`}>
                                <p.icon className="w-7 h-7" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-sm font-black text-white uppercase tracking-tight">{p.label}</h3>
                                <p className="text-xs text-[#848E9C] font-bold">{p.limit}</p>
                            </div>
                            <div className={`text-[10px] font-black px-3 py-1 rounded-lg border uppercase tracking-widest ${p.status === 'Enabled' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-white/5 text-[#848E9C] border-white/10'
                                }`}>
                                {p.status}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="p-5 bg-indigo-500/5 border border-indigo-500/10 rounded-2xl">
                    <div className="flex gap-4 items-start">
                        <Shield className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                        <p className="text-[11px] text-[#848E9C] leading-relaxed">
                            To unlock <span className="text-white font-bold">Withdrawals</span> and <span className="text-white font-bold">Level 2</span>, please complete the address verification and maintain your account activity for 24 hours.
                        </p>
                    </div>
                </div>
            </div>
        </StepCard>
    );
};
