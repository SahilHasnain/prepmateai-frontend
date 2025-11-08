// Metro configuration for Expo + NativeWind v4
// Adds NativeWind transformer and ensures Tailwind preset is picked up.
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Optional: pass options (keep TypeScript generation enabled for className intellisense)
module.exports = withNativeWind(config, {
	// Provide path to global stylesheet if you want explicit reference (not required when importing in entry)
	input: "./global.css",
});
