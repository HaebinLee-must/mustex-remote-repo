import React from 'react';
import AssetOverview from './components/AssetOverview';
import AssetTable from './components/AssetTable';
import DepositModal from './components/DepositModal';
import WithdrawModal from './components/WithdrawModal';
import TransactionHistory from './components/TransactionHistory';
import { useWallet } from './hooks/useWallet';

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

    return (
        <div className="max-w-7xl w-full mx-auto p-4 md:p-8 space-y-8">
            <AssetOverview
                onDepositClick={() => openDeposit()}
                onWithdrawClick={() => openWithdraw()}
            />

            <AssetTable
                onDeposit={(symbol) => openDeposit(symbol)}
                onWithdraw={(symbol) => openWithdraw(symbol)}
            />

            <TransactionHistory />

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
