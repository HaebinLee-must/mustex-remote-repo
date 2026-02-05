import React, { useState } from 'react';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Hero from './features/landing/components/Hero';
import MarketData from './features/landing/components/MarketData';
import Features from './features/landing/components/Features';
import Highlight from './features/landing/components/Highlight';
import SignupFlow from './features/auth/components/SignupFlow';
import LoginForm from './features/auth/components/LoginForm';
import VerificationFlow from './features/verification/VerificationFlow';
import TradeLayout from './features/trade/TradeLayout';
import WalletPage from './features/wallet/WalletPage';
import SwapPage from './features/swap/SwapPage';
import MyPage from './features/mypage/MyPage';
import { useAuth } from './features/auth/AuthContext';
import { useUI } from './features/shared/UIContext';

const LandingPage = () => (
    <>
        <Hero />
        <MarketData />
        <Features />
        <Highlight />
    </>
);

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
        switch (currentView) {
            case 'exchange':
                return <TradeLayout />;
            case 'wallet':
                return <WalletPage />;
            case 'swap':
                return <SwapPage />;
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
                    <VerificationFlow onComplete={() => setCurrentView('landing')} onExit={() => setCurrentView('landing')} />
                );
            case 'verification':
                return (
                    <VerificationFlow onComplete={() => setCurrentView('mypage')} onExit={() => setCurrentView('mypage')} />
                );
            case 'landing':
            default:
                return <LandingPage />;
        }
    };

    return (
        <div className="min-h-screen bg-[#0B0E11] text-white font-sans selection:bg-indigo-500/30 flex flex-col">
            {(currentView !== 'onboarding' && currentView !== 'verification') && (
                <Header
                    currentView={currentView}
                    onViewChange={setCurrentView}
                    isAuthenticated={isAuthenticated}
                />
            )}
            <main className="flex-1">{renderContent()}</main>
            {currentView !== 'exchange' && currentView !== 'signup' && currentView !== 'onboarding' && currentView !== 'verification' && <Footer />}
        </div>
    );
}

export default App;
