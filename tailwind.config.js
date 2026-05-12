/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#00c853',
        'primary-dark': '#009624',
        dark: '#0a0f1e',
        'dark-2': '#111827',
        'dark-3': '#1f2937',
        'dark-4': '#374151',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
