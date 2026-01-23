import React, { useContext } from 'react';
import { ShieldCheck, TrendingUp, AlertCircle, ShieldAlert } from 'lucide-react';
import { LanguageContext } from '../../../App';

const AccountOverview: React.FC<{ onStartKyc?: () => void }> = ({ onStartKyc }) => {
    const { t } = useContext(LanguageContext);
    const isVerified = false; // Mocking as false for now

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-black text-white">Account Overview</h2>

            <div className="grid md:grid-cols-2 gap-6">
                {/* KYC Status Card */}
                <div className="bg-[#1E2329] p-6 rounded-3xl border border-[#2B3139] shadow-xl">
                    <div className="flex justify-between items-start mb-6">
                        <div className={`w-12 h-12 ${isVerified ? 'bg-[#00C087]/10 text-[#00C087]' : 'bg-[#F6465D]/10 text-[#F6465D]'} rounded-2xl flex items-center justify-center`}>
                            {isVerified ? <ShieldCheck className="w-6 h-6" /> : <ShieldAlert className="w-6 h-6" />}
                        </div>
                        <span className={`${isVerified ? 'bg-[#00C087]/20 text-[#00C087] border-[#00C087]/30' : 'bg-[#F6465D]/20 text-[#F6465D] border-[#F6465D]/30'} text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider border`}>
                            {isVerified ? t('verified') : t('unverified')}
                        </span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Identity Verification</h3>
                    <p className="text-sm text-[#848E9C] font-medium leading-relaxed mb-6">
                        {isVerified ? t('kycDescriptionVerified') : t('kycDescriptionUnverified')}
                    </p>
                    {!isVerified && (
                        <button
                            onClick={onStartKyc}
                            className="w-full bg-primary text-white py-3 rounded-xl font-black text-sm hover:opacity-90 transition shadow-lg shadow-indigo-500/20 active:scale-[0.98]"
                        >
                            {t('verifyNow')}
                        </button>
                    )}
                </div>

                {/* Account Level Card */}
                <div className="bg-[#1E2329] p-6 rounded-3xl border border-[#2B3139] shadow-xl">
                    <div className="flex justify-between items-start mb-6">
                        <div className="w-12 h-12 bg-[#6366F1]/10 rounded-2xl flex items-center justify-center text-[#6366F1]">
                            <TrendingUp className="w-6 h-6" />
                        </div>
                        <span className="text-white text-xs font-black uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full">Level 2</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Trading Privileges</h3>
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs font-bold">
                            <span className="text-[#848E9C]">Daily Withdrawal Limit</span>
                            <span className="text-white">50 BTC</span>
                        </div>
                        <div className="w-full bg-[#0B0E11] h-1.5 rounded-full overflow-hidden">
                            <div className="bg-[#6366F1] h-full w-3/4"></div>
                        </div>
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
