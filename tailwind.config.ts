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
      blue: colors.blue,
      'fire': 'rgba(255, 177, 102, 0.8)',
      'grass': 'rgba(143, 212, 157, 0.8)',
      'electric': 'rgba(249, 230, 92, 0.8)',
      'water': 'rgba(124, 182, 232, 0.8)',
      'ground': 'rgba(226, 150, 109, 0.8)',
      'rock': 'rgba(205, 197, 173, 0.8)',
      'poison': 'rgba(177, 140, 212, 0.8)',
      'bug': 'rgba(180, 212, 133, 0.8)',
      'dragon': 'rgba(112, 167, 227, 0.8)',
      'psychic': 'rgba(252, 163, 169, 0.8)',
      'flying': 'rgba(167, 187, 240, 0.8)',
      'fighting': 'rgba(232, 140, 167, 0.8)',
      'normal': 'rgba(163, 174, 182, 0.8)',
      'dark': 'rgba(149, 123, 110, 0.8)',
      'ghost': 'rgba(132, 147, 199, 0.8)',
      'ice': 'rgba(155, 211, 200, 0.8)',
      'fairy': 'rgba(245, 173, 220, 0.8)',
      'steel': 'rgba(200, 208, 216, 0.8)'
      
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
