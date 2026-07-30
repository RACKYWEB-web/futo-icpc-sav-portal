/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#070f20',
          900: '#0a1628',
          800: '#0f2444',
          700: '#163256',
          600: '#1d4270',
        },
        gold: {
          300: '#e8c766',
          400: '#dcb94a',
          500: '#c9a338',
          600: '#a9822a',
        },
        ink: {
          900: '#10131a',
          700: '#3a4150',
          500: '#6b7280',
        },
        paper: '#ffffff',
        mist: '#f6f7fb',
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(10,22,40,0.04), 0 8px 24px rgba(10,22,40,0.08)',
        cardHover: '0 4px 8px rgba(10,22,40,0.06), 0 16px 40px rgba(10,22,40,0.12)',
        gold: '0 8px 30px rgba(201,163,56,0.25)',
      },
      keyframes: {
        rise: {
          '0%': { opacity: 0, transform: 'translateY(16px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        flow: {
          '0%': { strokeDashoffset: 240 },
          '100%': { strokeDashoffset: 0 },
        },
        pulseSoft: {
          '0%,100%': { opacity: 1 },
          '50%': { opacity: 0.55 },
        },
      },
      animation: {
        rise: 'rise 0.6s cubic-bezier(0.16,1,0.3,1) both',
        flow: 'flow 2.4s linear infinite',
        pulseSoft: 'pulseSoft 2.2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
