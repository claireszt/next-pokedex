import type { Config } from "tailwindcss";
import colors from 'tailwindcss/colors';

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      primary: {
        100: '#ef4444',
        50: '#fee2e2'
      },
      white: colors.white,
      gray: colors.gray,
      'fire': '#ff9e55',
      grass: '#63bc5b',
      'electric': '#f4d23b',
      'water': '#5090d6',
      'ground': '#d97845',
      'rock': '#c6b78c',
      'poison': '#aa6bc8',
      'bug': '#91c12e',
      'dragon': '#0a6dc3',
      'psychic': '#fa7179',
      'flying': '#8fa9de',
      'fighting': '#ce426b',
      'normal': '#919aa2',
      'dark': '#745c4c',
      'ghost': '#5369ad',
      'ice': '#73cec0'
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
