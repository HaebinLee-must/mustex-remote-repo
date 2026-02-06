import React from 'react';

interface CardProps {
    title?: string;
    children: React.ReactNode;
    className?: string;
    extra?: React.ReactNode;
    noOverflow?: boolean;
    variant?: 'flat' | 'default'; // Added for custom styling
}

const Card: React.FC<CardProps> = ({ title, children, className = '', extra, noOverflow }) => {
    return (
        <div className={`bg-dark-surface border border-dark-border rounded-xl overflow-hidden shadow-sm flex flex-col ${className}`}>
            {(title || extra) && (
                <div className="px-4 py-3 border-b border-[#2B3139] flex items-center justify-between bg-[#1E2329]/50">
                    {title && <h3 className="text-sm font-bold text-[#EAECEF]">{title}</h3>}
                    {extra && <div className="flex items-center gap-2">{extra}</div>}
                </div>
            )}
            <div className={`flex-1 ${noOverflow ? '' : 'overflow-auto'}`}>
                {children}
            </div>
        </div>
    );
};

export default Card;
