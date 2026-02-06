import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Eye, EyeOff, ShieldCheck, AlertTriangle } from 'lucide-react';

interface AccountOverviewProps {
    accountStateLevel: number; // e.g., 0-4
    kycStatus: 'Unverified' | 'Pending' | 'Verified';
    kycProgress: number; // 0-100
    restrictionReason?: string; // Optional: reason for restricted access
    onDepositClick: () => void;
    onWithdrawClick: () => void;
}

const AccountOverview: React.FC<AccountOverviewProps> = ({
    accountStateLevel,
    kycStatus,
    kycProgress,
    restrictionReason,
    onDepositClick,
    onWithdrawClick,
}) => {
    // Determine badge color and text for KYC status
    const getKycBadge = () => {
        switch (kycStatus) {
            case 'Verified':
                return <Badge variant="success" className="bg-green-500/20 text-green-400 border-green-500"><ShieldCheck className="h-4 w-4 mr-1" /> Verified</Badge>;
            case 'Pending':
                return <Badge variant="warning" className="bg-yellow-500/20 text-yellow-400 border-yellow-500"><AlertTriangle className="h-4 w-4 mr-1" /> Pending</Badge>;
            case 'Unverified':
            default:
                return <Badge variant="destructive" className="bg-red-500/20 text-red-400 border-red-500"><AlertTriangle className="h-4 w-4 mr-1" /> Unverified</Badge>;
        }
    };

    return (
        <Card className="relative overflow-hidden rounded-[32px] border-white/10 bg-white/10 shadow-2xl backdrop-blur-2xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-bold text-white">Account Overview</CardTitle>
                {getKycBadge()}
            </CardHeader>
            <CardContent>
                <div className="text-gray-400 text-sm mb-4">
                    Your current account state level: <span className="font-bold text-white">Level {accountStateLevel}</span>
                </div>
                {kycStatus !== 'Verified' && (
                    <div className="mb-4">
                        <p className="text-gray-400 text-sm mb-2">KYC Progress: {kycProgress}% Complete</p>
                        <Progress value={kycProgress} className="h-2 bg-white/10" />
                    </div>
                )}

                {restrictionReason && (
                    <div className="bg-red-500/10 text-red-400 p-3 rounded-lg text-sm mb-4 flex items-center">
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        <p>{restrictionReason}</p>
                    </div>
                )}

                <div className="flex justify-end space-x-2 mt-4">
                    <button
                        onClick={onDepositClick}
                        className="flex-1 rounded-lg bg-[#5e5ce6] py-3 text-sm font-bold text-white hover:bg-[#4b4ac2]"
                    >
                        Deposit
                    </button>
                    <button
                        onClick={onWithdrawClick}
                        className="flex-1 rounded-lg bg-gray-700 py-3 text-sm font-bold text-white hover:bg-gray-600"
                    >
                        Withdraw
                    </button>
                </div>
            </CardContent>
        </Card>
    );
};

export default AccountOverview;