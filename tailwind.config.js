/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
      extend: {
        colors: {
          cranberry: "#7A1C2E",
          greenbrand: "#1E4D2B",
          goldbrand: "#C8A968",
          chocolate: "#4B2E22",
          cream: "#FAF7F2",
        },
      },
    },
    plugins: [],
  };