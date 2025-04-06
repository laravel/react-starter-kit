/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./resources/**/*.{js,jsx,ts,tsx,blade.php,vue}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
} 