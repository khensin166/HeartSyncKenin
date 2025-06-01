// tailwind.config.js
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}', './node_modules/flowbite/**/*.js'],
  safelist: ['bg-soft-pink'],
  theme: {
    extend: {
      colors: {
        'soft-pink': '#ffdcdc',
      },
    },
  },
  plugins: [require('flowbite/plugin')],
}
