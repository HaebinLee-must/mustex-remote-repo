import React from 'react';
import AssetOverview from '../features/wallet/components/AssetOverview';
import AssetTable from '../features/wallet/components/AssetTable';
import DepositModal from '../features/wallet/components/DepositModal';
import WithdrawModal from '../features/wallet/components/WithdrawModal';
import TransactionHistory from '../features/wallet/components/TransactionHistory';
import { useWallet } from '../features/wallet/hooks/useWallet';

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
