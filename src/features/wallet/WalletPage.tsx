import React, { useState } from 'react';
import AssetOverview from './components/AssetOverview';
import AssetTable from './components/AssetTable';
import AssetDetailSidebar from './components/AssetDetailSidebar';
import DepositModal from './components/DepositModal';
import WithdrawModal from './components/WithdrawModal';
import TransactionHistory from './components/TransactionHistory';
import FullTransactionHistory from './components/FullTransactionHistory';
import { useWallet } from './hooks/useWallet';
import { LayoutDashboard, History, Wallet, ChevronRight } from 'lucide-react';

const WalletPage: React.FC = () => {
    const {
        isDepositOpen,
        isWithdrawOpen,
        selectedCoin,
        openDeposit,
        openWithdraw,
        closeDeposit,
        closeWithdraw
    } = useWallet();

    const [walletView, setWalletView] = useState<'overview' | 'history'>('overview');
    const [selectedAsset, setSelectedAsset] = useState<string | null>(null);

    const handleAssetClick = (symbol: string) => {
        setSelectedAsset(symbol);
    };

    const handleCloseSidebar = () => {
        setSelectedAsset(null);
    };

    return (
        <div className="flex w-full min-h-[calc(100vh-80px)] bg-black">
            {/* Wallet Sidebar */}
            <aside className="w-64 border-r border-white/5 bg-black hidden lg:flex flex-col p-6 space-y-8">
                <div className="flex items-center space-x-2 px-2 py-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                        <Wallet className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-black text-lg tracking-tight">Wallet</span>
                </div>

                <nav className="flex-1 space-y-1">
                    <button
                        onClick={() => setWalletView('overview')}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all group ${walletView === 'overview'
                            ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                            : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'
                            }`}
                    >
                        <div className="flex items-center space-x-3">
                            <LayoutDashboard className="w-5 h-5" />
                            <span className="font-bold text-sm">Asset Overview</span>
                        </div>
                        {walletView === 'overview' && <ChevronRight className="w-4 h-4" />}
                    </button>

                    <button
                        onClick={() => setWalletView('history')}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all group ${walletView === 'history'
                            ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                            : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'
                            }`}
                    >
                        <div className="flex items-center space-x-3">
                            <History className="w-5 h-5" />
                            <span className="font-bold text-sm">History</span>
                        </div>
                        {walletView === 'history' && <ChevronRight className="w-4 h-4" />}
                    </button>

                    <div className="pt-8 px-2">
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest leading-loose opacity-40">Account Details</p>
                        <div className="mt-4 space-y-4 opacity-50 hover:opacity-100 transition-opacity">
                            <div className="flex items-center justify-between text-[11px] font-bold">
                                <span>Security Level</span>
                                <span className="text-success">High</span>
                            </div>
                            <div className="flex items-center justify-between text-[11px] font-bold">
                                <span>Identity Verification</span>
                                <span className="text-success">Verified</span>
                            </div>
                        </div>
                    </div>
                </nav>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto bg-black">
                <div className="max-w-6xl mx-auto p-4 md:p-8 md:px-12 space-y-8 animate-in fade-in duration-700">
                    {walletView === 'overview' ? (
                        <>
                            <AssetOverview
                                onDepositClick={() => openDeposit()}
                                onWithdrawClick={() => openWithdraw()}
                            />
                            <AssetTable
                                onAssetClick={handleAssetClick}
                                onDeposit={openDeposit}
                                onWithdraw={openWithdraw}
                            />
                            <TransactionHistory onMoreClick={() => setWalletView('history')} />
                        </>
                    ) : (
                        <FullTransactionHistory />
                    )}
                </div>
            </main>

            <AssetDetailSidebar
                symbol={selectedAsset}
                isOpen={!!selectedAsset}
                onClose={handleCloseSidebar}
                onDeposit={(symbol) => openDeposit(symbol)}
                onWithdraw={(symbol) => openWithdraw(symbol)}
            />

            <DepositModal
                isOpen={isDepositOpen}
                onClose={closeDeposit}
                initialCoin={selectedCoin}
            />

            <WithdrawModal
                isOpen={isWithdrawOpen}
                onClose={closeWithdraw}
                initialCoin={selectedCoin}
            />
        </div>
    );
};

export default WalletPage;
