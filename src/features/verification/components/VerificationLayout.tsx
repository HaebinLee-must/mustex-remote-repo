import React from 'react';
import { ChevronLeft, Info, ShieldCheck, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { StepId } from '../types';
import logoLight from '../../../assets/finora_bi_light.png';

interface VerificationLayoutProps {
    children: React.ReactNode;
    currentStep: StepId;
    onBack?: () => void;
    onExit?: () => void;
    title?: string;
    isEU?: boolean;
}

const Stepper = ({ currentStep, isEU }: { currentStep: StepId, isEU?: boolean }) => {
    const totalSteps = isEU ? 5 : 4;

    const currentIdx = (() => {
        if (currentStep === 'INTRO' || ['PERSONAL_INFO', 'ID_UPLOAD', 'LIVENESS', 'ADDRESS_PROOF', 'STATUS_CHECK'].includes(currentStep)) return 1;
        if (currentStep === 'SECURITY_2FA') return isEU ? 3 : 2;
        if (currentStep === 'FEATURE_UNLOCK') return isEU ? 4 : 3;
        return 0;
    })();

    const progress = ((currentIdx + 1) / totalSteps) * 100;

    return (
        <div className="w-full">
            <div className="relative w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="absolute inset-0 bg-[#5e5ce6] shadow-[0_0_12px_rgba(94,92,230,0.5)]"
                />
            </div>
        </div>
    );
};

export const VerificationLayout: React.FC<VerificationLayoutProps> = ({
    children,
    currentStep,
    onBack,
    onExit,
    title,
    isEU
}) => {
    return (
        <div className="fixed inset-0 z-[1000] bg-[#000000] text-[#EAECEF] font-sans selection:bg-indigo-500/30 overflow-y-auto custom-scrollbar">
            {/* Top Navigation Bar */}
            <header className="sticky top-0 z-[1001] h-20 px-4 sm:px-12 flex items-center justify-between border-b border-white/[0.05] bg-[#000000]/80 backdrop-blur-xl">
                <div className="flex items-center gap-6 min-w-[120px]">
                    {onExit && (
                        <button
                            className="p-2 -ml-2 text-[#848E9C] hover:text-white transition-colors flex items-center gap-2 group"
                            onClick={onExit}
                        >
                            <X className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                        </button>
                    )}
                    <div
                        className="cursor-pointer select-none active:scale-95 transition"
                        onClick={onExit}
                    >
                        <img src={logoLight} alt="FINORA" className="h-[22px] w-auto" />
                    </div>
                </div>

                <div className="hidden md:block flex-1 max-w-md mx-8">
                    <Stepper currentStep={currentStep} isEU={isEU} />
                </div>

                <div className="flex items-center gap-4 min-w-[120px] justify-end">
                    <button className="p-3 text-[#848E9C] hover:text-white transition-colors">
                        <Info className="w-5 h-5" />
                    </button>
                    <div className="hidden sm:block h-8 w-[1px] bg-white/10" />
                    <button className="hidden sm:block text-xs font-bold text-[#848E9C] hover:text-white transition-colors">
                        Support
                    </button>
                </div>
            </header>

            {/* Mobile Stepper (Condensed) */}
            <div className="md:hidden px-6 py-4 border-b border-white/[0.03] bg-[#000000]/50">
                <Stepper currentStep={currentStep} isEU={isEU} />
            </div>

            {/* Main Content Area */}
            <main className="flex flex-col items-center justify-start pt-12 sm:pt-20 pb-24 px-4 min-h-[calc(100vh-80px)]">
                <div className="w-full max-w-[480px] animate-in fade-in slide-in-from-bottom-4 duration-700">
                    {onBack && (
                        <button
                            onClick={onBack}
                            className="mb-8 p-2 -ml-2 hover:bg-white/5 rounded-lg transition-all text-[#848E9C] hover:text-white flex items-center gap-2 group"
                        >
                            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                            <span className="text-xs font-bold uppercase tracking-widest">Go Back</span>
                        </button>
                    )}

                    {title && (
                        <div className="text-center mb-12 space-y-3">
                            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                                {title === 'Verify Identity' ? "Let's get you verified" : title}
                            </h1>
                            <p className="text-sm text-[#848E9C] font-medium max-w-[320px] mx-auto leading-relaxed">
                                {currentStep === 'INTRO' && "This helps keep your account secure and compliant."}
                                {['ID_UPLOAD', 'LIVENESS'].includes(currentStep) && "Submitted information is encrypted and processed securely."}
                                {currentStep === 'PERSONAL_INFO' && "Please proceed according to the instructions to complete verification."}
                                {currentStep === 'STATUS_CHECK' && "This usually takes about 1-2 minutes. (For pilot stage, may take up to 24 hours)."}
                            </p>
                        </div>
                    )}
                    {children}
                </div>
            </main>

            {/* Minimal Footer */}
            <footer className="py-10 border-t border-white/[0.05] text-center bg-[#000000]/40 mt-auto">
                <p className="text-[#848E9C] text-xs font-medium">
                    © 2026 FINORA. Enterprise-grade crypto exchange.
                    <span className="mx-2 text-white/10">|</span>
                    <a href="#" className="text-[#5e5ce6] hover:text-[#5e5ce6]/80 transition-colors font-bold">Privacy Policy</a>
                </p>
            </footer>
        </div>
    );
};