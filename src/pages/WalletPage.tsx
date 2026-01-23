import React, { useState } from 'react';
import AssetOverview from '../features/wallet/components/AssetOverview';
import AssetTable from '../features/wallet/components/AssetTable';
import DepositModal from '../features/wallet/components/DepositModal';
import WithdrawModal from '../features/wallet/components/WithdrawModal';
import TransactionHistory from '../features/wallet/components/TransactionHistory';

const WalletPage: React.FC = () => {
    const [isDepositOpen, setIsDepositOpen] = useState(false);
    const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
    const [selectedCoin, setSelectedCoin] = useState<string | undefined>(undefined);

    const openDeposit = (symbol?: string) => {
        setSelectedCoin(symbol);
        setIsDepositOpen(true);
    };

    const openWithdraw = (symbol?: string) => {
        setSelectedCoin(symbol);
        setIsWithdrawOpen(true);
    };

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
                onClose={() => setIsDepositOpen(false)}
                initialCoin={selectedCoin}
            />

            <WithdrawModal
                isOpen={isWithdrawOpen}
                onClose={() => setIsWithdrawOpen(false)}
                initialCoin={selectedCoin}
            />
        </div>
    );
};

export default WalletPage;
