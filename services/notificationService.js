import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

// Configure notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

/**
 * Register for push notifications and get Expo push token
 * @returns {Promise<string|null>} Push token or null if permission denied
 */
export const registerForPushNotificationsAsync = async () => {
  try {
    // Check if running on physical device
    if (!Platform.isTV) {
      // Get existing permissions
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      // Request permissions if not granted
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      // Handle permission denied
      if (finalStatus !== "granted") {
        console.log("Push notification permission denied");
        return null;
      }

      // Get Expo push token
      const tokenData = await Notifications.getExpoPushTokenAsync({
        projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
      });

      console.log("Push token obtained:", tokenData.data);
      return tokenData.data;
    } else {
      console.log("Push notifications not supported on TV");
      return null;
    }
  } catch (error) {
    console.error("Failed to get push token:", error);
    return null;
  }
};

/**
 * Check if push notifications are enabled
 * @returns {Promise<boolean>}
 */
export const checkNotificationPermissions = async () => {
  try {
    const { status } = await Notifications.getPermissionsAsync();
    return status === "granted";
  } catch (error) {
    console.error("Failed to check notification permissions:", error);
    return false;
  }
};

/**
 * Schedule a local notification (for testing)
 * @param {string} title - Notification title
 * @param {string} body - Notification body
 * @param {number} seconds - Seconds from now to trigger
 */
export const scheduleLocalNotification = async (title, body, seconds = 5) => {
  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        sound: true,
      },
      trigger: { seconds },
    });
    console.log("Local notification scheduled");
  } catch (error) {
    console.error("Failed to schedule notification:", error);
  }
};
