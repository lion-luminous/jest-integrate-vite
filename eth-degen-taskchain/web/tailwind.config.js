/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'orbitron': ['Orbitron', 'monospace'],
      },
      colors: {
        'cyber-cyan': '#06b6d4',
        'cyber-purple': '#8b5cf6',
        'cyber-pink': '#ec4899',
        'cyber-dark': '#0f0f23',
      }
    },
  },
  plugins: [],
}