/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primaryRed: "#c20027",
        secondaryRed: "#8a0000",
        primaryGrey: "#2f2f2f",
        secondaryGrey: "#424242",
        textRed: "#B74242"
      },
      fontFamily: {
        dieNasty: ["Die Nasty", "sans-serif"],
        rubik: ["Rubik", "sans-serif"]
      }
    },
  },
  plugins: [],
}
