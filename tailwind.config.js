const colors = require('tailwindcss/colors');

const baseConfig = {
  mode: 'jit',
  content: ['./src/**/*.{html,ts}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        background: "#141922",
        accent: colors.indigo,
      },
      minWidth: {
        '10': "2.5rem",
        '20': "5rem",
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
