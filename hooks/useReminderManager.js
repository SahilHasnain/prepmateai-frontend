import { useState, useCallback } from "react";
import { Alert } from "react-native";
import * as Notifications from "expo-notifications";
import { NODE_API_BASE_URL } from "../config/env";

/**
 * useReminderManager Hook
 * Handles daily reminder functionality:
 * - Time picker state management
 * - Notification permissions
 * - Reminder API call
 * - Loading states
 *
 * Extracted from deckPlayer.jsx to isolate notification logic
 * Reusable for habit reminders, study notifications, etc.
 */
export const useReminderManager = (userId) => {
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [reminderTime, setReminderTime] = useState(new Date());
  const [settingReminder, setSettingReminder] = useState(false);

  // Show time picker modal
  const showPicker = useCallback(() => {
    setShowTimePicker(true);
  }, []);

  // Hide time picker modal
  const hidePicker = useCallback(() => {
    setShowTimePicker(false);
  }, []);

  // Set daily reminder
  const setReminder = useCallback(async () => {
    setSettingReminder(true);

    try {
      // Request notification permissions
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        throw new Error("Permission not granted for notifications");
      }

      // Get push token
      const pushToken = (await Notifications.getExpoPushTokenAsync()).data;
      const timeOfDay = reminderTime.toTimeString().slice(0, 5);

      // Call API to set reminder
      const response = await fetch(`${NODE_API_BASE_URL}/api/reminders/set`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          pushToken,
          timeOfDay,
          enabled: true,
        }),
      });

      const result = await response.json();

      if (result.success) {
        Alert.alert("Success", `Daily reminder set for ${timeOfDay}`);
        setShowTimePicker(false);
        return true;
      } else {
        throw new Error(result.message || "Failed to set reminder");
      }
    } catch (error) {
      Alert.alert("Error", error.message);
      return false;
    } finally {
      setSettingReminder(false);
    }
  }, [userId, reminderTime]);

  return {
    // State
    showTimePicker,
    reminderTime,
    settingReminder,

    // Actions
    showPicker,
    hidePicker,
    setReminderTime,
    setReminder,
  };
};
