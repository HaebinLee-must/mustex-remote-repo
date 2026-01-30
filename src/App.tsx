import React, { useState } from 'react';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import Hero from './features/landing/components/Hero';
import Hero2 from './features/landing/components/Hero2';
import Hero3 from './features/landing/components/Hero3';
import Hero4 from './features/landing/components/Hero4';
import MarketData from './features/landing/components/MarketData';
import Blog from './features/landing/components/Blog';
import Features from './features/landing/components/Features';
import Highlight from './features/landing/components/Highlight';
import TradeAnywhere from './features/landing/components/TradeAnywhere';
import SignupFlow from './features/auth/components/SignupFlow';
import LoginForm from './features/auth/components/LoginForm';
import VerificationFlow from './features/verification/VerificationFlow';
import TradeLayout from './features/trade/TradeLayout';
import WalletPage from './pages/WalletPage';
import SwapPage from './pages/SwapPage';
import MyPage from './pages/MyPage';
import P2PPage from './features/p2p/P2PPage';
import { useAuth } from './features/auth/AuthContext';
import { useUI } from './features/shared/UIContext';

const LandingPage = ({ variant = 1 }: { variant?: number }) => {
    const renderHero = () => {
        console.log('Rendering LandingPage with variant:', variant);
        switch (variant) {
            case 4:
                return <Hero4 />;
            case 3:
                return <Hero3 />;
            case 2:
                return <Hero2 />;
            case 1:
            default:
                return <Hero />;
        }
    };

    return (
        <>
            {renderHero()}
            <MarketData />
            <Blog />
            <Features />
            <Highlight />
            <TradeAnywhere />
        </>
    );
};

function App() {
    const { isAuthenticated, signup, login } = useAuth();
    const { currentView, setCurrentView } = useUI();
    const [showKycPromotion, setShowKycPromotion] = useState(false);

    const handleSignupComplete = (userData: { email: string }) => {
        signup(userData);
        setCurrentView('onboarding');
    };

    const handleLogin = (userData: { email: string }) => {
        login(userData);
        setCurrentView('landing');
    };

    const renderContent = () => {
        // URL 쿼리 파라미터에서 시안 버전 확인 (?v=1, ?v=2, ?v=3, ?v=4)
        const params = new URLSearchParams(window.location.search);
        const urlVariant = params.get('v');
        // landing1 브랜치: 기본값을 1로 고정
        const variant = urlVariant ? parseInt(urlVariant) : 1;

        switch (currentView) {
            case 'exchange':
                return <TradeLayout />;
            case 'wallet':
                return <WalletPage />;
            case 'swap':
                return <SwapPage />;
            case 'p2p':
                return <P2PPage />;
            case 'mypage':
                return (
                    <MyPage
                        showPromotion={showKycPromotion}
                        onPromotionShown={() => setShowKycPromotion(false)}
                        onStartKyc={() => {
                            setCurrentView('verification');
                        }}
                    />
                );
            case 'signup':
                return (
                    <SignupFlow
                        onComplete={handleSignupComplete}
                        onViewChange={setCurrentView}
                    />
                );
            case 'login':
                return (
                    <LoginForm
                        onLogin={() => handleLogin({ email: 'user@example.com' })}
                        onViewChange={setCurrentView}
                    />
                );
            case 'onboarding':
                return (
                    <VerificationFlow
                        onComplete={() => setCurrentView('landing')}
                        onExit={() => setCurrentView('landing')}
                    />
                );
            case 'verification':
                return (
                    <VerificationFlow
                        onComplete={() => setCurrentView('mypage')}
                        onExit={() => setCurrentView('mypage')}
                    />
                );
            case 'landing':
            default:
                // variant=1: 기존 시안, variant=2: 신규 시안
                return <LandingPage variant={variant} />;
        }
    };

    return (
        <div className="min-h-screen bg-[#0B0E11] text-white font-sans selection:bg-indigo-500/30 flex flex-col">
            {currentView !== 'signup' &&
                currentView !== 'login' &&
                currentView !== 'onboarding' &&
                currentView !== 'verification' && (
                    <Header
                        currentView={currentView}
                        onViewChange={setCurrentView}
                        isAuthenticated={isAuthenticated}
                    />
                )}
            <main
                className={`flex-1 ${currentView === 'landing' ||
                    currentView === 'signup' ||
                    currentView === 'login' ||
                    currentView === 'onboarding' ||
                    currentView === 'verification'
                    ? ''
                    : 'pt-14'
                    }`}
            >
                {renderContent()}
            </main>
            {currentView !== 'exchange' &&
                currentView !== 'signup' &&
                currentView !== 'login' &&
                currentView !== 'onboarding' &&
                currentView !== 'verification' && <Footer />}
        </div>
    );
}
// TO DO 
export default App;
