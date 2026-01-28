import React, { useState, useRef, useEffect } from 'react';
import logoLight from '../../../assets/finora_bi_light.png';
import { X, Eye, EyeOff, CheckCircle2, Check, ShieldCheck, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [subscribeNewsletter, setSubscribeNewsletter] = useState(false);
    const [error, setError] = useState('');
    const [countdown, setCountdown] = useState(30);

    const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (step === 'verify' && countdown > 0) {
            timer = setInterval(() => setCountdown(prev => prev - 1), 1000);
        }
        return () => clearInterval(timer);
    }, [step, countdown]);

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
        const code = otp.join('');
        if (code.length !== 6) {
            setError('Please enter a 6-digit verification code');
            return;
        }
        setError('');
        setStep('password');
    };

    const handleOtpChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value.slice(-1);
        setOtp(newOtp);

        if (value && index < 5) {
            otpRefs.current[index + 1]?.focus();
        }
    };

    const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            otpRefs.current[index - 1]?.focus();
        }
    };

    const handleOtpPaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, 6);
        if (!/^\d+$/.test(pastedData)) return;

        const newOtp = [...otp];
        pastedData.split('').forEach((char, i) => {
            if (i < 6) newOtp[i] = char;
        });
        setOtp(newOtp);
        otpRefs.current[Math.min(pastedData.length, 5)]?.focus();
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
        let content;
        switch (step) {
            case 'email':
                content = (
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
                                    className={`h-14 sm:h-14 border-white/[0.08] bg-white/[0.05] pr-10 text-white transition-all placeholder:text-gray-500 focus:bg-white/[0.08] focus:outline-none focus:ring-1 ${error && !email
                                        ? 'border-red-500 focus:ring-red-500'
                                        : 'focus:ring-[#5e5ce6]'
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
                            {error && <p className="text-sm font-medium text-red-500 mt-2">{error}</p>}
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

                            <div className="flex items-center space-x-3">
                                <Checkbox
                                    id="newsletter"
                                    checked={subscribeNewsletter}
                                    onCheckedChange={(checked) => setSubscribeNewsletter(checked as boolean)}
                                    className="border-white/20 bg-white/5 data-[state=checked]:bg-[#5e5ce6] data-[state=checked]:border-[#5e5ce6]"
                                />
                                <Label
                                    htmlFor="newsletter"
                                    className="text-sm font-medium leading-none text-gray-300 cursor-pointer"
                                >
                                    I agree to receive marketing updates and newsletters (Optional)
                                </Label>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={!agreeTerms}
                            className="group relative w-full overflow-hidden rounded-2xl bg-[#5e5ce6] py-7 text-lg font-bold text-white transition-all hover:bg-[#4b4ac2] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span className="relative z-10">Create Account</span>
                            <div className="absolute inset-0 z-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                        </Button>

                        <div className="relative pt-2">
                            <div className="absolute inset-0 flex items-center">
                                <Separator className="bg-white/10" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-transparent px-4 text-gray-500 font-bold">or</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <Button variant="outline" className="h-14 border-white/10 bg-white/5 text-white hover:bg-white/10 font-bold">Google</Button>
                            <Button variant="outline" className="h-14 border-white/10 bg-white/5 text-white hover:bg-white/10 font-bold">Apple</Button>
                        </div>
                    </form>
                );
                break;
            case 'verify':
                content = (
                    <form onSubmit={handleVerifySubmit} className="space-y-8">
                        <div className="space-y-4">
                            <div className="text-center space-y-2">
                                <p className="text-[#848E9C]">A 6-digit code has been sent to</p>
                                <p className="text-white font-bold">{email}</p>
                            </div>
                            <div className="flex justify-center gap-2 sm:gap-3" onPaste={handleOtpPaste}>
                                {otp.map((digit, idx) => (
                                    <input
                                        key={idx}
                                        ref={el => otpRefs.current[idx] = el}
                                        type="text"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => {
                                            handleOtpChange(idx, e.target.value);
                                            if (error) setError('');
                                        }}
                                        onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                                        className={`w-10 h-14 sm:w-12 sm:h-16 text-center text-2xl font-black rounded-xl border bg-[#1a1a3a] text-white focus:ring-1 outline-none transition-all ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-white/10 focus:border-[#5e5ce6] focus:ring-[#5e5ce6]'}`}
                                    />
                                ))}
                            </div>
                            {error && <p className="text-sm font-medium text-red-500 text-center animate-in fade-in slide-in-from-top-1">{error}</p>}
                        </div>
                        <div className="space-y-4">
                            <Button type="submit" className="w-full rounded-2xl bg-[#5e5ce6] py-7 text-lg font-bold hover:bg-[#4b4ac2]">Continue</Button>
                            <div className="text-center">
                                <button
                                    type="button"
                                    disabled={countdown > 0}
                                    onClick={() => {
                                        setCountdown(30);
                                        setOtp(['', '', '', '', '', '']);
                                    }}
                                    className="text-sm font-bold text-[#848E9C] hover:text-white disabled:opacity-50"
                                >
                                    {countdown > 0 ? `Resend code in ${countdown}s` : 'Resend Code'}
                                </button>
                            </div>
                            <Button variant="link" onClick={() => setStep('email')} className="w-full text-gray-400">Change Email</Button>
                        </div>
                    </form>
                );
                break;
            case 'password':
                const hasLength = password.length >= 8;
                const hasUpper = /[A-Z]/.test(password);
                const hasNumber = /\d/.test(password);
                const hasSpecial = /[!@#$%^&*]/.test(password);
                const allMet = hasLength && hasUpper && hasNumber && hasSpecial;

                content = (
                    <form onSubmit={handlePasswordSubmit} className="space-y-8">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <Label className="text-white">Set Password</Label>
                                <div className="relative">
                                    <Input
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Enter secure password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className={`h-14 border-white/[0.08] bg-white/[0.05] text-white transition-all ${allMet ? 'border-green-500/50' : ''}`}
                                    />
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                        {password && (
                                            <button type="button" onClick={() => setPassword('')} className="text-gray-400 hover:text-white">
                                                <X className="h-4 w-4" />
                                            </button>
                                        )}
                                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-400 hover:text-white">
                                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { met: hasLength, label: '8+ Characters' },
                                    { met: hasUpper, label: 'Upper Case' },
                                    { met: hasNumber, label: 'Number' },
                                    { met: hasSpecial, label: 'Special' },
                                ].map((cond, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <div className={`w-4 h-4 rounded-full flex items-center justify-center transition-colors ${cond.met ? 'bg-green-500' : 'bg-white/5 border border-white/10'}`}>
                                            <Check className={`w-2.5 h-2.5 text-white ${cond.met ? 'opacity-100' : 'opacity-0'}`} />
                                        </div>
                                        <span className={`text-[10px] font-bold uppercase tracking-wider ${cond.met ? 'text-[#10b981]' : 'text-gray-500'}`}>{cond.label}</span>
                                    </div>
                                ))}
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
                        <Button
                            type="submit"
                            disabled={!allMet || password !== confirmPassword}
                            className="w-full rounded-2xl bg-[#5e5ce6] py-7 text-lg font-bold hover:bg-[#4b4ac2] disabled:opacity-50"
                        >
                            Continue
                        </Button>
                    </form>
                );
                break;
            case 'complete':
                content = (
                    <div className="space-y-8 text-center py-6">
                        <div className="flex justify-center">
                            <div className="w-24 h-24 rounded-3xl bg-green-500/10 flex items-center justify-center text-green-500">
                                <CheckCircle2 className="h-14 w-14" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-3xl font-black text-white">All set!</h2>
                            <p className="text-gray-400">Your account has been created successfully.</p>
                        </div>
                        <Button
                            onClick={handleFinalize}
                            className="w-full rounded-2xl bg-[#5e5ce6] py-7 text-lg font-bold hover:bg-[#4b4ac2] group"
                        >
                            Verify Identity
                            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </div>
                );
                break;
        }

        return (
            <AnimatePresence mode="wait">
                <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    {content}
                </motion.div>
            </AnimatePresence>
        );
    };

    const getTitle = () => {
        switch (step) {
            case 'email': return 'Create your account';
            case 'verify': return 'Verify your email';
            case 'password': return 'Create a password';
            case 'complete': return 'Registration complete';
        }
    };

    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#12122b] p-4 font-sans text-left">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,#5e5ce6,transparent_50%)] opacity-10" />

            {/* Navigation Bar */}
            <div className="absolute top-0 left-0 right-0 h-20 px-6 md:px-10 flex items-center justify-between z-50">
                <div
                    className="cursor-pointer select-none active:scale-95 transition"
                    onClick={() => onViewChange?.('landing')}
                >
                    <img src={logoLight} alt="FINORA" className="h-[22px] w-auto" />
                </div>
                <button
                    onClick={() => onViewChange?.('landing')}
                    className="p-2 text-[#848E9C] hover:text-white transition-colors"
                >
                    <X className="w-6 h-6" />
                </button>
            </div>

            <Card className="relative z-10 w-full max-w-[520px] overflow-hidden rounded-[32px] border-white/10 bg-white/10 shadow-2xl backdrop-blur-2xl animate-in fade-in slide-in-from-bottom-6 duration-700">
                <CardHeader className="space-y-6 pb-8 pt-10">
                    <div className="space-y-2">
                        <h1 className="text-4xl font-extrabold tracking-tight text-white leading-tight">
                            {getTitle()}
                        </h1>
                        {step === 'email' && <p className="text-sm text-gray-400">Welcome to FINORA</p>}
                    </div>
                </CardHeader>
                <CardContent className="pb-10">
                    {renderStep()}

                    {step === 'email' && (
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
                    )}
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
