import { useState } from 'react';

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

    return {
        isDepositOpen,
        isWithdrawOpen,
        selectedCoin,
        openDeposit,
        openWithdraw,
        closeDeposit,
        closeWithdraw
    };
};
