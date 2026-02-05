// src/constants/policy.ts
// Defines country-specific policy data for the KYC onboarding flow.
// Reference: docs/instructions/kyc_compliance.md

import { SecurityLevel } from '@/features/auth/AuthContext';

// ============================================
// Security Level & Permission Matrix
// Based on KYC Compliance Document Section 2
// ============================================

export interface LevelConfig {
    level: SecurityLevel;
    state: string;
    permissions: string[];
    uxConstraints: string;
}

export const SECURITY_LEVEL_MATRIX: Record<SecurityLevel, LevelConfig> = {
    0: {
        level: 0,
        state: 'Created',
        permissions: ['login', 'viewMarket'],
        uxConstraints: 'depositAttemptShowsEmailVerificationRequired',
    },
    1: {
        level: 1,
        state: 'Verified',
        permissions: ['login', 'viewMarket', 'depositCrypto'],
        uxConstraints: 'tradeAttemptShowsKycBasicRequired',
    },
    2: {
        level: 2,
        state: 'KYC Basic',
        permissions: ['login', 'viewMarket', 'depositCrypto', 'tradeSpot', 'withdrawBasic'],
        uxConstraints: 'limitReachedShowsAdvancedKycRecommendation',
    },
    3: {
        level: 3,
        state: 'Advanced',
        permissions: ['login', 'viewMarket', 'depositCrypto', 'depositFiat', 'tradeSpot', 'tradeFiat', 'withdrawBasic', 'withdrawAdvanced'],
        uxConstraints: 'allFeaturesUnlocked',
    },
};

// UX Constraint messages for each level
export const UX_CONSTRAINT_MESSAGES = {
    depositAttemptShowsEmailVerificationRequired: {
        title: 'Email Verification Required',
        message: 'Please verify your email address to enable deposits.',
        action: 'Verify Email',
    },
    tradeAttemptShowsKycBasicRequired: {
        title: 'KYC Verification Required',
        message: 'Complete identity verification to start trading.',
        action: 'Start Verification',
    },
    limitReachedShowsAdvancedKycRecommendation: {
        title: 'Upgrade Your Account',
        message: 'Complete advanced verification to increase your withdrawal limits.',
        action: 'Upgrade Now',
    },
    allFeaturesUnlocked: {
        title: 'Full Access',
        message: 'You have access to all trading features.',
        action: null,
    },
};

// Withdrawal limits by security level
export const WITHDRAWAL_LIMITS = {
    0: { daily: 0, monthly: 0 },
    1: { daily: 0, monthly: 0 },
    2: { daily: 2, monthly: 10 }, // BTC equivalent
    3: { daily: 100, monthly: 500 }, // BTC equivalent
};

// Review time estimate for pending status
export const REVIEW_TIME_ESTIMATE = {
    L1_PENDING: '24 hours',
    L2_PENDING: '48 hours',
    L3_PENDING: '72 hours',
};

// ============================================
// Country & Compliance Configuration
// ============================================

export const REGULATED_COUNTRIES = ['EU', 'UK', 'CH', 'AU']; // Example: European Union, United Kingdom, Switzerland, Australia

export const SANCTIONED_COUNTRIES = ['CU', 'IR', 'KP', 'SY']; // Example: Cuba, Iran, North Korea, Syria

export const ID_DOCUMENT_TYPES: Record<string, string[]> = {
    EU: ['Passport', 'National ID Card', 'Residence Permit'],
    UK: ['Passport', 'Driving License', 'Biometric Residence Permit'],
    CH: ['Passport', 'Swiss ID', 'B Permit'],
    AU: ['Passport', 'Driver License', 'Medicare Card'],
    US: ['Passport', 'Driver License'],
    KR: ['Passport', 'Resident Registration Card', 'Driver License'],
    JP: ['Passport', 'My Number Card', 'Driver License'],
    // Add more country-specific document types as needed
    default: ['Passport', 'National ID Card'],
};

export const COUNTRIES = [
    { name: 'Australia', value: 'AU' },
    { name: 'France', value: 'EU' },
    { name: 'Germany', value: 'EU' },
    { name: 'South Korea', value: 'KR' },
    { name: 'Switzerland', value: 'CH' },
    { name: 'United Kingdom', value: 'UK' },
    { name: 'United States', value: 'US' },
    { name: 'Other', value: 'default' },
];

export type KycPolicyKey = keyof typeof KYC_POLICIES;

export const KYC_POLICIES = {
    EU: {
        minAge: 18,
        documentTypes: ID_DOCUMENT_TYPES.EU,
        poaRequired: true,
        additionalVerification: 'Selfie + ID + Proof of Address submission is required.',
    },
    UK: {
        minAge: 18,
        documentTypes: ID_DOCUMENT_TYPES.UK,
        poaRequired: true,
        additionalVerification: 'Selfie + ID + Proof of Address submission is required.',
    },
    CH: { // Switzerland
        minAge: 18,
        documentTypes: ID_DOCUMENT_TYPES.CH,
        poaRequired: true,
        additionalVerification: 'Selfie + ID + Proof of Address submission is required.',
    },
    AU: { // Australia
        minAge: 18,
        documentTypes: ID_DOCUMENT_TYPES.AU,
        poaRequired: true,
        additionalVerification: 'Selfie + ID + Proof of Address submission is required.',
    },
    default: {
        minAge: 18,
        documentTypes: ID_DOCUMENT_TYPES.default,
        poaRequired: false,
        additionalVerification: 'Please prepare your Selfie + ID submission. Proof of Address may be requested if needed.',
    },
};

export const getKycPolicyKeyForCountry = (countryName: string): KycPolicyKey => {
    const country = COUNTRIES.find(c => c.name === countryName);
    return (country?.value as KycPolicyKey) || 'default';
};

// Stepper configuration based on policy
export const getOnboardingSteps = (isPOARequired: boolean) => {
    const baseSteps = [
        { id: 'residence', label: 'Residence', description: 'Select your country of residence.' },
        { id: 'profile', label: 'Profile', description: 'Enter your personal details.' },
        { id: 'nationality', label: 'ID Document', description: 'Select your nationality and ID type.' },
    ];

    if (isPOARequired) {
        baseSteps.push({ id: 'poa', label: 'POA', description: 'Upload your proof of address document.' });
    }

    baseSteps.push(
        { id: 'review', label: 'Review', description: 'Your submitted information is under review.' }
    );

    return baseSteps;
};
