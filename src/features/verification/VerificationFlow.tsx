import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VerificationLayout } from './components/VerificationLayout';
import { StepId } from './types';
import * as KYC from './screens/KycScreens';
import * as Security from './screens/SecurityAndUnlockScreens';

interface VerificationFlowProps {
    onComplete: () => void;
    onExit: () => void;
}

const VerificationFlow: React.FC<VerificationFlowProps> = ({ onComplete, onExit }) => {
    const [currentStep, setCurrentStep] = useState<StepId>('INTRO');
    const [selectedCountry, setSelectedCountry] = useState('South Korea (대한민국)');
    const [selectedDocType, setSelectedDocType] = useState('ID Card');

    const EU_COUNTRIES = ['Germany', 'France']; // Example EU countries
    const isEU = EU_COUNTRIES.includes(selectedCountry);

    const renderStep = () => {
        let stepComponent;
        switch (currentStep) {
            case 'INTRO':
                stepComponent = (
                    <KYC.KYC01_Intro
                        onCountrySelect={(country) => setSelectedCountry(country)}
                        onNext={() => setCurrentStep('DOC_TYPE_SELECT')}
                    />
                );
                break;
            case 'DOC_TYPE_SELECT':
                stepComponent = (
                    <KYC.KYC02_DocTypeSelect
                        selectedCountry={selectedCountry}
                        onDocTypeSelect={(docType) => setSelectedDocType(docType)}
                        onNext={() => setCurrentStep('ID_UPLOAD')}
                    />
                );
                break;
            case 'ID_UPLOAD':
                stepComponent = <KYC.KYC03_IdUpload onNext={() => setCurrentStep('LIVENESS')} />;
                break;
            case 'LIVENESS':
                stepComponent = (
                    <KYC.KYC04_Liveness
                        onNext={() => {
                            if (isEU) {
                                setCurrentStep('ADDRESS_PROOF');
                            } else {
                                setCurrentStep('STATUS_CHECK');
                            }
                        }}
                    />
                );
                break;
            case 'ADDRESS_PROOF':
                stepComponent = <KYC.KYC05_ProofOfAddress onNext={() => setCurrentStep('STATUS_CHECK')} />;
                break;
            case 'STATUS_CHECK':
                stepComponent = <KYC.KYC06_Status onNext={onExit} />;
                break;
            case 'SECURITY_2FA':
                stepComponent = <Security.SEC01_Security2FA onNext={() => setCurrentStep('FEATURE_UNLOCK')} />;
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
            case 'INTRO': return 'Personal Information';
            case 'DOC_TYPE_SELECT': return 'Select Document Type';
            case 'ID_UPLOAD': return `Upload ${selectedDocType}`;
            case 'LIVENESS': return 'Face Verification';
            case 'ADDRESS_PROOF': return 'Proof of Address';
            case 'STATUS_CHECK': return 'Verification Pending';
            case 'SECURITY_2FA': return 'Secure Account';
            case 'FEATURE_UNLOCK': return 'Welcome to Finora';
            default: return '';
        }
    };

    const handleBack = () => {
        switch (currentStep) {
            case 'DOC_TYPE_SELECT':
                setCurrentStep('INTRO');
                break;
            case 'ID_UPLOAD':
                setCurrentStep('DOC_TYPE_SELECT');
                break;
            case 'LIVENESS':
                setCurrentStep('ID_UPLOAD');
                break;
            case 'ADDRESS_PROOF':
                setCurrentStep('LIVENESS');
                break;
            case 'STATUS_CHECK':
                if (isEU) {
                    setCurrentStep('ADDRESS_PROOF');
                } else {
                    setCurrentStep('LIVENESS');
                }
                break;
            default:
                break;
        }
    };

    return (
        <VerificationLayout
            currentStep={currentStep}
            onBack={currentStep === 'INTRO' ? onExit : handleBack}
            onExit={onExit}
            title={getTitle()}
            isEU={isEU}
        >
            {renderStep()}
        </VerificationLayout>
    );
};

export default VerificationFlow;
