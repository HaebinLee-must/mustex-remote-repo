import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; // Import Input component
import { Label } from '@/components/ui/label';   // Import Label component
import { Check, ArrowRight } from 'lucide-react';

interface OnboardingFlowProps {
    onComplete: () => void;
}

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState<string | null>(null);
    const totalSteps = 3;

    const validateEmail = (email: string) => {
        // Basic email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            return null; // No error if input is empty initially
        }
        if (!emailRegex.test(email)) {
            return '올바른 이메일 주소를 입력해주세요.';
        }
        return null;
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        setEmailError(validateEmail(newEmail));
    };

    const nextStep = () => {
        if (step === 1) {
            const error = validateEmail(email);
            setEmailError(error);
            if (error) {
                return; // Prevent moving to next step if email is invalid
            }
        }

        if (step < totalSteps) {
            setStep(step + 1);
        } else {
            onComplete();
        }
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                        <h2 className="text-2xl font-bold text-white">Welcome to MUSTEX!</h2>
                        <p className="text-gray-400">Let's set up your account for the best experience.</p>
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm text-gray-300">이메일 주소</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={handleEmailChange}
                                className={`bg-white/5 border-white/10 text-white placeholder:text-gray-500 ${emailError ? 'border-red-500' : ''
                                    }`}
                            />
                            {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
                        </div>
                        <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                            <p className="text-sm text-indigo-300 font-semibold mb-2">Step 1: Account Setup</p>
                            <p className="text-xs text-gray-500">Enter your email to get started.</p>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                        <h2 className="text-2xl font-bold text-white">Identity Verification</h2>
                        <p className="text-gray-400">Complete KYC to unlock full trading features and higher limits.</p>
                        <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                            <p className="text-sm text-indigo-300 font-semibold mb-2">Step 2: KYC Compliance</p>
                            <p className="text-xs text-gray-500">Required by global financial regulations.</p>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                        <h2 className="text-2xl font-bold text-white">Ready to Trade!</h2>
                        <p className="text-gray-400">You're all set. Start your journey into the future of fintech.</p>
                        <div className="bg-indigo-500/10 p-4 rounded-xl border border-indigo-500/20">
                            <div className="flex items-center space-x-2 text-indigo-400">
                                <Check className="h-5 w-5" />
                                <span className="font-bold">Setup Complete</span>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <Card className="w-full max-w-[500px] border-white/[0.08] bg-[#1E2329]/60 backdrop-blur-xl rounded-[24px]">
            <CardHeader>
                <div className="flex justify-between items-center mb-4">
                    <div className="flex space-x-1">
                        {[1, 2, 3].map((s) => (
                            <div
                                key={s}
                                className={`h-1 w-8 rounded-full transition-colors duration-300 ${s <= step ? 'bg-indigo-500' : 'bg-white/10'
                                    }`}
                            />
                        ))}
                    </div>
                    <span className="text-xs text-gray-500 font-mono">STEP {step}/{totalSteps}</span>
                </div>
            </CardHeader>
            <CardContent className="py-6">
                {renderStep()}
            </CardContent>
            <CardFooter>
                <Button
                    onClick={nextStep}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 py-6 rounded-xl text-lg font-bold group"
                    disabled={step === 1 && (email === '' || emailError !== null)} // Disable if email is empty or invalid on step 1
                >
                    {step === totalSteps ? 'Get Started' : 'Next'}
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
            </CardFooter>
        </Card>
    );
};

export default OnboardingFlow;
