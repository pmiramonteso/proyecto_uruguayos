/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts,scss}',
  ],
  theme: {
    extend: {
      screens: {
        '920': '920px',
      }
    },
  },
  plugins: [
    require('daisyui')
  ],
}
