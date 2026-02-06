import React from 'react';
import { ChevronRight } from 'lucide-react';

const Blog: React.FC = () => {
    const posts = [
        {
            image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2832&auto=format&fit=crop",
            date: "Jan 16, 2026",
            title: "Short Sell BTC and ETH Options on FINORA With Competitive Fees",
            desc: "You can now short sell BTC and ETH options on FINORA, with highly competitive fees, stablecoin settlement, and no special access needed."
        },
        {
            image: "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?q=80&w=2832&auto=format&fit=crop",
            date: "Feb 01, 2023",
            title: "How to Hedge a Long Position With a Protective Put",
            desc: "Crypto options contracts allow traders and investors to diversify their portfolio and manage market risk. Learn how to hedge a long position."
        },
        {
            image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?q=80&w=2832&auto=format&fit=crop",
            date: "Jan 04, 2023",
            title: "Crypto Futures and Options: What Are the Similarities and Differences?",
            desc: "Options and futures are two different types of derivatives that investors use to speculate on market prices, hedge risks, and diversify."
        }
    ];

    return (
        <section className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 text-left mb-12">
                <h2 className="binance-article-h2 text-white">Blog</h2>
                <button className="text-white text-sm font-semibold hover:opacity-80 flex items-center gap-1 group transition-all">
                    View More
                    <span className="group-hover:translate-x-1 transition-transform">
                        <ChevronRight className="w-4 h-4" />
                    </span>
                </button>
            </div>

            <div className="grid md:grid-cols-3 gap-8 text-left">
                {posts.map((post, i) => (
                    <div key={i} className="group cursor-pointer">
                        <div className="relative aspect-video rounded-xl overflow-hidden mb-6 bg-black border border-white/10">
                            <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                        </div>
                        <div className="space-y-3">
                            <span className="text-slate-500 text-sm font-medium">{post.date}</span>
                            <h3 className="text-lg font-semibold text-white leading-snug transition-colors">
                                {post.title}
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
                                {post.desc}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Blog;