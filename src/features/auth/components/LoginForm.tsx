import React, { useState } from 'react';
import { X, Globe, Eye, EyeOff } from 'lucide-react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { useUI } from '@/features/shared/UIContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/features/auth/AuthContext'; // Import useAuth

interface LoginFormProps {
    onLogin?: (userData: { email: string; uid: string }) => void; // Update onLogin signature
    onViewChange?: (view: string) => void;
}

const LoginForm = ({ onLogin, onViewChange }: LoginFormProps) => {
    const { lang, setLang } = useUI();
    const { login } = useAuth(); // Destructure login from useAuth()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: { email?: string; password?: string } = {};

        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Invalid email address';
        }

        if (!password) {
            newErrors.password = 'Password is required';
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            console.log('Logging in with:', { email, password });
            // Generate a dummy UID for now; in a real app, this would come from a backend auth service.
            const dummyUid = `user_${Date.now()}`;
            login({ email, uid: dummyUid }); // Call login from AuthContext
            onLogin?.({ email, uid: dummyUid });
        }
    };

    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#000000] p-4 font-sans">
            {/* Background Pattern Sync with Landing */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,#5e5ce6,transparent_50%)] opacity-10" />

            <Card className="relative z-10 w-full max-w-[520px] overflow-hidden rounded-[32px] border-white/10 bg-white/10 shadow-2xl backdrop-blur-2xl animate-in fade-in slide-in-from-bottom-6 duration-700">
                <CardHeader className="space-y-6 pb-8 text-left pt-10 px-8">
                    <div
                        className="text-[#6366F1] font-black text-2xl tracking-tighter cursor-pointer select-none active:scale-95 transition inline-block"
                        onClick={() => onViewChange?.('landing')}
                    >
                        Finora
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-4xl font-extrabold tracking-tight text-white uppercase">
                            LOG IN
                        </h1>
                        <p className="text-sm text-gray-400">WELCOME BACK TO Finora</p>
                    </div>
                </CardHeader>
                <CardContent className="px-8 pb-8">
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
                                    className={`h-14 border-white/[0.08] bg-white/[0.05] pr-10 text-white transition-all placeholder:text-gray-500 focus:bg-white/[0.08] focus:ring-2 focus:ring-[#5e5ce6]/50 ${errors.email ? 'border-red-500/50 focus:ring-red-500/50' : ''
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
                            {errors.email && (
                                <p className="mt-1 text-sm font-medium text-red-500 animate-in fade-in slide-in-from-top-1">
                                    {errors.email}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password" className="text-white">Password</Label>
                                <Button variant="link" className="h-auto p-0 text-sm font-normal text-[#5e5ce6] hover:underline">
                                    Forgot?
                                </Button>
                            </div>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={`h-14 border-white/[0.08] bg-white/[0.05] pr-10 text-white transition-all placeholder:text-gray-500 focus:bg-white/[0.08] focus:ring-2 focus:ring-[#5e5ce6]/50 ${errors.password ? 'border-red-500/50 focus:ring-red-500/50' : ''
                                        }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="mt-1 text-sm font-medium text-red-500 animate-in fade-in slide-in-from-top-1">
                                    {errors.password}
                                </p>
                            )}
                        </div>
                        <Button
                            type="submit"
                            className="group relative w-full overflow-hidden rounded-2xl bg-[#5e5ce6] py-7 text-lg font-bold text-white transition-all hover:bg-[#4b4ac2] active:scale-[0.98]"
                        >
                            <span className="relative z-10">Log In</span>
                            <div className="absolute inset-0 z-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col items-center justify-center space-y-2 pt-0 pb-10">
                    <div className="text-sm text-gray-400">
                        Don't have an account?{' '}
                        <Button
                            variant="link"
                            className="h-auto p-0 font-bold text-white hover:underline"
                            onClick={() => onViewChange?.('signup')}
                        >
                            Register Now
                        </Button>
                    </div>
                </CardFooter>
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

export default LoginForm;
