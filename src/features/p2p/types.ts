export interface P2PAd {
    id: string;
    nickname: string;
    avatar: string;
    isMerchant: boolean;
    orders: number;
    completionRate: number;
    responseTimeMin: number;
    price: number;
    available: number;
    minLimit: number;
    maxLimit: number;
    payments: string[];
    requiresVerification: boolean;
    type: 'buy' | 'sell';
    asset: string;
    fiat: string;
}