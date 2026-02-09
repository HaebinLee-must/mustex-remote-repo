import React from 'react';
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
import DesignSystemPage from './features/design/DesignSystemPage';
import { useAuth } from './features/auth/AuthContext';
import { useUI } from './features/shared/UIContext';
import { MyPageTab } from './features/mypage/MyPage'; // Import MyPageTab type

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
    const [showSignupSuccess, setShowSignupSuccess] = React.useState(false);
    const [myPageActiveTab, setMyPageActiveTab] = React.useState<MyPageTab>('dashboard');
    const [myPageActiveSubTab, setMyPageActiveSubTab] = React.useState<string | null>(null);
    const [directAssetsAccess, setDirectAssetsAccess] = React.useState(false); // True when accessing assets from global nav

    const handleSignupComplete = (userData: { email: string }) => {
        const dummyUid = `user_${Date.now()}`;
        signup({ ...userData, uid: dummyUid });
        setShowSignupSuccess(true);
        setCurrentView('mypage');
        setMyPageActiveTab('dashboard'); // Default to dashboard after signup
        setMyPageActiveSubTab(null);
    };

    const handleLogin = (userData: { email: string }) => {
        const dummyUid = `user_login_${Date.now()}`;
        login({ ...userData, uid: dummyUid });
        setCurrentView('mypage');
        setMyPageActiveTab('dashboard'); // Default to dashboard after login
        setMyPageActiveSubTab(null);
    };

    const handleViewChange = (view: string, tab?: MyPageTab, subTab?: string) => {
        setCurrentView(view);
        if (view === 'mypage') {
            setMyPageActiveTab(tab || 'dashboard');
            setMyPageActiveSubTab(subTab || null);
            // Direct assets access from global nav (when tab is 'assets' and subTab is provided)
            setDirectAssetsAccess(tab === 'assets' && !!subTab);
        } else {
            setMyPageActiveTab('dashboard'); // Reset for other views
            setMyPageActiveSubTab(null);
            setDirectAssetsAccess(false);
        }
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
                        onStartKyc={() => {
                            handleViewChange('verification');
                        }}
                        showSuccessPopup={showSignupSuccess}
                        onCloseSuccessPopup={() => setShowSignupSuccess(false)}
                        activeTab={myPageActiveTab}
                        activeSubTab={myPageActiveSubTab}
                        onTabChange={setMyPageActiveTab}
                        onSubTabChange={setMyPageActiveSubTab}
                        directAssetsAccess={directAssetsAccess}
                        onDirectAssetsAccessChange={setDirectAssetsAccess}
                    />
                );
            case 'signup':
                return (
                    <SignupFlow
                        onComplete={handleSignupComplete}
                        onViewChange={handleViewChange}
                    />
                );
            case 'login':
                return (
                    <LoginForm
                        onLogin={() => handleLogin({ email: 'user@example.com' })}
                        onViewChange={handleViewChange}
                    />
                );
            case 'onboarding':
                return (
                    <VerificationFlow onComplete={() => handleViewChange('mypage')} onExit={() => handleViewChange('landing')} />
                );
            case 'verification':
                return (
                    <VerificationFlow onComplete={() => handleViewChange('mypage')} onExit={() => handleViewChange('mypage')} />
                );
            case 'design-system':
                return <DesignSystemPage />;
            case 'landing':
            default:
                return <LandingPage />;
        }
    };

    return (
        <div className="min-h-screen bg-[#000000] text-white font-sans selection:bg-indigo-500/30 flex flex-col">
            <Header
                currentView={currentView}
                onViewChange={handleViewChange} // Use the new handleViewChange
                activeTab={myPageActiveTab}
                activeSubTab={myPageActiveSubTab}
            />
            <main className="flex-1 pt-[10vh]">{renderContent()}</main>
            {currentView !== 'exchange' && currentView !== 'signup' && currentView !== 'onboarding' && currentView !== 'verification' && <Footer />}
        </div>
    );
}

export default App;
