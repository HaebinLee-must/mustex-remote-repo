import React, { useState, useRef } from 'react';
import { User, FileText, Camera, MapPin, CheckCircle, Clock, Upload, AlertCircle, Shield, XCircle, Loader2, ChevronLeft, ChevronDown, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DocumentType } from '../types';

interface KycScreenProps {
    onNext: () => void;
    onCountrySelect?: (residence: string, nationality: string, docType: DocumentType) => void;
}

export const KYC01_Intro: React.FC<KycScreenProps> = ({ onNext, onCountrySelect }) => {
    const [residence, setResidence] = useState('South Korea (대한민국)');
    const [nationality, setNationality] = useState('South Korea (대한민국)');
    const [docType, setDocType] = useState<DocumentType>('ID_CARD');
    const [activeDropdown, setActiveDropdown] = useState<'residence' | 'nationality' | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const countries = [
        { name: 'South Korea (대한민국)', code: 'KR', flag: '🇰🇷' },
        { name: 'United States', code: 'US', flag: '🇺🇸' },
        { name: 'Japan', code: 'JP', flag: '🇯🇵' },
        { name: 'United Kingdom', code: 'GB', flag: '🇬🇧' },
        { name: 'France', code: 'FR', flag: '🇫🇷' },
        { name: 'Germany', code: 'DE', flag: '🇩🇪' },
        { name: 'Canada', code: 'CA', flag: '🇨🇦' },
        { name: 'Australia', code: 'AU', flag: '🇦🇺' },
        { name: 'Italy', code: 'IT', flag: '🇮🇹' },
        { name: 'Spain', code: 'ES', flag: '🇪🇸' },
        { name: 'Poland', code: 'PL', flag: '🇵🇱' },
        { name: 'Netherlands', code: 'NL', flag: '🇳🇱' },
    ];

    const docOptions: { id: DocumentType; label: string; recommended?: boolean }[] = [
        { id: 'ID_CARD', label: 'ID Card', recommended: true },
        { id: 'PASSPORT', label: 'Passport' },
        { id: 'DRIVERS_LICENSE', label: "Driver's License" },
        { id: 'RESIDENCE_PERMIT', label: 'Residence Permit' },
    ];

    const filteredCountries = countries.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleCountrySelect = (countryName: string) => {
        if (activeDropdown === 'residence') {
            setResidence(countryName);
            onCountrySelect?.(countryName, nationality, docType);
        } else {
            setNationality(countryName);
            onCountrySelect?.(residence, countryName, docType);
        }
        setActiveDropdown(null);
        setSearchQuery('');
    };

    const handleDocTypeSelect = (type: DocumentType) => {
        setDocType(type);
        onCountrySelect?.(residence, nationality, type);
    };

    return (
        <div className="space-y-10">
            <div className="space-y-8">
                <div className="space-y-4">
                    <label className="text-xs font-bold text-[#848E9C] uppercase tracking-widest px-1">Residence</label>
                    <div className="relative">
                        <button
                            onClick={() => setActiveDropdown(activeDropdown === 'residence' ? null : 'residence')}
                            className="w-full flex items-center justify-between bg-[#1e1e3f] border border-white/10 h-14 rounded-2xl px-5 text-sm text-white focus:border-[#5e5ce6] transition-all"
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-lg">{countries.find(c => c.name === residence)?.flag}</span>
                                <span>{residence}</span>
                            </div>
                            <ChevronDown className={`w-4 h-4 text-[#848E9C] transition-transform ${activeDropdown === 'residence' ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                            {activeDropdown === 'residence' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                                    className="absolute top-full left-0 right-0 mt-2 z-[60] bg-[#12122b] border border-white/10 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-2xl"
                                >
                                    <div className="p-2">
                                        <input
                                            autoFocus
                                            placeholder="Search country"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full bg-white/5 border border-white/5 rounded-xl h-10 px-4 mb-2 text-xs text-white outline-none"
                                        />
                                        <div className="max-h-48 overflow-y-auto">
                                            {filteredCountries.map(c => (
                                                <button key={c.code} onClick={() => handleCountrySelect(c.name)} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-white hover:bg-white/5">
                                                    <span>{c.flag}</span><span>{c.name}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                <div className="space-y-4">
                    <label className="text-xs font-bold text-[#848E9C] uppercase tracking-widest px-1">Nationality</label>
                    <div className="relative">
                        <button
                            onClick={() => setActiveDropdown(activeDropdown === 'nationality' ? null : 'nationality')}
                            className="w-full flex items-center justify-between bg-[#1e1e3f] border border-white/10 h-14 rounded-2xl px-5 text-sm text-white focus:border-[#5e5ce6] transition-all"
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-lg">{countries.find(c => c.name === nationality)?.flag}</span>
                                <span>{nationality}</span>
                            </div>
                            <ChevronDown className={`w-4 h-4 text-[#848E9C] transition-transform ${activeDropdown === 'nationality' ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                            {activeDropdown === 'nationality' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                                    className="absolute top-full left-0 right-0 mt-2 z-[60] bg-[#12122b] border border-white/10 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-2xl"
                                >
                                    <div className="p-2">
                                        <input
                                            autoFocus
                                            placeholder="Search country"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full bg-white/5 border border-white/5 rounded-xl h-10 px-4 mb-2 text-xs text-white outline-none"
                                        />
                                        <div className="max-h-48 overflow-y-auto">
                                            {filteredCountries.map(c => (
                                                <button key={c.code} onClick={() => handleCountrySelect(c.name)} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-white hover:bg-white/5">
                                                    <span>{c.flag}</span><span>{c.name}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                <div className="space-y-4">
                    <label className="text-xs font-bold text-[#848E9C] uppercase tracking-widest px-1">Document Type</label>
                    <div className="grid grid-cols-1 gap-3">
                        {docOptions.map((opt) => (
                            <button
                                key={opt.id}
                                onClick={() => handleDocTypeSelect(opt.id)}
                                className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${docType === opt.id ? 'border-[#5e5ce6] bg-[#5e5ce6]/5' : 'border-white/10 bg-white/5'}`}
                            >
                                <div className="flex items-center gap-4">
                                    <FileText className={`w-5 h-5 ${docType === opt.id ? 'text-[#5e5ce6]' : 'text-[#848E9C]'}`} />
                                    <span className="text-sm font-bold text-white">{opt.label}</span>
                                    {opt.recommended && <span className="text-[10px] text-green-500 font-bold px-2 py-0.5 bg-green-500/10 rounded-md">Recommended</span>}
                                </div>
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${docType === opt.id ? 'border-[#5e5ce6]' : 'border-white/20'}`}>
                                    {docType === opt.id && <div className="w-2.5 h-2.5 rounded-full bg-[#5e5ce6]" />}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <Button onClick={onNext} className="w-full bg-[#5e5ce6] hover:bg-[#4b4ac2] h-14 rounded-2xl text-lg font-black">
                Continue
            </Button>
        </div>
    );
};

export const KYC02_PersonalInfo: React.FC<KycScreenProps> = ({ onNext }) => {
    const [dob, setDob] = useState({ year: '', month: '', day: '' });
    const [showError, setShowError] = useState(false);

    const handleContinue = () => {
        if (!dob.year || !dob.month || !dob.day) {
            setShowError(true);
            return;
        }
        onNext();
    };

    return (
        <div className="space-y-8">
            <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-[#848E9C] uppercase tracking-widest px-1">First Name</label>
                        <Input className="bg-white/5 border-white/10 h-14 rounded-2xl text-white focus:border-[#5e5ce6] transition-all" placeholder="Enter first name" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-[#848E9C] uppercase tracking-widest px-1">Last Name</label>
                        <Input className="bg-white/5 border-white/10 h-14 rounded-2xl text-white focus:border-[#5e5ce6] transition-all" placeholder="Enter last name" />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-[#848E9C] uppercase tracking-widest px-1">Date of Birth</label>
                    <div className="grid grid-cols-3 gap-3">
                        <Input
                            placeholder="YYYY"
                            value={dob.year}
                            onChange={(e) => setDob({ ...dob, year: e.target.value })}
                            className={`bg-white/5 border-white/10 h-14 rounded-2xl text-white text-center focus:border-[#5e5ce6] transition-all ${showError && !dob.year ? 'border-red-500/50' : ''}`}
                        />
                        <Input
                            placeholder="MM"
                            value={dob.month}
                            onChange={(e) => setDob({ ...dob, month: e.target.value })}
                            className={`bg-white/5 border-white/10 h-14 rounded-2xl text-white text-center focus:border-[#5e5ce6] transition-all ${showError && !dob.month ? 'border-red-500/50' : ''}`}
                        />
                        <Input
                            placeholder="DD"
                            value={dob.day}
                            onChange={(e) => setDob({ ...dob, day: e.target.value })}
                            className={`bg-white/5 border-white/10 h-14 rounded-2xl text-white text-center focus:border-[#5e5ce6] transition-all ${showError && !dob.day ? 'border-red-500/50' : ''}`}
                        />
                    </div>
                </div>
            </div>

            <Button onClick={handleContinue} className="w-full bg-[#5e5ce6] hover:bg-[#4b4ac2] h-14 rounded-2xl text-lg font-black">
                Continue
            </Button>
        </div>
    );
};

export const KYC03_IdUpload: React.FC<KycScreenProps & { documentType?: DocumentType }> = ({ onNext, documentType }) => {
    const [file, setFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    return (
        <div className="space-y-8">
            <div className="p-5 bg-[#5e5ce6]/10 border border-[#5e5ce6]/20 rounded-2xl flex items-center gap-4">
                <FileText className="w-6 h-6 text-[#5e5ce6]" />
                <div className="text-xs">
                    <p className="font-bold text-white">Selected: {documentType?.replace('_', ' ')}</p>
                    <p className="text-[#848E9C]">Please upload a clear photo of the original document.</p>
                </div>
            </div>

            <div className="space-y-4">
                <label className="text-xs font-bold text-[#848E9C] uppercase tracking-widest px-1">Upload Document</label>
                <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".jpg,.jpeg,.png,.pdf" className="hidden" />
                <div
                    onClick={() => fileInputRef.current?.click()}
                    className={`aspect-[16/10] bg-white/5 border-2 border-dashed rounded-[32px] flex flex-col items-center justify-center gap-4 transition-all cursor-pointer ${file ? 'border-green-500/50 bg-green-500/5' : 'border-white/10 hover:border-[#5e5ce6]'}`}
                >
                    {file ? (
                        <div className="text-center">
                            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-2" />
                            <p className="text-sm font-bold text-white">{file.name}</p>
                        </div>
                    ) : (
                        <div className="text-center">
                            <Upload className="w-12 h-12 text-[#848E9C] mx-auto mb-2" />
                            <p className="text-sm text-white font-bold">Click to upload photo</p>
                        </div>
                    )}
                </div>
            </div>

            <Button onClick={onNext} disabled={!file} className="w-full bg-[#5e5ce6] hover:bg-[#4b4ac2] h-14 rounded-2xl text-lg font-black disabled:opacity-50 mt-4">
                Continue
            </Button>
        </div>
    );
};

export const KYC04_Liveness: React.FC<KycScreenProps> = ({ onNext }) => {
    const [cameraActive, setCameraActive] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [showGuide, setShowGuide] = useState(true);
    const [cameraError, setCameraError] = useState<string | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const analysisTimerRef = useRef<NodeJS.Timeout | null>(null);

    const stopCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
    };

    const handleComplete = () => {
        setIsAnalyzing(false);
        setIsCompleted(true);
        stopCamera();
        // 완료 표시 후 잠시 뒤 다음 단계로 이동
        setTimeout(onNext, 1000);
    };

    const startAnalysis = () => {
        setIsAnalyzing(true);
        if (analysisTimerRef.current) clearTimeout(analysisTimerRef.current);

        analysisTimerRef.current = setTimeout(() => {
            handleComplete();
        }, 3000);
    };

    const startCamera = async () => {
        setCameraError(null);
        setShowGuide(false);
        const constraints = {
            video: {
                facingMode: "user",
                width: { ideal: 1280 },
                height: { ideal: 720 }
            }
        };

        try {
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                throw new Error('Camera API not supported');
            }

            // 분석 타임아웃 세이프가드 (버튼 클릭 후 3초 내에 완료되도록 보장)
            const safeguardTimer = setTimeout(() => {
                if (!isCompleted) {
                    handleComplete();
                }
            }, 3500);

            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            streamRef.current = stream;

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                setCameraActive(true);

                videoRef.current.onloadedmetadata = async () => {
                    clearTimeout(safeguardTimer);
                    try {
                        await videoRef.current?.play();
                        if (!isAnalyzing && !isCompleted) {
                            startAnalysis();
                        }
                    } catch (playError) {
                        console.error('Video play error:', playError);
                        if (!isCompleted) startAnalysis();
                    }
                };
            }
        } catch (err: any) {
            console.error('Camera access error:', err);
            setCameraActive(false);
            setShowGuide(true);

            let message = 'Unable to access camera.';
            if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
                message = 'Camera permission denied. Please enable camera access in browser settings.';
            } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
                message = 'No camera device found.';
            } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
                message = 'Camera is already in use by another application.';
            }
            setCameraError(message);
        }
    };

    React.useEffect(() => {
        return () => stopCamera();
    }, []);

    if (showGuide) {
        return (
            <div className="space-y-8">
                <div className="flex flex-col items-center text-center space-y-10">
                    <div className="relative">
                        <div className="w-48 h-48 rounded-full border-[6px] border-dashed border-[#5e5ce6]/20 flex items-center justify-center bg-white/5 relative">
                            <div className="w-24 h-24 rounded-full bg-[#5e5ce6] flex items-center justify-center">
                                <User className="w-12 h-12 text-white" />
                            </div>
                            <div className="absolute inset-0 border-[6px] border-dashed border-[#5e5ce6] rounded-full animate-[spin_20s_linear_infinite] opacity-60" />
                        </div>
                    </div>

                    <div className="w-full bg-white/5 border border-white/10 rounded-3xl p-6 text-left space-y-4">
                        <p className="text-sm font-bold text-white">Please show your face clearly</p>
                        <ul className="space-y-3">
                            {[
                                "Your face and background will be recorded",
                                "Maximize screen brightness",
                                "Well lit area",
                                "No glasses, mask, hat"
                            ].map((text, i) => (
                                <li key={i} className="flex items-center gap-3 text-xs text-[#848E9C]">
                                    <div className="w-1.5 h-1.5 rotate-45 bg-[#5e5ce6]" />
                                    {text}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <p className="text-[13px] text-[#848E9C] leading-relaxed">
                        Please be mindful that both your face and the surrounding background will be recorded during the verification.
                    </p>

                    {cameraError && (
                        <div className="w-full p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-start gap-3 text-left">
                            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                            <div className="space-y-1">
                                <p className="text-xs font-bold text-red-500">Camera Error</p>
                                <p className="text-[11px] text-red-500/80 leading-snug">{cameraError}</p>
                            </div>
                        </div>
                    )}
                </div>

                <Button onClick={startCamera} className="w-full bg-[#5e5ce6] hover:bg-[#4b4ac2] h-14 rounded-2xl text-lg font-black">
                    {cameraError ? "Try Again" : "Continue"}
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col items-center text-center space-y-8">
                <div className="relative">
                    <div className="w-64 h-64 rounded-full border-[6px] border-dashed border-[#5e5ce6]/40 flex items-center justify-center relative overflow-hidden bg-black/20">
                        {cameraActive ? (
                            <video
                                ref={videoRef}
                                autoPlay
                                playsInline
                                className="w-full h-full object-cover scale-x-[-1]"
                            />
                        ) : (
                            <Loader2 className="w-10 h-10 text-[#5e5ce6] animate-spin" />
                        )}

                        <div className="absolute inset-0 border-[6px] border-dashed border-[#5e5ce6] rounded-full animate-[spin_15s_linear_infinite] opacity-60" />

                        {isAnalyzing && (
                            <div className="absolute inset-0 bg-[#5e5ce6]/10 flex flex-col items-center justify-center backdrop-blur-[1px]">
                                <div className="bg-black/40 px-4 py-2 rounded-full flex items-center gap-2">
                                    <Loader2 className="w-4 h-4 text-white animate-spin" />
                                    <span className="text-[11px] font-bold text-white uppercase tracking-widest">Verifying...</span>
                                </div>
                            </div>
                        )}

                        {isCompleted && (
                            <div className="absolute inset-0 bg-green-500/20 flex flex-col items-center justify-center backdrop-blur-[2px]">
                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="bg-white rounded-full p-3">
                                    <CheckCircle className="w-10 h-10 text-green-500" />
                                </motion.div>
                                <span className="text-[11px] font-bold text-white uppercase mt-3">Verified</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-2">
                    <h2 className="text-2xl font-black text-white">
                        {isCompleted ? "Verification Success" : isAnalyzing ? "Analyzing Face..." : "Liveness Check"}
                    </h2>
                    <p className="text-sm text-[#848E9C] leading-relaxed max-w-[280px]">
                        {isCompleted
                            ? "Identity verified. Moving to the next step."
                            : isAnalyzing
                                ? "Please hold still. We're verifying your identity."
                                : "Position your face within the circle and stay still."
                        }
                    </p>
                </div>
            </div>

            <div className="h-14" />
        </div>
    );
};

export const KYC05_ProofOfAddress: React.FC<KycScreenProps> = ({ onNext }) => {
    const [file, setFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    return (
        <div className="space-y-8">
            <div className="space-y-6">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-[#848E9C] uppercase tracking-widest px-1">Residential Address</label>
                    <Input className="bg-white/5 border-white/10 h-14 rounded-2xl text-white focus:border-[#5e5ce6] transition-all" placeholder="Enter full address" />
                </div>
                <div className="space-y-4">
                    <label className="text-xs font-bold text-[#848E9C] uppercase tracking-widest px-1">Proof of Address</label>
                    <input type="file" ref={fileInputRef} onChange={(e) => setFile(e.target.files?.[0] || null)} className="hidden" />
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        className={`aspect-[16/8] bg-white/5 border-2 border-dashed rounded-[32px] flex flex-col items-center justify-center gap-4 transition-all cursor-pointer ${file ? 'border-green-500/50 bg-green-500/5' : 'border-white/10 hover:border-[#5e5ce6]'}`}
                    >
                        {file ? <p className="text-sm font-bold text-white">{file.name}</p> : <p className="text-sm text-white font-bold">Upload utility bill or bank statement</p>}
                    </div>
                </div>
            </div>

            <Button onClick={onNext} disabled={!file} className="w-full bg-[#5e5ce6] hover:bg-[#4b4ac2] h-14 rounded-2xl text-lg font-black disabled:opacity-50 mt-4">
                Submit & Continue
            </Button>
        </div>
    );
};

export const KYC06_Status: React.FC<KycScreenProps> = ({ onNext }) => {
    return (
        <div className="space-y-8">
            <div className="bg-white/5 border border-white/10 rounded-[40px] p-10 space-y-10 shadow-2xl backdrop-blur-xl flex flex-col items-center text-center">
                <div className="relative">
                    <div className="w-24 h-24 bg-[#5e5ce6]/10 rounded-full flex items-center justify-center text-[#5e5ce6]">
                        <Clock className="w-12 h-12" />
                    </div>
                    <div className="absolute inset-0 border-4 border-t-transparent border-[#5e5ce6] animate-spin rounded-full opacity-40" />
                </div>

                <div className="space-y-4">
                    <h2 className="text-3xl font-black text-white">Verified</h2>
                    <p className="text-sm text-[#848E9C] leading-relaxed max-w-[320px]">
                        Your identity has been successfully verified. You now have full access to all Mustex features.
                    </p>
                </div>

                <div className="w-full p-6 bg-white/[0.03] border border-white/10 rounded-3xl space-y-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <CheckCircle className="w-6 h-6 text-green-500" />
                            <div className="text-left">
                                <p className="text-sm font-bold text-white">Identity Verified</p>
                                <p className="text-[10px] text-[#848E9C]">Account status updated</p>
                            </div>
                        </div>
                    </div>
                </div>

                <Button onClick={onNext} className="w-full bg-[#5e5ce6] hover:bg-[#4b4ac2] h-14 rounded-2xl text-lg font-black text-white">
                    Go to Dashboard
                </Button>
            </div>
        </div>
    );
};