/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          95: '#F2F2F2',
          550: '#9B9B9B',
        },
        blue: {
          550: '#4DD0E1'
        },
        yellow: {
          350: '#FFFBE6',
        },
        green: {
          550: '#28DD91'
        }
      }
    },
  },
  plugins: [],
}

