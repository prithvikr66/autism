/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {
      fontFamily:{
        "abzee-regular": ["ABeeZee-Regular", "sans-serif"],
        "abzee-italic": ["ABeeZee-Italic", "sans-serif"],
        "sofia-italic": ["Sofia-Pro-Italic", "sans-serif"],
        "suisse-regular": ["Suisse-Intl", "sans-serif"],
        "sofia-regular":["Sofia-Pro-Regular","sans-serif"],
        "sofia-bold":["Sofia-Pro-Bold","sans-serif"],
        "vt232" :["VT232", "sans-serif"],
        "microgemma":["Microgemma","sans-serif"]
      }
    },
  },
  plugins: [],
};
