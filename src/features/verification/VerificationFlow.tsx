import React, { useState } from 'react';
import { VerificationLayout } from './components/VerificationLayout';
import { StepId } from './types';
import * as KYC from './screens/KycScreens';
import * as Security from './screens/SecurityAndUnlockScreens';

interface VerificationFlowProps {
    onComplete: () => void;
}

const VerificationFlow: React.FC<VerificationFlowProps> = ({ onComplete }) => {
    const [currentStep, setCurrentStep] = useState<StepId>('INTRO');

    const renderStep = () => {
        switch (currentStep) {
            case 'INTRO':
                return <KYC.KYC01_Intro onNext={() => setCurrentStep('PERSONAL_INFO')} />;
            case 'PERSONAL_INFO':
                return <KYC.KYC02_PersonalInfo onNext={() => setCurrentStep('ID_UPLOAD')} />;
            case 'ID_UPLOAD':
                return <KYC.KYC03_IdUpload onNext={() => setCurrentStep('LIVENESS')} />;
            case 'LIVENESS':
                return <KYC.KYC04_Liveness onNext={() => setCurrentStep('STATUS_CHECK')} />;
            case 'STATUS_CHECK':
                return <KYC.KYC06_Status onNext={() => setCurrentStep('SECURITY_2FA')} />;
            case 'SECURITY_2FA':
                return <Security.SEC01_Security2FA onNext={() => setCurrentStep('FEATURE_UNLOCK')} />;
            case 'FEATURE_UNLOCK':
                return <Security.FEA01_FeatureUnlock onNext={onComplete} />;
            default:
                return null;
        }
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
        const steps: StepId[] = ['INTRO', 'PERSONAL_INFO', 'ID_UPLOAD', 'LIVENESS', 'STATUS_CHECK', 'SECURITY_2FA', 'FEATURE_UNLOCK'];
        const currentIndex = steps.indexOf(currentStep);
        if (currentIndex > 0) {
            setCurrentStep(steps[currentIndex - 1]);
        }
    };

    return (
        <VerificationLayout
            currentStep={currentStep}
            onBack={currentStep !== 'INTRO' && currentStep !== 'STATUS_CHECK' ? handleBack : undefined}
            title={getTitle()}
        >
            {renderStep()}
        </VerificationLayout>
    );
};

export default VerificationFlow;
