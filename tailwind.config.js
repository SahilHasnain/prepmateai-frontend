/** @type {import('tailwindcss').Config} */
module.exports = {
  // Tell Tailwind where to find classNames in your project
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  // NativeWind v4 requires the NativeWind preset
  // This enables the CSS-first pipeline and interop features
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
};
