/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/index.html", "./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors:{
        'darkblue': '#000d21'
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
    },
    spacing: {
      '-10': '-2.5rem',
    }
    },
  },
  plugins: [],
  // purge: ["./src/**/*.{js,jsx,ts,tsx}"],
}
