module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    // Add any other PostCSS plugins here
  ],
  theme: {
    container: {
      padding: {
        DEFAULT: "15px",
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "960px",
      xl: "1200px",
    },
    extend: {
      fontFamily: {
        body: ['Poppins']
      },
      boxShadow: {
        bottomS: "0 8px 6px -6px black",
      },
      backgroundImage: {
        'home-page': "url('/src/assets/jpg/home-page-image.jpg')",
        'purchase-page':"url('/src/assets/jpg/happy-man.jpg')",
        'not-found':"url('/src/assets/jpg/404-page.jpg')"
      }
    },
  },
  plugins: [],
  // darkMode: 'class',
};