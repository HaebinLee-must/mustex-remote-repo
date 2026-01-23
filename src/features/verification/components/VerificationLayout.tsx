import React from 'react';
import { ChevronLeft, Info, ShieldCheck } from 'lucide-react';
import { StepId } from '../types';

interface VerificationLayoutProps {
    children: React.ReactNode;
    currentStep: StepId;
    onBack?: () => void;
    title?: string;
}

const Stepper = ({ currentStep }: { currentStep: StepId }) => {
    const steps = [
        { id: 'ACCOUNT', label: 'Account', completed: true },
        { id: 'KYC', label: 'Verification', active: ['INTRO', 'PERSONAL_INFO', 'ID_UPLOAD', 'LIVENESS', 'ADDRESS_PROOF', 'STATUS_CHECK'].includes(currentStep) },
        { id: 'SECURITY', label: 'Security', active: currentStep === 'SECURITY_2FA' },
        { id: 'UNLOCK', label: 'Unlock', active: currentStep === 'FEATURE_UNLOCK' },
    ];

    return (
        <div className="flex items-center justify-center gap-4 sm:gap-10 mb-10 overflow-x-auto py-2">
            {steps.map((step, idx) => (
                <React.Fragment key={step.id}>
                    <div className="flex flex-col items-center gap-2 shrink-0">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${step.active || step.completed
                                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                                : 'bg-[#2B3139] text-[#848E9C]'
                            }`}>
                            {step.completed && !step.active ? (
                                <ShieldCheck className="w-4 h-4" />
                            ) : (
                                idx + 1
                            )}
                        </div>
                        <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-widest ${step.active ? 'text-white' : 'text-[#848E9C]'
                            }`}>
                            {step.label}
                        </span>
                    </div>
                    {idx < steps.length - 1 && (
                        <div className="h-[2px] w-8 sm:w-16 bg-[#2B3139] -mt-6 rounded-full overflow-hidden">
                            <div className={`h-full transition-all duration-500 ${step.completed ? 'w-full bg-indigo-600' : 'w-0'}`} />
                        </div>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

export const VerificationLayout: React.FC<VerificationLayoutProps> = ({
    children,
    currentStep,
    onBack,
    title
}) => {
    return (
        <div className="min-h-screen bg-[#0B0E11] text-[#EAECEF] flex flex-col font-sans selection:bg-indigo-500/30">
            {/* Minimal Onboarding Header */}
            <header className="h-20 border-b border-white/[0.05] bg-[#0B0E11]/80 backdrop-blur-xl px-4 sm:px-12 flex items-center justify-between sticky top-0 z-[100]">
                <div className="flex items-center gap-6">
                    {onBack && (
                        <button
                            onClick={onBack}
                            className="p-3 hover:bg-white/5 rounded-full transition-all text-[#848E9C] hover:text-white"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                    )}
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/20">
                            <ShieldCheck className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-lg font-black tracking-tighter text-white uppercase italic">Mustex</span>
                            <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest">Verification</span>
                        </div>
                    </div>
                </div>

                <div className="hidden lg:block flex-1 max-w-2xl mx-12">
                    <Stepper currentStep={currentStep} />
                </div>

                <div className="flex items-center gap-4">
                    <button className="p-3 text-[#848E9C] hover:text-white transition-colors">
                        <Info className="w-5 h-5" />
                    </button>
                    <div className="hidden sm:block h-8 w-[1px] bg-white/10" />
                    <button className="hidden sm:block text-xs font-bold text-[#848E9C] hover:text-white transition-colors">
                        Support
                    </button>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col items-center justify-start pt-10 sm:pt-20 pb-12 px-4 overflow-y-auto custom-scrollbar">
                <div className="w-full max-w-[480px] animate-in fade-in slide-in-from-bottom-4 duration-700">
                    {title && (
                        <div className="text-center mb-10 space-y-2">
                            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                                {title}
                            </h1>
                            <div className="lg:hidden flex justify-center pt-4">
                                <Stepper currentStep={currentStep} />
                            </div>
                        </div>
                    )}
                    {children}
                </div>
            </main>

            {/* Minimal Footer */}
            <footer className="py-8 border-t border-white/[0.05] text-center bg-[#0B0E11]/40">
                <p className="text-[#848E9C] text-xs font-medium">
                    © 2026 MUSTEX. Enterprise-grade crypto exchange.
                    <span className="mx-2 text-white/10">|</span>
                    <a href="#" className="text-indigo-400 hover:text-indigo-300 transition-colors">Privacy Policy</a>
                </p>
            </footer>
        </div>
    );
};
