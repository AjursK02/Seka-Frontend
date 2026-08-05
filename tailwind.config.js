/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        content: "480px",
      },
      colors: {
        background: "#fcf9f8",
        surface: "#ffffff",
        "surface-muted": "#f6f1ee",
        "surface-strong": "#efe6e2",
        primary: "#b6212a",
        "primary-strong": "#8f1820",
        "primary-soft": "#fbeaec",
        accent: "#fe826c",
        outline: "#e5d5d1",
        text: "#1e1b18",
        "text-muted": "#6d5c58",
      },
      fontFamily: {
        body: ["Manrope", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Libre Caslon Text", "Georgia", "serif"],
      },
      boxShadow: {
        soft: "0 12px 32px rgba(91, 37, 26, 0.08)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
    },
  },
  plugins: [],
}
