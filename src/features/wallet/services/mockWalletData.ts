import { Asset, Coin, Network, Transaction, WalletSummary } from '../types/wallet';

export const MOCK_COINS: Coin[] = [
    { symbol: 'BTC', name: 'Bitcoin', color: '#F7931A' },
    { symbol: 'ETH', name: 'Ethereum', color: '#627EEA' },
    { symbol: 'USDT', name: 'TetherUS', color: '#26A17B' },
    { symbol: 'BNB', name: 'BNB', color: '#F3BA2F' },
    { symbol: 'SOL', name: 'Solana', color: '#14F195' },
    { symbol: 'XRP', name: 'XRP', color: '#23292F' },
];

export const MOCK_NETWORKS: Record<string, Network[]> = {
    BTC: [
        { id: 'btc', name: 'BTC', memoRequired: false, fee: 0.0005, minWithdraw: 0.001 },
        { id: 'bep20', name: 'BEP20 (BSC)', memoRequired: false, fee: 0.00001, minWithdraw: 0.0001 },
    ],
    ETH: [
        { id: 'erc20', name: 'ERC20', memoRequired: false, fee: 0.002, minWithdraw: 0.01 },
        { id: 'arbitrum', name: 'Arbitrum One', memoRequired: false, fee: 0.0001, minWithdraw: 0.001 },
    ],
    USDT: [
        { id: 'trx', name: 'TRC20', memoRequired: false, fee: 1, minWithdraw: 10 },
        { id: 'erc20', name: 'ERC20', memoRequired: false, fee: 5, minWithdraw: 20 },
        { id: 'bep20', name: 'BEP20 (BSC)', memoRequired: false, fee: 0.5, minWithdraw: 5 },
    ],
};

export const MOCK_ASSETS: Asset[] = [
    { coin: MOCK_COINS[0], total: 0.0245, available: 0.0245, inOrder: 0, btcValue: 0.0245 },
    { coin: MOCK_COINS[2], total: 500.0, available: 500.0, inOrder: 0, btcValue: 0.0117 },
    { coin: MOCK_COINS[1], total: 0.5, available: 0.45, inOrder: 0.05, btcValue: 0.015 },
    { coin: MOCK_COINS[3], total: 10.0, available: 10.0, inOrder: 0, btcValue: 0.075 },
];

export const MOCK_HISTORY: Transaction[] = [
    {
        id: '1',
        type: 'DEPOSIT',
        coin: 'BTC',
        amount: 0.005,
        status: 'COMPLETED',
        address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
        network: 'BTC',
        date: '2024-01-20 14:20:01',
    },
    {
        id: '2',
        type: 'WITHDRAW',
        coin: 'USDT',
        amount: 100,
        status: 'PENDING',
        address: 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t',
        network: 'TRC20',
        date: '2024-01-22 09:15:45',
    },
    {
        id: '3',
        type: 'DEPOSIT',
        coin: 'ETH',
        amount: 0.2,
        status: 'FAILED',
        address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
        network: 'ERC20',
        date: '2024-01-18 22:10:12',
    },
];

export const MOCK_SUMMARY: WalletSummary = {
    estimatedBTC: 0.0245,
    estimatedUSD: 1041.25,
    todayPnLAmount: 42.15,
    todayPnLPercentage: 4.22,
};
