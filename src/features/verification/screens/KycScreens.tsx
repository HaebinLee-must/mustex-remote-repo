import React, { useState, useRef, useEffect } from 'react';
import { User, FileText, Camera, MapPin, CheckCircle, Clock, Upload, AlertCircle, Shield, XCircle, Loader2, ChevronLeft, ChevronDown, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { StepCard } from '../components/StepCard';
import { Button } from '@/components_2/ui/button';
import { Input } from '@/components_2/ui/input';

interface KycScreenProps {
    onNext: () => void;
    onCountrySelect?: (country: string) => void;
}

export const KYC01_Intro: React.FC<KycScreenProps> = ({ onNext, onCountrySelect }) => {
    const [showModal, setShowModal] = useState(true);
    const [residence, setResidence] = useState('South Korea (대한민국)');
    const [issuingCountry, setIssuingCountry] = useState('South Korea (대한민국)');
    const [activeDropdown, setActiveDropdown] = useState<'residence' | 'issuing' | null>(null);
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
    ];

    const filteredCountries = countries.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleCountrySelect = (countryName: string) => {
        if (activeDropdown === 'residence') {
            setResidence(countryName);
            setIssuingCountry(countryName); // Sync issuing country with residence
            onCountrySelect?.(countryName);
        } else {
            setIssuingCountry(countryName);
        }
        setActiveDropdown(null);
        setSearchQuery('');
    };

    const requirements = [
        { icon: User, title: 'Personal Information', desc: 'Enter your basic details' },
        { icon: FileText, title: 'Identity Document', desc: 'Upload a clear photo of your ID' },
        { icon: Camera, title: 'Liveness Check', desc: 'Verify your face in real-time' },
    ];

    return (
        <>
            <AnimatePresence>
                {showModal && (
                    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-[#12122b]/80 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="w-full max-w-md bg-[#1e1e3f] border border-white/10 rounded-[32px] p-8 shadow-2xl space-y-8"
                        >
                            <div className="flex justify-center">
                                <div className="w-20 h-20 bg-[#5e5ce6]/20 rounded-3xl flex items-center justify-center text-[#5e5ce6]">
                                    <Shield className="w-10 h-10" />
                                </div>
                            </div>
                            <div className="text-center space-y-2">
                                <h2 className="text-2xl font-black text-white">Identity Verification</h2>
                                <p className="text-[#848E9C] text-sm leading-relaxed">
                                    To ensure a secure trading environment and comply with regulations, please complete your identity verification.
                                </p>
                            </div>
                            <Button
                                onClick={() => setShowModal(false)}
                                className="w-full bg-[#5e5ce6] hover:bg-[#4b4ac2] h-14 rounded-2xl text-lg font-black"
                            >
                                Get Started
                            </Button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <div className="space-y-10">
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
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="absolute top-full left-0 right-0 mt-2 z-[60] bg-[#12122b] border border-white/10 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-2xl"
                                >
                                    <div className="p-2 space-y-1">
                                        <div className="relative mb-2">
                                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#848E9C]" />
                                            <input
                                                type="text"
                                                placeholder="Search country"
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                className="w-full bg-white/5 border border-white/5 rounded-xl h-10 pl-9 pr-4 text-xs text-white focus:border-[#5e5ce6] outline-none transition-all"
                                            />
                                        </div>
                                        <div className="max-h-48 overflow-y-auto custom-scrollbar scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                                            {filteredCountries.map((country) => (
                                                <button
                                                    key={country.code}
                                                    onClick={() => handleCountrySelect(country.name)}
                                                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-all hover:bg-white/5 ${residence === country.name ? 'text-[#5e5ce6] font-bold bg-[#5e5ce6]/10' : 'text-white'}`}
                                                >
                                                    <span className="text-lg">{country.flag}</span>
                                                    <span>{country.name}</span>
                                                </button>
                                            ))}
                                            {filteredCountries.length === 0 && (
                                                <div className="p-4 text-center text-xs text-[#848E9C]">No results found</div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                <div className="space-y-4">
                    <label className="text-xs font-bold text-[#848E9C] uppercase tracking-widest px-1">Document Issuing Country/Region</label>
                    <div className="relative">
                        <button
                            onClick={() => setActiveDropdown(activeDropdown === 'issuing' ? null : 'issuing')}
                            className="w-full flex items-center justify-between bg-[#1e1e3f] border border-white/10 h-14 rounded-2xl px-5 text-sm text-white focus:border-[#5e5ce6] transition-all"
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-lg">{countries.find(c => c.name === issuingCountry)?.flag}</span>
                                <span>{issuingCountry}</span>
                            </div>
                            <ChevronDown className={`w-4 h-4 text-[#848E9C] transition-transform ${activeDropdown === 'issuing' ? 'rotate-180' : ''}`} />
                        </button>

                        <AnimatePresence>
                            {activeDropdown === 'issuing' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="absolute top-full left-0 right-0 mt-2 z-[60] bg-[#12122b] border border-white/10 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-2xl"
                                >
                                    <div className="p-2 space-y-1">
                                        <div className="relative mb-2">
                                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#848E9C]" />
                                            <input
                                                type="text"
                                                placeholder="Search country"
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                className="w-full bg-white/5 border border-white/5 rounded-xl h-10 pl-9 pr-4 text-xs text-white focus:border-[#5e5ce6] outline-none transition-all"
                                            />
                                        </div>
                                        <div className="max-h-48 overflow-y-auto custom-scrollbar scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                                            {filteredCountries.map((country) => (
                                                <button
                                                    key={country.code}
                                                    onClick={() => handleCountrySelect(country.name)}
                                                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-all hover:bg-white/5 ${issuingCountry === country.name ? 'text-[#5e5ce6] font-bold bg-[#5e5ce6]/10' : 'text-white'}`}
                                                >
                                                    <span className="text-lg">{country.flag}</span>
                                                    <span>{country.name}</span>
                                                </button>
                                            ))}
                                            {filteredCountries.length === 0 && (
                                                <div className="p-4 text-center text-xs text-[#848E9C]">No results found</div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                <div className="space-y-4">
                    <label className="text-xs font-bold text-[#848E9C] uppercase tracking-widest px-1">Document Type</label>
                    <div className="space-y-3">
                        {[
                            { id: 'id_card', label: 'ID Card', recommended: true },
                            { id: 'driver_license', label: "Driver's License", sub: 'Korean Nationals Only (Example)' },
                            { id: 'passport', label: 'Passport' },
                            { id: 'residence_permit', label: 'Residence Permit' },
                        ].map((doc) => (
                            <button
                                key={doc.id}
                                onClick={() => { }}
                                className={`w-full flex items-center justify-between p-5 rounded-2xl border transition-all ${doc.id === 'id_card' ? 'border-[#5e5ce6] bg-[#5e5ce6]/5' : 'border-white/10 bg-white/5 hover:bg-white/[0.08]'}`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${doc.id === 'id_card' ? 'bg-[#5e5ce6] text-white' : 'bg-white/5 text-[#848E9C]'}`}>
                                        <FileText className="w-5 h-5" />
                                    </div>
                                    <div className="text-left">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-bold text-white">{doc.label}</span>
                                            {doc.recommended && (
                                                <span className="text-[10px] font-black bg-green-500/10 text-green-500 px-2 py-0.5 rounded-md uppercase">Recommended</span>
                                            )}
                                        </div>
                                        {doc.sub && <p className="text-[10px] text-[#474D57] font-medium">{doc.sub}</p>}
                                    </div>
                                </div>
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${doc.id === 'id_card' ? 'border-[#5e5ce6]' : 'border-white/20'}`}>
                                    {doc.id === 'id_card' && <div className="w-2.5 h-2.5 rounded-full bg-[#5e5ce6]" />}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                <Button onClick={onNext} className="w-full bg-[#5e5ce6] hover:bg-[#4b4ac2] h-14 rounded-2xl text-lg font-black mt-6">
                    Continue
                </Button>
            </div>
        </>
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
                    {showError && (!dob.year || !dob.month || !dob.day) && (
                        <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider mt-1 px-1">Please enter a valid day</p>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-[#848E9C] uppercase tracking-widest px-1">Residential Address</label>
                    <Input className="bg-white/5 border-white/10 h-14 rounded-2xl text-white focus:border-[#5e5ce6] transition-all" placeholder="Enter full address" />
                </div>
            </div>

            {showError && (
                <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl">
                    <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                    <p className="text-xs font-bold text-red-500">Please fill in all personal information fields.</p>
                </div>
            )}

            <Button onClick={handleContinue} className="w-full bg-[#5e5ce6] hover:bg-[#4b4ac2] h-14 rounded-2xl text-lg font-black">
                Continue
            </Button>
        </div>
    );
};

export const KYC03_IdUpload: React.FC<KycScreenProps> = ({ onNext }) => {
    const [file, setFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
            if (allowedTypes.includes(selectedFile.type)) {
                setFile(selectedFile);
            } else {
                alert('Supports JPG, PNG, PDF only.');
            }
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="space-y-8">
            <div className="space-y-4">
                <label className="text-xs font-bold text-[#848E9C] uppercase tracking-widest px-1">Upload Front of ID</label>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".jpg,.jpeg,.png,.pdf"
                    className="hidden"
                />
                <div
                    onClick={triggerFileInput}
                    className={`aspect-[16/10] bg-white/5 border-2 border-dashed rounded-[32px] flex flex-col items-center justify-center gap-4 transition-all cursor-pointer group ${file ? 'border-green-500/50 bg-green-500/5' : 'border-white/10 hover:border-[#5e5ce6]'}`}
                >
                    {file ? (
                        <>
                            <div className="w-16 h-16 bg-green-500/20 rounded-3xl flex items-center justify-center text-green-500">
                                <CheckCircle className="w-8 h-8" />
                            </div>
                            <div className="text-center">
                                <p className="text-sm font-bold text-white truncate max-w-[200px]">{file.name}</p>
                                <p className="text-[10px] text-green-500 font-black uppercase mt-1 tracking-widest">Ready to upload</p>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center text-[#848E9C] group-hover:text-[#5e5ce6] group-hover:scale-110 transition-all duration-500">
                                <Upload className="w-7 h-7" />
                            </div>
                            <div className="text-center space-y-1">
                                <p className="text-sm text-white font-bold">Upload a photo of your ID</p>
                                <p className="text-[10px] text-[#848E9C] uppercase font-bold tracking-widest">Supports JPG, PNG, PDF</p>
                            </div>
                        </>
                    )}
                </div>
            </div>

            <div className="space-y-4 pt-4">
                <div className="flex items-start gap-4 p-5 bg-white/5 border border-white/10 rounded-2xl">
                    <div className="w-10 h-10 bg-[#5e5ce6]/10 rounded-xl flex items-center justify-center text-[#5e5ce6] shrink-0">
                        <AlertCircle className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                        <p className="text-xs font-bold text-white">Capture Guidelines</p>
                        <ul className="text-[10px] text-[#848E9C] font-medium space-y-1 list-disc pl-3">
                            <li>All four corners of the document must be visible.</li>
                            <li>The information must be clear and legible.</li>
                            <li>Avoid glare and shadows on the document.</li>
                        </ul>
                    </div>
                </div>
            </div>

            <Button
                onClick={onNext}
                disabled={!file}
                className="w-full bg-[#5e5ce6] hover:bg-[#4b4ac2] h-14 rounded-2xl text-lg font-black disabled:opacity-50 disabled:cursor-not-allowed mt-4"
            >
                Continue Verification
            </Button>
        </div>
    );
};

export const KYC04_Liveness: React.FC<KycScreenProps> = ({ onNext }) => {
    const [cameraActive, setCameraActive] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                setCameraActive(true);
            }
        } catch (err) {
            alert('Unable to access camera. Please check permissions.');
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col items-center text-center space-y-8">
                <div className="relative">
                    <div className="w-48 h-48 rounded-full border-4 border-[#5e5ce6]/30 flex items-center justify-center relative overflow-hidden bg-white/5">
                        {cameraActive ? (
                            <video
                                ref={videoRef}
                                autoPlay
                                playsInline
                                className="w-full h-full object-cover scale-x-[-1]"
                            />
                        ) : (
                            <Camera className="w-20 h-20 text-[#5e5ce6]/20" />
                        )}
                        <div className={`absolute inset-0 border-4 border-[#5e5ce6] border-t-transparent animate-[spin_3s_linear_infinite] rounded-full ${!cameraActive && 'opacity-30'}`} />
                    </div>
                </div>

                <div className="space-y-2">
                    <h2 className="text-2xl font-black text-white">Liveness Check</h2>
                    <p className="text-sm text-[#848E9C] leading-relaxed">
                        Please position your face within the circle <br />
                        and follow the instructions on the screen.
                    </p>
                </div>

                <div className="grid grid-cols-3 gap-6 w-full pt-4">
                    {[
                        { icon: '💡', label: 'Good Lighting' },
                        { icon: '👓', label: 'No Glasses' },
                        { icon: '🧢', label: 'No Hats' },
                    ].map((item, i) => (
                        <div key={i} className="space-y-2">
                            <div className="text-2xl">{item.icon}</div>
                            <div className="text-[10px] font-bold text-[#848E9C] uppercase tracking-widest">{item.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            <Button
                onClick={cameraActive ? onNext : startCamera}
                className="w-full bg-[#5e5ce6] hover:bg-[#4b4ac2] h-14 rounded-2xl text-lg font-black mt-4"
            >
                {cameraActive ? "I'm Ready" : "Start Camera"}
            </Button>
        </div>
    );
};

export const KYC05_ProofOfAddress: React.FC<KycScreenProps> = ({ onNext }) => {
    const [file, setFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    return (
        <div className="space-y-8">
            <div className="bg-white/5 border border-white/10 rounded-[40px] p-8 space-y-8 shadow-2xl backdrop-blur-xl relative">
                <button
                    onClick={() => { }} // Handle back in VerificationFlow
                    className="absolute left-6 top-6 p-2 text-[#848E9C] hover:text-white transition-colors"
                >
                    <ChevronLeft className="w-6 h-6 rotate-0" />
                </button>
                <div className="text-center pt-4">
                    <h2 className="text-2xl font-black text-white">Proof of Address</h2>
                </div>

                <div className="p-5 bg-[#5e5ce6]/10 border border-[#5e5ce6]/20 rounded-2xl">
                    <p className="text-xs font-medium text-[#EAECEF] leading-relaxed">
                        Please provide a document dated within the last 3 months. Accepted types: Utility Bill, Bank Statement, Tax Letter.
                    </p>
                </div>

                <div className="space-y-4">
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept=".jpg,.jpeg,.png,.pdf"
                        className="hidden"
                    />
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        className={`aspect-[16/10] bg-white/[0.02] border-2 border-dashed rounded-[32px] flex flex-col items-center justify-center gap-4 transition-all cursor-pointer group ${file ? 'border-green-500/50 bg-green-500/5' : 'border-white/10 hover:border-[#5e5ce6]'}`}
                    >
                        {file ? (
                            <>
                                <div className="w-16 h-16 bg-green-500/20 rounded-3xl flex items-center justify-center text-green-500">
                                    <CheckCircle className="w-8 h-8" />
                                </div>
                                <div className="text-center">
                                    <p className="text-sm font-bold text-white truncate max-w-[200px]">{file.name}</p>
                                    <p className="text-[10px] text-green-500 font-black uppercase mt-1 tracking-widest">Ready to upload</p>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center text-[#5e5ce6] group-hover:scale-110 transition-all duration-500">
                                    <Upload className="w-7 h-7" />
                                </div>
                                <div className="text-center space-y-1">
                                    <p className="text-sm text-white font-bold">Click to upload or drag and drop</p>
                                    <p className="text-[10px] text-[#848E9C] uppercase font-bold tracking-widest">PDF, JPG or PNG (max. 10MB)</p>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <Button
                    onClick={onNext}
                    disabled={!file}
                    className="w-full bg-[#5e5ce6] hover:bg-[#4b4ac2] h-14 rounded-2xl text-lg font-black disabled:opacity-50"
                >
                    Submit & Continue
                </Button>
            </div>
        </div>
    );
};

export const KYC06_Status: React.FC<KycScreenProps> = ({ onNext }) => {
    return (
        <div className="space-y-8">
            <div className="bg-white/10 border border-white/10 rounded-[40px] p-8 space-y-10 shadow-2xl backdrop-blur-xl flex flex-col items-center text-center">
                <div className="relative">
                    <div className="w-24 h-24 bg-[#5e5ce6]/10 rounded-full flex items-center justify-center text-[#5e5ce6]">
                        <Clock className="w-12 h-12" />
                    </div>
                    <div className="absolute inset-0 border-4 border-[#5e5ce6] border-t-transparent animate-spin rounded-full opacity-30" />
                </div>

                <div className="space-y-3">
                    <h2 className="text-3xl font-black text-white">Under Review</h2>
                    <p className="text-sm text-[#848E9C] leading-relaxed max-w-[320px] mx-auto">
                        We are currently reviewing your documents. This process typically takes less than 5 minutes. You will receive an email notification once completed.
                    </p>
                </div>

                <div className="w-full p-6 bg-white/[0.03] border border-white/10 rounded-3xl space-y-4">
                    <div className="flex justify-between items-center group cursor-pointer">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-[#5e5ce6]/20 rounded-lg flex items-center justify-center text-[#5e5ce6]">
                                <Shield className="w-4 h-4" />
                            </div>
                            <div className="text-left">
                                <p className="text-sm font-bold text-white">Withdrawal Limits</p>
                                <p className="text-[10px] text-[#848E9C]">Will be increased to 10 BTC upon approval.</p>
                            </div>
                        </div>
                        <ChevronLeft className="w-4 h-4 text-[#848E9C] rotate-180" />
                    </div>
                </div>

                <Button onClick={onNext} className="w-full bg-white/10 hover:bg-white/[0.15] border border-white/10 h-14 rounded-2xl text-lg font-black text-white">
                    Return to Dashboard
                </Button>
            </div>
        </div>
    );
};
