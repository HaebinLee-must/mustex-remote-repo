import React from 'react';
import { TradeRow } from '../types/market';

interface RecentTradesPanelProps {
  trades: TradeRow[];
  loading?: boolean;
}

const RecentTradesPanel: React.FC<RecentTradesPanelProps> = ({ trades, loading }) => {
  if (loading) {
    return <div className="p-4 text-dark-muted animate-pulse font-bold text-xs">Loading trades...</div>;
  }

  return (
    <div className="flex flex-col h-full bg-[#0B0E11] text-[11px] font-medium tabular-nums font-roboto select-none">
      {/* Header */}
      <div className="grid grid-cols-3 px-4 py-2 text-[10px] font-black text-dark-muted border-b border-dark-border uppercase tracking-tighter bg-dark-surface/10">
        <span>Price</span>
        <span className="text-right">Amount</span>
        <span className="text-right">Time</span>
      </div>

      {/* Trades List */}
      <div className="flex-1 overflow-auto">
        {trades.length === 0 ? (
          <div className="p-10 text-center text-dark-muted font-bold">No recent trades</div>
        ) : (
          trades.map((trade) => (
            <div key={trade.id} className="grid grid-cols-3 px-4 py-1 hover:bg-white/5 transition-colors cursor-default group">
              <span className={`${trade.side === 'buy' ? 'text-success' : 'text-danger'} font-bold transition-all duration-300`}>
                {trade.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
              <span className="text-right text-text font-bold">{trade.amount.toFixed(4)}</span>
              <span className="text-right text-dark-muted group-hover:text-text transition-colors">{trade.time}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentTradesPanel;
