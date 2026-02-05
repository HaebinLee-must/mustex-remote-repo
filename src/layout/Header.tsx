import React, { useState, useEffect } from 'react';
import logoLight from '../assets/finora_bi_light.png';
import { Globe, Sun, Moon, ChevronDown, Check, User, Wallet, Shield, LogOut, Menu, X, ArrowRight } from 'lucide-react';
import { useUI } from '../features/shared/UIContext';
import { Language } from '../constants/translations';

interface HeaderProps {
    isAuthenticated?: boolean;
    onViewChange: (view: any) => void;
    currentView: string;
}

const Header: React.FC<HeaderProps> = ({ isAuthenticated = false, onViewChange: parentOnViewChange, currentView }) => {
    const { lang, setLang, t } = useUI();

    const onViewChange = (view: any) => {
        parentOnViewChange(view);
        window.scrollTo(0, 0);
    };
    const [isLangOpen, setIsLangOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isDark, setIsDark] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Prevent scrolling when mobile menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMenuOpen]);

    const navItems = [
        { label: t('wallet'), view: 'wallet' },
        { label: t('exchange'), view: 'exchange' },
        { label: t('swap'), view: 'swap' },
        { label: 'P2P', view: 'p2p' },
    ];

    const languages: { code: Language; label: string }[] = [
        { code: 'en', label: 'English' },
        { code: 'ko', label: '한국어' },
        { code: 'mn', label: 'Монгол' },
    ];

    const isLanding = currentView === 'landing';
    const headerBgClass = isLanding
        ? (scrolled ? 'bg-[#0B0E11]/80 backdrop-blur-md border-[#2B3139]' : 'bg-transparent border-transparent')
        : 'bg-[#0B0E11] border-[#2B3139]';

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 h-14 transition-all duration-300 ${headerBgClass}`}>
            <nav className="w-full px-6 md:px-10 h-14 flex items-center justify-between border-b border-inherit relative z-[110]">
                {/* Left: Logo & Menu */}
                <div className="flex items-center gap-8 flex-shrink-0">
                    <div
                        className="cursor-pointer select-none active:scale-95 transition"
                        onClick={() => onViewChange('landing')}
                    >
                        <img src={logoLight} alt="FINORA" className="h-[22px] w-auto" />
                    </div>
                    <div className="hidden md:flex items-center gap-6 text-sm font-bold text-[#848E9C]">
                        {navItems.map((item) => (
                            <button
                                key={item.view}
                                onClick={() => onViewChange(item.view)}
                                className={`transition hover:text-white relative h-14 flex items-center ${currentView === item.view
                                    ? 'text-white font-black after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-[#6366F1] after:rounded-t-full'
                                    : ''
                                    }`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2 md:gap-6">
                    {/* Common Icons Group - Hidden on Mobile */}
                    <div className="hidden md:flex items-center gap-4 border-r border-[#2B3139] pr-6">
                        {/* Theme Switcher */}
                        <button
                            onClick={() => setIsDark(!isDark)}
                            className="p-2 text-[#848E9C] hover:text-white hover:bg-white/5 rounded-full transition-all active:scale-90"
                        >
                            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>

                        {/* Language Picker */}
                        <div className="relative">
                            <button
                                onClick={() => setIsLangOpen(!isLangOpen)}
                                className="flex items-center gap-2 p-2 text-[#848E9C] hover:text-white hover:bg-white/5 rounded-lg transition-all"
                            >
                                <Globe className="w-5 h-5" />
                                <span className="text-xs font-black uppercase tracking-widest">{lang}</span>
                                <ChevronDown className={`w-3 h-3 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {isLangOpen && (
                                <>
                                    <div className="fixed inset-0 z-10" onClick={() => setIsLangOpen(false)}></div>
                                    <div className="absolute right-0 mt-2 w-40 bg-[#1E2329] border border-[#2B3139] rounded-xl shadow-2xl py-2 z-20">
                                        {languages.map((l) => (
                                            <button
                                                key={l.code}
                                                onClick={() => {
                                                    setLang(l.code);
                                                    setIsLangOpen(false);
                                                }}
                                                className="w-full flex items-center justify-between px-4 py-2.5 text-sm font-bold text-[#EAECEF] hover:bg-white/5 transition-colors"
                                            >
                                                <span>{l.label}</span>
                                                {lang === l.code && <Check className="w-4 h-4 text-[#6366F1]" />}
                                            </button>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Auth Buttons - Hidden on small screens if not authenticated */}
                    {!isAuthenticated ? (
                        <div className="flex items-center gap-2 md:gap-4">
                            <button
                                onClick={() => onViewChange('login')}
                                className={`hidden sm:block text-sm font-semibold transition hover:text-white ${currentView === 'login' ? 'text-white' : 'text-[#848E9C]'}`}
                            >
                                {t('login')}
                            </button>
                            <button
                                onClick={() => onViewChange('signup')}
                                className="bg-[#6366F1] text-white px-4 md:px-5 py-2 rounded-lg text-sm font-bold hover:opacity-90 transition shadow-lg shadow-indigo-500/20 active:scale-95"
                            >
                                {t('register')}
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-6">
                            {/* Deposit Button */}
                            <button
                                onClick={() => onViewChange('wallet')}
                                className="hidden md:flex items-center gap-2 bg-[#6366F1] hover:bg-[#5254e0] text-white px-4 py-2 rounded-lg text-sm font-bold transition shadow-lg shadow-indigo-500/10 active:scale-95"
                            >
                                <Wallet className="w-4 h-4" />
                                {t('deposit')}
                            </button>

                            <div className="flex items-center space-x-4">
                                <div className="hidden sm:flex items-center space-x-2 px-3 py-1 bg-[#F6465D]/10 rounded-full border border-[#F6465D]/20">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#F6465D]"></div>
                                    <span className="text-[10px] font-bold text-[#F6465D] uppercase">{t('unverified')}</span>
                                </div>

                                {/* Profile Dropdown - Desktop Only */}
                                <div
                                    className="relative hidden md:block"
                                    onMouseEnter={() => setIsProfileOpen(true)}
                                    onMouseLeave={() => setIsProfileOpen(false)}
                                >
                                    <div
                                        className="w-9 h-9 rounded-full bg-[#6366F1] flex items-center justify-center text-white font-bold text-xs shadow-lg cursor-pointer hover:ring-2 ring-indigo-500/50 transition font-sans"
                                        onClick={() => onViewChange('mypage')}
                                    >
                                        JD
                                    </div>

                                    {isProfileOpen && (
                                        <div className="absolute right-0 mt-0 pt-3 w-56 z-50">
                                            <div className="bg-[#1E2329] border border-[#2B3139] rounded-xl shadow-2xl py-2 overflow-hidden">
                                                <div className="px-4 py-3 border-b border-[#2B3139] mb-1">
                                                    <p className="text-xs text-[#848E9C] font-medium">john.doe@example.com</p>
                                                    <p className="text-sm text-white font-bold mt-0.5">ID: 58291034</p>
                                                </div>

                                                <button
                                                    onClick={() => { onViewChange('mypage'); setIsProfileOpen(false); }}
                                                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-[#EAECEF] hover:bg-white/5 transition-colors"
                                                >
                                                    <User className="w-4 h-4 text-[#848E9C]" />
                                                    <span>{t('myPage')}</span>
                                                </button>

                                                <button
                                                    onClick={() => { onViewChange('wallet'); setIsProfileOpen(false); }}
                                                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-[#EAECEF] hover:bg-white/5 transition-colors"
                                                >
                                                    <Wallet className="w-4 h-4 text-[#848E9C]" />
                                                    <span>{t('wallet')}</span>
                                                </button>

                                                <button
                                                    onClick={() => { /* Handle Security */ setIsProfileOpen(false); }}
                                                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-[#EAECEF] hover:bg-white/5 transition-colors"
                                                >
                                                    <Shield className="w-4 h-4 text-[#848E9C]" />
                                                    <span>{t('security')}</span>
                                                </button>

                                                <div className="h-px bg-[#2B3139] my-1"></div>

                                                <button
                                                    onClick={() => { /* Handle Logout */ setIsProfileOpen(false); }}
                                                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-[#F6465D] hover:bg-[#F6465D]/5 transition-colors"
                                                >
                                                    <LogOut className="w-4 h-4" />
                                                    <span>{t('logout')}</span>
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsMenuOpen(true)}
                        className="flex md:hidden p-2 text-[#848E9C] hover:text-white"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Content (Overlay from Header) */}
            <div
                className={`fixed inset-0 z-[100] md:hidden bg-[#0B0E11] transition-all duration-500 ease-[cubic-bezier(0.32,0,0.67,0)] ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none'
                    }`}
            >
                {/* Drawer Body (Minimal List) */}
                <div className="flex-1 overflow-y-auto px-6 pt-20">
                    <nav className="space-y-0">
                        {navItems.map((item) => (
                            <div key={item.view} className="border-b border-white/10">
                                <button
                                    onClick={() => { onViewChange(item.view); setIsMenuOpen(false); }}
                                    className="w-full flex items-center justify-between py-5 group"
                                >
                                    <span className={`text-xl font-medium tracking-tight transition-colors duration-300 ${currentView === item.view ? 'text-white' : 'text-[#848E9C] group-hover:text-white'
                                        }`}>
                                        {item.label}
                                    </span>
                                    <ChevronDown className="w-5 h-5 text-[#404040] -rotate-90 group-hover:text-white transition-colors" />
                                </button>
                            </div>
                        ))}

                        {isAuthenticated && (
                            <div className="border-b border-white/10">
                                <button
                                    onClick={() => { onViewChange('mypage'); setIsMenuOpen(false); }}
                                    className="w-full flex items-center justify-between py-5 group"
                                >
                                    <span className={`text-xl font-medium tracking-tight transition-colors duration-300 ${currentView === 'mypage' ? 'text-white' : 'text-[#848E9C] group-hover:text-white'
                                        }`}>
                                        {t('myPage')}
                                    </span>
                                    <ChevronDown className="w-5 h-5 text-[#404040] -rotate-90 group-hover:text-white transition-colors" />
                                </button>
                            </div>
                        )}

                        {/* Auth Actions if not authenticated */}
                        {!isAuthenticated && (
                            <div className="pt-10 space-y-3">
                                <button
                                    onClick={() => { onViewChange('signup'); setIsMenuOpen(false); }}
                                    className="w-full py-3.5 bg-white text-black rounded-full font-bold text-base active:scale-[0.98] transition-all"
                                >
                                    {t('register')}
                                </button>
                                <button
                                    onClick={() => { onViewChange('login'); setIsMenuOpen(false); }}
                                    className="w-full py-3.5 border border-white/20 text-white rounded-full font-bold text-base active:scale-[0.98] transition-all hover:bg-white/5"
                                >
                                    {t('login')}
                                </button>
                            </div>
                        )}

                        {/* Logout if authenticated */}
                        {isAuthenticated && (
                            <div className="pt-10">
                                <button
                                    onClick={() => { /* Handle Logout */ setIsMenuOpen(false); }}
                                    className="text-base font-medium text-[#F6465D] active:opacity-60 transition-opacity"
                                >
                                    {t('logout')}
                                </button>
                            </div>
                        )}
                    </nav>
                </div>

                {/* Drawer Footer (Settings) */}
                <div className="p-8 pb-16">
                    <div className="flex items-center justify-between">
                        <div className="flex gap-8">
                            {languages.map((l) => (
                                <button
                                    key={l.code}
                                    onClick={() => setLang(l.code)}
                                    className={`text-base font-bold uppercase tracking-widest transition-colors ${lang === l.code ? 'text-white underline underline-offset-[12px] decoration-2' : 'text-[#848E9C]'
                                        }`}
                                >
                                    {l.code}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={() => setIsDark(!isDark)}
                            className="p-3 border border-white/10 rounded-full text-[#848E9C] hover:text-white transition-colors"
                        >
                            {isDark ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
