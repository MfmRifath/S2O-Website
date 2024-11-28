/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Include all files in the src folder
    "./public/index.html"        // Include your main HTML file
  ],
  theme: {
    extend: {
      animation: {
        scaleIn: 'scaleIn 1s ease-out forwards',
        slideInUp: 'slideInUp 1s ease-out forwards',
      },
      keyframes: {
        scaleIn: {
          '0%': { transform: 'scale(0)' },
          '100%': { transform: 'scale(1)' },
        },
        slideInUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

