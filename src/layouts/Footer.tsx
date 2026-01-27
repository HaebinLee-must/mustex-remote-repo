import React from 'react';
import logoLight from '../assets/finora_bi_light.png';

const Footer: React.FC = () => {
    return (
        <footer className="bg-[#0B0E11] pt-20 pb-10 border-t border-[#1E2329] mt-auto font-sans">
            <div className="max-w-[1200px] mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
                    {/* Logo and Description */}
                    <div className="md:col-span-4 flex flex-col gap-6">
                        <div>
                            <img src={logoLight} alt="FINORA" className="h-8 w-auto" />
                        </div>
                        <p className="text-[#848E9C] text-sm leading-relaxed max-w-xs font-medium">
                            The leading cryptocurrency exchange in Philippines, offering secure and reliable trading services since 2026.
                        </p>
                    </div>

                    {/* Products Column */}
                    <div className="md:col-span-2 md:col-start-6 flex flex-col gap-6">
                        <h4 className="font-semibold text-white text-[15px]">Products</h4>
                        <ul className="flex flex-col gap-3 text-[13px] text-[#848E9C] font-medium">
                            <li><button className="hover:text-white transition-colors">Exchange</button></li>
                            <li><button className="hover:text-white transition-colors">Quick Swap</button></li>
                            <li><button className="hover:text-white transition-colors">Wallet</button></li>
                            <li><button className="hover:text-white transition-colors">Savings</button></li>
                        </ul>
                    </div>

                    {/* Information Column */}
                    <div className="md:col-span-2 flex flex-col gap-6">
                        <h4 className="font-semibold text-white text-[15px]">Information</h4>
                        <ul className="flex flex-col gap-3 text-[13px] text-[#848E9C] font-medium">
                            <li><button className="hover:text-white transition-colors">Customer Support</button></li>
                            <li><button className="hover:text-white transition-colors">Fees & Limits</button></li>
                            <li><button className="hover:text-white transition-colors">Settings</button></li>
                            <li><button className="hover:text-white transition-colors">API Documentation</button></li>
                        </ul>
                    </div>

                    {/* Legal Column */}
                    <div className="md:col-span-2 flex flex-col gap-6">
                        <h4 className="font-semibold text-white text-[15px]">Legal</h4>
                        <ul className="flex flex-col gap-3 text-[13px] text-[#848E9C] font-medium">
                            <li><button className="hover:text-white transition-colors">Privacy Policy</button></li>
                            <li><button className="hover:text-white transition-colors">Terms of Service</button></li>
                            <li><button className="hover:text-white transition-colors">Risk Warning</button></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[#1E2329] gap-6 text-[#848E9C] text-xs font-medium">
                    <p>2026 © FINORA Philippines Exchange Crypto Investment Platform</p>
                    <div className="flex gap-8">
                        <button className="hover:text-white transition-colors">Twitter</button>
                        <button className="hover:text-white transition-colors">Telegram</button>
                        <button className="hover:text-white transition-colors">LinkedIn</button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
