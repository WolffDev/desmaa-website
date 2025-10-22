import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Custom colors from existing design
        primary: {
          DEFAULT: '#fc5a30',
          dark: '#e04a20',
        },
        secondary: {
          DEFAULT: '#fba438',
          dark: '#e99428',
        },
        // Light mode
        'bg-light': 'rgb(240, 240, 240)',
        'surface-light': 'rgba(121, 121, 121, 0.56)',
        'on-bg-light': '#3e3e3e',
        'on-surface-light': '#333',
        // Dark mode
        'bg-dark': '#121212',
        'surface-dark': 'rgba(51, 51, 51, 0.91)',
        'on-bg-dark': '#ffffff',
        'on-surface-dark': '#ffffff',
        // UI colors
        ui: {
          bright: '#e0d6eb',
          light: '#f5f3f7',
          whisper: '#fbfafc',
          descent: '#133144',
        },
        shades: {
          grey: '#afafaf',
        },
      },
      fontFamily: {
        sans: [
          'Century Gothic',
          'Segoe UI',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          'Fira Sans',
          'Droid Sans',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
        serif: ['Georgia', 'Times New Roman', 'Times', 'serif'],
        mono: ['Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
      },
      fontSize: {
        sm: '13px',
        base: '16px',
        lg: '18px',
        'heading-1': '2.441rem',
        'heading-2': '1.953rem',
        'heading-3': '1.563rem',
        'heading-4': '1.25rem',
      },
      lineHeight: {
        normal: '1.45',
        heading: '1.2',
      },
      boxShadow: {
        primary: '0 9px 25px 0 rgb(8 14 23 / 28%)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
} satisfies Config
