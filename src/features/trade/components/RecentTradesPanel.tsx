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
    <div className="flex flex-col h-full bg-dark-main text-[11px] font-medium tabular">
      {/* Header */}
      <div className="grid grid-cols-3 px-4 py-2 text-dark-muted border-b border-dark-border font-bold tracking-wider">
        <span>Price</span>
        <span className="text-right">Amount</span>
        <span className="text-right">Time</span>
      </div>

      {/* Trades List */}
      <div className="flex-1 overflow-auto">
        {trades.length === 0 ? (
          <div className="p-10 text-center text-dark-muted">No recent trades</div>
        ) : (
          trades.map((trade) => (
            <div key={trade.id} className="grid grid-cols-3 px-4 py-1.5 hover:bg-white/5 transition-colors cursor-default">
              <span className={`${trade.side === 'buy' ? 'text-success' : 'text-danger'} font-bold`}>
                {trade.price.toLocaleString()}
              </span>
              <span className="text-right text-text">{trade.amount.toFixed(4)}</span>
              <span className="text-right text-dark-muted">{trade.time}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentTradesPanel;
