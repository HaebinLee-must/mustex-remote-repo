import React, { useState } from 'react';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import Hero from './features/landing/components/Hero';
import MarketData from './features/landing/components/MarketData';
import Features from './features/landing/components/Features';
import Highlight from './features/landing/components/Highlight';
import SignupFlow from './features/auth/components/SignupFlow';
import LoginForm from './features/auth/components/LoginForm';
import OnboardingLayout from './features/auth/components/OnboardingLayout';
import OnboardingFlow from './features/auth/components/OnboardingFlow';
import TradeLayout from './features/trade/TradeLayout';
import WalletPage from './pages/WalletPage';
import SwapPage from './pages/SwapPage';
import MyPage from './pages/MyPage';
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
                            console.log('KYC flow to be implemented');
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
                    <OnboardingLayout>
                        <OnboardingFlow onComplete={() => setCurrentView('landing')} />
                    </OnboardingLayout>
                );
            case 'landing':
            default:
                return <LandingPage />;
        }
    };

    return (
        <div className="min-h-screen bg-[#0B0E11] text-white font-sans selection:bg-indigo-500/30 flex flex-col">
            {currentView !== 'signup' && currentView !== 'onboarding' && (
                <Header
                    currentView={currentView}
                    onViewChange={setCurrentView}
                    isAuthenticated={isAuthenticated}
                />
            )}
            <main className="flex-1">{renderContent()}</main>
            {currentView !== 'exchange' && currentView !== 'signup' && currentView !== 'onboarding' && <Footer />}
        </div>
    );
}

export default App;
