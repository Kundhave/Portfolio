/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'charcoal': '#0f0f0d',
        'charcoal-2': '#161613',
        'charcoal-3': '#1d1d1a',
        'charcoal-4': '#252520',
        'amber': '#e07b39',
        'amber-dim': '#a85a28',
        'amber-faint': '#3d2515',
        'steel': '#4a7fa5',
        'steel-dim': '#2e5470',
        'moss': '#5a7a4a',
        'rust': '#8b3a2a',
        'cream': '#e8e0d0',
        'cream-dim': '#a09080',
        'cream-faint': '#3a3530',
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'Fira Code', 'monospace'],
        'display': ['Bebas Neue', 'Impact', 'sans-serif'],
        'body': ['DM Mono', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scan': 'scan 4s linear infinite',
        'flicker': 'flicker 8s linear infinite',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '92%': { opacity: '1' },
          '93%': { opacity: '0.8' },
          '94%': { opacity: '1' },
          '96%': { opacity: '0.9' },
          '97%': { opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
