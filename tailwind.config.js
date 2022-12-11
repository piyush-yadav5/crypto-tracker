/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  important: "#root",
  theme: {
    colors: {
      white: '#fff',
      gold: '#FFD700',
      red: '#F4210F',
      green: '#37DA2F',
      backCol: '#14161a',
    },
    extend: {
      backgroundImage: {
        'hero-pattern': "url('../public/endless-constellation.svg')",
        'background': "radial-gradient(circle at 24.1% 68.8%, rgb(50, 50, 50) 0%, rgb(0, 0, 0) 99.4%)",
        'hoverBackground': "linear-gradient(89.7deg, rgb(0, 32, 95) 2.8%, rgb(132, 53, 142) 97.8%);",
      },
      fontFamily: {
        Montserrat: ['Montserrat', 'sans-serif'],
       },
    },
  },
  plugins: [],
}
