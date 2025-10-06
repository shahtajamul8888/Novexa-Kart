/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.js",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        novexa: {
          50: '#f7fdfc',
          500: '#0ea5a4'
        }
      }
    }
  },
  plugins: [],
}