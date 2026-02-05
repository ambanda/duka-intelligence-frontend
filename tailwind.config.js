/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",        // all files in app/
    "./components/**/*.{js,ts,jsx,tsx}"  // all files in components/
  ],
  theme: {
    extend: {
      colors: {
        accent: "#f97316", // orange button
        muted: "#f3f4f6",  // light gray sections
      },
    },
  },
  plugins: [],
}

