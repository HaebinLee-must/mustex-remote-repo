import React, { useState } from 'react';
import { X, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { useUI } from '@/features/shared/UIContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

interface SignupFlowProps {
    onComplete?: (userData: { email: string }) => void;
    onViewChange?: (view: string) => void;
}

type Step = 'email' | 'verify' | 'password' | 'complete';

const SignupFlow = ({ onComplete, onViewChange }: SignupFlowProps) => {
    const { lang, setLang } = useUI();
    const [step, setStep] = useState<Step>('email');
    const [email, setEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [subscribeNewsletter, setSubscribeNewsletter] = useState(false);
    const [error, setError] = useState('');

    const handleEmailSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) {
            setError('Email is required');
            return;
        }
        if (!agreeTerms) {
            setError('You must agree to the Terms & Privacy');
            return;
        }
        setError('');
        setStep('verify');
    };

    const handleVerifySubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (verificationCode.length !== 6) {
            setError('Please enter a valid 6-digit code');
            return;
        }
        setError('');
        setStep('password');
    };

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password.length < 8) {
            setError('Password must be at least 8 characters');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        setError('');
        setStep('complete');
    };

    const handleFinalize = () => {
        onComplete?.({ email });
    };

    const renderStep = () => {
        switch (step) {
            case 'email':
                return (
                    <form onSubmit={handleEmailSubmit} className="space-y-6" noValidate>
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-white">Email</Label>
                            <div className="relative">
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={`h-14 border-white/[0.08] bg-white/[0.05] pr-10 text-white transition-all placeholder:text-gray-500 focus:bg-white/[0.08] focus:ring-2 focus:ring-[#6366F1]/50 ${error && !email ? 'border-red-500/50 focus:ring-red-500/50' : ''
                                        }`}
                                />
                                {email && (
                                    <button
                                        type="button"
                                        onClick={() => setEmail('')}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <Checkbox
                                    id="terms"
                                    checked={agreeTerms}
                                    onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                                    className="border-white/20 bg-white/5 data-[state=checked]:bg-[#5e5ce6] data-[state=checked]:border-[#5e5ce6]"
                                />
                                <Label
                                    htmlFor="terms"
                                    className="text-sm font-medium leading-none text-gray-300 cursor-pointer"
                                >
                                    I have read and agree to the{' '}
                                    <span className="text-gray-300 underline underline-offset-4 hover:text-white">Terms and Conditions</span> &{' '}
                                    <span className="text-gray-300 underline underline-offset-4 hover:text-white">Privacy Policy</span>
                                </Label>
                            </div>
                        </div>

                        {error && <p className="text-sm font-medium text-red-500 animate-in fade-in slide-in-from-top-1">{error}</p>}

                        <Button
                            type="submit"
                            className="group relative w-full overflow-hidden rounded-2xl bg-[#5e5ce6] py-7 text-lg font-bold text-white transition-all hover:scale-[1.02] hover:bg-[#6c6af7] hover:shadow-xl hover:shadow-indigo-500/25 active:scale-[0.98]"
                        >
                            <span className="relative z-10">Create Account</span>
                            <div className="absolute inset-0 z-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                        </Button>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <Separator className="bg-white/10" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-[#1E2329] px-2 text-gray-400">or</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            <Button variant="outline" className="border-white/10 bg-white/5 py-6 text-white hover:bg-white/10">Continue with Google</Button>
                            <Button variant="outline" className="border-white/10 bg-white/5 py-6 text-white hover:bg-white/10">Continue with Apple</Button>
                        </div>
                    </form>
                );
            case 'verify':
                return (
                    <form onSubmit={handleVerifySubmit} className="space-y-6">
                        <div className="space-y-4">
                            <div className="text-center space-y-2">
                                <p className="text-gray-400">A 6-digit code has been sent to</p>
                                <p className="text-white font-bold">{email}</p>
                            </div>
                            <div className="flex justify-center">
                                <Input
                                    type="text"
                                    maxLength={6}
                                    placeholder="000000"
                                    value={verificationCode}
                                    onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                                    className="h-16 w-48 text-center text-3xl font-black tracking-[0.5em] border-white/[0.08] bg-white/[0.05] text-white focus:ring-[#6366F1]"
                                />
                            </div>
                        </div>
                        {error && <p className="text-sm font-medium text-red-500 text-center">{error}</p>}
                        <Button type="submit" className="w-full rounded-2xl bg-[#5e5ce6] py-7 text-lg font-bold">Verify Email</Button>
                        <Button variant="link" onClick={() => setStep('email')} className="w-full text-gray-400">Change Email</Button>
                    </form>
                );
            case 'password':
                return (
                    <form onSubmit={handlePasswordSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label className="text-white">Set Password</Label>
                                <div className="relative">
                                    <Input
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Min 8 characters"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="h-14 border-white/[0.08] bg-white/[0.05] text-white"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-white">Confirm Password</Label>
                                <Input
                                    type="password"
                                    placeholder="Repeat password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="h-14 border-white/[0.08] bg-white/[0.05] text-white"
                                />
                            </div>
                        </div>
                        {error && <p className="text-sm font-medium text-red-500">{error}</p>}
                        <Button type="submit" className="w-full rounded-2xl bg-[#5e5ce6] py-7 text-lg font-bold">Set Password</Button>
                    </form>
                );
            case 'complete':
                return (
                    <div className="space-y-8 text-center py-6">
                        <div className="flex justify-center">
                            <div className="rounded-full bg-green-500/20 p-6">
                                <CheckCircle2 className="h-16 w-16 text-green-500" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold text-white">All set!</h2>
                            <p className="text-gray-400">Your account has been created successfully.</p>
                        </div>
                        <Button onClick={handleFinalize} className="w-full rounded-2xl bg-[#5e5ce6] py-7 text-lg font-bold">Get Started</Button>
                    </div>
                );
        }
    };

    const getTitle = () => {
        switch (step) {
            case 'email': return 'Create Your Account';
            case 'verify': return 'Verify Your Email';
            case 'password': return 'Secure Your Account';
            case 'complete': return 'Registration Complete';
        }
    };

    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#0B0E11] p-4 font-sans text-left">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,#312e81,transparent_50%)] opacity-20" />

            <Card className="relative z-10 w-full max-w-[520px] overflow-hidden rounded-[32px] border-white/[0.08] bg-[#1E2329]/40 shadow-2xl backdrop-blur-2xl animate-in fade-in slide-in-from-bottom-6 duration-700">
                <CardHeader className="space-y-6 pb-8 pt-10">
                    <div
                        className="text-[#6366F1] font-black text-2xl tracking-tighter cursor-pointer select-none active:scale-95 transition inline-block"
                        onClick={() => onViewChange?.('landing')}
                    >
                        MUSTEX
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-4xl font-extrabold tracking-tight text-white leading-tight">
                            {getTitle()}
                        </h1>
                        {step === 'email' && <p className="text-sm text-gray-400">Join the next generation of global fintech.</p>}
                    </div>
                </CardHeader>
                <CardContent className="pb-10">
                    {renderStep()}

                    <CardFooter className="flex flex-col items-center justify-center pt-4 pb-0">
                        <div className="text-sm text-gray-400">
                            Already have an account?{' '}
                            <Button
                                variant="link"
                                className="h-auto p-0 font-bold text-white hover:underline"
                                onClick={() => onViewChange?.('login')}
                            >
                                Log In
                            </Button>
                        </div>
                    </CardFooter>
                </CardContent>
            </Card>

            <footer className="mt-12 flex flex-col items-center space-y-4">
                <div className="flex items-center space-x-6 text-sm text-gray-400">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => setLang('en')}
                            className={`flex h-8 w-8 items-center justify-center rounded-full border border-white/10 transition-all hover:border-white/30 hover:bg-white/5 ${lang === 'en' ? 'border-[#5e5ce6] bg-[#5e5ce6]/10 text-white' : ''
                                }`}
                            title="English"
                        >
                            <span className="text-xs font-bold">EN</span>
                        </button>
                        <button
                            onClick={() => setLang('ko')}
                            className={`flex h-8 w-8 items-center justify-center rounded-full border border-white/10 transition-all hover:border-white/30 hover:bg-white/5 ${lang === 'ko' ? 'border-[#5e5ce6] bg-[#5e5ce6]/10 text-white' : ''
                                }`}
                            title="한국어"
                        >
                            <span className="text-xs font-bold">KO</span>
                        </button>
                        <button
                            onClick={() => setLang('mn')}
                            className={`flex h-8 w-8 items-center justify-center rounded-full border border-white/10 transition-all hover:border-white/30 hover:bg-white/5 ${lang === 'mn' ? 'border-[#5e5ce6] bg-[#5e5ce6]/10 text-white' : ''
                                }`}
                            title="Монгол"
                        >
                            <span className="text-xs font-bold">MN</span>
                        </button>
                    </div>
                    <Separator orientation="vertical" className="h-4 bg-white/10" />
                    <button className="hover:text-white transition-colors">Cookies</button>
                    <button className="hover:text-white transition-colors">Terms</button>
                    <button className="hover:text-white transition-colors">Privacy</button>
                </div>
            </footer>
        </div>
    );
};

export default SignupFlow;
