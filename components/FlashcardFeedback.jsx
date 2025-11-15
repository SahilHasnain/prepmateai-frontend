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
          }
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
    <View className="flex-row items-center justify-between gap-3">
      {/* Review Again Button */}
      <TouchableOpacity
        onPress={() => submitFeedback("forgot")}
        className="flex-1"
        style={{
          backgroundColor: "#2A2D33",
          paddingVertical: 14,
          paddingHorizontal: 22,
          borderRadius: 24,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 12,
          elevation: 3,
        }}
        accessibilityLabel="Review again"
        accessibilityRole="button"
      >
        <View className="flex-row items-center justify-center">
          <Text className="mr-2 text-base" style={{ color: "#9CA3AF" }}>
            ↻
          </Text>
          <Text className="text-sm font-semibold" style={{ color: "#E5E7EB" }}>
            Review again
          </Text>
        </View>
      </TouchableOpacity>

      {/* Almost Got It Button */}
      <TouchableOpacity
        onPress={() => submitFeedback("unsure")}
        className="flex-1"
        style={{
          backgroundColor: "#3B3F46",
          paddingVertical: 14,
          paddingHorizontal: 22,
          borderRadius: 24,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 12,
          elevation: 3,
        }}
        accessibilityLabel="Almost got it"
        accessibilityRole="button"
      >
        <View className="flex-row items-center justify-center">
          <Text className="mr-2 text-base">💡</Text>
          <Text className="text-sm font-semibold" style={{ color: "#FDE68A" }}>
            Almost got it
          </Text>
        </View>
      </TouchableOpacity>

      {/* I Got This Button */}
      <TouchableOpacity
        onPress={() => submitFeedback("remembered")}
        className="flex-1"
        style={{
          backgroundColor: "#324D44",
          paddingVertical: 14,
          paddingHorizontal: 22,
          borderRadius: 24,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 12,
          elevation: 3,
        }}
        accessibilityLabel="I got this"
        accessibilityRole="button"
      >
        <View className="flex-row items-center justify-center">
          <Text className="mr-2 text-base" style={{ color: "#45F6C3" }}>
            ✓
          </Text>
          <Text className="text-sm font-semibold" style={{ color: "#45F6C3" }}>
            I got this
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default FlashcardFeedback;
