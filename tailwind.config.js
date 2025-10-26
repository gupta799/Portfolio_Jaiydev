/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Section background colors for visual variety
        section: {
          white: '#ffffff',
          'orange-subtle': '#fff9f5',
          'emerald-subtle': '#f7fef9',
        },
        // Anthropic-inspired orange accent
        accent: {
          orange: {
            50: '#fff5ed',
            100: '#ffe8d5',
            200: '#fed7b0',
            300: '#fcb87f',
            400: '#f9934d',
            500: '#f97316', // Primary orange
            600: '#ea580c',
            700: '#c2410c',
            800: '#9a3412',
          },
        },
        // OpenAI-inspired teal/emerald accent
        emerald: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981', // Primary emerald
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
      },
      boxShadow: {
        card: '0 24px 60px -32px rgba(15, 23, 42, 0.28)',
        'card-hover': '0 28px 80px -32px rgba(15, 23, 42, 0.36)',
        'glow-orange': '0 18px 60px rgba(249, 115, 22, 0.22)',
        'glow-emerald': '0 18px 60px rgba(16, 185, 129, 0.2)',
        'glow-mixed': '0 20px 70px rgba(249, 115, 22, 0.16), 0 20px 70px rgba(16, 185, 129, 0.12)',
      },
      animation: {
        'gradient-shift': 'gradient-shift 8s ease infinite',
      },
      keyframes: {
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
}
