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
      black: colors.black,
      gray: colors.gray,
      red: colors.red,
      'fire': '#ffb166',
      'grass': '#8fd49d',
      'electric': '#f9e65c',
      'water': '#7cb6e8',
      'ground': '#e2966d',
      'rock': '#cdc5ad',
      'poison': '#b18cd4',
      'bug': '#b4d485',
      'dragon': '#70a7e3',
      'psychic': '#fca3a9',
      'flying': '#a7bbf0',
      'fighting': '#e88ca7',
      'normal': '#a3aeb6',
      'dark': '#957b6e',
      'ghost': '#8493c7',
      'ice': '#9bd3c8',
      'fairy': '#f5addc',
      'steel': '#c8d0d8'
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
