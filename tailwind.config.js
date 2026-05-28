/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        beige: {
          50: '#FEFDFB',
          100: '#FAF7F2',
          200: '#F5EFE6',
          300: '#EBE3D6',
          400: '#DDD1BE',
        },
        ivory: {
          50: '#FFFEF9',
          100: '#FBF8F0',
          200: '#F7F2E8',
        },
        cream: {
          DEFAULT: '#F5EFE6',
          light: '#FAF7F2',
        },
        brown: {
          600: '#5C4033',
          700: '#4A3628',
          800: '#3D2B1F',
          900: '#2C1F16',
        },
        bronze: {
          300: '#D4B896',
          400: '#C4A574',
          500: '#A68B5B',
          600: '#8B7355',
          700: '#6F5A42',
        },
        gold: {
          400: '#C9A962',
          500: '#B8984A',
          600: '#9A7D3C',
        },
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.25rem',
      },
      boxShadow: {
        soft: '0 2px 12px rgba(60, 40, 25, 0.06)',
        warm: '0 4px 24px rgba(60, 40, 25, 0.07)',
        bronze: '0 4px 20px rgba(166, 139, 91, 0.12)',
      },
    },
  },
  plugins: [],
};
