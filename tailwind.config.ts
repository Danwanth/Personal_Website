import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#080808',
        carbon: '#111111',
        graphite: '#1b1b1b',
        ember: '#f96d37',
        volt: '#c7ff2f',
      },
      fontFamily: {
        display: ['Satoshi', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 70px rgba(249, 109, 55, 0.25)',
        'lime-glow': '0 0 65px rgba(199, 255, 47, 0.18)',
      },
      backgroundImage: {
        'radial-grid':
          'radial-gradient(circle at center, rgba(255,255,255,0.12) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
};

export default config;
