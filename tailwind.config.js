/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  safelist: [
    "border-red-500",
    "bg-red-50",
    "focus:ring-red-500",
    "opacity-100"
    // Add other classes that you use conditionally here
  ],
  theme: {
    extend: {}
  },
  plugins: [require("flowbite/plugin")]
};
