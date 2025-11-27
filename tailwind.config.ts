import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep blacks & charcoals
        'deep-black': '#0a0a0a',
        'charcoal': {
          900: '#0a0f1a',
          800: '#1a1f2a',
          700: '#2a2f3a',
        },
        // Cold blues
        'ice-blue': {
          900: '#1e3a8a',
          800: '#1e40af',
          700: '#1d4ed8',
          600: '#2563eb',
          500: '#3b82f6',
          400: '#60a5fa',
        },
        // Snow whites
        'snow': {
          100: '#ffffff',
          200: '#f8f9fa',
          300: '#f1f3f5',
        },
        // Warm golds (chalet/interior accents)
        'warm-gold': {
          600: '#d97706',
          500: '#f59e0b',
          400: '#fbbf24',
          300: '#fcd34d',
        },
        // Additional accent colors
        'electric-purple': '#a855f7',
        'forest-green': '#10b981',
      },
      fontFamily: {
        'heading': ['var(--font-oswald)', 'sans-serif'],
        'body': ['var(--font-inter)', 'sans-serif'],
        'sans': ['var(--font-inter)', 'sans-serif'],
      },
      fontSize: {
        'hero': ['4rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'title': ['2.5rem', { lineHeight: '1.2' }],
        'subtitle': ['2rem', { lineHeight: '1.3' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '128': '32rem',
        '144': '36rem',
      },
      animation: {
        'snow-fall': 'snowFall 10s linear infinite',
        'wind-sway': 'windSway 8s ease-in-out infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'film-grain': 'filmGrain 0.5s steps(1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'fade-in': 'fadeIn 0.8s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
      },
      keyframes: {
        snowFall: {
          '0%': { transform: 'translateY(-100vh) translateX(0)' },
          '100%': { transform: 'translateY(100vh) translateX(50px)' },
        },
        windSway: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(20px)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.5', filter: 'blur(10px)' },
          '50%': { opacity: '1', filter: 'blur(15px)' },
        },
        filmGrain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-5%, -10%)' },
          '30%': { transform: 'translate(3%, -15%)' },
          '50%': { transform: 'translate(12%, 9%)' },
          '70%': { transform: 'translate(9%, 4%)' },
          '90%': { transform: 'translate(-1%, 7%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(50px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      backdropBlur: {
        'xs': '2px',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(251, 191, 36, 0.5)',
        'glow-blue': '0 0 20px rgba(59, 130, 246, 0.5)',
        'inner-glow': 'inset 0 0 20px rgba(251, 191, 36, 0.3)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-cold': 'linear-gradient(to bottom, #0a0f1a, #1e3a8a)',
        'gradient-warm': 'radial-gradient(circle at center, #fbbf24, #f59e0b)',
      },
    },
  },
  plugins: [],
};

export default config;
