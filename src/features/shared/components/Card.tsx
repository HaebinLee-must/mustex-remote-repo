import React from 'react';

interface CardProps {
    title?: string;
    children: React.ReactNode;
    className?: string;
    extra?: React.ReactNode;
    noOverflow?: boolean;
    variant?: 'default' | 'flat';
}

const Card: React.FC<CardProps> = ({ title, children, className = '', extra, noOverflow, variant = 'default' }) => {
    const isFlat = variant === 'flat';

    return (
        <div className={`${isFlat ? 'bg-[#0B0E11] border-[#1E2329]' : 'bg-[#1E2329] border-[#2B3139]'} border rounded-xl overflow-hidden shadow-sm flex flex-col ${className}`}>
            {(title || extra) && (
                <div className={`px-4 py-3 border-b ${isFlat ? 'border-[#1E2329]' : 'border-[#2B3139] bg-[#1E2329]'} flex items-center justify-between`}>
                    {title && (
                        <h3 className={`text-sm font-bold font-roboto ${isFlat ? 'text-[#848E9C] capitalize' : 'text-[#EAECEF]'}`}>
                            {title}
                        </h3>
                    )}
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
