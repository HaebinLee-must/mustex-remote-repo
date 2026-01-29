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
  price?: number | '';
  onPriceChange?: (val: number | '') => void;
}

const OrderPanel: React.FC<OrderPanelProps> = ({ symbol, marketStats, onSubmit, price: externalPrice, onPriceChange }) => {
  const { isAuthenticated, user } = useAuth();
  const { balances, openDeposit } = useWallet();
  const { setCurrentView } = useUI();

  const [type, setType] = useState<OrderType>('limit');
  const [status, setStatus] = useState<OrderSubmitStatus>('IDLE');

  // Separate states for Buy and Sell sides (Phase 1: Dual Column)
  const [buyPrice, setBuyPrice] = useState<number | ''>(42500.50);
  const [buyAmount, setBuyAmount] = useState<number | ''>('');
  const [sellPrice, setSellPrice] = useState<number | ''>(42500.50);
  const [sellAmount, setSellAmount] = useState<number | ''>('');

  // Sync with external price
  useEffect(() => {
    if (externalPrice !== undefined && externalPrice !== '') {
      setBuyPrice(externalPrice);
      setSellPrice(externalPrice);
    }
  }, [externalPrice]);

  const baseAsset = symbol.split('/')[0];
  const quoteAsset = symbol.split('/')[1];

  const getAvailableBalance = (side: Side) => {
    if (!isAuthenticated) return 0;
    const asset = side === 'buy' ? quoteAsset : baseAsset;
    return balances.find(b => b.asset === asset)?.available || 0;
  };

  const buyAvailable = getAvailableBalance('buy');
  const sellAvailable = getAvailableBalance('sell');

  const handleAction = async (side: Side) => {
    if (!isAuthenticated) {
      setCurrentView('login');
      return;
    }

    if (user?.kycStatus === 'unverified') {
      if (confirm('인증이 필요합니다. 거래를 진행하려면 신원 인증을 완료해 주세요. 지금 인증하시겠습니까?')) {
        setCurrentView('verification');
      }
      return;
    }

    const price = side === 'buy' ? buyPrice : sellPrice;
    const amount = side === 'buy' ? buyAmount : sellAmount;
    const available = side === 'buy' ? buyAvailable : sellAvailable;

    if (!amount || amount <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    if (type === 'limit' && (!price || price <= 0)) {
      alert('Please enter a valid price');
      return;
    }

    const orderTotal = type === 'limit' ? (Number(price) * Number(amount)) : (marketStats?.lastPrice || 0) * Number(amount);
    if (side === 'buy' && orderTotal > available) {
      if (confirm(`${quoteAsset} 잔고가 부족합니다. 입금 후 다시 시도해 주세요. 입금 페이지로 이동하시겠습니까?`)) {
        openDeposit(quoteAsset);
      }
      return;
    }
    if (side === 'sell' && Number(amount) > available) {
      if (confirm(`${baseAsset} 잔고가 부족합니다. 입금 후 다시 시도해 주세요. 입금 페이지로 이동하시겠습니까?`)) {
        openDeposit(baseAsset);
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
      if (side === 'buy') setBuyAmount('');
      else setSellAmount('');
      setTimeout(() => setStatus('IDLE'), 2000);
    } catch (e) {
      setStatus('ERROR');
      setTimeout(() => setStatus('IDLE'), 3000);
    }
  };

  const handlePercentClick = (side: Side, percent: number) => {
    const available = side === 'buy' ? buyAvailable : sellAvailable;
    if (!available) return;

    if (side === 'buy') {
      const currentPrice = type === 'limit' ? Number(buyPrice) : marketStats?.lastPrice;
      if (currentPrice && currentPrice > 0) {
        const maxAmount = (available * (percent / 100)) / currentPrice;
        setBuyAmount(Number(maxAmount.toFixed(4)));
      }
    } else {
      const maxAmount = available * (percent / 100);
      setSellAmount(Number(maxAmount.toFixed(4)));
    }
  };

  const OrderForm = ({ side }: { side: Side }) => {
    const isBuy = side === 'buy';
    const price = isBuy ? buyPrice : sellPrice;
    const amount = isBuy ? buyAmount : sellAmount;
    const available = isBuy ? buyAvailable : sellAvailable;
    const setPrice = isBuy ? setBuyPrice : setSellPrice;
    const setAmount = isBuy ? setBuyAmount : setSellAmount;
    const colorClass = isBuy ? 'text-success' : 'text-danger';
    const bgClass = isBuy ? 'bg-success' : 'bg-danger';

    return (
      <div className="flex flex-col gap-3 flex-1">
        <div className="flex justify-between items-center mb-1">
          <span className="text-[10px] font-black text-dark-muted uppercase tracking-widest">Available</span>
          <span
            className="text-[10px] font-bold text-white cursor-pointer hover:text-primary transition-colors"
            onClick={() => handlePercentClick(side, 100)}
          >
            {available.toLocaleString()} {isBuy ? quoteAsset : baseAsset}
          </span>
        </div>

        {type === 'limit' ? (
          <NumericStepperInput
            label="Price"
            value={price}
            onChange={setPrice}
            unit={quoteAsset}
            step={0.1}
            precision={2}
            min={0}
          />
        ) : (
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-black text-dark-muted uppercase tracking-widest leading-none">Price</label>
            <div className="w-full h-[40px] bg-dark-surface border border-dark-border rounded-lg px-3 flex items-center text-xs font-bold text-dark-muted">
              Market Price
            </div>
          </div>
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

        {/* 25% ~ 100% Quick Inputs */}
        <div className="flex gap-1.5 mt-1">
          {[25, 50, 75, 100].map((p) => (
            <button
              key={p}
              onClick={() => handlePercentClick(side, p)}
              className="flex-1 py-1 rounded bg-dark-surface border border-dark-border text-[9px] font-bold text-dark-muted hover:border-white/20 hover:text-white transition-all"
            >
              {p}%
            </button>
          ))}
        </div>

        <button
          onClick={() => handleAction(side)}
          disabled={status === 'SUBMITTING'}
          className={`w-full py-3 rounded-lg text-xs font-black text-white shadow-lg transition-all mt-2 ${bgClass
            } ${status === 'SUBMITTING' ? 'opacity-70 cursor-not-allowed' : 'hover:brightness-110 active:scale-[0.98]'}`}
        >
          {status === 'SUBMITTING' ? '...' : `${side.toUpperCase()} ${baseAsset}`}
        </button>
      </div>
    );
  };

  return (
    <div className="bg-[#1E2329] p-3 font-roboto flex flex-col gap-3">
      {/* Type Selection */}
      <div className="flex gap-4 border-b border-white/5 pb-2">
        {['limit', 'market', 'stop_limit'].map((t) => (
          <button
            key={t}
            onClick={() => setType(t as OrderType)}
            className={`text-[11px] font-black transition-all relative uppercase tracking-wider ${type === t ? 'text-primary' : 'text-dark-muted hover:text-white'
              }`}
          >
            {t.replace('_', ' ')}
            {type === t && <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-primary rounded-full shadow-[0_0_8px_#7B61FF]" />}
          </button>
        ))}
      </div>

      {/* Dual Column Form */}
      <div className="flex flex-col md:flex-row gap-6">
        <OrderForm side="buy" />
        <div className="hidden md:block w-px bg-white/5 self-stretch" />
        <OrderForm side="sell" />
      </div>
    </div>
  );
};

export default OrderPanel;