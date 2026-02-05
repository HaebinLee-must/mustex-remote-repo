import React from 'react';

interface StepCardProps {
    children: React.ReactNode;
    footer?: React.ReactNode;
}

export const StepCard: React.FC<StepCardProps> = ({ children, footer }) => {
    return (
        <div className="w-full bg-[#1E2329]/60 backdrop-blur-2xl border border-white/[0.08] rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-8 sm:p-12">
                {children}
            </div>
            {footer && (
                <div className="px-8 sm:px-12 pb-12">
                    {footer}
                </div>
            )}
        </div>
    );
};
