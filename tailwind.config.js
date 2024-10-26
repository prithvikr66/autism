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
      }
    },
  },
  plugins: [],
};
