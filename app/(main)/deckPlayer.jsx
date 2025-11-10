import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import LottieView from "lottie-react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Notifications from "expo-notifications";
import FlashcardItem from "../../components/FlashcardItem";
import FlashcardFeedback from "../../components/FlashcardFeedback";
import { useFlashcards } from "../../hooks/useFlashcards";
import { useAuth } from "../../hooks/useAuth";
import { NODE_API_BASE_URL } from "../../config/env";

// Main Deck Player Screen
function DeckPlayer() {
  const router = useRouter();
  const { topic } = useLocalSearchParams();
  const { user } = useAuth();
  const {
    cards,
    loading,
    currentIndex,
    reviewedCount,
    loadToday,
    setCurrentIndex,
  } = useFlashcards();

  const [showConfetti, setShowConfetti] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [reminderTime, setReminderTime] = useState(new Date());
  const [settingReminder, setSettingReminder] = useState(false);
  const [nextReview, setNextReview] = useState(null);

  // Load today's cards and progress summary on mount
  useEffect(() => {
    // Prevent memory leaks if user leaves screen early
    const controller = new AbortController();

    const loadData = async () => {
      if (user?.$id) {
        loadToday(user.$id);

        // Fetch next review time
        try {
          const response = await fetch(
            `${NODE_API_BASE_URL}/api/progress/summary/${user.$id}`,
            { signal: controller.signal },
          );
          const result = await response.json();
          if (result.success && result.data.nextReview) {
            setNextReview(result.data.nextReview);
          }
        } catch (error) {
          if (error.name === "AbortError") return;
          // Silent fail - next review time is optional
        }
      }
    };

    loadData();
    return () => controller.abort();
  }, [user]);

  // Show confetti when deck completes
  useEffect(() => {
    if (cards.length > 0 && reviewedCount === cards.length) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [cards.length, reviewedCount]);

  // Handle next card after feedback
  const handleNext = useCallback(() => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  }, [currentIndex, cards.length, setCurrentIndex]);

  // Get push notification token
  const getPushToken = async () => {
    try {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        throw new Error("Permission not granted for notifications");
      }

      const token = (await Notifications.getExpoPushTokenAsync()).data;
      return token;
    } catch (error) {
      throw error;
    }
  };

  // Set daily reminder
  const setDailyReminder = async (time) => {
    setSettingReminder(true);

    try {
      const pushToken = await getPushToken();
      const timeOfDay = time.toTimeString().slice(0, 5); // HH:MM format

      const response = await fetch(`${NODE_API_BASE_URL}/api/reminders/set`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.$id,
          pushToken,
          timeOfDay,
          enabled: true,
        }),
      });

      const result = await response.json();

      if (result.success) {
        Alert.alert("Success", `Daily reminder set for ${timeOfDay}`);
        setShowTimePicker(false);
      } else {
        throw new Error(result.message || "Failed to set reminder");
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSettingReminder(false);
    }
  };

  const currentCard = useMemo(() => cards[currentIndex], [cards, currentIndex]);
  const deckCompleted = cards.length > 0 && reviewedCount === cards.length;

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="p-4 bg-blue-500">
        <View className="flex-row items-center">
          <TouchableOpacity
            onPress={() => router.back()}
            className="mr-3"
            accessibilityLabel="Go back"
            accessibilityRole="button"
          >
            <Text className="text-2xl text-white">←</Text>
          </TouchableOpacity>
          <Text className="text-xl font-bold text-white">
            {topic || "Flashcards"}
          </Text>
        </View>
        {nextReview && (
          <Text className="mt-2 text-sm text-white/80">
            Next review:{" "}
            {new Date(nextReview).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        )}
        {!nextReview && cards.length === 0 && (
          <Text className="mt-2 text-sm text-white/80">No reviews due</Text>
        )}
      </View>

      {/* Card Area */}
      <View className="items-center justify-center flex-1 px-6">
        <FlashcardItem
          question={currentCard.question}
          answer={currentCard.answer}
        />
      </View>

      {/* Feedback Buttons */}
      {!deckCompleted && currentCard && (
        <View className="px-6 mb-6">
          <FlashcardFeedback
            userId={user?.$id}
            cardId={currentCard.cardId}
            topic={currentCard.topic || topic}
            onNext={handleNext}
          />
        </View>
      )}

      {/* Deck Completed - Reminder Option */}
      {deckCompleted && (
        <View className="px-6 mb-6">
          <Text className="mb-4 text-lg font-bold text-center text-gray-800">
            🎉 Deck Completed!
          </Text>
          <TouchableOpacity
            onPress={() => setShowTimePicker(true)}
            disabled={settingReminder}
            className="p-3 bg-blue-500 rounded-lg"
            accessibilityLabel="Set daily reminder"
            accessibilityRole="button"
          >
            {settingReminder ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="font-bold text-center text-white">
                ⏰ Set Daily Reminder
              </Text>
            )}
          </TouchableOpacity>
        </View>
      )}

      {/* Footer Progress */}
      <View className="items-center pb-6">
        {loading ? (
          <ActivityIndicator size="large" color="#3b82f6" />
        ) : (
          <Text className="text-lg font-medium text-gray-600">
            {reviewedCount} / {cards.length} cards reviewed
          </Text>
        )}
      </View>

      {/* Time Picker Modal */}
      {showTimePicker && (
        <View className="absolute inset-0 items-center justify-center bg-black/50">
          <View className="p-6 bg-white rounded-xl">
            <Text className="mb-4 text-lg font-bold text-center">
              Select Reminder Time
            </Text>
            <DateTimePicker
              value={reminderTime}
              mode="time"
              display="spinner"
              onChange={(event, selectedTime) => {
                if (selectedTime) {
                  setReminderTime(selectedTime);
                }
              }}
            />
            <View className="flex-row justify-around mt-4">
              <TouchableOpacity
                onPress={() => setShowTimePicker(false)}
                className="px-6 py-2 bg-gray-300 rounded-lg"
                accessibilityLabel="Cancel"
                accessibilityRole="button"
              >
                <Text className="font-bold">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setDailyReminder(reminderTime)}
                className="px-6 py-2 bg-blue-500 rounded-lg"
                accessibilityLabel="Set reminder time"
                accessibilityRole="button"
              >
                <Text className="font-bold text-white">Set</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {/* Confetti Animation */}
      {showConfetti && (
        <View className="absolute inset-0 pointer-events-none">
          <LottieView
            source={require("../../assets/confetti.json")}
            autoPlay
            loop={false}
            style={{ width: "100%", height: "100%" }}
          />
        </View>
      )}
    </View>
  );
}

export default DeckPlayer;
