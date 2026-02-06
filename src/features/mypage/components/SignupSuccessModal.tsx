import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import confetti from 'canvas-confetti';

interface SignupSuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
    onVerify: () => void;
}

const SignupSuccessModal: React.FC<SignupSuccessModalProps> = ({ isOpen, onClose, onVerify }) => {
    useEffect(() => {
        if (isOpen) {
            // Trigger celebration confetti
            const end = Date.now() + 3 * 1000;
            const colors = ['#5e5ce6', '#10b981', '#ffffff'];

            (function frame() {
                confetti({
                    particleCount: 3,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: colors
                });
                confetti({
                    particleCount: 3,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: colors
                });

                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            }());
        }
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-md bg-[#0D0D0D] border border-white/10 rounded-[2.5rem] p-8 overflow-hidden shadow-2xl"
                    >
                        {/* Decorative background glow */}
                        <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#5e5ce6]/20 rounded-full blur-[80px]" />
                        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-[#10b981]/10 rounded-full blur-[80px]" />

                        <div className="relative space-y-8 text-center">
                            <div className="flex justify-center">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.2 }}
                                    className="w-24 h-24 rounded-3xl bg-green-500/10 flex items-center justify-center text-green-500 shadow-inner"
                                >
                                    <CheckCircle2 className="h-12 w-12" />
                                </motion.div>
                            </div>

                            <div className="space-y-3">
                                <h2 className="text-3xl font-black text-white tracking-tight">All set up!</h2>
                                <p className="text-gray-400 font-medium">
                                    Welcome to Finora. Your account has been created successfully.
                                </p>
                            </div>

                            <div className="space-y-4 pt-4">
                                <Button
                                    onClick={onVerify}
                                    className="w-full h-16 rounded-2xl bg-[#5e5ce6] text-lg font-black hover:bg-[#4b4ac2] group shadow-lg shadow-[#5e5ce6]/20 transition-all active:scale-95"
                                >
                                    Verify to Unlock trading
                                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    onClick={onClose}
                                    className="w-full rounded-2xl text-base font-bold text-gray-400 hover:text-white hover:bg-white/5"
                                >
                                    Go to Dashboard
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default SignupSuccessModal;
