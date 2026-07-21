/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#b6212a",
        "primary-strong": "#8f1820",
        "primary-soft": "#fbeaec",
        surface: "#f6f3f2",
        outline: "#e5e2e1",
        text: "#1c1b1b",
      },
    },
  },
  plugins: [],
}
