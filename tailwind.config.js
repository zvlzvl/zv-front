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
          "primary": "#f412a2",
          "primary-content": "#e2dfda",
          "neutral": "#e9e2d0",
          "neutral-content": "#1d2026",
          "base-100": "#2d3338",
          "base-200": "#363b45",
          "base-300": "#62627a",
          "base-content": "#e2dfda",
          "secondary": "#00A3FF",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};