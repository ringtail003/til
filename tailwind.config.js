const colors = require('tailwindcss/colors');

const baseConfig = {
  mode: 'jit',
  content: ['./src/**/*.{html,ts}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        blue: colors.sky,
      }
    }
  },
  plugins: [],
};

const devModeConfig = {
  ...baseConfig,
  safelist: [{ pattern: /.*/ }],
};

module.exports = process.env.TAILWIND_MODE === "watch" ? devModeConfig : baseConfig;
