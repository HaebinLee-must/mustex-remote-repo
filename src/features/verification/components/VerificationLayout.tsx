import React from 'react';
import logoLight from '../../../assets/finora_bi_light.png';
import { ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { StepId } from '../types';

interface VerificationLayoutProps {
    children: React.ReactNode;
    currentStep: StepId;
    onBack?: () => void;
    onExit?: () => void;
    title?: string;
    isEU?: boolean;
    totalSteps: number;
    currentStepIndex: number;
}

const Stepper = ({ currentStepIndex, totalSteps }: { currentStepIndex: number, totalSteps: number }) => {
    const progress = ((currentStepIndex + 1) / totalSteps) * 100;

    return (
        <div className="w-full">
            <div className="relative w-full h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="absolute inset-0 bg-[#5e5ce6]"
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
    isEU,
    totalSteps,
    currentStepIndex
}) => {
    return (
        <div className="fixed inset-0 z-[1000] bg-[#12122b] text-[#EAECEF] font-sans selection:bg-indigo-500/30 overflow-y-auto custom-scrollbar">
            {/* Main Content Area */}
            <main className="flex flex-col items-center justify-start pt-10 sm:pt-16 pb-24 px-4 min-h-screen">
                <div className="w-full max-w-[480px] animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-10">
                    {/* Logo Area */}
                    <div className="flex justify-start">
                        <div
                            className="cursor-pointer select-none active:scale-95 transition inline-block"
                            onClick={onExit}
                        >
                            <img src={logoLight} alt="FINORA" className="h-[22px] w-auto" />
                        </div>
                    </div>

                    {/* Progress Bar Area */}
                    <div className="space-y-6">
                        <Stepper currentStepIndex={currentStepIndex} totalSteps={totalSteps} />

                        <div className="flex items-center">
                            {onBack && (
                                <button
                                    onClick={onBack}
                                    className="p-2 -ml-2 hover:bg-white/5 rounded-lg transition-all text-[#848E9C] hover:text-white flex items-center gap-2 group"
                                >
                                    <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                                    <span className="text-xs font-bold uppercase tracking-widest">Go Back</span>
                                </button>
                            )}
                        </div>
                    </div>

                    {title && (
                        <div className="text-left mb-12 space-y-3">
                            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                                {title === 'Verify Identity' ? "Let's get you verified" : title}
                            </h1>
                            <p className="text-sm text-[#848E9C] font-medium max-w-[400px] leading-relaxed">
                                {currentStep === 'COUNTRY_SELECTION' && "Your country determines the required verification steps."}
                                {['ID_UPLOAD', 'LIVENESS'].includes(currentStep) && "Your data is encrypted and securely protected."}
                                {currentStep === 'PERSONAL_INFO' && "Please enter your basic details as they appear on your ID."}
                                {currentStep === 'STATUS_CHECK' && "Verification usually takes less than 3 minutes."}
                            </p>
                        </div>
                    )}
                    {children}
                </div>
            </main>

            {/* Minimal Footer */}
            <footer className="py-10 border-t border-white/[0.05] text-center bg-[#12122b]/40 mt-auto">
                <p className="text-[#848E9C] text-xs font-medium">
                    © 2026 FINORA. Enterprise-grade crypto exchange.
                    <span className="mx-2 text-white/10">|</span>
                    <a href="#" className="text-[#5e5ce6] hover:text-[#5e5ce6]/80 transition-colors font-bold">Privacy Policy</a>
                </p>
            </footer>
        </div>
    );
};