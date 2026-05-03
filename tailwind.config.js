/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        hero: '#0a0a0f',
        section: {
          white: '#ffffff',
          'orange-subtle': '#fff9f5',
          'emerald-subtle': '#f7fef9',
        },
        accent: {
          orange: {
            50: '#fff5ed',
            100: '#ffe8d5',
            200: '#fed7b0',
            300: '#fcb87f',
            400: '#f9934d',
            500: '#f97316',
            600: '#ea580c',
            700: '#c2410c',
            800: '#9a3412',
          },
        },
        emerald: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          '"SF Pro Display"',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'sans-serif',
        ],
        serif: [
          '"Lyon Text"',
          'ui-serif',
          'Georgia',
          'Cambria',
          '"Times New Roman"',
          'Times',
          'serif',
        ],
      },
      backgroundImage: {
        'gradient-orange-emerald': 'linear-gradient(135deg, #f97316 0%, #10b981 100%)',
        'gradient-warm': 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
        'gradient-cool': 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        'gradient-hero-text': 'linear-gradient(135deg, #fb923c 0%, #34d399 100%)',
      },
      boxShadow: {
        card: '0 24px 60px -32px rgba(15, 23, 42, 0.28)',
        'card-hover': '0 28px 80px -32px rgba(15, 23, 42, 0.36)',
        'glow-orange': '0 18px 60px rgba(249, 115, 22, 0.22)',
        'glow-emerald': '0 18px 60px rgba(16, 185, 129, 0.2)',
        'glow-mixed': '0 20px 70px rgba(249, 115, 22, 0.16), 0 20px 70px rgba(16, 185, 129, 0.12)',
        'glow-sm-orange': '0 0 24px rgba(249, 115, 22, 0.4)',
        'glow-sm-emerald': '0 0 24px rgba(16, 185, 129, 0.35)',
        'dark-card': '0 8px 32px rgba(0, 0, 0, 0.4)',
        'dark-card-hover': '0 16px 48px rgba(0, 0, 0, 0.6)',
      },
      animation: {
        'gradient-shift': 'gradient-shift 8s ease infinite',
        'mesh-drift-1': 'mesh-drift-1 24s ease-in-out infinite',
        'mesh-drift-2': 'mesh-drift-2 30s ease-in-out infinite',
        'mesh-drift-3': 'mesh-drift-3 20s ease-in-out infinite',
        'nav-underline': 'nav-underline 0.3s ease forwards',
        'pulse-ring': 'pulse-ring 2.4s ease-out infinite',
        'count-up': 'count-up 1s ease-out forwards',
      },
      keyframes: {
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'mesh-drift-1': {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(60px, -40px) scale(1.08)' },
          '66%': { transform: 'translate(-30px, 50px) scale(0.96)' },
        },
        'mesh-drift-2': {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '40%': { transform: 'translate(-50px, 30px) scale(1.1)' },
          '70%': { transform: 'translate(40px, -20px) scale(0.94)' },
        },
        'mesh-drift-3': {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '50%': { transform: 'translate(30px, 40px) scale(1.06)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(1)', opacity: '0.6' },
          '100%': { transform: 'scale(2.2)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
