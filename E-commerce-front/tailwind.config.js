/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/theme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      safelist: ['animate-[slide-right_1s_ease-in-out]', 'animate-[fade-in-down_1s_ease-in-out]'],
    },
    screens: {
      // **min-width**
      "4kk": { min: "2559px" },
      // => @media (min-width: 2559px) { ... }
      "3xll": { min: "1920px" },
      // => @media (min-width: 1920px) { ... }
      "2xll": { min: "1535px" },
      // => @media (min-width: 1535px) { ... }
      xll: { min: "1279px" },
      // => @media (min-width: 1279px) { ... }
      lgg: { min: "1024px" },
      // => @media (min-width: 1023px) { ... }
      mdd: { min: "769px" },
      // => @media (min-width: 767px) { ... }
      smm: { min: "641px" },
      // => @media (min-width: 641px) { ... }
      xss: { min: "425px" },
      // => @media (min-width: 425px) { ... }

      // **max-width**
      "4k": { min: "2559px" },
      // => @media (min-width: 2559px) { ... }
      "3xl": { max: "1920px" },
      // => @media (max-width: 1920px) { ... }
      "2xl": { max: "1535px" },
      // => @media (max-width: 1535px) { ... }
      xl: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }
      lg: { max: "1024px" },
      // => @media (max-width: 1023px) { ... }
      md: { max: "769px" },
      // => @media (max-width: 767px) { ... }
      sm: { max: "641px" },
      // => @media (max-width: 641px) { ... }
      xs: { max: "425px" },
      // => @media (max-width: 425px) { ... }
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
