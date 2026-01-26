import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VerificationLayout } from './components/VerificationLayout';
import { StepId, KYCData, DocumentType } from './types';
import * as KYC from './screens/KycScreens';
import * as Security from './screens/SecurityAndUnlockScreens';

interface VerificationFlowProps {
    onComplete: () => void;
    onExit: () => void;
}

const VerificationFlow: React.FC<VerificationFlowProps> = ({ onComplete, onExit }) => {
    const [currentStep, setCurrentStep] = useState<StepId>('COUNTRY_SELECTION');
    const [kycData, setKycData] = useState<KYCData>({
        residenceCountry: 'South Korea (대한민국)',
        nationality: 'South Korea (대한민국)',
        documentType: 'ID_CARD',
        isEU: false
    });

    const EU_COUNTRIES = ['Germany', 'France', 'Italy', 'Spain', 'Poland', 'Netherlands'];

    const handleCountryUpdate = (residence: string, nationality: string, docType: DocumentType) => {
        const isEU = EU_COUNTRIES.includes(residence);
        setKycData({
            residenceCountry: residence,
            nationality,
            documentType: docType,
            isEU
        });
    };

    const getFlowSteps = (): StepId[] => {
        const baseSteps: StepId[] = ['COUNTRY_SELECTION', 'ID_UPLOAD', 'LIVENESS'];
        const euSteps: StepId[] = ['PERSONAL_INFO', 'ADDRESS_VERIFICATION'];
        const finalSteps: StepId[] = ['STATUS_CHECK', 'SECURITY_2FA', 'FEATURE_UNLOCK'];

        if (kycData.isEU) {
            return [...baseSteps, ...euSteps, ...finalSteps];
        }
        return [...baseSteps, ...finalSteps];
    };

    const steps = getFlowSteps();

    const handleNext = () => {
        const currentIndex = steps.indexOf(currentStep);
        if (currentIndex < steps.length - 1) {
            setCurrentStep(steps[currentIndex + 1]);
        } else {
            onComplete();
        }
    };

    const handleBack = () => {
        const currentIndex = steps.indexOf(currentStep);
        if (currentIndex > 0) {
            setCurrentStep(steps[currentIndex - 1]);
        }
    };

    const renderStep = () => {
        let stepComponent;
        switch (currentStep) {
            case 'COUNTRY_SELECTION':
                stepComponent = (
                    <KYC.KYC01_Intro
                        onCountrySelect={(res, nat, doc) => {
                            handleCountryUpdate(res, nat, doc);
                        }}
                        onNext={handleNext}
                    />
                );
                break;
            case 'ID_UPLOAD':
                stepComponent = <KYC.KYC03_IdUpload documentType={kycData.documentType} onNext={handleNext} />;
                break;
            case 'LIVENESS':
                stepComponent = <KYC.KYC04_Liveness onNext={handleNext} />;
                break;
            case 'PERSONAL_INFO':
                stepComponent = <KYC.KYC02_PersonalInfo onNext={handleNext} />;
                break;
            case 'ADDRESS_VERIFICATION':
                stepComponent = <KYC.KYC05_ProofOfAddress onNext={handleNext} />;
                break;
            case 'STATUS_CHECK':
                stepComponent = <KYC.KYC06_Status onNext={handleNext} />;
                break;
            case 'SECURITY_2FA':
                stepComponent = <Security.SEC01_Security2FA onNext={handleNext} />;
                break;
            case 'FEATURE_UNLOCK':
                stepComponent = <Security.FEA01_FeatureUnlock onNext={onComplete} />;
                break;
            default:
                stepComponent = null;
        }

        return (
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                    {stepComponent}
                </motion.div>
            </AnimatePresence>
        );
    };

    const getTitle = () => {
        switch (currentStep) {
            case 'COUNTRY_SELECTION': return 'Verify Identity';
            case 'ID_UPLOAD': return 'Identity Document';
            case 'LIVENESS': return 'Face Verification';
            case 'PERSONAL_INFO': return 'Personal Information';
            case 'ADDRESS_VERIFICATION': return 'Address Verification';
            case 'STATUS_CHECK': return 'Verification Pending';
            case 'SECURITY_2FA': return 'Secure Account';
            case 'FEATURE_UNLOCK': return 'Welcome to Mustex';
            default: return '';
        }
    };

    return (
        <VerificationLayout
            currentStep={currentStep}
            onBack={currentStep !== 'COUNTRY_SELECTION' && currentStep !== 'STATUS_CHECK' ? handleBack : undefined}
            onExit={onExit}
            title={getTitle()}
            isEU={kycData.isEU}
            totalSteps={steps.length}
            currentStepIndex={steps.indexOf(currentStep)}
        >
            {renderStep()}
        </VerificationLayout>
    );
};

export default VerificationFlow;
