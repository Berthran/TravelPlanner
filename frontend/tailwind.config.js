/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  theme: {
    extend: {
      colors: {
        'light-pink': '#f8d7da',
        'light-blue': '#d1ecf1',
        'blue': '#007bff',
        'dark-blue': '#0056b3',
        'black': '#000000',
      },
      fontFamily: {
        cursive: ['"Dancing Script"', 'cursive'],
        quicksand: ['"Quicksand"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}


