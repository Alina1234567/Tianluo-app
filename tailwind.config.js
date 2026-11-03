/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff1f2',
          100: '#ffe4e6',
          500: '#ff2442', // XiaoHongShu Red / Lingling Theme Red
          600: '#e11d48',
          700: '#be123c',
        },
        sidebar: {
          bg: '#0f172a',
          hover: '#1e293b',
          active: '#334155'
        }
      }
    },
  },
  plugins: [],
}
