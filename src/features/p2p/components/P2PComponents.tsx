import React from 'react';
import { Button } from '../../../components/ui/button';
import { CheckCircle2, ShieldCheck, Clock } from 'lucide-react';
import { P2PAd } from '../types';

export const AdvertiserBlock: React.FC<{ ad: P2PAd }> = ({ ad }) => (
    <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold text-xs">
                {ad.avatar}
            </div>
            <div className="flex flex-col">
                <div className="flex items-center gap-1">
                    <span className="font-semibold text-sm hover:text-indigo-400 cursor-pointer transition-colors">
                        {ad.nickname}
                    </span>
                    {ad.isMerchant && (
                        <ShieldCheck className="w-4 h-4 text-yellow-500" />
                    )}
                </div>
                <div className="flex items-center gap-2 text-[10px] text-gray-400">
                    <span>{ad.orders} orders</span>
                    <span className="w-1 h-1 rounded-full bg-gray-600" />
                    <span>{ad.completionRate}% completion</span>
                </div>
            </div>
        </div>
        <div className="flex items-center gap-1 text-[10px] text-gray-500 mt-1">
            <Clock className="w-3 h-3" />
            <span>Avg. {ad.responseTimeMin} mins</span>
        </div>
    </div>
);

export const PriceBlock: React.FC<{ ad: P2PAd }> = ({ ad }) => (
    <div className="flex flex-col">
        <div className="text-lg font-bold text-white flex items-baseline gap-1">
            {ad.price.toLocaleString()}
            <span className="text-xs font-normal text-gray-400">{ad.fiat}</span>
        </div>
    </div>
);

export const LimitBlock: React.FC<{ ad: P2PAd }> = ({ ad }) => (
    <div className="flex flex-col gap-1 text-sm text-gray-300">
        <div className="flex justify-between max-w-[200px]">
            <span className="text-gray-500 text-xs">Available</span>
            <span className="font-medium">{ad.available.toLocaleString()} {ad.asset}</span>
        </div>
        <div className="flex justify-between max-w-[200px]">
            <span className="text-gray-500 text-xs">Limit</span>
            <span className="font-medium">${ad.minLimit.toLocaleString()} - ${ad.maxLimit.toLocaleString()}</span>
        </div>
    </div>
);

export const PaymentTagGroup: React.FC<{ payments: string[] }> = ({ payments }) => (
    <div className="flex flex-wrap gap-1">
        {payments.map((p) => (
            <div key={p} className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-gray-800/50 border border-gray-700">
                <div className="w-1 h-3 bg-yellow-500 rounded-full" />
                <span className="text-[10px] text-gray-300">{p}</span>
            </div>
        ))}
    </div>
);

export const CTAButton: React.FC<{ ad: P2PAd }> = ({ ad }) => (
    <Button
        className={`w-full ${ad.type === 'buy'
                ? 'bg-[#00C087] hover:bg-[#00A876] shadow-lg shadow-emerald-500/10'
                : 'bg-[#F6465D] hover:bg-[#E03F52] shadow-lg shadow-red-500/10'
            } text-white font-bold h-9 text-xs border-none`}
        disabled={ad.requiresVerification}
    >
        {ad.requiresVerification ? 'Verify Identity' : `${ad.type === 'buy' ? 'Buy' : 'Sell'} ${ad.asset}`}
    </Button>
);
