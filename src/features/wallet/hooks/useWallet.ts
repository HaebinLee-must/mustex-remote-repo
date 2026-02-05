import { useState, useMemo } from 'react';
import { MOCK_ASSETS } from '../services/mockWalletData';
import { Asset } from '../types/wallet';

export const useWallet = () => {
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

    const closeDeposit = () => setIsDepositOpen(false);
    const closeWithdraw = () => setIsWithdrawOpen(false);

    const balances = useMemo(() => {
        return MOCK_ASSETS.map((asset: Asset) => ({
            asset: asset.coin.symbol,
            available: asset.available,
            total: asset.total
        }));
    }, []);

    return {
        isDepositOpen,
        isWithdrawOpen,
        selectedCoin,
        openDeposit,
        openWithdraw,
        closeDeposit,
        closeWithdraw,
        balances
    };
};
