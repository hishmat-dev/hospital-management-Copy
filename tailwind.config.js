/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
    "*.{js,ts,jsx,tsx,mdx}",
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      colors: {
        "blue-hosta": "#64C4B2",
        "medium-turquoise": "#45C6EE",
        "waikawa-grey": "#526BB1",
        "vivid-cerise": "#DA1D81",
        "bright-sun": "#FED33C",
        "primary-color":"#526bb1",
    },
  },
  plugins: [require("tailwindcss-animate")],
}
}

