/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary-blue': '#2563eb',
        'primary-blue-light': '#3b82f6',
        'primary-blue-dark': '#1d4ed8',
        'primary-purple': '#7c3aed',
        'primary-purple-light': '#8b5cf6',
        'primary-purple-dark': '#6d28d9',
        'primary-pink': '#ec4899',
        'primary-pink-light': '#f472b6',
        'primary-pink-dark': '#db2777',
        'primary-teal': '#0891b2',
        'primary-teal-light': '#06b6d4',
        'primary-teal-dark': '#0e7490',
        'primary-green': '#10b981',
        'primary-green-light': '#34d399',
        'primary-green-dark': '#059669',

        // Secondary Colors
        'secondary-orange': '#f97316',
        'secondary-orange-light': '#fb923c',
        'secondary-orange-dark': '#ea580c',
        'secondary-green': '#10b981',
        'secondary-green-light': '#34d399',
        'secondary-green-dark': '#059669',
        'secondary-pink': '#ec4899',
        'secondary-pink-light': '#f472b6',
        'secondary-pink-dark': '#db2777',

        // Neutral Colors
        'dark-blue': '#1e293b',
        'dark-gray': '#334155',
        'medium-gray': '#64748b',
        'light-gray': '#94a3b8',
        'very-light-gray': '#e2e8f0',
        'lighter-gray': '#f1f5f9',
        'off-white': '#f8fafc',
        'white': '#ffffff',
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
        display: ['Sora', 'sans-serif'],
        mono: ['Fira Code', 'Courier New', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '112': '28rem',
        '128': '32rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-subtle': 'bounceSubtle 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
    },
  },
  plugins: [],
}
