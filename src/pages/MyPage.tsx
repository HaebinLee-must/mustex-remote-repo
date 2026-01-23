import React from 'react';
import AccountOverview from '../features/mypage/components/AccountOverview';
import KycPromotionModal from '../features/mypage/components/KycPromotionModal';
import { useMyPage } from '../features/mypage/hooks/useMyPage';

interface MyPageProps {
    showPromotion?: boolean;
    onPromotionShown?: () => void;
}

const MyPage: React.FC<MyPageProps & { onStartKyc?: () => void }> = ({ showPromotion, onPromotionShown, onStartKyc }) => {
    const { isKycModalOpen, closeKycModal } = useMyPage(showPromotion, onPromotionShown);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 flex gap-10">
            {/* Sidebar Navigation */}
            <aside className="hidden lg:block w-64 flex-shrink-0 space-y-2">
                <nav className="sticky top-24">
                    <button className="w-full text-left px-4 py-3 rounded-xl bg-[#6366F1]/10 text-[#6366F1] font-black text-sm transition">Account Overview</button>
                    <button className="w-full text-left px-4 py-3 rounded-xl text-[#848E9C] hover:text-white hover:bg-white/5 font-bold text-sm transition">Security Settings</button>
                    <button className="w-full text-left px-4 py-3 rounded-xl text-[#848E9C] hover:text-white hover:bg-white/5 font-bold text-sm transition">Identity Verification</button>
                    <button className="w-full text-left px-4 py-3 rounded-xl text-[#848E9C] hover:text-white hover:bg-white/5 font-bold text-sm transition">Transaction History</button>
                </nav>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 min-w-0">
                <AccountOverview onStartKyc={onStartKyc} />
            </main>

            <KycPromotionModal
                isOpen={isKycModalOpen}
                onClose={closeKycModal}
                onStartKyc={() => {
                    closeKycModal();
                    if (onStartKyc) onStartKyc();
                }}
            />
        </div>
    );
};

export default MyPage;
