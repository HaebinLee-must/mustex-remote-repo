import React, { useState } from 'react';
import { User, FileText, Camera, MapPin, CheckCircle, Clock, Upload, AlertCircle, Shield } from 'lucide-react';
import { StepCard } from '../components/StepCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface KycScreenProps {
    onNext: () => void;
}

export const KYC01_Intro: React.FC<KycScreenProps> = ({ onNext }) => {
    const requirements = [
        { icon: User, title: 'Personal Information', desc: 'Enter your basic details' },
        { icon: FileText, title: 'Identity Document', desc: 'Upload a clear photo of your ID' },
        { icon: Camera, title: 'Liveness Check', desc: 'Verify your face in real-time' },
    ];

    return (
        <StepCard
            footer={
                <Button onClick={onNext} className="w-full bg-indigo-600 hover:bg-indigo-700 h-14 rounded-2xl text-lg font-black">
                    Start Verification
                </Button>
            }
        >
            <div className="space-y-8">
                <div className="p-6 bg-indigo-500/5 border border-indigo-500/10 rounded-3xl flex items-center gap-6">
                    <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-600/20 shrink-0">
                        <Shield className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h2 className="text-xl font-black text-white">Verify Your Identity</h2>
                        <p className="text-sm text-[#848E9C]">Complete this process to unlock full features.</p>
                    </div>
                </div>

                <div className="space-y-4">
                    {requirements.map((req, i) => (
                        <div key={i} className="flex items-start gap-4 p-5 bg-white/[0.02] border border-white/[0.05] rounded-2xl hover:bg-white/[0.04] transition-all">
                            <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-400 shrink-0">
                                <req.icon className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-white">{req.title}</h3>
                                <p className="text-xs text-[#848E9C]">{req.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </StepCard>
    );
};

export const KYC02_PersonalInfo: React.FC<KycScreenProps> = ({ onNext }) => {
    return (
        <StepCard
            footer={
                <Button onClick={onNext} className="w-full bg-indigo-600 hover:bg-indigo-700 h-14 rounded-2xl text-lg font-black">
                    Continue
                </Button>
            }
        >
            <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-[#848E9C] uppercase tracking-widest">First Name</label>
                        <Input className="bg-[#0B0E11] border-white/10 h-12 rounded-xl focus:border-indigo-600 transition-all" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-[#848E9C] uppercase tracking-widest">Last Name</label>
                        <Input className="bg-[#0B0E11] border-white/10 h-12 rounded-xl focus:border-indigo-600 transition-all" placeholder="Doe" />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-[#848E9C] uppercase tracking-widest">Date of Birth</label>
                    <Input type="date" className="bg-[#0B0E11] border-white/10 h-12 rounded-xl focus:border-indigo-600 transition-all" />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-[#848E9C] uppercase tracking-widest">Nationality</label>
                    <select className="w-full bg-[#0B0E11] border border-white/10 h-12 rounded-xl px-4 text-sm text-white focus:border-indigo-600 outline-none appearance-none transition-all">
                        <option>South Korea</option>
                        <option>United States</option>
                        <option>United Kingdom</option>
                    </select>
                </div>
            </div>
        </StepCard>
    );
};

export const KYC03_IdUpload: React.FC<KycScreenProps> = ({ onNext }) => {
    return (
        <StepCard
            footer={
                <Button onClick={onNext} className="w-full bg-indigo-600 hover:bg-indigo-700 h-14 rounded-2xl text-lg font-black">
                    Continue
                </Button>
            }
        >
            <div className="space-y-8">
                <div className="space-y-4">
                    <label className="text-xs font-bold text-[#848E9C] uppercase tracking-widest">Select Document Type</label>
                    <div className="grid grid-cols-1 gap-3">
                        {['Passport', 'National ID Card', "Driver's License"].map((type, i) => (
                            <button key={i} className="flex items-center justify-between p-5 bg-white/[0.02] border border-white/[0.08] rounded-2xl hover:border-indigo-600 transition-all text-left">
                                <span className="text-sm font-bold text-white">{type}</span>
                                <div className="w-4 h-4 rounded-full border-2 border-white/10" />
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <label className="text-xs font-bold text-[#848E9C] uppercase tracking-widest">Upload Front of ID</label>
                    <div className="aspect-[16/10] bg-[#0B0E11] border-2 border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center gap-4 hover:border-indigo-600 transition-all cursor-pointer group">
                        <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-[#848E9C] group-hover:text-indigo-400 group-hover:scale-110 transition-all">
                            <Upload className="w-6 h-6" />
                        </div>
                        <p className="text-xs text-[#848E9C] font-bold">Drag and drop or click to upload</p>
                    </div>
                </div>
            </div>
        </StepCard>
    );
};

export const KYC04_Liveness: React.FC<KycScreenProps> = ({ onNext }) => {
    return (
        <StepCard
            footer={
                <Button onClick={onNext} className="w-full bg-indigo-600 hover:bg-indigo-700 h-14 rounded-2xl text-lg font-black">
                    I'm Ready
                </Button>
            }
        >
            <div className="flex flex-col items-center text-center space-y-8">
                <div className="relative">
                    <div className="w-48 h-48 rounded-full border-4 border-indigo-600/30 flex items-center justify-center relative overflow-hidden">
                        <Camera className="w-20 h-20 text-indigo-500/20" />
                        <div className="absolute inset-0 border-4 border-indigo-600 border-t-transparent animate-spin rounded-full" />
                    </div>
                </div>

                <div className="space-y-2">
                    <h2 className="text-xl font-black text-white">Liveness Check</h2>
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
        </StepCard>
    );
};

export const KYC06_Status: React.FC<KycScreenProps> = ({ onNext }) => {
    return (
        <StepCard
            footer={
                <Button onClick={onNext} variant="outline" className="w-full border-white/10 hover:bg-white/5 h-14 rounded-2xl text-lg font-black text-white">
                    Go to Dashboard
                </Button>
            }
        >
            <div className="flex flex-col items-center text-center space-y-8 py-4">
                <div className="w-24 h-24 bg-indigo-600/10 rounded-[32px] flex items-center justify-center text-indigo-400 relative">
                    <Clock className="w-12 h-12" />
                    <div className="absolute -right-2 -bottom-2 w-10 h-10 bg-[#1E2329] rounded-full flex items-center justify-center p-1">
                        <div className="w-full h-full bg-indigo-600 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-5 h-5 text-white" />
                        </div>
                    </div>
                </div>

                <div className="space-y-3">
                    <h2 className="text-2xl font-black text-white">Under Review</h2>
                    <p className="text-sm text-[#848E9C] leading-relaxed max-w-[320px] mx-auto">
                        Your identity verification is being processed.
                        Usually, it takes less than 24 hours. We will notify you once it's complete.
                    </p>
                </div>

                <div className="w-full p-6 bg-white/[0.02] border border-white/[0.05] rounded-3xl space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-[#848E9C] uppercase tracking-widest">Submitted on</span>
                        <span className="text-xs font-black text-white">Jan 23, 2026</span>
                    </div>
                    <div className="h-[1px] bg-white/[0.05]" />
                    <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-[#848E9C] uppercase tracking-widest">Est. Duration</span>
                        <span className="text-xs font-black text-indigo-400 italic">Within 24 Hours</span>
                    </div>
                </div>

                <div className="flex items-center gap-2 px-4 py-2 bg-indigo-500/10 rounded-full">
                    <AlertCircle className="w-3 h-3 text-indigo-400" />
                    <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest">Policy-based automated screening active</span>
                </div>
            </div>
        </StepCard>
    );
};
