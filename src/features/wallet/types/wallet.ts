export type HistoryStatus = 'PENDING' | 'COMPLETED' | 'FAILED';

export type DisplayCurrency = 'USD' | 'USDT' | 'BTC' | 'PHP';

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
    change24h?: number;
    usdValue?: number;
}

export interface TransactionDetails {
    txId: string;
    network: string;
    fromAddress?: string;
    toAddress?: string;
    confirmations: number;
    requiredConfirmations: number;
    fee?: number;
    feeAsset?: string;
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
    details?: TransactionDetails;
}

export interface WalletSummary {
    estimatedBTC: number;
    estimatedUSD: number;
    todayPnLAmount: number;
    todayPnLPercentage: number;
}
