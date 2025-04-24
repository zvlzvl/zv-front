/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: '420px', // Custom breakpoint for 400px
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#fefaf8",
          "primary-content": "#333334",
          "base-content": "#DCDCDC",
          "secondary": "#d40091",
          "neutral": "#222324",
          "neutral-content": "#1d2026",

        },
      },
    ],
  },
  plugins: [require("daisyui")],
};