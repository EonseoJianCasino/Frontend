import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: [
        "Pretendard Variable",
        "Pretendard",
        ...defaultTheme.fontFamily.sans,
      ],
    },
    extend: {},
  },
  plugins: [],
};
