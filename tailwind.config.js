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
        blueBackground: "#1F3057",
        borderNotSelected: "#B3ACA6",
        warn: "#FC024B",
      },
    },
  },
  plugins: [],
};
