import React, { createContext, useContext, useState, ReactNode } from 'react';

// KYC Status based on compliance document
export type KycStatus = 'L0' | 'L1_PENDING' | 'L1_APPROVED' | 'L2_PENDING' | 'L2_APPROVED' | 'L3_PENDING' | 'L3_APPROVED' | 'REJECTED';

// Security Level: 0=Created, 1=Verified, 2=KYC Basic, 3=Advanced
export type SecurityLevel = 0 | 1 | 2 | 3;

export interface User {
    email: string;
    uid: string; // Add uid to User interface
    profilePicture?: string; // Add profilePicture to User interface
    kycStatus: KycStatus;
    securityLevel: SecurityLevel;
    residenceCountry?: string;
    isPOARequired?: boolean;
}

// Permission matrix based on security level
export interface Permissions {
    canViewMarket: boolean;
    canDeposit: boolean;
    canTrade: boolean;
    canWithdrawBasic: boolean;
    canWithdrawAdvanced: boolean;
    canUseFiat: boolean;
}

export const getPermissions = (level: SecurityLevel): Permissions => {
    switch (level) {
        case 0: // Created - Email not verified
            return {
                canViewMarket: true,
                canDeposit: false,
                canTrade: false,
                canWithdrawBasic: false,
                canWithdrawAdvanced: false,
                canUseFiat: false,
            };
        case 1: // Verified - Email verified, can deposit crypto
            return {
                canViewMarket: true,
                canDeposit: true,
                canTrade: false,
                canWithdrawBasic: false,
                canWithdrawAdvanced: false,
                canUseFiat: false,
            };
        case 2: // KYC Basic - Can trade and basic withdraw
            return {
                canViewMarket: true,
                canDeposit: true,
                canTrade: true,
                canWithdrawBasic: true,
                canWithdrawAdvanced: false,
                canUseFiat: false,
            };
        case 3: // Advanced - Full access including fiat
            return {
                canViewMarket: true,
                canDeposit: true,
                canTrade: true,
                canWithdrawBasic: true,
                canWithdrawAdvanced: true,
                canUseFiat: true,
            };
        default:
            return {
                canViewMarket: true,
                canDeposit: false,
                canTrade: false,
                canWithdrawBasic: false,
                canWithdrawAdvanced: false,
                canUseFiat: false,
            };
    }
};

// Get security level from KYC status
export const getSecurityLevelFromKycStatus = (status: KycStatus): SecurityLevel => {
    switch (status) {
        case 'L0':
            return 0;
        case 'L1_PENDING':
        case 'L1_APPROVED':
            return 1;
        case 'L2_PENDING':
        case 'L2_APPROVED':
            return 2;
        case 'L3_PENDING':
        case 'L3_APPROVED':
            return 3;
        case 'REJECTED':
            return 0;
        default:
            return 0;
    }
};

interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    permissions: Permissions;
    login: (userData: Partial<User> & { email: string; uid: string }) => void; // Update login signature
    signup: (userData: Partial<User> & { email: string; uid: string }) => void; // Update signup signature
    logout: () => void;
    updateKycStatus: (status: KycStatus) => void;
    setResidenceCountry: (country: string, isPOARequired: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    const permissions = user ? getPermissions(user.securityLevel) : getPermissions(0);

    const login = (userData: Partial<User> & { email: string; uid: string }) => { // Update login to require uid
        setIsAuthenticated(true);
        const kycStatus = userData.kycStatus || 'L0';
        setUser({
            securityLevel: getSecurityLevelFromKycStatus(kycStatus),
            kycStatus,
            profilePicture: userData.profilePicture || `https://api.dicebear.com/8.x/initials/svg?seed=${userData.email}`, // Default profile picture
            ...userData
        } as User);
    };

    const signup = (userData: Partial<User> & { email: string; uid: string }) => { // Update signup to require uid
        setIsAuthenticated(true);
        setUser({
            kycStatus: 'L0',
            securityLevel: 0,
            profilePicture: userData.profilePicture || `https://api.dicebear.com/8.x/initials/svg?seed=${userData.email}`, // Default profile picture
            ...userData
        } as User);
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
    };

    const updateKycStatus = (status: KycStatus) => {
        if (user) {
            setUser({
                ...user,
                kycStatus: status,
                securityLevel: getSecurityLevelFromKycStatus(status),
            });
        }
    };

    const setResidenceCountry = (country: string, isPOARequired: boolean) => {
        if (user) {
            setUser({
                ...user,
                residenceCountry: country,
                isPOARequired,
            });
        }
    };

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            user,
            permissions,
            login,
            signup,
            logout,
            updateKycStatus,
            setResidenceCountry,
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
