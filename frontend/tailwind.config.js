/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        quicksand: ['Quicksand', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      animation: {
        heartbeat: "heartbeat 1.5s infinite", // define animation heartbeat
      },
      keyframes: {
        heartbeat: {
          "0%, 100%": {
            transform: "scale(1)", // state begin and end
          },
          "25%": {
            transform: "scale(1.1)", // expand at 25% time
          },
          "50%": {
            transform: "scale(1.2)", // expand at 50% time
          },
          "75%": {
            transform: "scale(1.1)", // expand at 75% time
          },
        },
      },
    },
  },
  plugins: [],
}

