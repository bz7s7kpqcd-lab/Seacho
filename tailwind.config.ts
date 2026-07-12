import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // Seacho token system — "flight instrument" direction
        ink: {
          950: '#07070C', // deep instrument-panel black
          900: '#0B0B12',
          800: '#12121C',
          700: '#1A1A27',
          600: '#252536',
        },
        glass: 'rgba(255,255,255,0.04)',
        border: 'rgba(255,255,255,0.08)',
        signal: {
          // amber "heading bug" accent — momentum / direction
          DEFAULT: '#F5A623',
          soft: '#F5C263',
          dim: 'rgba(245,166,35,0.15)',
        },
        alt: {
          // cool indigo secondary — used sparingly for AI/assistant surfaces
          DEFAULT: '#7C8CF8',
          dim: 'rgba(124,140,248,0.15)',
        },
        good: '#3ECF8E',
        warn: '#F5A623',
        bad: '#F2555A',
      },
      fontFamily: {
        display: ['var(--font-display)', 'ui-sans-serif', 'system-ui'],
        body: ['var(--font-body)', 'ui-sans-serif', 'system-ui'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      backgroundImage: {
        'radar-sweep': 'conic-gradient(from 0deg, transparent 0%, rgba(245,166,35,0.25) 8%, transparent 16%)',
        'grid-fade': 'radial-gradient(circle at 50% 0%, rgba(124,140,248,0.08), transparent 60%)',
      },
      keyframes: {
        sweep: { '0%': { transform: 'rotate(0deg)' }, '100%': { transform: 'rotate(360deg)' } },
        'fade-up': { '0%': { opacity: '0', transform: 'translateY(6px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
      },
      animation: {
        sweep: 'sweep 6s linear infinite',
        'fade-up': 'fade-up 0.4s ease-out',
      },
    },
  },
  plugins: [],
};

export default config;
