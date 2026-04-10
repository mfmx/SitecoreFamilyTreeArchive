import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      boxShadow: {
        soft: '0 12px 32px rgba(15, 23, 42, 0.10)',
      },
      backgroundImage: {
        'hero-grid': 'linear-gradient(to right, rgba(148, 163, 184, 0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(148, 163, 184, 0.12) 1px, transparent 1px)',
      },
      backgroundSize: {
        'hero-grid': '32px 32px',
      },
      colors: {
        brand: {
          ink: '#0f172a',
          sand: '#f8fafc',
          line: '#cbd5e1',
          wash: '#eef2ff',
        },
      },
    },
  },
  plugins: [],
};

export default config;
