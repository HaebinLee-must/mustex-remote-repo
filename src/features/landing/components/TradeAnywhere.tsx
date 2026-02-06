import React from 'react';
import { Apple, Smartphone, Monitor, LayoutGrid, QrCode } from 'lucide-react';

const DownloadButton = ({ icon, text, subtext, qr }: { icon: React.ReactNode, text: string, subtext: string, qr?: boolean }) => (
    <button className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3 transition-all group w-full sm:w-auto">
        <div className="text-white group-hover:scale-110 transition-transform">
            {icon}
        </div>
        <div className="flex flex-col text-left">
            <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">{subtext}</span>
            <span className="text-sm text-white font-bold">{text}</span>
        </div>
        {qr && (
            <div className="ml-2 pl-3 border-l border-white/10 text-slate-500 group-hover:text-primary transition-colors">
                <QrCode className="w-5 h-5" />
            </div>
        )}
    </button>
);

const TradeAnywhere: React.FC = () => {
    return (
        <>
            <section className="max-w-7xl mx-auto py-24 px-4 md:px-8 overflow-hidden font-sans">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Content */}
                    <div className="space-y-12 text-left">
                        <div className="space-y-6">
                            <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight font-display tracking-tight">
                                Trade. Anywhere.
                            </h2>
                            <p className="text-lg text-slate-400 max-w-lg leading-relaxed font-medium">
                                Compatible with multiple devices, start trading with safety and convenience.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <DownloadButton
                                icon={<Smartphone className="w-6 h-6" />}
                                subtext="Get it on"
                                text="Google Play"
                                qr
                            />
                            <DownloadButton
                                icon={<Apple className="w-6 h-6" />}
                                subtext="Download on the"
                                text="App Store"
                                qr
                            />
                            <DownloadButton
                                icon={<Apple className="w-6 h-6" />}
                                subtext="Download for"
                                text="macOS"
                            />
                            <DownloadButton
                                icon={<Monitor className="w-6 h-6" />}
                                subtext="Download for"
                                text="Windows"
                            />
                            <DownloadButton
                                icon={<LayoutGrid className="w-6 h-6" />}
                                subtext="Download for"
                                text="Linux deb"
                            />
                            <DownloadButton
                                icon={<LayoutGrid className="w-6 h-6" />}
                                subtext="Download for"
                                text="Linux rpm"
                            />
                        </div>
                    </div>

                    {/* Right: Mockup */}
                    <div className="relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 blur-[100px] -z-10"></div>
                        <div className="relative flex items-center justify-center">
                            {/* Laptop Mockup */}
                            <div className="w-full max-w-[500px] aspect-[1.6] bg-black rounded-xl border border-white/10 shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-full bg-black p-2">
                                    <div className="w-full h-full border border-white/10 rounded bg-black flex flex-col overflow-hidden">
                                        <div className="h-4 bg-white/5 flex items-center px-2 gap-1">
                                            <div className="w-1.5 h-1.5 rounded-full bg-red-500/30"></div>
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary/30"></div>
                                            <div className="w-1.5 h-1.5 rounded-full bg-green-500/30"></div>
                                        </div>
                                        <div className="flex-1 p-3 space-y-3">
                                            <div className="h-8 w-full bg-white/5 rounded flex items-center px-3 justify-between">
                                                <div className="h-2 w-12 bg-white/10 rounded"></div>
                                                <div className="h-4 w-12 bg-primary/30 rounded"></div>
                                            </div>
                                            <div className="flex-1 border border-white/5 rounded p-2 flex items-end gap-1">
                                                {[...Array(10)].map((_, i) => (
                                                    <div key={i} className="flex-1 bg-primary/20 rounded-t" style={{ height: `${Math.random() * 80 + 20}%` }}></div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Mobile Mockup Overlay */}
                            <div className="absolute bottom-[-10%] right-[5%] w-[120px] aspect-[0.5] bg-black rounded-[2rem] border-4 border-white/10 shadow-2xl overflow-hidden hidden sm:block">
                                <div className="w-full h-full p-2 flex flex-col gap-2">
                                    <div className="h-2 w-8 bg-white/10 rounded-full mx-auto mb-2"></div>
                                    <div className="flex-1 border border-white/10 rounded-xl bg-black p-2 space-y-2">
                                        <div className="h-12 w-full bg-primary/20 rounded-lg"></div>
                                        <div className="h-2 w-full bg-white/5 rounded"></div>
                                        <div className="h-2 w-2/3 bg-white/5 rounded"></div>
                                        <div className="flex-1 border border-white/5 rounded flex items-end gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <div key={i} className="flex-1 bg-green-500/20 rounded-t" style={{ height: `${Math.random() * 60 + 20}%` }}></div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>

            {/* Bottom CTA Banner */}
            <section className="w-full bg-black py-20 md:py-28 border-t border-white/5 font-sans">
                <div className="max-w-7xl mx-auto px-4 md:px-8 text-center space-y-8">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight font-display">
                        Simple, Secure Trading on Finora
                    </h2>
                    <div className="flex justify-center">
                        <button className="bg-primary text-primary-foreground hover:opacity-90 focus:ring-2 focus:ring-ring focus:ring-offset-2 shadow-xl shadow-primary/30 font-bold px-10 py-5 rounded-xl text-base transition-all active:scale-95">
                            Trade Now
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
};

export default TradeAnywhere;
