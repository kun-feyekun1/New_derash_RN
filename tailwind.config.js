/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],   // ← This line was missing
  theme: {
    extend: {
      colors: {
        primary: "#00ff9f",
      },
    },
  },
  plugins: [],
};
