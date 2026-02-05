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

    const EU_COUNTRIES = ['Germany', 'France']; // Example EU countries
    const isEU = EU_COUNTRIES.includes(selectedCountry);

    const renderStep = () => {
        let stepComponent;
        switch (currentStep) {
            case 'INTRO':
                stepComponent = (
                    <KYC.KYC01_Intro
                        onCountrySelect={(country) => setSelectedCountry(country)}
                        onNext={() => {
                            if (isEU) {
                                setCurrentStep('PERSONAL_INFO');
                            } else {
                                setCurrentStep('ID_UPLOAD');
                            }
                        }}
                    />
                );
                break;
            case 'PERSONAL_INFO':
                stepComponent = <KYC.KYC02_PersonalInfo onNext={() => setCurrentStep('ID_UPLOAD')} />;
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
            case 'INTRO': return 'Verify Identity';
            case 'PERSONAL_INFO': return 'Basic Information';
            case 'ID_UPLOAD': return 'Upload Document';
            case 'LIVENESS': return 'Face Verification';
            case 'STATUS_CHECK': return 'Verification Pending';
            case 'SECURITY_2FA': return 'Secure Account';
            case 'FEATURE_UNLOCK': return 'Welcome to Mustex';
            default: return '';
        }
    };

    const handleBack = () => {
        const steps: StepId[] = ['INTRO', 'PERSONAL_INFO', 'ID_UPLOAD', 'LIVENESS', 'ADDRESS_PROOF', 'STATUS_CHECK', 'SECURITY_2FA', 'FEATURE_UNLOCK'];
        const currentIndex = steps.indexOf(currentStep);

        if (currentIndex > 0) {
            let prevIndex = currentIndex - 1;

            // Skip steps that are not relevant based on isEU
            if (steps[prevIndex] === 'ADDRESS_PROOF' && !isEU) {
                prevIndex--;
            }
            if (steps[prevIndex] === 'PERSONAL_INFO' && !isEU && currentStep === 'ID_UPLOAD') {
                prevIndex = 0; // Directly to INTRO
            }

            setCurrentStep(steps[prevIndex]);
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
