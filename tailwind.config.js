/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      orbitron: ["Orbitron Variable", "sans-serif"],
    },
    extend: {
      colors: {
        lightBackground: "#ffffe1",
      },
    },
  },
  plugins: [],
};
