import React, { useState } from 'react';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import Hero from './features/landing/components/Hero';
import Hero2 from './features/landing/components/Hero2';
import Hero3 from './features/landing/components/Hero3';
import Hero4 from './features/landing/components/Hero4';
import AuroraBorealisV5 from './features/landing/components/AuroraBorealisV5';
import AuroraBorealisV6 from './features/landing/components/AuroraBorealisV6';
import AuroraBorealisV7 from './features/landing/components/AuroraBorealisV7';
import AuroraBorealisV8 from './features/landing/components/AuroraBorealisV8';
import AuroraBorealisV9 from './features/landing/components/AuroraBorealisV9';
import HeroBorealis from './features/landing/components/HeroBorealis';
import HeroBorealisV6 from './features/landing/components/HeroBorealisV6';
import HeroBorealisV7 from './features/landing/components/HeroBorealisV7';
import HeroBorealisV8 from './features/landing/components/HeroBorealisV8';
import HeroBorealisV10 from './features/landing/components/HeroBorealisV10';
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
    /**
     * variant 번호에 따라 서로 다른 메인 비주얼(Hero) 섹션을 렌더링합니다.
     * 각 case는 /src/features/landing/components/ 경로의 시안 파일들에 대응됩니다.
     */
    const renderHero = () => {
        console.log('Rendering LandingPage with variant:', variant);
        switch (variant) {
            case 10:
                // 10번 시안: HeroBorealisV10
                return <HeroBorealisV10 />;
            case 9:
                // 9번 시안: AuroraBorealisV9 + HeroBorealisV6 조합
                return (
                    <div className="relative overflow-hidden bg-[#070112]">
                        <AuroraBorealisV9 className="z-0" />
                        <HeroBorealisV6 />
                    </div>
                );
            case 8:
                // 8번 시안 (?v=fin): HeroBorealisV8
                return <HeroBorealisV8 />;
            case 7:
                // 7번 시안: AuroraBorealisV7 + HeroBorealisV7 조합
                return (
                    <div className="relative overflow-hidden bg-[#000000]">
                        <AuroraBorealisV7 className="z-0" />
                        <HeroBorealisV7 />
                    </div>
                );
            case 6:
                // 6번 시안: AuroraBorealisV6 + HeroBorealisV6 조합
                return (
                    <div className="relative overflow-hidden bg-[#070112]">
                        <AuroraBorealisV6 className="z-0" />
                        <HeroBorealisV6 />
                    </div>
                );
            case 5:
                // 5번 시안: AuroraBorealisV5 + HeroBorealis 조합
                return (
                    <div className="relative overflow-hidden bg-[#010308]">
                        <AuroraBorealisV5 className="z-0" />
                        <HeroBorealis />
                    </div>
                );
            case 4:
                // 4번 시안: Hero4
                return <Hero4 />;
            case 3:
                // 3번 시안: Hero3
                return <Hero3 />;
            case 2:
                // 2번 시안: Hero2
                return <Hero2 />;
            case 1:
            default:
                // 1번 시안 (기본): Hero
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
        /**
         * URL 파라미터 'v'를 읽어 랜딩 페이지의 시안(variant)을 결정합니다.
         * 예: ?v=1 (1번 시안), ?v=fin (8번 시안)
         * 파라미터가 없을 경우 기본값은 9번 시안으로 설정되어 있습니다.
         */
        // 하위 경로(base)에서도 파라미터를 정확히 읽기 위해 URL 객체 활용
        const currentUrl = new URL(window.location.href);
        const urlVariant = currentUrl.searchParams.get('v');

        console.log('Detected urlVariant:', urlVariant);

        // ?v=fin 파라미터가 들어오면 8번 시안을 할당 (최종 아우라빔배경v8)
        let variant = 9; // 기본값은 9번 시안

        if (urlVariant === 'fin') {
            variant = 8;
        } else if (urlVariant) {
            const parsed = parseInt(urlVariant);
            if (!isNaN(parsed)) variant = parsed;
        }

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
