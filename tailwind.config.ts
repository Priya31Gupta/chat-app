import type { Config } from 'tailwindcss';

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}', // Ensure app folder is included
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;
