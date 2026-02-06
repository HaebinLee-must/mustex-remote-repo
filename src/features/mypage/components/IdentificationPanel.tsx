import React from 'react';
import {
    ShieldCheck,
    ShieldAlert,
    ShieldQuestion,
    CheckCircle2,
    XCircle,
    Clock,
    ChevronRight,
    ArrowRight,
    Lock,
    Unlock,
    Info,
    Smartphone,
    Mail,
    UserCircle,
    MapPin
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { cn } from '@/design-system/cn';

interface IdentificationPanelProps {
    stateLevel: number;
    kycStatus: 'Unverified' | 'Pending' | 'Verified' | 'Rejected';
    onStartVerification?: () => void;
}

const IdentificationPanel: React.FC<IdentificationPanelProps> = ({
    stateLevel,
    kycStatus,
    onStartVerification
}) => {
    // Define benefits based on levels
    const levelBenefits = [
        { level: 0, title: 'Registered', spot: true, deposit: true, withdrawal: '0 BTC', desc: 'Basic access' },
        { level: 1, title: 'Verified', spot: true, deposit: true, withdrawal: '2 BTC', desc: 'Identity confirmed' },
        { level: 2, title: 'Verified Plus', spot: true, deposit: true, withdrawal: '50 BTC', desc: 'Advanced verification' },
        { level: 3, title: 'Professional', spot: true, deposit: true, withdrawal: '100 BTC', desc: 'High volume trading' },
        { level: 4, title: 'Institution', spot: true, deposit: true, withdrawal: 'Unlimited', desc: 'Full corporate access' },
    ];

    const currentBenefit = levelBenefits[stateLevel] || levelBenefits[0];

    // Verification steps status (mocked for UI)
    const verificationSteps = [
        { id: 'email', label: 'Email Address', icon: Mail, status: 'completed' },
        { id: 'phone', label: 'Phone Number', icon: Smartphone, status: stateLevel >= 1 ? 'completed' : 'pending' },
        { id: 'id', label: 'Identity Document', icon: UserCircle, status: stateLevel >= 1 ? 'completed' : 'not_started' },
        { id: 'liveness', label: 'Liveness Check', icon: ShieldCheck, status: stateLevel >= 1 ? 'completed' : 'not_started' },
        { id: 'poa', label: 'Proof of Address', icon: MapPin, status: stateLevel >= 2 ? 'completed' : 'not_started' },
    ];

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'completed': return <CheckCircle2 className="w-5 h-5 text-green-500" />;
            case 'pending': return <Clock className="w-5 h-5 text-yellow-500 animate-pulse" />;
            default: return <div className="w-5 h-5 rounded-full border-2 border-white/20" />;
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* 1. Account State & KYC Level Header */}
            <div className="relative group overflow-hidden rounded-[2.5rem] border border-white/10 bg-black/40 backdrop-blur-xl p-8 shadow-2xl">
                {/* Aurora Background Effect */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#5e5ce6]/10 rounded-full blur-[80px] group-hover:bg-[#5e5ce6]/20 transition-all duration-1000" />
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#10b981]/5 rounded-full blur-[80px] group-hover:bg-[#10b981]/10 transition-all duration-1000" />

                <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-white/5 rounded-2xl border border-white/10 group-hover:border-[#5e5ce6]/50 transition-colors">
                                <ShieldCheck className="w-8 h-8 text-[#5e5ce6]" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-black text-white tracking-tight">Level {stateLevel}</h2>
                                <p className="text-[#848E9C] font-bold text-sm tracking-wide uppercase">{currentBenefit.title}</p>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <Badge className={cn(
                                "h-7 px-3 text-[10px] font-black uppercase tracking-widest",
                                kycStatus === 'Verified' ? "bg-green-500/20 text-green-400 border-green-500/30" :
                                    kycStatus === 'Pending' ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" :
                                        "bg-red-500/20 text-red-500 border-red-500/30"
                            )}>
                                {kycStatus}
                            </Badge>
                            <Badge variant="outline" className="h-7 px-3 bg-white/5 border-white/10 text-white/60 text-[10px] uppercase font-black">
                                Individual Account
                            </Badge>
                        </div>
                    </div>

                    <div className="w-full md:w-64 space-y-3">
                        <div className="flex justify-between items-end">
                            <span className="text-xs font-black text-white/40 uppercase tracking-widest">Verification Progress</span>
                            <span className="text-xl font-black text-white">{Math.round((stateLevel / 4) * 100)}%</span>
                        </div>
                        <Progress value={(stateLevel / 4) * 100} className="h-3 bg-white/5" />
                        <p className="text-[10px] text-[#848E9C] font-bold text-right">Reach Level 4 for unlimited access</p>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                {/* 2. Entitlement Matrix */}
                <div className="rounded-[2rem] border border-white/10 bg-black/20 p-8 space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#5e5ce6]/10 rounded-xl flex items-center justify-center text-[#5e5ce6]">
                            <Unlock className="w-5 h-5" />
                        </div>
                        <h3 className="text-lg font-black text-white tracking-tight">Trading Privileges</h3>
                    </div>

                    <div className="space-y-4">
                        {[
                            { label: 'Fiat Deposit', value: currentBenefit.deposit ? 'Enabled' : 'Disabled', status: currentBenefit.deposit },
                            { label: 'Spot Trading', value: currentBenefit.spot ? 'Enabled' : 'Disabled', status: currentBenefit.spot },
                            { label: 'Daily Withdrawal Limit', value: currentBenefit.withdrawal, status: true },
                            { label: 'P2P Trading', value: stateLevel >= 1 ? 'Enabled' : 'Disabled', status: stateLevel >= 1 },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between py-4 border-b border-white/5 last:border-0 group">
                                <span className="text-sm font-bold text-[#848E9C] group-hover:text-white/60 transition-colors">{item.label}</span>
                                <div className="flex items-center gap-2">
                                    <span className={cn("text-xs font-black", item.status ? "text-white" : "text-white/30")}>
                                        {item.value}
                                    </span>
                                    {item.status ? <CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> : <Lock className="w-3.5 h-3.5 text-white/20" />}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 3. Verification Steps */}
                <div className="rounded-[2rem] border border-white/10 bg-black/20 p-8 space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center text-green-500">
                            <Info className="w-5 h-5" />
                        </div>
                        <h3 className="text-lg font-black text-white tracking-tight">Verification Steps</h3>
                    </div>

                    <div className="space-y-3">
                        {verificationSteps.map((step) => (
                            <div key={step.id} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-transparent hover:border-white/10 transition-all group">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-black/40 rounded-lg group-hover:text-[#5e5ce6] transition-colors">
                                        <step.icon className="w-4 h-4" />
                                    </div>
                                    <span className="text-sm font-bold text-white/80">{step.label}</span>
                                </div>
                                {getStatusIcon(step.status)}
                            </div>
                        ))}
                    </div>

                    {stateLevel < 4 && (
                        <Button
                            onClick={onStartVerification}
                            className="w-full mt-4 h-14 rounded-2xl bg-[#5e5ce6] text-white font-black hover:bg-[#4b4ac2] group shadow-lg shadow-[#5e5ce6]/20 transition-all active:scale-95"
                        >
                            Verify for Next Level
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    )}
                </div>
            </div>

            {/* 4. Risk & Security Status */}
            <div className="p-6 rounded-3xl bg-red-500/5 border border-red-500/10 flex items-start gap-4">
                <ShieldAlert className="w-6 h-6 text-red-500 flex-shrink-0" />
                <div className="space-y-1">
                    <h4 className="text-sm font-black text-white uppercase tracking-wider">Risk Status: Normal</h4>
                    <p className="text-xs text-[#848E9C] font-medium leading-relaxed">
                        Your account is currently in good standing. To prevent future restrictions and increase your limits, we recommend completing Level 2 verification.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default IdentificationPanel;
