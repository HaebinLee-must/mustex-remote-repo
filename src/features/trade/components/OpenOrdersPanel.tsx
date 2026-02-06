import React from 'react';
import { OrderRow } from '../types/market';
import { X } from 'lucide-react';

interface OpenOrdersPanelProps {
  orders: OrderRow[];
  loading?: boolean;
  onCancel?: (id: string) => void;
}

const OpenOrdersPanel: React.FC<OpenOrdersPanelProps> = ({ orders, loading, onCancel }) => {
  if (loading) {
    return <div className="p-10 text-center text-dark-muted animate-pulse font-bold tracking-widest text-xs">Loading open orders...</div>;
  }

  return (
    <div className="w-full h-full bg-[#000000] flex flex-col font-sans">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-3 bg-dark-surface/10 border-b border-dark-border">
        <div className="grid grid-cols-8 flex-1 text-[10px] font-black text-dark-muted tracking-widest gap-4">
          <span className="col-span-1">Date</span>
          <span className="col-span-1">Symbol</span>
          <span className="col-span-1">Type</span>
          <span className="col-span-1">Side</span>
          <span className="col-span-1 text-right">Price</span>
          <span className="col-span-1 text-right">Amount</span>
          <span className="col-span-1 text-right">Filled</span>
          <span className="col-span-1 text-right">Action</span>
        </div>
        {orders.length > 0 && (
          <button
            onClick={() => onCancel?.('ALL')}
            className="ml-4 text-[10px] font-bold text-danger hover:text-white border border-danger/30 hover:bg-danger hover:border-transparent px-3 py-1 rounded transition-all"
          >
            Cancel All
          </button>
        )}
      </div>

      {/* List */}
      <div className="flex-1 overflow-auto">
        {orders.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center gap-4 py-20">
            <div className="w-16 h-16 rounded-full bg-dark-surface flex items-center justify-center border border-dark-border border-dashed">
              <span className="text-2xl text-dark-muted opacity-50">!</span>
            </div>
            <p className="text-dark-muted font-bold text-sm tracking-tight">You have no open orders</p>
          </div>
        ) : (
          orders.map((order) => {
            const fillPercent = (order.filled / order.amount) * 100;
            return (
              <div key={order.id} className="grid grid-cols-8 px-6 py-4 text-xs font-bold border-b border-dark-border/50 hover:bg-white/5 transition-colors tabular-nums gap-4 items-center">
                <span className="col-span-1 text-dark-muted">{order.timestamp.split('T')[1]?.split('.')[0] || order.timestamp}</span>
                <span className="col-span-1 text-text">{order.symbol}</span>
                <span className="col-span-1 text-dark-muted">{order.type.charAt(0).toUpperCase() + order.type.slice(1)}</span>
                <span className={`col-span-1 ${order.side === 'buy' ? 'text-success' : 'text-danger'}`}>{order.side.charAt(0).toUpperCase() + order.side.slice(1)}</span>
                <span className="col-span-1 text-right text-text">{order.price?.toLocaleString() || 'Market'}</span>
                <span className="col-span-1 text-right text-text">{order.amount.toFixed(4)}</span>

                {/* Filled Progress Bar - Phase 4 */}
                <div className="col-span-1 flex flex-col justify-center gap-1.5">
                  <div className="flex justify-between text-[9px] font-black uppercase tracking-tighter">
                    <span className="text-dark-muted">Progress</span>
                    <span className={order.side === 'buy' ? 'text-success' : 'text-danger'}>{fillPercent.toFixed(1)}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-dark-surface rounded-full overflow-hidden border border-white/5">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_8px_rgba(0,192,135,0.4)] ${order.side === 'buy' ? 'bg-success shadow-success/40' : 'bg-danger shadow-danger/40'}`}
                      style={{ width: `${fillPercent}%` }}
                    />
                  </div>
                </div>

                <div className="col-span-1 flex justify-end">
                  <button
                    onClick={() => onCancel?.(order.id)}
                    className="p-1.5 hover:bg-danger/10 text-dark-muted hover:text-danger rounded-lg transition-all"
                    title="Cancel Order"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default OpenOrdersPanel;
