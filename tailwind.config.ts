import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'homeimage': "url(/public/images/spacehome.jpg)",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'primary-blue': '#000F89',
        'secondary-blue': '#1C39BB',
        'primary-gray': '#EDECEB',
        'secondary-gray': '#F8F8F8',
        'dashboard': '#EDECEB'
      },
    },
  },
  plugins: [
    require("tailwindcss-inner-border"),
    require('tailwind-scrollbar-hide'),
  ],
}
export default config
