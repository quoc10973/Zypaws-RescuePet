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
        dancing: ['Dancing Script', 'cursive'],
        playwrite: ['Playwrite IN', "serif"],
        lora: ['Lora', 'serif'],
        signika: ['Signika Negative', 'serif'],
      },
      animation: {
        'heartbeat': "heartbeat 1.5s infinite", // define animation heartbeat
        'pulseSoft': "pulseSoft 1.5s infinite ease-in-out",
        'fade-in': 'fadeIn 1.5s ease-in forwards',
        'fade-in-delayed': 'fadeIn 2s ease-in forwards',
        'tilt': "tilt 1.5s infinite ease-in-out"
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
        pulseSoft: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.09)" },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        tilt: {
          "0%, 100%": { transform: "rotate(0deg)" },  // Bình thường
          "50%": { transform: "rotate(-1deg)" },  // Nghiêng trái nhẹ (-1 độ)
          "75%": { transform: "rotate(1deg)" },   // Nghiêng phải nhẹ (1 độ)
        },
      },
    },
  },
  plugins: [],
}

