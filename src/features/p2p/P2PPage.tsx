import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '../../components/ui/table';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import {
    AdvertiserBlock,
    PriceBlock,
    LimitBlock,
    PaymentTagGroup,
    CTAButton
} from './components/P2PComponents';
import { mockAds } from './mockData';
import { Search, Filter, ChevronDown, RefreshCcw } from 'lucide-react';
import P2PEntryNoticeModal from './components/P2PEntryNoticeModal';
import { useEffect } from 'react';

const ASSETS = ['USDT', 'BTC', 'USDC', 'FDUSD', 'BNB', 'ETH', 'DAI'];
const STORAGE_KEY = 'finora.p2p.entryNotice.v1.accepted';

const P2PPage: React.FC = () => {
    const [type, setType] = useState<'buy' | 'sell'>('buy');
    const [selectedAsset, setSelectedAsset] = useState('USDT');
    const [searchAmount, setSearchAmount] = useState('');
    const [showNotice, setShowNotice] = useState(false);

    useEffect(() => {
        const isAccepted = localStorage.getItem(STORAGE_KEY);
        if (!isAccepted) {
            setShowNotice(true);
        }
    }, []);

    const handleAgree = () => {
        localStorage.setItem(STORAGE_KEY, 'true');
        setShowNotice(false);
    };

    const filteredAds = mockAds.filter(ad => ad.type === type && ad.asset === selectedAsset);

    return (
        <div className="max-w-7xl w-full mx-auto p-4 md:p-8 space-y-8 min-h-screen bg-[#0B0E11]">
            <P2PEntryNoticeModal
                isOpen={showNotice}
                onClose={() => setShowNotice(false)}
                onAgree={handleAgree}
            />

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <h1 className="text-3xl font-extrabold text-white tracking-tight">P2P Market</h1>
                    <div className="px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-bold text-indigo-400 uppercase tracking-wider">
                        Zero Fees
                    </div>
                </div>
                <div className="hidden md:flex items-center gap-2 text-sm font-bold text-[#848E9C]">
                    <span className="w-2 h-2 rounded-full bg-[#00C087] animate-pulse" />
                    Live Ad Feed
                </div>
            </div>

            {/* Control Bar */}
            <div className="bg-[#1E2329] border border-[#2B3139] rounded-2xl shadow-xl overflow-hidden">
                {/* Secondary Header / Toggles Area */}
                <div className="p-6 border-b border-[#2B3139]">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                            {/* Buy/Sell Toggle */}
                            <div className="flex bg-[#0B0E11] p-1 rounded-lg border border-[#2B3139] w-full sm:w-auto">
                                <button
                                    onClick={() => setType('buy')}
                                    className={`flex-1 sm:flex-none px-6 py-1.5 rounded text-sm font-bold transition-all active:scale-95 ${type === 'buy' ? 'bg-[#00C087] text-white shadow-lg shadow-emerald-500/10' : 'text-[#848E9C] hover:text-white'}`}
                                >
                                    Buy
                                </button>
                                <button
                                    onClick={() => setType('sell')}
                                    className={`flex-1 sm:flex-none px-6 py-1.5 rounded text-sm font-bold transition-all active:scale-95 ${type === 'sell' ? 'bg-[#F6465D] text-white shadow-lg shadow-red-500/10' : 'text-[#848E9C] hover:text-white'}`}
                                >
                                    Sell
                                </button>
                            </div>

                            {/* Assets */}
                            <div className="flex items-center gap-1 overflow-x-auto pb-2 sm:pb-0 no-scrollbar w-full sm:w-auto border-t sm:border-t-0 border-[#2B3139] pt-2 sm:pt-0">
                                {ASSETS.map(asset => (
                                    <button
                                        key={asset}
                                        onClick={() => setSelectedAsset(asset)}
                                        className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all whitespace-nowrap active:scale-95 ${selectedAsset === asset ? 'bg-indigo-500/10 text-indigo-400' : 'text-[#848E9C] hover:text-white hover:bg-white/5'}`}
                                    >
                                        {asset}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filter & Search Area */}
                <div className="px-6 py-4 bg-[#161A1E]/30">
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="relative min-w-[240px] flex-1 lg:flex-none lg:w-[280px]">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#848E9C]">
                                <Search className="w-3.5 h-3.5" />
                            </span>
                            <Input
                                placeholder="Amount to search..."
                                className="bg-[#0B0E11] border-[#2B3139] h-10 rounded-lg pl-9 pr-14 text-xs font-bold focus:ring-[#6366F1] transition-all"
                                value={searchAmount}
                                onChange={(e) => setSearchAmount(e.target.value)}
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#848E9C] text-[10px] font-black border-l border-[#2B3139] pl-3">
                                USD
                            </div>
                        </div>

                        <div className="flex items-center gap-2 ml-auto w-full lg:w-auto">
                            <Button variant="outline" className="flex-1 lg:flex-none bg-[#0B0E11] border-[#2B3139] text-[#EAECEF] hover:bg-[#1E2329] h-10 rounded-lg text-[11px] font-bold gap-2 px-4 active:scale-95">
                                Payment Method <ChevronDown className="w-3 h-3 text-[#848E9C]" />
                            </Button>

                            <Button variant="outline" className="bg-[#0B0E11] border-[#2B3139] text-[#EAECEF] hover:bg-[#1E2329] h-10 w-10 rounded-lg p-0 flex items-center justify-center active:scale-95">
                                <RefreshCcw className="w-3.5 h-3.5 text-[#848E9C]" />
                            </Button>

                            <Button variant="outline" className="bg-[#0B0E11] border-[#2B3139] text-[#EAECEF] hover:bg-[#1E2329] h-10 rounded-lg text-[11px] font-bold gap-2 px-4 active:scale-95">
                                <Filter className="w-3.5 h-3.5 text-[#848E9C]" /> Filters
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Advertisement List */}
            <div className="bg-[#1E2329] border border-[#2B3139] rounded-2xl overflow-hidden shadow-xl">
                {/* Desktop View */}
                <div className="hidden md:block">
                    <Table>
                        <TableHeader className="bg-[#161A1E]">
                            <TableRow className="border-gray-800 hover:bg-transparent">
                                <TableHead className="text-gray-500 font-medium">Advertiser</TableHead>
                                <TableHead className="text-gray-500 font-medium text-right">Price</TableHead>
                                <TableHead className="text-gray-500 font-medium">Available/Limit</TableHead>
                                <TableHead className="text-gray-500 font-medium">Payment</TableHead>
                                <TableHead className="text-gray-500 font-medium text-right">Trade</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredAds.map(ad => (
                                <TableRow key={ad.id} className="border-[#2B3139] hover:bg-[#2B3139]/30 transition-colors group">
                                    <TableCell className="py-6 align-middle px-6">
                                        <AdvertiserBlock ad={ad} />
                                    </TableCell>
                                    <TableCell className="py-6 align-middle text-right px-6">
                                        <PriceBlock ad={ad} />
                                    </TableCell>
                                    <TableCell className="py-6 align-middle px-6">
                                        <LimitBlock ad={ad} />
                                    </TableCell>
                                    <TableCell className="py-6 align-middle px-6">
                                        <PaymentTagGroup payments={ad.payments} />
                                    </TableCell>
                                    <TableCell className="py-6 align-middle text-right px-6">
                                        <div className="w-full max-w-[160px] ml-auto opacity-90 group-hover:opacity-100 transition-opacity">
                                            <CTAButton ad={ad} />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {/* Mobile View */}
                <div className="md:hidden flex flex-col divide-y divide-gray-800">
                    {filteredAds.map(ad => (
                        <div key={ad.id} className="p-4 flex flex-col gap-4">
                            <div className="flex justify-between items-start">
                                <AdvertiserBlock ad={ad} />
                                <PriceBlock ad={ad} />
                            </div>
                            <LimitBlock ad={ad} />
                            <div className="flex flex-col gap-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-xs text-gray-500">Payment Methods</span>
                                    <PaymentTagGroup payments={ad.payments} />
                                </div>
                                <CTAButton ad={ad} />
                            </div>
                        </div>
                    ))}
                </div>

                {filteredAds.length === 0 && (
                    <div className="p-12 flex flex-col items-center justify-center text-gray-500 gap-2">
                        <Search className="w-12 h-12 opacity-20" />
                        <p>No advertisements found for the selected criteria.</p>
                    </div>
                )}
            </div>

            {/* Notice */}
            <div className="mt-4 p-4 rounded-lg bg-indigo-500/5 border border-indigo-500/10">
                <h4 className="text-sm font-bold text-indigo-400 mb-1">P2P Trading Risk Notice</h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                    P2P trading involves risks. Please ensure you follow the safety guidelines.
                    Never release cryptocurrency before confirming receipt of payment in your bank account.
                    MUSTEX will never ask you to release funds manually via chat.
                </p>
            </div>
        </div>
    );
};

export default P2PPage;