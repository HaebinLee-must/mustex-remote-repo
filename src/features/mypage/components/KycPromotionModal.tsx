import React from 'react';
import { ShieldCheck, X, ArrowRight } from 'lucide-react';

interface KycPromotionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onStartKyc: () => void;
}

const KycPromotionModal: React.FC<KycPromotionModalProps> = ({ isOpen, onClose, onStartKyc }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-[#0B0E11]/80 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative w-full max-w-md bg-[#1E2329] border border-[#2B3139] rounded-[2rem] p-8 shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute right-6 top-6 text-[#848E9C] hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="flex flex-col items-center text-center gap-6">
                    {/* Icon */}
                    <div className="w-20 h-20 bg-[#6366F1]/10 rounded-3xl flex items-center justify-center text-[#6366F1] animate-bounce">
                        <ShieldCheck className="w-10 h-10" />
                    </div>

                    {/* Text */}
                    <div className="space-y-2">
                        <h2 className="text-2xl font-black tracking-tight text-white">Welcome to MUSTEX!</h2>
                        <p className="text-[#848E9C] text-sm font-medium leading-relaxed">
                            To start trading and unlock all features, <br />
                            please complete your identity verification.
                        </p>
                    </div>

                    {/* Features List */}
                    <div className="w-full bg-[#0B0E11] rounded-2xl border border-[#2B3139] p-4 flex flex-col gap-3 text-left">
                        {[
                            "Unlimited deposits & withdrawals",
                            "Advanced trading features",
                            "Enhanced account security"
                        ].map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#6366F1]"></div>
                                <span className="text-xs font-bold text-[#EAECEF]">{item}</span>
                            </div>
                        ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="w-full flex flex-col gap-3 pt-2">
                        <button
                            onClick={onStartKyc}
                            className="w-full bg-[#6366F1] text-white py-4 rounded-2xl font-black text-sm hover:opacity-90 transition shadow-xl shadow-indigo-500/20 flex items-center justify-center gap-2 group"
                        >
                            <span>Verify Identity Now</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button
                            onClick={onClose}
                            className="w-full text-[#848E9C] hover:text-white py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-colors"
                        >
                            Maybe Later
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KycPromotionModal;
