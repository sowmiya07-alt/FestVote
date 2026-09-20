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
          50: '#f4f6fb',
          100: '#e7ecf5',
          200: '#cedae8',
          300: '#a5bed7',
          400: '#759dc2',
          500: '#5280ab',
          600: '#3f6790',
          700: '#335375',
          800: '#2d4661',
          900: '#283c51',
          950: '#1b2635',
        },
      },
    },
  },
  plugins: [],
}
