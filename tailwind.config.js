/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "#f97316",
        muted: "#f4f1eb",
        primary: "#101820",
        secondary: "#5b6472",
        ink: "#101820",
        charcoal: "#17212b",
        cream: "#fbfaf7",
        trust: "#0f766e",
      },
      boxShadow: {
        card: "0 12px 30px rgba(16, 24, 32, 0.08)",
        glow: "0 24px 80px rgba(15, 118, 110, 0.16)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
    },
  },
  plugins: [],
};