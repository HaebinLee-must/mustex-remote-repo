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
    | 'COUNTRY_SELECTION'
    | 'ID_UPLOAD'
    | 'LIVENESS'
    | 'PERSONAL_INFO'
    | 'ADDRESS_VERIFICATION'
    | 'STATUS_CHECK'
    | 'SECURITY_2FA'
    | 'FEATURE_UNLOCK';

export type DocumentType = 'PASSPORT' | 'ID_CARD' | 'DRIVERS_LICENSE' | 'RESIDENCE_PERMIT';

export interface KYCData {
    residenceCountry: string;
    nationality: string;
    documentType: DocumentType;
    isEU: boolean;
}
