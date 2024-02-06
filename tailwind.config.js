/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: { 
        'purple': '#862EB8', 
        'dark-purple': '#642489',
        'custom-white': '#F5F5F5', 
    }, 
    },
  },
  plugins: [],
}

