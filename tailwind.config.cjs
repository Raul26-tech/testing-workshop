/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "gmov-purple": {
          100: "#9E6BAB",
        },
      },
    },
  },
  plugins: [],
};
