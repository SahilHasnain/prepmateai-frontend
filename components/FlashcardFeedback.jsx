import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ToastAndroid,
  Platform,
} from "react-native";
import { useState } from "react";
import { NODE_API_BASE_URL } from "../config/env";
import { playSuccessSound } from "../utils/soundEffects";
import { getMessage } from "../utils/messages";

// Show toast notification
const showToast = (message) => {
  if (Platform.OS === "android") {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  } else {
    Alert.alert(getMessage("success.progressSaved"), message);
  }
};

// Flashcard Feedback Buttons Component
const FlashcardFeedback = ({ userId, cardId, topic, onNext, onFeedback }) => {
  // Submit feedback with dopamine boost
  const submitFeedback = async (feedback) => {
    try {
      // Play success sound for correct answers
      if (feedback === "remembered") {
        playSuccessSound();
      }

      // Use parent callback if provided (for offline support)
      if (onFeedback) {
        await onFeedback(feedback);
        showToast("Saved ✓");
      } else {
        // Fallback to direct API call
        const response = await fetch(
          `${NODE_API_BASE_URL}/api/progress/update-progress`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, cardId, topic, feedback }),
          },
        );

        const result = await response.json();

        if (result.success) {
          showToast("Saved ✓");
          onNext?.();
        } else {
          throw new Error(result.message || getMessage("errors.saveFailed"));
        }
      }
    } catch (error) {
      Alert.alert("Error", error.message || getMessage("errors.saveFailed"));
    }
  };

  return (
    <View className="flex-row items-center justify-center">
      {/* Forgot Button */}
      <TouchableOpacity
        onPress={() => submitFeedback("forgot")}
        className="p-3 mx-2 bg-red-500 rounded-full"
        accessibilityLabel={getMessage("flashcardActions.forgot")}
        accessibilityRole="button"
      >
        <Text className="text-2xl">❌</Text>
      </TouchableOpacity>

      {/* Not Sure Button */}
      <TouchableOpacity
        onPress={() => submitFeedback("unsure")}
        className="p-3 mx-2 bg-yellow-500 rounded-full"
        accessibilityLabel={getMessage("flashcardActions.unsure")}
        accessibilityRole="button"
      >
        <Text className="text-2xl">🤔</Text>
      </TouchableOpacity>

      {/* Remembered Button */}
      <TouchableOpacity
        onPress={() => submitFeedback("remembered")}
        className="p-3 mx-2 bg-green-500 rounded-full"
        accessibilityLabel={getMessage("flashcardActions.remembered")}
        accessibilityRole="button"
      >
        <Text className="text-2xl">✅</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FlashcardFeedback;
