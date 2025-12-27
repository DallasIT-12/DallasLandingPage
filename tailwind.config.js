/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'sans-serif'],
      },
      colors: {
        dallas: {
          1: '#001D39',
          2: '#0A4174',
          3: '#49769F',
          4: '#4E8EA2',
          5: '#6EA2B3',
          6: '#7BBDE8',
          7: '#BDD8E9',
        }
      },
      backdropBlur: {
        'md': '12px',
      }
    },
  },
  plugins: [],
}