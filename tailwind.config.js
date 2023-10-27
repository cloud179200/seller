/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        "bounce-once": "bounce-one .5s ease-in-out",
        "appearance-once": "appearance .2s ease-in-out",
        "shake-twice": "shake 0.15s linear 2"
      },
      keyframes: {
        "bounce-one": {
          '0%': { transform: 'translateY(-0.5rem)' },
          '75%': { transform: 'translateY(0.25rem)' },
          '100%': { transform: 'translateY(0)' },
        },
        "appearance": {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        "shake":{
          "0%, 100%": {transform: "translateX(0) rotate(0deg)"},
          "25%" : {transform: "translateX(-0.5rem)"},
          "75%" : {transform: "translateX(0.5rem)"},
        }
      },
      fontFamily:{
        "roboto-slab": ['"Roboto Slab", sans-serif'],
        "san-francisco": ['"SF Pro Text", sans-serif']
      }
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: ["light", "dark", "cupcake", "bumblebee"],
  },
}