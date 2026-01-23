import React, { useState, useContext } from 'react';
import { X, Globe } from 'lucide-react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { LanguageContext } from '@/App';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

interface SignupFlowProps {
    onComplete?: (userData: { email: string }) => void;
    onViewChange?: (view: string) => void;
}

const SignupFlow = ({ onComplete, onViewChange }: SignupFlowProps) => {
    const { lang, setLang } = useContext(LanguageContext);
    const [email, setEmail] = useState('');
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [subscribeNewsletter, setSubscribeNewsletter] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
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
        console.log('Creating account with:', { email, agreeTerms, subscribeNewsletter });
        onComplete?.({ email });
    };

    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#0B0E11] p-4 font-sans">
            {/* Background Pattern Sync with Landing */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,#312e81,transparent_50%)] opacity-20" />

            <Card className="relative z-10 w-full max-w-[520px] overflow-hidden rounded-[32px] border-white/[0.08] bg-[#1E2329]/40 shadow-2xl backdrop-blur-2xl animate-in fade-in slide-in-from-bottom-6 duration-700">
                <CardHeader className="space-y-6 pb-8 text-left pt-10">
                    <div
                        className="text-[#6366F1] font-black text-2xl tracking-tighter cursor-pointer select-none active:scale-95 transition inline-block"
                        onClick={() => onViewChange?.('landing')}
                    >
                        MUSTEX
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-4xl font-extrabold tracking-tight text-white">
                            Create Your Account
                        </h1>
                        <p className="text-sm text-gray-400">Join the next generation of global fintech.</p>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
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
                            {error && !agreeTerms && !subscribeNewsletter && (
                                <p className="mt-1 text-sm font-medium text-red-500 animate-in fade-in slide-in-from-top-1">
                                    {error}
                                </p>
                            )}
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
                                    <span
                                        onClick={(e) => {
                                            e.preventDefault();
                                            console.log('Navigate to Terms');
                                        }}
                                        className="text-gray-300 underline underline-offset-4 hover:text-white"
                                    >
                                        Terms and Conditions
                                    </span> &{' '}
                                    <span
                                        onClick={(e) => {
                                            e.preventDefault();
                                            console.log('Navigate to Privacy');
                                        }}
                                        className="text-gray-300 underline underline-offset-4 hover:text-white"
                                    >
                                        Privacy Policy
                                    </span>
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
                                    Subscribe to our Newsletter (Optional)
                                </Label>
                            </div>
                        </div>

                        {error && (agreeTerms || subscribeNewsletter) && (
                            <p className="mt-1 text-sm font-medium text-red-500 animate-in fade-in slide-in-from-top-1">
                                {error}
                            </p>
                        )}

                        <Button
                            type="submit"
                            className="group relative w-full overflow-hidden rounded-2xl bg-[#5e5ce6] py-7 text-lg font-bold text-white transition-all hover:scale-[1.02] hover:bg-[#6c6af7] hover:shadow-xl hover:shadow-indigo-500/25 active:scale-[0.98]"
                        >
                            <span className="relative z-10">Create Account</span>
                            <div className="absolute inset-0 z-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                        </Button>
                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <Separator className="bg-white/10" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-[#1d1d42] px-2 text-gray-400">or</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        <Button
                            variant="outline"
                            className="border-white/10 bg-white/5 py-6 text-white hover:bg-white/10 hover:text-white"
                        >
                            <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                                <path
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    fill="#4285F4"
                                />
                                <path
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    fill="#34A853"
                                />
                                <path
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                                    fill="#FBBC05"
                                />
                                <path
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    fill="#EA4335"
                                />
                            </svg>
                            Continue with Google
                        </Button>
                        <Button
                            variant="outline"
                            className="border-white/10 bg-white/5 py-6 text-white hover:bg-white/10 hover:text-white"
                        >
                            <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.05 20.28c-.96.95-2.11 2.21-3.6 2.21-1.4 0-1.89-.87-3.64-.87-1.76 0-2.31.85-3.62.85-1.39 0-2.69-1.37-3.66-2.34C.81 18.42-1.33 13.91 1 10.1c1.16-1.9 3.06-3.04 4.8-3.04 1.34 0 2.45.86 3.36.86.88 0 2.15-.98 3.73-.98 1.63 0 3.01.62 3.99 2.05-3.32 1.83-2.77 6.35.48 7.64-.78 1.99-1.5 3.19-2.31 4.14M11.96 6.01c-.04-2.03 1.67-3.9 3.44-4.22.25 2.12-1.63 4.14-3.44 4.22" />
                            </svg>
                            Continue with Apple
                        </Button>
                    </div>

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
