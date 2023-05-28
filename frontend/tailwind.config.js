/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "light-primary": "#53B6A1",
        primary: "#329985",
        "dark-primary": "#007D6A",
        "light-secondary": "#E6DAA6",
        secondary: "#B5AA78",
        "dark-secondary": "#867D4D",
        "light-black": "#323238",
        black: "#121214",
        "light-gray": "#E1E1E6",
        gray: "#AFAFB4",
        "dark-gray": "#808085",
      },
    },
  },
  plugins: [],
};
