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
    volume24hQuote,
    isFavorite,
    onToggleFavorite
}) => {
    const isPositive = change24hPercent >= 0;

    return (
        <div className="flex items-center h-14 px-4 bg-dark-main border-b border-dark-border select-none overflow-x-auto scrollbar-hide">
            {/* Left: Identity */}
            <div className="flex items-center gap-3 pr-6 border-r border-dark-border mr-6 flex-shrink-0">
                <button
                    onClick={onToggleFavorite}
                    className={`transition-colors hover:scale-110 active:scale-95 ${isFavorite ? 'text-primary' : 'text-dark-muted hover:text-text'
                        }`}
                    aria-label={`Toggle favorite for ${symbol}`}
                >
                    <Star size={18} fill={isFavorite ? 'currentColor' : 'none'} strokeWidth={2} />
                </button>

                <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-dark-surface border border-dark-border flex items-center justify-center overflow-hidden transition-transform hover:scale-110">
                        {iconUrl ? (
                            <img src={iconUrl} alt={coinName} className="w-full h-full object-cover animate-in fade-in zoom-in duration-500" />
                        ) : (
                            <span className="text-[10px] font-black text-primary">{baseAsset[0]}</span>
                        )}
                    </div>
                    <div className="flex flex-col -gap-1">
                        <span className="text-sm font-black text-white tracking-tight leading-tight uppercase">{symbol}</span>
                        <span className="text-[10px] font-bold text-dark-muted tracking-tight">{coinName}</span>
                    </div>
                </div>
            </div>

            {/* Right: Market Stats */}
            <div className="flex items-center gap-10">
                {/* Current Price */}
                <div className="flex flex-col">
                    <span className={`text-sm font-black tabular transition-all duration-300 ${isPositive ? 'text-success drop-shadow-[0_0_8px_rgba(0,192,135,0.3)]' : 'text-danger drop-shadow-[0_0_8px_rgba(255,77,79,0.3)]'}`}>
                        {price.toLocaleString(undefined, { minimumFractionDigits: pricePrecision, maximumFractionDigits: pricePrecision })}
                    </span>
                    <span className="text-[10px] font-bold text-dark-muted leading-tight">${price.toLocaleString()}</span>
                </div>

                {/* 24h Change */}
                <div className="flex flex-col">
                    <span className="text-[10px] font-black text-dark-muted tracking-widest mb-0.5">24h change</span>
                    <span className={`text-xs font-black tabular ${isPositive ? 'text-success' : 'text-danger'}`}>
                        {isPositive ? '+' : ''}{change24hPercent.toFixed(2)}%
                    </span>
                </div>

                {/* 24h Volume */}
                {volume24hQuote !== null && (
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black text-dark-muted tracking-widest mb-0.5">24h volume(USDT)</span>
                        <span className="text-xs font-black text-text tabular leading-none">
                            {volume24hQuote.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SymbolInfoBar;
