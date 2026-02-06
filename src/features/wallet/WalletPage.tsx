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