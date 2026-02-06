import React from 'react';
import { Star } from 'lucide-react';

interface SymbolInfoBarProps {
    symbol: string;
    baseAsset: string;
    quoteAsset: string;
    coinName: string;
    iconUrl: string | null;
    price: number;
    pricePrecision: number;
    change24hPercent: number;
    high24h: number;
    low24h: number;
    volume24hQuote: number | null;
    isFavorite: boolean;
    onToggleFavorite: () => void;
}

const SymbolInfoBar: React.FC<SymbolInfoBarProps> = ({
    symbol,
    baseAsset,
    coinName,
    iconUrl,
    price,
    pricePrecision,
    change24hPercent,
    high24h,
    low24h,
    volume24hQuote,
    isFavorite,
    onToggleFavorite
}) => {
    const isPositive = change24hPercent >= 0;

    return (
        <div className="flex items-center h-12 px-4 bg-dark-main border-b border-dark-border select-none overflow-x-auto scrollbar-hide font-sans">
            {/* Left: Identity */}
            <div className="flex items-center gap-3 pr-4 border-r border-dark-border mr-4 flex-shrink-0">
                <button
                    onClick={onToggleFavorite}
                    className={`transition-colors hover:scale-110 active:scale-95 ${isFavorite ? 'text-primary' : 'text-dark-muted hover:text-text'
                        }`}
                    aria-label={`Toggle favorite for ${symbol}`}
                >
                    <Star size={18} fill={isFavorite ? 'currentColor' : 'none'} strokeWidth={2} />
                </button>

                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-dark-surface border border-dark-border flex items-center justify-center overflow-hidden">
                        {iconUrl ? (
                            <img src={iconUrl} alt={coinName} className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-[8px] font-black text-primary">{baseAsset[0]}</span>
                        )}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-black text-white tracking-tight leading-none uppercase">{symbol}</span>
                        <span className="text-[9px] font-bold text-dark-muted tracking-tight">{coinName}</span>
                    </div>
                </div>
            </div>

            {/* Right: Market Stats */}
            <div className="flex items-center gap-6 lg:gap-10">
                {/* Current Price */}
                <div className="flex flex-col">
                    <span className={`text-base font-black tabular-nums transition-all duration-300 ${isPositive ? 'text-success' : 'text-danger'}`}>
                        {price.toLocaleString(undefined, { minimumFractionDigits: pricePrecision, maximumFractionDigits: pricePrecision })}
                    </span>
                    <span className="text-[9px] font-bold text-dark-muted leading-tight">${price.toLocaleString()}</span>
                </div>

                {/* 24h Change */}
                <div className="flex flex-col">
                    <span className="text-[10px] font-black text-dark-muted tracking-widest mb-0.5 uppercase">24h Change</span>
                    <span className={`text-sm font-black tabular-nums ${isPositive ? 'text-success' : 'text-danger'}`}>
                        {isPositive ? '+' : ''}{change24hPercent.toFixed(2)}%
                    </span>
                </div>

                {/* 24h High */}
                <div className="hidden sm:flex flex-col">
                    <span className="text-[10px] font-black text-dark-muted tracking-widest mb-0.5 uppercase">24h High</span>
                    <span className="text-xs font-black text-text tabular-nums leading-none">
                        {high24h.toLocaleString()}
                    </span>
                </div>

                {/* 24h Low */}
                <div className="hidden sm:flex flex-col">
                    <span className="text-[10px] font-black text-dark-muted tracking-widest mb-0.5 uppercase">24h Low</span>
                    <span className="text-xs font-black text-text tabular-nums leading-none">
                        {low24h.toLocaleString()}
                    </span>
                </div>

                {/* 24h Volume */}
                {volume24hQuote !== null && (
                    <div className="hidden md:flex flex-col">
                        <span className="text-[10px] font-black text-dark-muted tracking-widest mb-0.5 uppercase">24h Vol(USDT)</span>
                        <span className="text-xs font-black text-text tabular-nums leading-none">
                            {volume24hQuote.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SymbolInfoBar;
