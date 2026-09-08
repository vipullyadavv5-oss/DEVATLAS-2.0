/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          surface: '#F8FAFC',
          card: '#FFFFFF',
          navy: '#0F172A',
          slate: '#475569',
          muted: '#64748B',
          border: '#E2E8F0',
          accent: '#2563EB',
          emerald: '#10B981',
          rose: '#EF4444',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      }
    },
  },
  plugins: [],
}
