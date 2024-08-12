/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        "auto-fill": "repeat(auto-fill, minmax(25px,1fr))",
        "auto-fit-100": "repeat(auto-fit, minmax(20px, 1fr))",
      },
    },
  },
  plugins: [],
};
