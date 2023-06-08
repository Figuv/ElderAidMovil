/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#81cfaa",
        secondary: "#5BBF94",
        tertiary: "#32AE80",
        quaternary: "#2A8663",
        quinary: "#1E5F47",
        senary: "#123B2C",
        black: "#0A1A15",
        white: "#CEF1D8",

      },
      
    },
  },
  plugins: [],
};
