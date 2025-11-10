import { Slot } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { View } from "react-native";
import { useEffect } from "react";
import "../global.css";
import { registerForPushNotificationsAsync } from "../services/notificationService";
import { useAuth } from "../hooks/useAuth";
import { NODE_API_BASE_URL } from "../config/env";

// Root layout - Main navigation wrapper with SafeAreaProvider
export default function RootLayout() {
  const { user } = useAuth();

  // Register for push notifications on app start
  useEffect(() => {
    const registerNotifications = async () => {
      if (user?.$id) {
        const token = await registerForPushNotificationsAsync();

        if (token) {
          // Save token to backend with default reminder time
          try {
            // Always validate API responses before assuming success
            const res = await fetch(`${NODE_API_BASE_URL}/api/reminders/set`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                userId: user.$id,
                pushToken: token,
                timeOfDay: "09:00",
                enabled: false, // User can enable later
              }),
            });
            const data = await res.json();
            if (!data.success) {
              // Silent fail - user doesn't need to see this error
            }
          } catch (error) {
            // Silent fail - push token registration is non-critical
          }
        }
      }
    };

    registerNotifications();
  }, [user]);

  return (
    <SafeAreaProvider>
      <View className="flex-1 bg-white">
        <Slot />
      </View>
    </SafeAreaProvider>
  );
}
