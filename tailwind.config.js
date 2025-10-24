import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#14b8a6",
        secondary: "#64748b",
        accent: "#0f766e",
        neutral: "#1e293b",
        background: "#ffffff",
      },
    },
  },
  plugins: [daisyui()],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#14b8a6",
          secondary: "#64748b",
          accent: "#0f766e",
          neutral: "#1e293b",
          "base-100": "#ffffff",
          info: "#3abff8",
          success: "#36d399",
          warning: "#fbbd23",
          error: "#f87272",
        },
      },
    ],
  },
};
