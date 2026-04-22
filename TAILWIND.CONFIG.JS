/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'deep-black': '#000000',
        'neon-purple': '#A78BFA',
        'cyan-glow': '#06B6D4',
        'glass': 'rgba(255, 255, 255, 0.1)',
      },
      fontFamily: {
        'sarabun': ['Sarabun', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
