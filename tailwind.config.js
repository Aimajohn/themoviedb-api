/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/index.html", "./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors:{
        'darkblue': '#000d21',
        'darkblue2': '#00061D'
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      spacing: {
        '500': '30rem',
      },
      animation: {
        'bounce-once': 'spin .5s linear 1',
      }
    },
    plugins: [
      require('cssnano')({
        preset: 'default',
      })
    ],
  // purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  }
}
