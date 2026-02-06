import React from 'react';
import AccountOverview from './components/AccountOverview';
import AccountDashboard from './components/AccountDashboard';
import SignupSuccessModal from './components/SignupSuccessModal';
import IdentificationPanel from './components/IdentificationPanel';
import WalletPage from '../wallet/WalletPage'; // Import WalletPage

import {
    LayoutDashboard,
    Wallet,
    FileText,
    History, // Import History icon for sub-menu
    Gift,
    Users,
    User,
    Layers,
    Settings,
    ChevronRight,
    Search
} from 'lucide-react';

export type MyPageTab = 'dashboard' | 'identification' | 'assets' | 'orders' | 'rewards' | 'referral' | 'sub-accounts' | 'settings';

interface MyPageProps {
    onStartKyc?: () => void;
    showSuccessPopup?: boolean;
    onCloseSuccessPopup?: () => void;
    activeTab: MyPageTab;
    activeSubTab: string | null;
    onTabChange: (tab: MyPageTab) => void;
    onSubTabChange: (subTab: string | null) => void;
}

const MyPage: React.FC<MyPageProps> = ({
    onStartKyc,
    showSuccessPopup = false,
    onCloseSuccessPopup,
    activeTab,
    activeSubTab,
    onTabChange,
    onSubTabChange,
}) => {
    const handleTabClick = (id: MyPageTab, hasSubMenu: boolean) => {
        onTabChange(id);
        if (hasSubMenu) {
            onSubTabChange(id === 'assets' ? 'my-assets' : null); // Default to 'My Assets' if 'assets' is clicked
        } else {
            onSubTabChange(null);
        }
    };

    const handleSubTabClick = (subId: string) => {
        onSubTabChange(subId);
    };

    const sidebarItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'identification', label: 'Identification', icon: User },
        {
            id: 'assets', label: 'Assets', icon: Wallet,
            subMenu: [
                { id: 'my-assets', label: 'My Assets', icon: Wallet },
                { id: 'history', label: 'History', icon: History }
            ]
        },
        { id: 'orders', label: 'Orders', icon: FileText },
        { id: 'rewards', label: 'Rewards Hub', icon: Gift },
        { id: 'referral', label: 'Referral', icon: Users },
        { id: 'sub-accounts', label: 'Sub Accounts', icon: Layers },
        { id: 'settings', label: 'Settings', icon: Settings },
    ];

    return (
        <div className="flex w-full min-h-[calc(100vh-80px)] bg-black">
            {/* Account Sidebar */}
            <aside className="w-64 border-r border-white/5 bg-black hidden lg:flex flex-col p-6 space-y-8">
                <div className="flex items-center space-x-2 px-2 py-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                        <User className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-black text-lg tracking-tight">Account</span>
                </div>

                <nav className="flex-1 space-y-1">
                    {sidebarItems.map((item) => (
                        <React.Fragment key={item.id}>
                            <button
                                onClick={() => handleTabClick(item.id as MyPageTab, !!item.subMenu)}
                                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all group ${activeTab === item.id
                                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                                    : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'
                                    }`}
                            >
                                <div className="flex items-center space-x-3">
                                    <item.icon className="w-5 h-5" />
                                    <span className="font-bold text-sm">{item.label}</span>
                                </div>
                                {item.subMenu && (
                                    <ChevronRight className={`w-4 h-4 transition-transform ${activeTab === item.id ? 'rotate-90' : ''}`} />
                                )}
                                {activeTab === item.id && !item.subMenu && <ChevronRight className="w-4 h-4" />}
                            </button>
                            {activeTab === item.id && item.subMenu && (
                                <div className="ml-6 mt-2 space-y-1">
                                    {item.subMenu.map((subItem) => (
                                        <button
                                            key={subItem.id}
                                            onClick={() => handleSubTabClick(subItem.id)}
                                            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-all ${activeSubTab === subItem.id
                                                ? 'bg-white/10 text-foreground font-semibold'
                                                : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'
                                                }`}
                                        >
                                            <div className="flex items-center space-x-3">
                                                <subItem.icon className="w-4 h-4" />
                                                <span>{subItem.label}</span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </React.Fragment>
                    ))}

                    <div className="pt-8 px-2">
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest leading-loose opacity-40">Account Details</p>
                        <div className="mt-4 space-y-4 opacity-50 hover:opacity-100 transition-opacity">
                            <div className="flex items-center justify-between text-[11px] font-bold text-[#848E9C]">
                                <span>Security Level</span>
                                <span className="text-[#00C087]">High</span>
                            </div>
                            <div className="flex items-center justify-between text-[11px] font-bold text-[#848E9C]">
                                <span>Identity Verification</span>
                                <span className="text-[#00C087]">Verified</span>
                            </div>
                        </div>
                    </div>
                </nav>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto bg-black">
                <div className="max-w-6xl mx-auto p-4 md:p-8 md:px-12 space-y-8 animate-in fade-in duration-700">
                    {activeTab === 'dashboard' && <AccountDashboard onStartKyc={onStartKyc} />}
                    {activeTab === 'identification' && (
                        <IdentificationPanel
                            stateLevel={1}
                            kycStatus="Verified"
                            onStartVerification={onStartKyc}
                        />
                    )}
                    {activeTab === 'assets' && activeSubTab === 'my-assets' && <WalletPage />}
                    {activeTab === 'assets' && activeSubTab === 'history' && (
                        <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4 opacity-50">
                            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center">
                                <History className="w-8 h-8" />
                            </div>
                            <p className="font-bold text-white/40">Asset History coming soon</p>
                        </div>
                    )}
                    {activeTab !== 'dashboard' && activeTab !== 'identification' && activeTab !== 'assets' && (
                        <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4 opacity-50">
                            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center">
                                <LayoutDashboard className="w-8 h-8" />
                            </div>
                            <p className="font-bold text-white/40">{sidebarItems.find(i => i.id === activeTab)?.label} coming soon</p>
                        </div>
                    )}
                </div>
            </main>

            <SignupSuccessModal
                isOpen={showSuccessPopup}
                onClose={() => onCloseSuccessPopup?.()}
                onVerify={() => {
                    onCloseSuccessPopup?.();
                    onStartKyc?.();
                }}
            />
        </div>
    );
};

export default MyPage;