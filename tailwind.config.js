/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FFFEFB',
          100: '#FAF7F2',
          200: '#F5F0E8',
          300: '#EBE3D6',
          400: '#DDD1BE',
          DEFAULT: '#FAF7F2',
        },
        secondary: {
          50: '#F0EBE6',
          100: '#D9CFC4',
          200: '#B8A898',
          300: '#8B7355',
          400: '#6B5344',
          500: '#5C4A3A',
          600: '#4A3A2C',
          700: '#3D2E1F',
          800: '#2E2218',
          900: '#221A12',
          DEFAULT: '#3D2E1F',
        },
        beige: {
          50: '#FFFEFB',
          100: '#FAF7F2',
          200: '#F5F0E8',
          300: '#EBE3D6',
          400: '#DDD1BE',
        },
        brown: {
          600: '#5C4A3A',
          700: '#4A3A2C',
          800: '#3D2E1F',
          900: '#2E2218',
        },
        ivory: {
          50: '#FFFEFB',
          100: '#FAF7F2',
          200: '#F5F0E8',
        },
        cream: {
          DEFAULT: '#F5F0E8',
          light: '#FAF7F2',
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
        soft: '0 2px 12px rgba(34, 26, 18, 0.06)',
        warm: '0 4px 24px rgba(34, 26, 18, 0.08)',
        secondary: '0 4px 20px rgba(61, 46, 31, 0.12)',
      },
    },
  },
  plugins: [],
};
