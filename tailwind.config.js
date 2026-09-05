/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: "#c770c7",
          2: "#6f5cff",
        },
      },
      borderRadius: {
        surface: "var(--radius-lg)",
        "surface-sm": "var(--radius-md)",
        "surface-lg": "var(--radius-xl)",
      },
      boxShadow: {
        card: "var(--shadow-card)",
        panel: "var(--shadow-panel)",
        "accent-sm": "var(--shadow-accent-sm)",
        "accent-glow": "var(--shadow-accent-glow)",
      },
    },
  },
  plugins: [],
};
