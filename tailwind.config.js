/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        button: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
        "button-hover": "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
        "form-shadow":
          "0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 20px 24px -4px #10182814",
        "text-area": "0px 1px 2px 0px #1018280D",
      },
    },
    screens: {
      sm: "600px",
      md: "768px",
      lg: "976px",
      xl: "1280px",
    },
    fontFamily: {
      inter: ["Inter", "sans-serif"],
      workSans: ["Work Sans", "serif"],
      satoshi: ["Satoshi", "sans-serif"],
    },
  },
  plugins: [
    require("tailwind-scrollbar")({ nocompatible: true }),
    require("@tailwindcss/forms"),
  ],
};
