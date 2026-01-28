import React from 'react';
import { OrderBookRow } from '../types/market';

interface OrderBookPanelProps {
  asks: OrderBookRow[];
  bids: OrderBookRow[];
  loading?: boolean;
}

const OrderBookPanel: React.FC<OrderBookPanelProps> = ({ asks, bids, loading }) => {
  if (loading) {
    return <div className="p-4 text-dark-muted animate-pulse font-bold">Loading order book...</div>;
  }

  const maxTotal = Math.max(
    asks.length > 0 ? asks[asks.length - 1].total : 0,
    bids.length > 0 ? bids[bids.length - 1].total : 0
  );

  return (
    <div className="flex flex-col h-full bg-[#0B0E11] text-[11px] font-medium tabular">
      {/* Header */}
      <div className="grid grid-cols-3 px-4 py-2 text-dark-muted border-b border-dark-border font-bold tracking-wider">
        <span>Price</span>
        <span className="text-right">Size</span>
        <span className="text-right">Total</span>
      </div>

      {/* Asks (Sells) - Reversed to show highest at top if traditional, but often lowest ask is at bottom near mid-price */}
      <div className="flex flex-col-reverse flex-1 overflow-hidden">
        {asks.map((row, i) => (
          <div key={`ask-${i}`} className="relative grid grid-cols-3 px-4 py-1 hover:bg-white/5 cursor-pointer group">
            <div
              className="absolute right-0 top-0 bottom-0 bg-danger/10 transition-all duration-300"
              style={{ width: `${(row.total / maxTotal) * 100}%` }}
            />
            <span className="text-danger z-10 font-bold">{row.price.toLocaleString()}</span>
            <span className="text-right text-text z-10">{row.size.toFixed(4)}</span>
            <span className="text-right text-text z-10">{row.total.toFixed(4)}</span>
          </div>
        ))}
      </div>

      {/* Mid Price */}
      <div className="px-4 py-3 border-y border-dark-border bg-dark-surface/30">
        <div className="flex items-center gap-2">
          <span className="text-lg font-black text-success">42,500.50</span>
          <span className="text-xs text-dark-muted">$42,500.50</span>
        </div>
      </div>

      {/* Bids (Buys) */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {bids.map((row, i) => (
          <div key={`bid-${i}`} className="relative grid grid-cols-3 px-4 py-1 hover:bg-white/5 cursor-pointer group">
            <div
              className="absolute right-0 top-0 bottom-0 bg-success/10 transition-all duration-300"
              style={{ width: `${(row.total / maxTotal) * 100}%` }}
            />
            <span className="text-success z-10 font-bold">{row.price.toLocaleString()}</span>
            <span className="text-right text-text z-10">{row.size.toFixed(4)}</span>
            <span className="text-right text-text z-10">{row.total.toFixed(4)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderBookPanel;
