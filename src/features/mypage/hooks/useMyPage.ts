import { useState, useEffect } from 'react';

export const useMyPage = (showPromotion?: boolean, onPromotionShown?: () => void) => {
    const [isKycModalOpen, setIsKycModalOpen] = useState(false);

    useEffect(() => {
        if (showPromotion) {
            setIsKycModalOpen(true);
            if (onPromotionShown) onPromotionShown();
        }
    }, [showPromotion, onPromotionShown]);

    const openKycModal = () => setIsKycModalOpen(true);
    const closeKycModal = () => setIsKycModalOpen(false);

    return {
        isKycModalOpen,
        openKycModal,
        closeKycModal
    };
};
