export type VerificationStatus = 'NONE' | 'PENDING' | 'APPROVED' | 'REJECTED';
export type KYCLevel = 0 | 1 | 2;

export interface Entitlements {
    canDeposit: boolean;
    canTrade: boolean;
    canWithdraw: boolean;
    fiatLimit: string;
    cryptoLimit: string;
    requirementForNextLevel: string[];
}

export interface VerificationState {
    currentStep: string;
    status: VerificationStatus;
    level: KYCLevel;
    entitlements: Entitlements;
    policy: {
        requiredSteps: string[];
        isAddressProofRequired: boolean;
    };
}

export type StepId =
    | 'INTRO'
    | 'PERSONAL_INFO'
    | 'ID_UPLOAD'
    | 'LIVENESS'
    | 'ADDRESS_PROOF'
    | 'STATUS_CHECK'
    | 'SECURITY_2FA'
    | 'FEATURE_UNLOCK';
