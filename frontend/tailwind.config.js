/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#f45925",
        "background-light": "#f8f6f5",
        "background-dark": "#1a120f",
        "surface-light": "#ffffff",
        "surface-dark": "#221410",
        "text-main": "#181311",
        "text-muted": "#8a6b60",
        "border-light": "#f5f1f0",
        "border-dark": "#3a2d29",
      },
      fontFamily: {
        "display": ["Plus Jakarta Sans", "sans-serif"],
        "body": ["Noto Sans", "sans-serif"],
      },
      borderRadius: {
        "DEFAULT": "0.5rem",
        "lg": "1rem",
        "xl": "1.5rem",
        "2xl": "2rem",
      },
    },
  },
}