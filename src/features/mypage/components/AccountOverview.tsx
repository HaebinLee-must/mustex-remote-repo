import React from 'react';
import { ShieldCheck, TrendingUp, AlertCircle, ShieldAlert, Loader2, Clock } from 'lucide-react';
import { useUI } from '@/features/shared/UIContext';
import { useAuth, KycStatus, SecurityLevel } from '@/features/auth/AuthContext';
import { SECURITY_LEVEL_MATRIX, WITHDRAWAL_LIMITS, REVIEW_TIME_ESTIMATE } from '@/constants/policy';

const AccountOverview: React.FC<{ onStartKyc?: () => void }> = ({ onStartKyc }) => {
    const { t } = useUI();
    const { user, permissions } = useAuth();

    const kycStatus = user?.kycStatus || 'L0';
    const securityLevel = user?.securityLevel || 0;

    // Determine status display based on KYC status
    const isPending = kycStatus.includes('PENDING');
    const isApproved = kycStatus.includes('APPROVED');
    const isRejected = kycStatus === 'REJECTED';
    const isVerified = securityLevel >= 2;

    // Get level config from policy
    const levelConfig = SECURITY_LEVEL_MATRIX[securityLevel];
    const withdrawalLimit = WITHDRAWAL_LIMITS[securityLevel];

    // Get review time for pending status
    const reviewTime = isPending ? REVIEW_TIME_ESTIMATE[kycStatus as keyof typeof REVIEW_TIME_ESTIMATE] : null;

    // Status display text
    const getStatusText = (): string => {
        if (isRejected) return 'Rejected';
        if (isPending) return 'Pending Review';
        if (isVerified) return t('verified');
        return t('unverified');
    };

    // Status color classes
    const getStatusColorClasses = () => {
        if (isRejected) return { bg: 'bg-[#F6465D]/20', text: 'text-[#F6465D]', border: 'border-[#F6465D]/30', icon: 'bg-[#F6465D]/10 text-[#F6465D]' };
        if (isPending) return { bg: 'bg-[#F3BA2F]/20', text: 'text-[#F3BA2F]', border: 'border-[#F3BA2F]/30', icon: 'bg-[#F3BA2F]/10 text-[#F3BA2F]' };
        if (isVerified) return { bg: 'bg-[#00C087]/20', text: 'text-[#00C087]', border: 'border-[#00C087]/30', icon: 'bg-[#00C087]/10 text-[#00C087]' };
        return { bg: 'bg-orange-500/20', text: 'text-orange-500', border: 'border-orange-500/30', icon: 'bg-orange-500/10 text-orange-500' };
    };

    const colors = getStatusColorClasses();

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-black text-white">Account Overview</h2>

            {/* Pending Review Banner - Shows when KYC is under review */}
            {isPending && reviewTime && (
                <div className="bg-[#F3BA2F]/10 border border-[#F3BA2F]/30 p-4 rounded-2xl flex items-start gap-4">
                    <Clock className="w-5 h-5 text-[#F3BA2F] flex-shrink-0 mt-0.5" />
                    <div className="space-y-1">
                        <h4 className="text-sm font-bold text-[#F3BA2F]">Verification Under Review</h4>
                        <p className="text-xs text-[#848E9C] font-medium leading-relaxed">
                            Your documents are being reviewed. This typically takes up to <span className="text-white font-bold">{reviewTime}</span>.
                            You will be notified once the review is complete.
                        </p>
                    </div>
                </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
                {/* KYC Status Card */}
                <div className="bg-[#1E2329] p-6 rounded-3xl border border-[#2B3139] shadow-xl">
                    <div className="flex justify-between items-start mb-6">
                        <div className={`w-12 h-12 ${colors.icon} rounded-2xl flex items-center justify-center`}>
                            {isVerified ? <ShieldCheck className="w-6 h-6" /> : isPending ? <Clock className="w-6 h-6" /> : <ShieldAlert className="w-6 h-6" />}
                        </div>
                        <div className="flex flex-col items-end gap-2">
                            <span className={`${colors.bg} ${colors.text} ${colors.border} text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider border flex items-center gap-1`}>
                                {isPending && <Loader2 className="w-2.5 h-2.5 animate-spin" />}
                                {getStatusText()}
                            </span>
                            {isPending && (
                                <span className="text-[9px] font-bold text-[#F3BA2F] animate-pulse">Processing...</span>
                            )}
                        </div>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Identity Verification</h3>
                    <p className="text-sm text-[#848E9C] font-medium leading-relaxed mb-6">
                        {isVerified ? t('kycDescriptionVerified') : t('kycDescriptionUnverified')}
                    </p>
                    {!isVerified && !isPending && (
                        <button
                            onClick={onStartKyc}
                            className="w-full bg-primary text-white py-3 rounded-xl font-black text-sm hover:opacity-90 transition shadow-lg shadow-indigo-500/20 active:scale-[0.98]"
                        >
                            {t('verifyNow')}
                        </button>
                    )}
                    {isRejected && (
                        <button
                            onClick={onStartKyc}
                            className="w-full bg-[#F6465D] text-white py-3 rounded-xl font-black text-sm hover:opacity-90 transition shadow-lg shadow-red-500/20 active:scale-[0.98]"
                        >
                            Resubmit Documents
                        </button>
                    )}
                </div>

                {/* Account Level Card */}
                <div className="bg-[#1E2329] p-6 rounded-3xl border border-[#2B3139] shadow-xl">
                    <div className="flex justify-between items-start mb-6">
                        <div className="w-12 h-12 bg-[#6366F1]/10 rounded-2xl flex items-center justify-center text-[#6366F1]">
                            <TrendingUp className="w-6 h-6" />
                        </div>
                        <span className="text-white text-xs font-black uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full">
                            Level {securityLevel}
                        </span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Trading Privileges</h3>
                    <p className="text-xs text-[#848E9C] mb-4">{levelConfig.state}</p>
                    <div className="space-y-3">
                        <div className="flex justify-between text-xs font-bold">
                            <span className="text-[#848E9C]">Daily Withdrawal Limit</span>
                            <span className="text-white">{withdrawalLimit.daily} BTC</span>
                        </div>
                        <div className="w-full bg-[#0B0E11] h-1.5 rounded-full overflow-hidden">
                            <div
                                className="bg-[#6366F1] h-full transition-all"
                                style={{ width: `${(securityLevel / 3) * 100}%` }}
                            />
                        </div>
                        {securityLevel < 3 && (
                            <p className="text-[10px] text-[#848E9C]">
                                Upgrade to Level {securityLevel + 1} to increase limits
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Account Status Info */}
            <div className="bg-[#6366F1]/5 border border-[#6366F1]/20 p-4 rounded-2xl flex items-start gap-4">
                <AlertCircle className="w-5 h-5 text-[#6366F1] flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                    <h4 className="text-sm font-bold text-white">Security Tip</h4>
                    <p className="text-xs text-[#848E9C] font-medium leading-relaxed">Enable 2FA and never share your password with anyone. We will never ask for your private information via email.</p>
                </div>
            </div>
        </div>
    );
};

export default AccountOverview;
