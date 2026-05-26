/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        outfit: ['Outfit', 'system-ui', 'sans-serif'],
        jakarta: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
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
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        amber: {
          DEFAULT: '#059669',
          hover: '#047857',
          glow: 'rgba(5, 150, 105, 0.25)',
        },
        brand: {
          DEFAULT: '#059669',
          hover: '#047857',
          light: '#10B981',
          deep: '#064E3B',
          glow: 'rgba(5, 150, 105, 0.25)',
        },
        teal: '#0D9488',
        purple: '#7C3AED',
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        glow: "0 0 24px rgba(5, 150, 105, 0.3)",
        'glow-lg': "0 0 40px rgba(5, 150, 105, 0.3)",
        card: "0 8px 32px rgba(0,0,0,0.3)",
        whatsapp: "0 4px 16px rgba(37, 211, 102, 0.4)",
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
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "ticker-scroll-left": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "ticker-scroll-right": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(5, 150, 105, 0.18)" },
          "50%": { boxShadow: "0 0 40px rgba(16, 185, 129, 0.4)" },
        },
        "whatsapp-pulse": {
          "0%": { boxShadow: "0 0 0 0 rgba(37, 211, 102, 0.4)" },
          "70%": { boxShadow: "0 0 0 12px rgba(37, 211, 102, 0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(37, 211, 102, 0)" },
        },
        "particle-drift": {
          "0%, 100%": { transform: "translateY(0) translateX(0)", opacity: "0.2" },
          "50%": { transform: "translateY(-20px) translateX(10px)", opacity: "0.4" },
        },
        "border-gradient": {
          "0%, 100%": { borderColor: "rgba(139, 92, 246, 0.5)" },
          "50%": { borderColor: "rgba(59, 130, 246, 0.5)" },
        },
        "float": {
          "0%, 100%": { transform: "rotateX(5deg) rotateY(-5deg) translateY(0)" },
          "50%": { transform: "rotateX(5deg) rotateY(-5deg) translateY(-12px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "ticker-left": "ticker-scroll-left 40s linear infinite",
        "ticker-right": "ticker-scroll-right 50s linear infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "whatsapp-pulse": "whatsapp-pulse 2s infinite",
        "particle-drift": "particle-drift 20s ease-in-out infinite",
        "border-gradient": "border-gradient 4s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
