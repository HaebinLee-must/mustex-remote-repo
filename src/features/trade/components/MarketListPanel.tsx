import React, { useState } from 'react';
import { Search, Star } from 'lucide-react';

interface Market {
  symbol: string;
  price: number;
  change: number;
}

interface MarketListPanelProps {
  selectedSymbol: string;
  onSymbolSelect: (symbol: string) => void;
  favorites: string[];
  onToggleFavorite: (symbol: string) => void;
}

const MarketListPanel: React.FC<MarketListPanelProps> = ({
  selectedSymbol,
  onSymbolSelect,
  favorites,
  onToggleFavorite
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'favorites'>('all');

  const markets: Market[] = [
    { symbol: 'BTC/USDT', price: 42500.50, change: 2.45 },
    { symbol: 'ETH/USDT', price: 2550.20, change: -1.20 },
    { symbol: 'SOL/USDT', price: 95.15, change: 5.67 },
    { symbol: 'BNB/USDT', price: 312.40, change: 0.15 },
    { symbol: 'XRP/USDT', price: 0.52, change: -2.10 },
    { symbol: 'ADA/USDT', price: 0.48, change: 1.25 },
    { symbol: 'DOT/USDT', price: 6.75, change: -0.85 },
    { symbol: 'LINK/USDT', price: 14.20, change: 3.40 },
  ];

  const filteredMarkets = markets.filter(m => {
    const matchesSearch = m.symbol.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || favorites.includes(m.symbol);
    return matchesSearch && matchesTab;
  });

  return (
    <div className="flex flex-col h-full bg-dark-main font-sans select-none">
      {/* Search & Tabs */}
      <div className="p-4 border-b border-dark-border flex flex-col gap-4">
        {/* Tabs */}
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('all')}
            className={`text-[10px] font-black tracking-widest transition-colors ${activeTab === 'all' ? 'text-primary' : 'text-dark-muted hover:text-text'
              }`}
          >
            All markets
          </button>
          <button
            onClick={() => setActiveTab('favorites')}
            className={`flex items-center gap-1.5 text-[10px] font-black tracking-widest transition-colors ${activeTab === 'favorites' ? 'text-primary' : 'text-dark-muted hover:text-text'
              }`}
          >
            <Star size={12} fill={activeTab === 'favorites' ? 'currentColor' : 'none'} />
            Favorites
          </button>
        </div>

        {/* Search Input */}
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-dark-muted" />
          <input
            type="text"
            placeholder="Search markets"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-dark-surface border border-dark-border rounded-lg pl-9 pr-4 py-2 text-xs font-bold text-text focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
          />
        </div>
      </div>

      {/* List Header */}
      <div className="grid grid-cols-[32px_1fr_1fr_1fr] px-4 py-3 text-[10px] font-black text-dark-muted border-b border-dark-border tracking-widest bg-dark-surface/10">
        <div />
        <span>Pair</span>
        <span className="text-right">Price</span>
        <span className="text-right">Change</span>
      </div>

      {/* Market List */}
      <div className="flex-1 overflow-auto">
        {filteredMarkets.map((m) => (
          <div
            key={m.symbol}
            onClick={() => onSymbolSelect(m.symbol)}
            className={`grid grid-cols-[32px_1fr_1fr_1fr] px-4 py-3 hover:bg-white/5 transition-colors cursor-pointer border-b border-dark-border/30 group ${selectedSymbol === m.symbol ? 'bg-primary/5 border-l-2 border-l-primary' : ''
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
            <div className="flex flex-col">
              <span className={`text-xs font-bold transition-colors ${selectedSymbol === m.symbol ? 'text-primary' : 'text-text group-hover:text-primary'
                }`}>{m.symbol}</span>
              <span className="text-[9px] text-dark-muted font-bold">Vol 1.2M</span>
            </div>
            <div className="flex flex-col items-end justify-center">
              <span className="text-xs font-bold text-text tabular">{m.price.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-end">
              <span className={`text-[11px] font-black tabular ${m.change >= 0 ? 'text-success' : 'text-danger'}`}>
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
