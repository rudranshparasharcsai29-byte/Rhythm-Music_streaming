/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.{js,jsx,ts,tsx}",
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
  ],

  presets: [require("nativewind/preset")],

  theme: {
    extend: {
      colors: {
        blush: "#FFF5F7",
        shell: "#FFE6EC",
        rose: "#FF6B8B",
        text: "#2B1B1E",
        muted: "#8A6D73",
      },

      fontFamily: {
        sans: ["Inter", "System"],
      },

      boxShadow: {
        float: "0px 22px 60px rgba(90,42,55,0.2)",
        soft: "0px 12px 30px rgba(112,59,71,0.12)",
      },
    },
  },

  plugins: [],
};
