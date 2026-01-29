import React, { useState } from 'react';
import { Search, Star } from 'lucide-react';

interface Market {
  symbol: string;
  price: number;
  change: number;
  icon?: string;
}

interface MarketListPanelProps {
  selectedSymbol: string;
  onSymbolSelect: (symbol: string) => void;
  favorites: string[];
  onToggleFavorite: (symbol: string) => void;
}

const Sparkline: React.FC<{ isPositive: boolean }> = ({ isPositive }) => {
  const color = isPositive ? '#0ECB81' : '#F6465D';
  // Simple random path generation for mock visual
  const d = isPositive
    ? "M0 20 C 10 20, 15 15, 20 15 S 30 5, 40 5 S 50 10, 60 2"
    : "M0 5 C 10 5, 15 10, 20 10 S 30 20, 40 20 S 50 15, 60 23";

  return (
    <svg width="60" height="25" viewBox="0 0 60 25" fill="none" className="opacity-80">
      <path d={d} stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </svg>
  );
};

const MarketListPanel: React.FC<MarketListPanelProps> = ({
  selectedSymbol,
  onSymbolSelect,
  favorites,
  onToggleFavorite
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'favorites'>('all');

  const markets: Market[] = [
    { symbol: 'BTC/USDT', price: 42500.50, change: 2.45, icon: 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/btc.png' },
    { symbol: 'ETH/USDT', price: 2550.20, change: -1.20, icon: 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/eth.png' },
    { symbol: 'SOL/USDT', price: 95.15, change: 5.67, icon: 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/sol.png' },
    { symbol: 'BNB/USDT', price: 312.40, change: 0.15, icon: 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/bnb.png' },
    { symbol: 'XRP/USDT', price: 0.52, change: -2.10, icon: 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/xrp.png' },
    { symbol: 'ADA/USDT', price: 0.48, change: 1.25, icon: 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/ada.png' },
    { symbol: 'DOT/USDT', price: 6.75, change: -0.85, icon: 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/dot.png' },
    { symbol: 'LINK/USDT', price: 14.20, change: 3.40, icon: 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/link.png' },
  ];

  const filteredMarkets = markets.filter(m => {
    const matchesSearch = m.symbol.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || favorites.includes(m.symbol);
    return matchesSearch && matchesTab;
  });

  return (
    <div className="flex flex-col h-full bg-[#0B0E11] font-roboto select-none">
      {/* Search & Tabs - Fixed at Top */}
      <div className="p-3 border-b border-dark-border flex flex-col gap-3 bg-dark-main sticky top-0 z-10">
        {/* Search Input */}
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-dark-muted" />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-dark-surface border border-dark-border rounded-lg pl-9 pr-4 py-1.5 text-xs font-bold text-text focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-4 px-1">
          <button
            onClick={() => setActiveTab('all')}
            className={`text-[10px] font-black tracking-widest transition-colors uppercase ${activeTab === 'all' ? 'text-primary' : 'text-dark-muted hover:text-text'
              }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveTab('favorites')}
            className={`flex items-center gap-1.5 text-[10px] font-black tracking-widest transition-colors uppercase ${activeTab === 'favorites' ? 'text-primary' : 'text-dark-muted hover:text-text'
              }`}
          >
            <Star size={10} fill={activeTab === 'favorites' ? 'currentColor' : 'none'} />
            Fav
          </button>
        </div>
      </div>

      {/* List Header */}
      <div className="grid grid-cols-[32px_1.2fr_0.8fr_1fr_1fr] px-4 py-3 text-[10px] font-black text-dark-muted border-b border-dark-border tracking-widest bg-dark-surface/10">
        <div />
        <span>Pair</span>
        <span className="text-center">Trend</span>
        <span className="text-right">Price</span>
        <span className="text-right">Change</span>
      </div>

      {/* Market List */}
      <div className="flex-1 overflow-auto">
        {filteredMarkets.map((m) => (
          <div
            key={m.symbol}
            onClick={() => onSymbolSelect(m.symbol)}
            className={`grid grid-cols-[32px_1.2fr_0.8fr_1fr_1fr] px-4 py-3 hover:bg-white/5 transition-colors cursor-pointer border-b border-dark-border/30 group items-center ${selectedSymbol === m.symbol ? 'bg-primary/5 border-l-2 border-l-primary' : ''
              }`}
          >
            <div className="flex items-center">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(m.symbol);
                }}
                className={`transition-colors hover:scale-110 ${favorites.includes(m.symbol) ? 'text-primary' : 'text-dark-muted hover:text-text'
                  }`}
              >
                <Star size={14} fill={favorites.includes(m.symbol) ? 'currentColor' : 'none'} />
              </button>
            </div>
            <div className="flex items-center gap-2">
              {m.icon && <img src={m.icon} alt={m.symbol} className="w-5 h-5 rounded-full" />}
              <div className="flex flex-col">
                <span className={`text-xs font-bold transition-colors ${selectedSymbol === m.symbol ? 'text-primary' : 'text-text group-hover:text-primary'
                  }`}>{m.symbol.split('/')[0]}</span>
                <span className="text-[9px] text-dark-muted font-bold">/ {m.symbol.split('/')[1]}</span>
              </div>
            </div>

            {/* Sparkline Column */}
            <div className="flex justify-center">
              <Sparkline isPositive={m.change >= 0} />
            </div>

            <div className="flex flex-col items-end justify-center">
              <span className="text-xs font-bold text-text tabular-nums">{m.price.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-end">
              <span className={`text-[11px] font-black tabular-nums ${m.change >= 0 ? 'text-success' : 'text-danger'}`}>
                {m.change >= 0 ? '+' : ''}{m.change.toFixed(2)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketListPanel;
