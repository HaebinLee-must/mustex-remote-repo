import React, { useState } from 'react';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import Hero from './features/landing/components/Hero';
import Hero2 from './features/landing/components/Hero2';
import Hero3 from './features/landing/components/Hero3';
import Hero4 from './features/landing/components/Hero4';
import AuroraBorealisV5 from './features/landing/components/AuroraBorealisV5';
import AuroraBorealisV6 from './features/landing/components/AuroraBorealisV6';
import HeroBorealis from './features/landing/components/HeroBorealis';
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
import AboutPage from './pages/AboutPage';
import P2PPage from './features/p2p/P2PPage';
import { useAuth } from './features/auth/AuthContext';
import { useUI } from './features/shared/UIContext';

const LandingPage = ({ variant = 1 }: { variant?: number }) => {
    const renderHero = () => {
        console.log('Rendering LandingPage with variant:', variant);
        switch (variant) {
            case 6:
                return (
                    <div className="relative overflow-hidden bg-[#070112]">
                        <AuroraBorealisV6 className="z-0" />
                        <HeroBorealis />
                    </div>
                );
            case 5:
                return (
                    <div className="relative overflow-hidden bg-[#010308]">
                        <AuroraBorealisV5 className="z-0" />
                        <HeroBorealis />
                    </div>
                );
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
        // 공유용 링크 대응: URL 파라미터가 있으면 해당 버전을, 없으면 1번(기본)을 보여줌
        const params = new URLSearchParams(window.location.search);
        const urlVariant = params.get('v');
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
            case 'about':
                return <AboutPage />;
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
