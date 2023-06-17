/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#2dd4bf",
          secondary: "#fde047",
          accent: "#1fb2a6",
          neutral: "#2a323c",
          "base-100": "#f3f4f6",
          info: "#3abff8",
          success: "#36d399",
          warning: "#fbbd23",
          error: "#f87272",
        },
      },
    ],
  },
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
      },
    },
  },
  plugins: [require("daisyui")],
};
