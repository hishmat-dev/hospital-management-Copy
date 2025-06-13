/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
    "*.{js,ts,jsx,tsx,mdx}",
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
  ],
  safelist: [
    "bg-blue-hosta",
    "bg-medium-turquoise",
    "bg-waikawa-grey",
    "bg-vivid-cerise",
    "bg-bright-sun",
    "bg-primary-color",
    "border-l-blue-hosta",
    "border-l-medium-turquoise",
    "border-l-waikawa-grey",
    "border-l-vivid-cerise",
    "border-l-bright-sun",
    "border-l-primary-color",
    "text-blue-hosta",
    "text-medium-turquoise",
    "text-waikawa-grey",
    "text-vivid-cerise",
    "text-bright-sun",
    "text-primary-color",
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
        "red-color" : "#e34d4d",
      },
  },
  plugins: [require("tailwindcss-animate")],
}
}

