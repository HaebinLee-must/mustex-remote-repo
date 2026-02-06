import { fontFamily } from './src/design-system/typography';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            colors: {
                // 기존 커스텀 색상 유지 및 HSL 변수 연결
                primary: {
                    DEFAULT: "hsl(247 100% 62%)", // Updated to #593FFF
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                success: {
                    DEFAULT: 'hsl(var(--success))',
                    foreground: 'hsl(var(--success-foreground))',
                },
                danger: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))',
                },
                text: 'hsl(var(--foreground))',
                dark: {
                    main: 'hsl(var(--background))',
                    surface: 'hsl(var(--card))',
                    input: 'hsl(var(--input))',
                    text: 'hsl(var(--foreground))',
                    muted: 'hsl(var(--muted-foreground))',
                    border: 'hsl(var(--border))'
                },
                // shadcn/ui 색상 변수
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
            },
            fontFamily: {
                sans: fontFamily.sans,
                display: fontFamily.display,
                mono: fontFamily.mono,
            },
            borderRadius: {
                // Unified Radius System
                // Use semantic names for consistency across components
                'none': '0',
                'sm': '6px',      // Small elements: tags, tiny badges
                'DEFAULT': '8px', // Base radius
                'md': '8px',      // Same as default
                'lg': '12px',     // Buttons, inputs, dropdowns
                'xl': '16px',     // Cards, panels, list items
                '2xl': '20px',    // Large cards, modals
                '3xl': '24px',    // Hero cards, special containers
                'full': '9999px', // Circular: avatars, dots, pills
            },
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
}