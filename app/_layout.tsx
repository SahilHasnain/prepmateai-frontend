import { Slot } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { View } from "react-native";
import "../global.css";

// Root layout - Main navigation wrapper with SafeAreaProvider
export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <View className="flex-1 bg-white">
        <Slot />
      </View>
    </SafeAreaProvider>
  );
}
