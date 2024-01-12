/** @type {import('tailwindcss').Config} */
module.exports = {
  // prevent conflict with bootstrap
  prefix: 'tw-',
  content: [
    "./src/app/admin/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

