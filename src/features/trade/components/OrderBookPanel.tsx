import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { OrderBookRow } from '../types/market';

interface OrderBookPanelProps {
  asks: OrderBookRow[];
  bids: OrderBookRow[];
  loading?: boolean;
  onPriceSelect?: (price: number) => void;
}

const OrderBookPanel: React.FC<OrderBookPanelProps> = ({ asks, bids, loading, onPriceSelect }) => {
  const [viewMode, setViewMode] = useState<'all' | 'buy' | 'sell'>('all');
  const [step, setStep] = useState('0.01');

  if (loading) {
    return <div className="p-4 text-dark-muted animate-pulse font-bold">Loading order book...</div>;
  }

  const maxTotal = Math.max(
    asks.length > 0 ? asks[asks.length - 1].total : 0,
    bids.length > 0 ? bids[bids.length - 1].total : 0
  );

  return (
    <div className="flex flex-col h-full bg-[#000000] text-[11px] font-medium tabular-nums font-sans select-none">
      {/* View Switch Icons & Step Dropdown */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-dark-border bg-dark-main">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setViewMode('all')}
            className={`p-1 rounded transition-colors ${viewMode === 'all' ? 'bg-white/10 text-white' : 'text-dark-muted hover:text-white'}`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 12h16M4 6h16M4 18h16" />
            </svg>
          </button>
          <button
            onClick={() => setViewMode('buy')}
            className={`p-1 rounded transition-colors ${viewMode === 'buy' ? 'bg-success/20 text-success' : 'text-dark-muted hover:text-success'}`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => setViewMode('sell')}
            className={`p-1 rounded transition-colors ${viewMode === 'sell' ? 'bg-danger/20 text-danger' : 'text-dark-muted hover:text-danger'}`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </button>
        </div>

        <div className="relative group">
          <button className="flex items-center gap-1 px-2 py-1 bg-dark-surface border border-dark-border rounded text-[10px] font-bold text-dark-muted hover:text-white transition-colors">
            {step} <ChevronDown size={12} />
          </button>
          <div className="absolute right-0 top-full mt-1 w-20 bg-dark-surface border border-dark-border rounded shadow-xl hidden group-hover:block z-50">
            {['0.01', '0.1', '1', '10', '100'].map(s => (
              <button
                key={s}
                onClick={() => setStep(s)}
                className="w-full px-3 py-1.5 text-left hover:bg-white/5 text-dark-muted hover:text-white transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="grid grid-cols-3 px-4 py-2 text-dark-muted border-b border-dark-border font-black uppercase tracking-tighter text-[9px]">
        <span>Price(USDT)</span>
        <span className="text-right">Amount(BTC)</span>
        <span className="text-right">Total</span>
      </div>

      {/* Asks (Sells) */}
      {(viewMode === 'all' || viewMode === 'sell') && (
        <div className={`flex flex-col-reverse ${viewMode === 'sell' ? 'flex-1 overflow-auto' : 'overflow-hidden'}`}>
          {asks.slice(viewMode === 'all' ? -12 : 0).map((row, i) => (
            <div
              key={`ask-${i}`}
              className="relative grid grid-cols-3 px-4 py-0.5 hover:bg-white/5 cursor-pointer group transition-colors"
              onClick={() => onPriceSelect?.(row.price)}
            >
              <div
                className="absolute left-0 top-0 bottom-0 bg-danger/15 transition-all duration-300"
                style={{ width: `${(row.total / maxTotal) * 100}%` }}
              />
              <span className="text-danger z-10 font-bold">{row.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              <span className="text-right text-text z-10">{row.size.toFixed(4)}</span>
              <span className="text-right text-text z-10">{row.total.toFixed(4)}</span>
            </div>
          ))}
        </div>
      )}

      {/* Mid Price */}
      <div className="px-4 py-3 border-y border-dark-border bg-dark-surface/30">
        <div className="flex items-center gap-2">
          <span className="text-lg font-black text-success animate-pulse">42,500.50</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-success">
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
          <span className="text-xs text-dark-muted font-bold">$42,500.50</span>
        </div>
      </div>

      {/* Bids (Buys) */}
      {(viewMode === 'all' || viewMode === 'buy') && (
        <div className={`flex flex-col ${viewMode === 'buy' ? 'flex-1 overflow-auto' : 'overflow-hidden'}`}>
          {bids.slice(0, viewMode === 'all' ? 12 : undefined).map((row, i) => (
            <div
              key={`bid-${i}`}
              className="relative grid grid-cols-3 px-4 py-0.5 hover:bg-white/5 cursor-pointer group transition-colors"
              onClick={() => onPriceSelect?.(row.price)}
            >
              <div
                className="absolute left-0 top-0 bottom-0 bg-success/15 transition-all duration-300"
                style={{ width: `${(row.total / maxTotal) * 100}%` }}
              />
              <span className="text-success z-10 font-bold">{row.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              <span className="text-right text-text z-10">{row.size.toFixed(4)}</span>
              <span className="text-right text-text z-10">{row.total.toFixed(4)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderBookPanel;