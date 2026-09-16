export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        studio: {
          950: '#090b0e',
          900: '#0f1319',
          850: '#151b24',
          800: '#1c2430',
          700: '#2a3647',
          600: '#3d4d63',
          500: '#5a6e8a',
          400: '#8297b5',
          300: '#adbcd4',
          200: '#d5e0f0',
          100: '#ebf1fa',
          50: '#f5f8fc',
        },
        amberGold: {
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        },
        cyanAccent: {
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'studio-glow': '0 0 25px -5px rgba(14, 165, 233, 0.15)',
        'amber-glow': '0 0 25px -5px rgba(245, 158, 11, 0.2)',
        'cyan-glow': '0 0 20px -3px rgba(6, 182, 212, 0.5)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleUp: {
          '0%': { opacity: '0', transform: 'scale(0.95) translateY(10px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 200ms cubic-bezier(0.16, 1, 0.3, 1)',
        scaleUp: 'scaleUp 250ms cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
