/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: { 50: '#effcf9', 100: '#d6f7ef', 200: '#afeedd', 300: '#7de0c8', 400: '#4acbb0', 500: '#25ad95', 600: '#168b79', 700: '#146f63', 800: '#145950', 900: '#134a43' },
        ink: '#12212f',
      },
      boxShadow: { soft: '0 10px 30px rgba(15, 78, 72, 0.08)' },
      fontFamily: { sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'] },
    },
  },
  plugins: [],
}
