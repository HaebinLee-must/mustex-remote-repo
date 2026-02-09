import React, { useState, useRef, useEffect } from 'react';
import { X, Eye, EyeOff, CheckCircle2, Check, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { useUI } from '@/features/shared/UIContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/features/auth/AuthContext'; // Import useAuth
import CountryCodeSelector from '@/components/ui/CountryCodeSelector'; // Import CountryCodeSelector
import { COUNTRIES, DEFAULT_COUNTRY_CODE, Country } from '@/constants/countries'; // Import Country and DEFAULT_COUNTRY_CODE

import { cn } from '@/design-system/cn';

interface SignupFlowProps {
    onComplete?: (userData: { email: string; uid: string }) => void; // Update onComplete signature
    onViewChange?: (view: string) => void;
}

type Step = 'email' | 'verify' | 'phoneNumber' | 'password' | 'complete'; // Add 'phoneNumber' step

const SignupFlow = ({ onComplete, onViewChange }: SignupFlowProps) => {
    const { t } = useUI();
    const [step, setStep] = useState<Step>('email');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState<string | null>(null); // State for email validation error
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [selectedCountryCode, setSelectedCountryCode] = useState(DEFAULT_COUNTRY_CODE); // New state for country code
    const [phoneNumber, setPhoneNumber] = useState(''); // State for phone number
    const [phoneNumberError, setPhoneNumberError] = useState<string | null>(null); // State for phone number validation error
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [agreeMarketing, setAgreeMarketing] = useState(false); // Add state for marketing agreement
    const [error, setError] = useState('');
    const [countdown, setCountdown] = useState(30);
    const { signup } = useAuth(); // Destructure signup from useAuth()

    const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

    // Email validation function
    const validateEmail = (inputEmail: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!inputEmail) {
            return 'Please enter your email address.';
        }
        if (!emailRegex.test(inputEmail)) {
            return 'Please enter a valid email address.';
        }
        return null;
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        // Only show error if email is not empty and validation fails
        if (newEmail) {
            setEmailError(validateEmail(newEmail));
        } else {
            setEmailError(null); // Clear error if email input is empty
        }
    };

    const handleEmailSubmit = React.useCallback((e: React.FormEvent) => {
        e.preventDefault();
        const validationError = validateEmail(email);
        if (validationError) {
            setEmailError(validationError);
            return;
        }
        // Proceed to next step or API call
        // For now, let's move to the verify step
        setStep('verify');
        // In a real app, you'd send an OTP to the email here
        // Temporarily bypass email validation and directly finalize for testing header
        // const dummyUid = `user_${Date.now()}`;
        // signup({ email, uid: dummyUid });
        // onComplete?.({ email, uid: dummyUid });
    }, [email]);

    const handleVerifySubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const code = otp.join('');
        if (code.length !== 6) {
            setError('Please enter a 6-digit verification code');
            return;
        }
        setError('');
        setStep('phoneNumber'); // Transition to the new 'phoneNumber' step
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
        handleFinalize();
    };

    const handleFinalize = () => {
        // Generate a dummy UID for now; in a real app, this would come from a backend auth service.
        const dummyUid = `user_${Date.now()}`;
        signup({ email, uid: dummyUid }); // Call signup from AuthContext
        onComplete?.({ email, uid: dummyUid });
    };

    const renderStep = () => {
        console.log('Current step in renderStep:', step); // Debug log
        let content;
        switch (step) {
            case 'email':
                content = (
                    <form onSubmit={handleEmailSubmit} className="space-y-6" noValidate>
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-white text-base font-bold">{t('email')}</Label>
                            <div className="relative">
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder={t('enter_your_email')}
                                    value={email}
                                    onChange={handleEmailChange}
                                    onBlur={() => setEmailError(validateEmail(email))} // Validate on blur as well
                                    className={`h-14 sm:h-14 border-white/[0.08] bg-white/[0.05] pr-10 text-white transition-all placeholder:text-gray-500 focus:bg-white/[0.08] focus:ring-2 focus:ring-[#5e5ce6]/50 ${emailError ? 'border-red-500/50 focus:ring-red-500/50' : ''
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
                            {emailError && <p className="text-sm font-medium text-red-500 mt-1">{emailError}</p>}
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
                            {/* Add marketing agreement checkbox */}
                            <div className="flex items-center space-x-3">
                                <Checkbox
                                    id="marketing"
                                    checked={agreeMarketing}
                                    onCheckedChange={(checked) => setAgreeMarketing(checked as boolean)}
                                    className="border-white/20 bg-white/5 data-[state=checked]:bg-[#5e5ce6] data-[state=checked]:border-[#5e5ce6]"
                                />
                                <Label
                                    htmlFor="marketing"
                                    className="text-sm font-medium leading-none text-gray-300 cursor-pointer"
                                >
                                    I agree to receive marketing communications. (Optional)
                                </Label>
                            </div>
                        </div>

                        {error && <p className="text-sm font-medium text-red-500">{error}</p>}

                        <Button
                            type="submit"
                            disabled={!agreeTerms || emailError !== null || !email}
                            className="group relative w-full overflow-hidden rounded-2xl bg-[#5e5ce6] py-7 text-lg font-bold text-white transition-all hover:bg-[#4b4ac2] disabled:opacity-50 disabled:bg-white/10 disabled:text-gray-500 disabled:cursor-not-allowed"
                        >
                            <span className="relative z-10">{t('create_account')}</span>
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
                                <p className="text-sm text-gray-400 mt-2">Please check your inbox. If you don't find the email, please check your spam folder.</p>
                            </div>
                            <div className="flex justify-center gap-2 sm:gap-3" onPaste={handleOtpPaste}>
                                {otp.map((digit, idx) => (
                                    <input
                                        key={idx}
                                        ref={el => otpRefs.current[idx] = el}
                                        type="text"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handleOtpChange(idx, e.target.value)}
                                        onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                                        className="w-10 h-14 sm:w-12 sm:h-16 text-center text-2xl font-black rounded-xl border border-white/10 bg-[#1a1a3a] text-white focus:border-[#5e5ce6] focus:ring-1 focus:ring-[#5e5ce6] outline-none transition-all"
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="space-y-4">
                            <Button type="submit" className="w-full rounded-2xl bg-[#5e5ce6] py-7 text-lg font-bold hover:bg-[#4b4ac2]">Verify Email</Button>
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
                        </div>
                    </form>
                );
                break;
            case 'phoneNumber':
                const currentCountry = COUNTRIES.find(country => country.code === selectedCountryCode);
                const maxLen = currentCountry ? Math.max(...currentCountry.phone_length) : 15;

                const validatePhoneNumber = (inputNumber: string) => {
                    if (!inputNumber) {
                        return 'Please enter your mobile number.';
                    }

                    if (!currentCountry) {
                        return 'Please select a valid country code.';
                    }

                    // Remove all non-digit characters for validation
                    const cleanNumber = inputNumber.replace(/\D/g, '');

                    if (currentCountry.phone_length.length > 0) {
                        if (!currentCountry.phone_length.includes(cleanNumber.length)) {
                            const lengths = currentCountry.phone_length.join(' or ');
                            return `Mobile number must be ${lengths} digits.`;
                        }
                    } else {
                        // Fallback to a generic regex if phone_length is not defined for the country
                        const genericPhoneRegex = /^\d{7,15}$/; // Common range for international phone numbers
                        if (!genericPhoneRegex.test(cleanNumber)) {
                            return 'Invalid mobile number.';
                        }
                    }

                    return null;
                };

                const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                    const newNumber = e.target.value.replace(/\D/g, ''); // Keep only digits
                    setPhoneNumber(newNumber);
                    if (newNumber) {
                        setPhoneNumberError(validatePhoneNumber(newNumber));
                    } else {
                        setPhoneNumberError(null);
                    }
                };

                const handlePhoneNumberSubmit = (e: React.FormEvent) => {
                    e.preventDefault();
                    const validationError = validatePhoneNumber(phoneNumber);
                    if (validationError) {
                        setPhoneNumberError(validationError);
                        return;
                    }
                    setError('');
                    setStep('password');
                };

                content = (
                    <form onSubmit={handlePhoneNumberSubmit} className="space-y-6" noValidate>
                        <div className="space-y-4">
                            <Label htmlFor="phoneNumber" className="text-white text-base font-bold">{t('phone_number')}</Label>
                            <div className="flex flex-col space-y-4">
                                <div className="flex items-center space-x-2">
                                    <CountryCodeSelector selectedCode={selectedCountryCode} onSelectCode={setSelectedCountryCode} />
                                    <div className="relative flex-grow">
                                        <Input
                                            id="phoneNumber"
                                            type="tel"
                                            placeholder={t('enter_mobile_number')}
                                            value={phoneNumber}
                                            maxLength={maxLen}
                                            onChange={handlePhoneNumberChange}
                                            onBlur={() => setPhoneNumberError(validatePhoneNumber(phoneNumber))}
                                            className={`h-14 border-white/10 bg-white/5 pr-10 text-white transition-all placeholder:text-gray-500 focus:bg-white/10 focus:ring-2 focus:ring-primary/50 ${phoneNumberError ? 'border-red-500/50 focus:ring-red-500/50' : ''
                                                }`}
                                        />
                                        {phoneNumber && (
                                            <button
                                                type="button"
                                                onClick={() => setPhoneNumber('')}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                                <p className="text-[11px] leading-relaxed text-[#848E9C] font-medium italic">
                                    By providing your phone number, you agree to receive SMS messages for verification and security purposes.
                                </p>
                            </div>
                            {phoneNumberError && (
                                <motion.p
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-sm font-medium text-red-500 mt-1 flex items-center gap-1"
                                >
                                    <X className="w-3 h-3" />
                                    {phoneNumberError}
                                </motion.p>
                            )}
                        </div>

                        {error && <p className="text-sm font-medium text-red-500">{error}</p>}

                        <Button
                            type="submit"
                            disabled={phoneNumberError !== null || !phoneNumber}
                            className="group relative w-full overflow-hidden rounded-2xl bg-[#5e5ce6] py-7 text-lg font-bold text-white transition-all hover:bg-[#4b4ac2] disabled:opacity-50 disabled:bg-white/10 disabled:text-gray-500 disabled:cursor-not-allowed"
                        >
                            <span className="relative z-10">{t('_continue')}</span>
                            <div className="absolute inset-0 z-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                        </Button>
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
                                <p className="text-sm text-gray-400 mb-2">Your password must contain at least 8 characters, an upper case letter, a number, and a special character.</p>
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
                                <div className="relative">
                                    <Input
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Repeat password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="h-14 border-white/[0.08] bg-white/[0.05] text-white"
                                    />
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                        {confirmPassword && (
                                            <button type="button" onClick={() => setConfirmPassword('')} className="text-gray-400 hover:text-white">
                                                <X className="h-4 w-4" />
                                            </button>
                                        )}
                                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-400 hover:text-white">
                                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </button>
                                    </div>
                                </div>
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
        }

        return (
            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                    {content}
                </motion.div>
            </AnimatePresence>
        );
    };

    const getTitle = () => {
        switch (step) {
            case 'email': return t('create_account');
            case 'verify': return t('verify_your_email');
            case 'phoneNumber': return t('phone_number_input');
            case 'password': return t('secure_your_account');
            case 'complete': return t('registration_complete');
        }
    };

    const handleGoBack = () => {
        switch (step) {
            case 'verify':
                setStep('email');
                break;
            case 'phoneNumber':
                setStep('verify');
                break;
            case 'password':
                setStep('phoneNumber');
                break;
        }
    };

    const canGoBack = step !== 'email' && step !== 'complete';

    return (
        <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#000000] font-sans text-left">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,#5e5ce6,transparent_50%)] opacity-10" />

            {canGoBack && (
                <div className="w-full px-6 md:px-10 z-10 mt-4">
                    <button
                        type="button"
                        onClick={handleGoBack}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="h-6 w-6" />
                    </button>
                </div>
            )}

            <div className="relative z-10 w-full max-w-[520px] mx-auto px-4 flex-1 flex flex-col justify-center -mt-16">
                <Card className="w-full rounded-[32px] border-white/10 bg-white/10 shadow-2xl backdrop-blur-2xl animate-in fade-in slide-in-from-bottom-6 duration-700">
                    <CardHeader className="space-y-6 pb-8 pt-10">
                        <div className="space-y-2">
                            <h1 className="text-4xl font-extrabold tracking-tight text-white leading-tight">
                                {getTitle()}
                            </h1>
                            {step === 'email' && <p className="text-sm text-gray-400">Welcome to Finora</p>}
                        </div>
                    </CardHeader>
                <CardContent className="pb-10">
                    {renderStep()}

                    <CardFooter className="flex flex-col items-center justify-center pt-4 pb-0">
                        {step === 'email' && (
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
                        )}
                    </CardFooter>
                </CardContent>
            </Card>
            </div>

            <footer className="mt-12 flex flex-col items-center space-y-4">
                <div className="flex items-center space-x-6 text-sm text-gray-400">
                    <button className="hover:text-white transition-colors">Cookies</button>
                    <button className="hover:text-white transition-colors">Terms</button>
                    <button className="hover:text-white transition-colors">Privacy</button>
                </div>
            </footer>
        </div>
    );
};

export default SignupFlow;
