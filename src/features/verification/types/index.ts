import { KycStatus, SecurityLevel } from '@/features/auth/AuthContext';

export type VerificationStatus = 'NONE' | 'PENDING' | 'APPROVED' | 'REJECTED';
export type KYCLevel = 0 | 1 | 2 | 3;

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

// OnboardingState as defined in KYC Compliance document
export interface OnboardingState {
    currentStep: number;
    residenceCountry: string;      // Policy branch key variable
    isPOARequired: boolean;        // Determined by Compliance Config
    kycStatus: KycStatus;
    securityLevel: SecurityLevel;  // For feature permission control
}

// File upload validation constants
export const FILE_UPLOAD_CONFIG = {
    maxSizeBytes: 5 * 1024 * 1024, // 5MB
    allowedExtensions: ['jpg', 'jpeg', 'png', 'pdf'],
    allowedMimeTypes: ['image/jpeg', 'image/png', 'application/pdf'],
};

// Validate file before upload (Client-Side Pre-Validation)
export const validateFileForUpload = (file: File): { valid: boolean; error?: string } => {
    // Check file size
    if (file.size > FILE_UPLOAD_CONFIG.maxSizeBytes) {
        return { valid: false, error: 'File size exceeds 5MB limit' };
    }

    // Check file extension
    const extension = file.name.split('.').pop()?.toLowerCase();
    if (!extension || !FILE_UPLOAD_CONFIG.allowedExtensions.includes(extension)) {
        return { valid: false, error: 'Only JPG, PNG, and PDF files are allowed' };
    }

    // Check MIME type
    if (!FILE_UPLOAD_CONFIG.allowedMimeTypes.includes(file.type)) {
        return { valid: false, error: 'Invalid file type' };
    }

    return { valid: true };
};

// Age validation (Age Guard)
export const validateAge = (birthDate: Date, minAge: number = 18): { valid: boolean; error?: string } => {
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    const actualAge = monthDiff < 0 || (monthDiff === 0 && dayDiff < 0) ? age - 1 : age;

    if (actualAge < minAge) {
        return { valid: false, error: `You must be at least ${minAge} years old to register` };
    }

    return { valid: true };
};

export type StepId =
    | 'INTRO'
    | 'PERSONAL_INFO'
    | 'ID_UPLOAD'
    | 'LIVENESS'
    | 'ADDRESS_PROOF'
    | 'STATUS_CHECK'
    | 'SECURITY_2FA'
    | 'FEATURE_UNLOCK';
