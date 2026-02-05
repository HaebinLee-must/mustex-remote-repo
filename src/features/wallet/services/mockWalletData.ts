import { Asset, Coin, Network, Transaction, WalletSummary } from '../types/wallet';

export const EXCHANGE_RATES = {
    USD_TO_PHP: 56.50,
};

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
    { coin: MOCK_COINS[0], total: 0.0245, available: 0.0245, inOrder: 0, btcValue: 0.0245, change24h: 2.45, usdValue: 1041.25 },
    { coin: MOCK_COINS[2], total: 500.0, available: 500.0, inOrder: 0, btcValue: 0.0117, change24h: 0.01, usdValue: 500.0 },
    { coin: MOCK_COINS[1], total: 0.5, available: 0.45, inOrder: 0.05, btcValue: 0.015, change24h: -1.23, usdValue: 875.50 },
    { coin: MOCK_COINS[3], total: 10.0, available: 10.0, inOrder: 0, btcValue: 0.075, change24h: 5.67, usdValue: 3150.00 },
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
        details: {
            txId: '7f8d9a3b2c1e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a',
            network: 'BTC',
            fromAddress: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
            toAddress: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
            confirmations: 6,
            requiredConfirmations: 6,
            fee: 0.0001,
            feeAsset: 'BTC',
        },
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
        details: {
            txId: 'a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2',
            network: 'TRC20',
            fromAddress: 'TFinora1234567890abcdefghij',
            toAddress: 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t',
            confirmations: 12,
            requiredConfirmations: 20,
            fee: 1,
            feeAsset: 'USDT',
        },
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
        details: {
            txId: 'c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4',
            network: 'ERC20',
            fromAddress: '0x9876543210fedcba9876543210fedcba98765432',
            toAddress: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
            confirmations: 3,
            requiredConfirmations: 12,
            fee: 0.002,
            feeAsset: 'ETH',
        },
    },
];

export const MOCK_SUMMARY: WalletSummary = {
    estimatedBTC: 0.0245,
    estimatedUSD: 1041.25,
    todayPnLAmount: 42.15,
    todayPnLPercentage: 4.22,
};
