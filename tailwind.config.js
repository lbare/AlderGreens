/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}", "./src/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        green: {
          100: "#ecf6ee",
          200: "#c5e4cd",
          300: "#9fd2ab",
          400: "#78c089",
          500: "#51ae68",
          600: "#3f8751",
          700: "#2d603a",
          800: "#1b3a23",
          900: "#09130c",
        },
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        archivo: ["Archivo", "sans-serif"],
      },
    },
  },
  plugins: [],
};
