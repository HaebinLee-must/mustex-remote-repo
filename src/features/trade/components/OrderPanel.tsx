import React, { useState, useEffect } from 'react';
import { Side, OrderType } from '../types/market';
import NumericStepperInput from '../../shared/components/NumericStepperInput';

const OrderPanel: React.FC = () => {
  const [side, setSide] = useState<Side>('buy');
  const [type, setType] = useState<OrderType>('limit');
  const [price, setPrice] = useState<number | ''>(42500.50);
  const [amount, setAmount] = useState<number | ''>('');
  const [total, setTotal] = useState<string>('0.00');

  useEffect(() => {
    if (type === 'limit') {
      const p = typeof price === 'number' ? price : 0;
      const a = typeof amount === 'number' ? amount : 0;
      setTotal((p * a).toFixed(2));
    } else {
      setTotal('Market Price');
    }
  }, [price, amount, type]);

  const handleAction = () => {
    console.log(`Submitting ${side} ${type} order:`, { price, amount, total });
    alert(`${side.toUpperCase()} Order Submitted: ${amount} BTC @ ${type === 'limit' ? price : 'Market'}`);
  };

  return (
    <div className="flex flex-col h-full bg-dark-main p-4 font-sans">
      {/* Buy/Sell Switch */}
      <div className="flex gap-1 p-1 bg-dark-surface rounded-xl mb-6">
        <button
          onClick={() => setSide('buy')}
          className={`flex-1 py-2.5 rounded-lg text-sm font-black transition-all ${side === 'buy' ? 'bg-success text-white shadow-lg' : 'text-dark-muted hover:text-white'
            }`}
        >
          BUY
        </button>
        <button
          onClick={() => setSide('sell')}
          className={`flex-1 py-2.5 rounded-lg text-sm font-black transition-all ${side === 'sell' ? 'bg-danger text-white shadow-lg' : 'text-dark-muted hover:text-white'
            }`}
        >
          SELL
        </button>
      </div>

      {/* Order Type Tabs */}
      <div className="flex gap-6 mb-6 border-b border-dark-border">
        {['limit', 'market'].map((t) => (
          <button
            key={t}
            onClick={() => setType(t as OrderType)}
            className={`pb-2 text-xs font-bold uppercase tracking-widest transition-all relative ${type === t ? 'text-primary' : 'text-dark-muted hover:text-white'
              }`}
          >
            {t}
            {type === t && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />}
          </button>
        ))}
      </div>

      {/* Form Fields */}
      <div className="flex flex-col gap-5">
        {type === 'limit' && (
          <NumericStepperInput
            label="Price"
            value={price}
            onChange={setPrice}
            unit="USDT"
            step={0.1}
            precision={2}
            min={0}
          />
        )}

        <NumericStepperInput
          label="Amount"
          value={amount}
          onChange={setAmount}
          unit="BTC"
          step={0.001}
          precision={4}
          min={0}
          placeholder="0.0000"
        />

        {/* Percentage Buttons */}
        <div className="grid grid-cols-4 gap-2">
          {[25, 50, 75, 100].map((p) => (
            <button key={p} className="py-1.5 rounded-lg bg-dark-surface border border-dark-border text-[10px] font-bold text-dark-muted hover:border-primary hover:text-white transition-all">
              {p}%
            </button>
          ))}
        </div>

        {/* Total */}
        <div className="flex flex-col gap-2 mt-2">
          <label className="text-[10px] font-black text-dark-muted uppercase tracking-widest">Total</label>
          <div className="w-full bg-dark-surface/50 border border-dark-border border-dashed rounded-xl px-4 py-3 text-sm font-bold text-dark-muted flex justify-between items-center">
            <span>{total}</span>
            <span className="text-[10px]">USDT</span>
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleAction}
          className={`w-full py-4 rounded-xl text-sm font-black text-white shadow-xl transition-all transform active:scale-95 mt-4 ${side === 'buy' ? 'bg-success shadow-success/20 hover:bg-success/90' : 'bg-danger shadow-danger/20 hover:bg-danger/90'
            }`}
        >
          {side.toUpperCase()} BTC
        </button>

        {/* Available Balance */}
        <div className="flex justify-between items-center text-[10px] font-bold text-dark-muted uppercase tracking-widest">
          <span>Available</span>
          <span className="text-text">1,240.50 USDT</span>
        </div>
      </div>
    </div>
  );
};

export default OrderPanel;
