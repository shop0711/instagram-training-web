/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f2f7ff',
          100: '#e3efff',
          200: '#c7ddff',
          300: '#9ec4ff',
          400: '#6da3fb',
          500: '#477fe8',
          600: '#315fc4',
          700: '#294c9d',
          800: '#283f7c',
          900: '#273766',
          950: '#18213d'
        }
      },
      boxShadow: {
        soft: '0 24px 70px -32px rgba(20, 38, 76, 0.35)',
        card: '0 16px 45px -28px rgba(20, 38, 76, 0.30)',
        phone: '0 38px 90px -34px rgba(18, 28, 48, 0.45)'
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans JP', 'Hiragino Kaku Gothic ProN', 'Yu Gothic', 'Meiryo', 'sans-serif']
      },
      backgroundImage: {
        'instagram-soft': 'linear-gradient(135deg, rgba(255, 96, 126, .16), rgba(124, 89, 255, .14) 50%, rgba(49, 95, 196, .12))'
      }
    }
  },
  plugins: []
};
