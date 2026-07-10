/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f2f9f2',
          100: '#e1f0e1',
          200: '#c5e2c5',
          300: '#9bca9a',
          400: '#6bab69',
          500: '#4caf50', // Yuka main green
          600: '#3b933f',
          700: '#317534',
          800: '#295d2c',
          900: '#224e25',
          950: '#0f2a11',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
