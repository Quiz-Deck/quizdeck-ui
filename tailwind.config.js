/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#350B95",
        primaryDark: "#1162C3",
        primary100: "#EFE9FD",
        secondary: "#F8C159",
        text: {
          black: "#000000",
          neutral: "#6F6F79",
        },
      },
    },
  },
  plugins: [],
};
