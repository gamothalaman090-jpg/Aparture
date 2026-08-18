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
      }
    },
  },
  plugins: [],
}
