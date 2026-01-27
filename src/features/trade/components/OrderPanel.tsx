import React, { useState, useEffect, useMemo } from 'react';
import { Side, OrderType, MarketStats, OrderSubmitStatus, OrderRow } from '../types/market';
import NumericStepperInput from '../../shared/components/NumericStepperInput';
import { useAuth } from '../../auth/AuthContext';
import { useWallet } from '../../wallet/hooks/useWallet';
import { useUI } from '../../shared/UIContext';

interface OrderPanelProps {
  symbol: string;
  marketStats: MarketStats | null;
  onSubmit: (order: {
    side: Side;
    type: OrderType;
    price: number | null;
    amount: number;
  }) => Promise<OrderRow>;
}

const OrderPanel: React.FC<OrderPanelProps> = ({ symbol, marketStats, onSubmit }) => {
  const { isAuthenticated, user } = useAuth();
  const { balances, openDeposit } = useWallet();
  const { setCurrentView } = useUI();

  const [side, setSide] = useState<Side>('buy');
  const [type, setType] = useState<OrderType>('limit');
  const [status, setStatus] = useState<OrderSubmitStatus>('IDLE');
  const [price, setPrice] = useState<number | ''>(42500.50);
  const [amount, setAmount] = useState<number | ''>('');
  const [total, setTotal] = useState<string>('0.00');

  const baseAsset = symbol.split('/')[0];
  const quoteAsset = symbol.split('/')[1];

  const availableBalance = useMemo(() => {
    if (!isAuthenticated) return 0;
    const asset = side === 'buy' ? quoteAsset : baseAsset;
    return balances.find(b => b.asset === asset)?.available || 0;
  }, [isAuthenticated, balances, side, baseAsset, quoteAsset]);

  useEffect(() => {
    if (type === 'limit') {
      const p = typeof price === 'number' ? price : 0;
      const a = typeof amount === 'number' ? amount : 0;
      setTotal((p * a).toFixed(2));
    } else {
      setTotal('Market Price');
    }
  }, [price, amount, type]);

  const validate = () => {
    if (!amount || amount <= 0) return 'Please enter a valid amount';
    if (type === 'limit' && (!price || price <= 0)) return 'Please enter a valid price';

    const orderTotal = type === 'limit' ? (Number(price) * Number(amount)) : (marketStats?.lastPrice || 0) * Number(amount);
    if (side === 'buy' && orderTotal > availableBalance) return 'Insufficient quote balance';
    if (side === 'sell' && Number(amount) > availableBalance) return 'Insufficient base balance';

    return null;
  };

  const handleAction = async () => {
    if (!isAuthenticated) {
      setCurrentView('login');
      return;
    }

    // PRD: Policy validation (Simulated)
    if (user?.kycStatus === 'unverified') {
      if (confirm('인증이 필요합니다. 거래를 진행하려면 신원 인증을 완료해 주세요. 지금 인증하시겠습니까?')) {
        setCurrentView('verification');
      }
      return;
    }

    const error = validate();
    if (error) {
      if (error === 'Insufficient quote balance' || error === 'Insufficient base balance') {
        if (confirm(`${error === 'Insufficient quote balance' ? quoteAsset : baseAsset} 잔고가 부족합니다. 입금 후 다시 시도해 주세요. 입금 페이지로 이동하시겠습니까?`)) {
          openDeposit(side === 'buy' ? quoteAsset : baseAsset);
        }
      } else {
        alert(error);
      }
      return;
    }

    try {
      setStatus('SUBMITTING');
      await onSubmit({
        side,
        type,
        price: type === 'limit' ? Number(price) : null,
        amount: Number(amount)
      });
      setStatus('SUCCESS');
      setAmount('');
      setTimeout(() => setStatus('IDLE'), 2000);
    } catch (e) {
      setStatus('ERROR');
      setTimeout(() => setStatus('IDLE'), 3000);
    }
  };

  const handlePercentClick = (percent: number) => {
    if (!availableBalance) return;
    if (side === 'buy') {
      const currentPrice = type === 'limit' ? Number(price) : marketStats?.lastPrice;
      if (currentPrice && currentPrice > 0) {
        const maxAmount = (availableBalance * (percent / 100)) / currentPrice;
        setAmount(Number(maxAmount.toFixed(4)));
      }
    } else {
      const maxAmount = availableBalance * (percent / 100);
      setAmount(Number(maxAmount.toFixed(4)));
    }
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
          Buy
        </button>
        <button
          onClick={() => setSide('sell')}
          className={`flex-1 py-2.5 rounded-lg text-sm font-black transition-all ${side === 'sell' ? 'bg-danger text-white shadow-lg' : 'text-dark-muted hover:text-white'
            }`}
        >
          Sell
        </button>
      </div>

      {/* Order Type Tabs */}
      <div className="flex gap-6 mb-6 border-b border-dark-border overflow-x-auto no-scrollbar text-xs font-bold">
        {['limit', 'market', 'stop_limit', 'oco'].map((t) => (
          <button
            key={t}
            onClick={() => setType(t as OrderType)}
            className={`pb-2 transition-all relative ${type === t ? 'text-primary' : 'text-dark-muted hover:text-white'
              }`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1).replace('_', ' ')}
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
          unit={baseAsset}
          step={0.001}
          precision={4}
          min={0}
          placeholder="0.0000"
        />

        {/* Percentage Buttons */}
        <div className="grid grid-cols-4 gap-2">
          {[25, 50, 75, 100].map((p) => (
            <button
              key={p}
              onClick={() => handlePercentClick(p)}
              className="py-1.5 rounded-lg bg-dark-surface border border-dark-border text-[10px] font-bold text-dark-muted hover:border-primary hover:text-white transition-all"
            >
              {p}%
            </button>
          ))}
        </div>

        {/* Total */}
        <div className="flex flex-col gap-2 mt-2">
          <label className="text-[10px] font-black text-dark-muted uppercase tracking-widest">Total</label>
          <div className="w-full bg-dark-surface/50 border border-dark-border border-dashed rounded-xl px-4 py-3 text-sm font-bold text-dark-muted flex justify-between items-center">
            <span>{total}</span>
            <span className="text-[10px]">{quoteAsset}</span>
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleAction}
          disabled={status === 'SUBMITTING'}
          className={`w-full py-4 rounded-xl text-sm font-black text-white shadow-xl transition-all transform active:scale-95 mt-4 ${!isAuthenticated
            ? 'bg-primary shadow-primary/20 hover:bg-primary/90'
            : side === 'buy'
              ? 'bg-success shadow-success/20 hover:bg-success/90'
              : 'bg-danger shadow-danger/20 hover:bg-danger/90'
            } ${status === 'SUBMITTING' ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {status === 'SUBMITTING' ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Processing...
            </span>
          ) : !isAuthenticated ? (
            'Log In'
          ) : (
            `${side.charAt(0).toUpperCase() + side.slice(1)} ${baseAsset}`
          )}
        </button>

        {/* Available Balance */}
        <div className="flex justify-between items-center text-[10px] font-bold text-dark-muted uppercase tracking-widest">
          <span>Available</span>
          <span className="text-text">
            {availableBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 8 })} {side === 'buy' ? quoteAsset : baseAsset}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderPanel;
