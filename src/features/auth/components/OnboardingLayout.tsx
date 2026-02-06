import React from 'react';

interface OnboardingLayoutProps {
    children: React.ReactNode;
}

const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({ children }) => {
    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#000000] p-4 font-sans">
            {/* Consistent background with Auth/Landing flows */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,#312e81,transparent_50%)] opacity-20" />

            <div className="relative z-10 w-full flex flex-col items-center">
                <div className="mb-8 text-[#6366F1] font-black text-2xl tracking-tighter">
                    Finora
                </div>
                {children}
            </div>

            <div className="absolute bottom-8 text-gray-500 text-sm">
                &copy; 2026 Finora. All rights reserved.
            </div>
        </div>
    );
};

export default OnboardingLayout;
