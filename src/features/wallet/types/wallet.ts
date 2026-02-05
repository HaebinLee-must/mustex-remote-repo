export type HistoryStatus = 'PENDING' | 'COMPLETED' | 'FAILED';

export interface Coin {
    symbol: string;
    name: string;
    icon?: string;
    color?: string;
}

export interface Network {
    id: string;
    name: string;
    memoRequired: boolean;
    fee: number;
    minWithdraw: number;
}

export interface Asset {
    coin: Coin;
    total: number;
    available: number;
    inOrder: number;
    btcValue: number;
}

export interface Transaction {
    id: string;
    type: 'DEPOSIT' | 'WITHDRAW';
    coin: string;
    amount: number;
    status: HistoryStatus;
    address: string;
    network: string;
    date: string;
}

export interface WalletSummary {
    estimatedBTC: number;
    estimatedUSD: number;
    todayPnLAmount: number;
    todayPnLPercentage: number;
}
