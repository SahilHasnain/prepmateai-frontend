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

// Show toast notification
const showToast = (message) => {
  if (Platform.OS === "android") {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  } else {
    Alert.alert("Success", message);
  }
};

// Flashcard Feedback Buttons Component
const FlashcardFeedback = ({ userId, cardId, topic, onNext }) => {
  const [submitting, setSubmitting] = useState(false);

  // Submit feedback to API
  const submitFeedback = async (feedback) => {
    setSubmitting(true);

    try {
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
        throw new Error(result.message || "Failed to save");
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View className="flex-row items-center justify-center">
      {/* Forgot Button */}
      <TouchableOpacity
        onPress={() => submitFeedback("forgot")}
        disabled={submitting}
        className={`p-3 mx-2 rounded-full ${submitting ? "bg-red-300" : "bg-red-500"}`}
        accessibilityLabel="I forgot this card"
        accessibilityRole="button"
      >
        {submitting ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text className="text-2xl">❌</Text>
        )}
      </TouchableOpacity>

      {/* Not Sure Button */}
      <TouchableOpacity
        onPress={() => submitFeedback("unsure")}
        disabled={submitting}
        className={`p-3 mx-2 rounded-full ${submitting ? "bg-yellow-300" : "bg-yellow-500"}`}
        accessibilityLabel="I'm not sure about this card"
        accessibilityRole="button"
      >
        {submitting ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text className="text-2xl">🤔</Text>
        )}
      </TouchableOpacity>

      {/* Remembered Button */}
      <TouchableOpacity
        onPress={() => submitFeedback("remembered")}
        disabled={submitting}
        className={`p-3 mx-2 rounded-full ${submitting ? "bg-green-300" : "bg-green-500"}`}
        accessibilityLabel="I remembered this card"
        accessibilityRole="button"
      >
        {submitting ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text className="text-2xl">✅</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default FlashcardFeedback;
