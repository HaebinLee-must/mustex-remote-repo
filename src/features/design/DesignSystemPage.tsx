import React from 'react';

const ColorSwatch = ({ name, variable, className }: { name: string; variable: string; className: string }) => (
    <div className="flex flex-col gap-2">
        <div className={`h-24 w-full rounded-lg border border-border ${className}`} />
        <div className="flex flex-col">
            <span className="font-medium text-sm">{name}</span>
            <span className="text-xs text-muted-foreground font-mono">{variable}</span>
        </div>
    </div>
);

const TypographySample = ({ name, type, className }: { name: string; type: string; className: string }) => (
    <div className="flex flex-col gap-2 border-b border-border pb-4 last:border-0">
        <div className="flex items-baseline justify-between mb-1">
            <span className="text-xs text-muted-foreground font-mono">{name}</span>
            <span className="text-xs text-muted-foreground font-mono">{type}</span>
        </div>
        <div className={className}>The quick brown fox jumps over the lazy dog</div>
    </div>
);

const DesignSystemPage = () => {
    return (
        <div className="min-h-screen bg-background text-foreground p-8 md:p-16 space-y-16">
            <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight text-primary">Finora Design System</h1>
                <p className="text-xl text-muted-foreground">
                    Core design tokens and components for the Finora trading platform.
                </p>
            </div>

            {/* Colors Section */}
            <section className="space-y-6">
                <h2 className="text-2xl font-semibold border-b border-border pb-2">Colors</h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {/* Primary */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Primary</h3>
                        <ColorSwatch name="Primary" variable="bg-primary" className="bg-primary" />
                        <ColorSwatch name="Primary Foreground" variable="text-primary-foreground" className="bg-primary-foreground" />
                    </div>

                    {/* Secondary & Accent */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Secondary & Accent</h3>
                        <ColorSwatch name="Secondary" variable="bg-secondary" className="bg-secondary" />
                        <ColorSwatch name="Accent" variable="bg-accent" className="bg-accent" />
                    </div>

                    {/* Feedback */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Feedback</h3>
                        <ColorSwatch name="Success" variable="bg-success" className="bg-success" />
                        <ColorSwatch name="Destructive" variable="bg-destructive" className="bg-destructive" />
                        <ColorSwatch name="Warning" variable="text-yellow-500" className="bg-yellow-500" />
                    </div>

                    {/* Neutrals */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Neutrals</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <ColorSwatch name="Background" variable="bg-background" className="bg-background" />
                            <ColorSwatch name="Card" variable="bg-card" className="bg-card" />
                            <ColorSwatch name="Popover" variable="bg-popover" className="bg-popover" />
                            <ColorSwatch name="Muted" variable="bg-muted" className="bg-muted" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Typography Section */}
            <section className="space-y-6">
                <h2 className="text-2xl font-semibold border-b border-border pb-2">Typography</h2>

                <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-4">
                        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Headings (Poppins)</h3>
                        <TypographySample name="H1" type="4xl / Bold" className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl font-display" />
                        <TypographySample name="H2" type="3xl / Semibold" className="scroll-m-20 text-3xl font-semibold tracking-tight font-display" />
                        <TypographySample name="H3" type="2xl / Semibold" className="scroll-m-20 text-2xl font-semibold tracking-tight font-display" />
                        <TypographySample name="H4" type="xl / Semibold" className="scroll-m-20 text-xl font-semibold tracking-tight font-display" />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Body (Inter)</h3>
                        <TypographySample name="Lead" type="xl / Regular" className="text-xl text-muted-foreground" />
                        <TypographySample name="Large" type="lg / Semibold" className="text-lg font-semibold" />
                        <TypographySample name="P (Base)" type="base / Regular" className="leading-7" />
                        <TypographySample name="Small" type="sm / Medium" className="text-sm font-medium leading-none" />
                        <TypographySample name="Muted" type="sm / Regular" className="text-sm text-muted-foreground" />
                    </div>
                </div>

                <div className="space-y-4 mt-8">
                    <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Trading Data (JetBrains Mono)</h3>
                    <div className="grid md:grid-cols-3 gap-8 p-6 bg-card rounded-xl border border-border">
                        <div className="space-y-2">
                            <span className="text-xs text-muted-foreground">Price Up</span>
                            <div className="font-mono text-2xl text-success tabular-nums">42,150.80</div>
                        </div>
                        <div className="space-y-2">
                            <span className="text-xs text-muted-foreground">Price Down</span>
                            <div className="font-mono text-2xl text-destructive tabular-nums">41,980.50</div>
                        </div>
                        <div className="space-y-2">
                            <span className="text-xs text-muted-foreground">Volume</span>
                            <div className="font-mono text-lg text-muted-foreground tabular-nums">1.542 BTC</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Radius Section */}
            <section className="space-y-6">
                <h2 className="text-2xl font-semibold border-b border-border pb-2">Radius</h2>
                <div className="flex flex-wrap gap-8 items-end">
                    <div className="flex flex-col gap-2 items-center">
                        <div className="w-16 h-16 bg-secondary rounded-none border border-white/10" />
                        <span className="text-xs font-mono">none (0)</span>
                    </div>
                    <div className="flex flex-col gap-2 items-center">
                        <div className="w-16 h-16 bg-secondary rounded-sm border border-white/10" />
                        <span className="text-xs font-mono">sm (6px)</span>
                    </div>
                    <div className="flex flex-col gap-2 items-center">
                        <div className="w-16 h-16 bg-secondary rounded-md border border-white/10" />
                        <span className="text-xs font-mono">md (8px)</span>
                    </div>
                    <div className="flex flex-col gap-2 items-center">
                        <div className="w-16 h-16 bg-secondary rounded-lg border border-white/10" />
                        <span className="text-xs font-mono">lg (12px)</span>
                    </div>
                    <div className="flex flex-col gap-2 items-center">
                        <div className="w-16 h-16 bg-secondary rounded-xl border border-white/10" />
                        <span className="text-xs font-mono">xl (16px)</span>
                    </div>
                    <div className="flex flex-col gap-2 items-center">
                        <div className="w-16 h-16 bg-secondary rounded-2xl border border-white/10" />
                        <span className="text-xs font-mono">2xl (20px)</span>
                    </div>
                    <div className="flex flex-col gap-2 items-center">
                        <div className="w-16 h-16 bg-secondary rounded-3xl border border-white/10" />
                        <span className="text-xs font-mono">3xl (24px)</span>
                    </div>
                    <div className="flex flex-col gap-2 items-center">
                        <div className="w-16 h-16 bg-secondary rounded-full border border-white/10" />
                        <span className="text-xs font-mono">full</span>
                    </div>
                </div>
            </section>
            {/* Sitemap Section for Capture */}
            <section className="space-y-6">
                <h2 className="text-2xl font-semibold border-b border-border pb-2">Screens & Sitemap</h2>
                <p className="text-muted-foreground">Quick links to all main application screens for design capture.</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <a href="/" className="p-4 rounded-lg border border-border bg-card hover:bg-secondary/20 transition-colors">
                        <span className="font-semibold block mb-1">Landing Page</span>
                        <span className="text-xs text-muted-foreground font-mono">/</span>
                    </a>
                    <a href="/exchange" className="p-4 rounded-lg border border-border bg-card hover:bg-secondary/20 transition-colors">
                        <span className="font-semibold block mb-1">Exchange (Trade)</span>
                        <span className="text-xs text-muted-foreground font-mono">/exchange</span>
                    </a>
                    <a href="/wallet" className="p-4 rounded-lg border border-border bg-card hover:bg-secondary/20 transition-colors">
                        <span className="font-semibold block mb-1">Wallet</span>
                        <span className="text-xs text-muted-foreground font-mono">/wallet</span>
                    </a>
                    <a href="/swap" className="p-4 rounded-lg border border-border bg-card hover:bg-secondary/20 transition-colors">
                        <span className="font-semibold block mb-1">Swap</span>
                        <span className="text-xs text-muted-foreground font-mono">/swap</span>
                    </a>
                    <a href="/mypage" className="p-4 rounded-lg border border-border bg-card hover:bg-secondary/20 transition-colors">
                        <span className="font-semibold block mb-1">My Page</span>
                        <span className="text-xs text-muted-foreground font-mono">/mypage</span>
                    </a>
                    <a href="/signup" className="p-4 rounded-lg border border-border bg-card hover:bg-secondary/20 transition-colors">
                        <span className="font-semibold block mb-1">Sign Up</span>
                        <span className="text-xs text-muted-foreground font-mono">/signup</span>
                    </a>
                    <a href="/login" className="p-4 rounded-lg border border-border bg-card hover:bg-secondary/20 transition-colors">
                        <span className="font-semibold block mb-1">Login</span>
                        <span className="text-xs text-muted-foreground font-mono">/login</span>
                    </a>
                    <a href="/verification" className="p-4 rounded-lg border border-border bg-card hover:bg-secondary/20 transition-colors">
                        <span className="font-semibold block mb-1">Verification</span>
                        <span className="text-xs text-muted-foreground font-mono">/verification</span>
                    </a>
                </div>
            </section>
        </div>
    );
};

export default DesignSystemPage;
