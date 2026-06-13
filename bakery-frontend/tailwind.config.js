/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FDF6EC',
        beige: '#F5E6D3',
        brown: {
          50: '#FDF6EC',
          100: '#F5E6D3',
          200: '#E8C9A0',
          300: '#D4A56A',
          400: '#C4874A',
          500: '#8B5E3C',
          600: '#6B4423',
          700: '#4A2C13',
          800: '#2D1A0A',
          900: '#1A0F05',
        },
        pink: {
          50: '#FFF0F5',
          100: '#FFD6E7',
          200: '#FFB3CF',
          300: '#FF8FAE',
          400: '#FF6B91',
          500: '#E84D72',
        },
        gold: {
          100: '#FFF8E1',
          200: '#FFE082',
          300: '#FFD54F',
          400: '#FFCA28',
          500: '#FFC107',
          600: '#E6A817',
        }
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"Lato"', 'sans-serif'],
        accent: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-in': 'slideIn 0.5s ease-out forwards',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 1.5s infinite',
      },
      keyframes: {
        fadeUp: { '0%': { opacity: 0, transform: 'translateY(30px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
        fadeIn: { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        slideIn: { '0%': { opacity: 0, transform: 'translateX(-20px)' }, '100%': { opacity: 1, transform: 'translateX(0)' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
      },
      boxShadow: {
        'warm': '0 4px 24px rgba(139, 94, 60, 0.12)',
        'warm-lg': '0 8px 40px rgba(139, 94, 60, 0.18)',
        'card': '0 2px 16px rgba(139, 94, 60, 0.10)',
      }
    },
  },
  plugins: [],
}
