import { View, Text, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { useState, useEffect, useCallback } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import LottieView from "lottie-react-native";
import * as Notifications from "expo-notifications";
import FlashcardItem from "../../components/FlashcardItem";
import FlashcardFeedback from "../../components/FlashcardFeedback";
import DeckHeader from "../../components/DeckHeader";
import DeckProgress from "../../components/DeckProgress";
import DeckCompleted from "../../components/DeckCompleted";
import { useDeckPlayer } from "../../hooks/useDeckPlayer";
import { useOfflineQueue } from "../../hooks/useOfflineQueue";
import { useAuth } from "../../hooks/useAuth";
import { NODE_API_BASE_URL } from "../../config/env";

function DeckPlayer() {
  const router = useRouter();
  const { topic } = useLocalSearchParams();
  const { user } = useAuth();

  // Custom hooks
  const {
    cards,
    loading,
    error,
    currentIndex,
    reviewedCount,
    nextReview,
    setCards,
    setReviewedCount,
    retry,
    shuffle,
  } = useDeckPlayer(user?.$id, topic);

  const {
    offlineQueue,
    submitting,
    lastFeedback,
    setLastFeedback,
    submitFeedback,
    undo,
  } = useOfflineQueue(user?.$id);

  // Local state
  const [showConfetti, setShowConfetti] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [reminderTime, setReminderTime] = useState(new Date());
  const [settingReminder, setSettingReminder] = useState(false);

  const currentCard = cards[currentIndex];
  const deckCompleted = cards.length === 0 && reviewedCount > 0;

  // Show confetti on completion
  useEffect(() => {
    if (deckCompleted) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [deckCompleted]);

  // Handle feedback
  const handleFeedback = useCallback(
    async (feedback) => {
      if (!currentCard || submitting) return;

      const feedbackData = {
        userId: user.$id,
        cardId: currentCard.cardId,
        topic: currentCard.topic || topic,
        feedback,
      };

      setLastFeedback({
        card: currentCard,
        feedback: feedbackData,
        index: currentIndex,
      });

      await submitFeedback(feedbackData);

      setCards((prev) => prev.filter((_, idx) => idx !== currentIndex));
      setReviewedCount((prev) => prev + 1);
    },
    [currentCard, currentIndex, user, topic, submitting, submitFeedback, setCards, setReviewedCount, setLastFeedback]
  );

  // Handle undo
  const handleUndo = useCallback(() => {
    const feedback = undo();
    if (!feedback) return;

    setCards((prev) => {
      const newCards = [...prev];
      newCards.splice(feedback.index, 0, feedback.card);
      return newCards;
    });
    setReviewedCount((prev) => Math.max(0, prev - 1));
  }, [undo, setCards, setReviewedCount]);

  // Set daily reminder
  const setDailyReminder = async () => {
    setSettingReminder(true);

    try {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        throw new Error("Permission not granted for notifications");
      }

      const pushToken = (await Notifications.getExpoPushTokenAsync()).data;
      const timeOfDay = reminderTime.toTimeString().slice(0, 5);

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

  return (
    <View className="flex-1 bg-gray-50">
      <DeckHeader
        topic={topic}
        nextReview={nextReview}
        onBack={() => router.back()}
        onShuffle={shuffle}
        showShuffle={!deckCompleted && cards.length > 1}
      />

      {/* Error State */}
      {error && (
        <View className="items-center justify-center flex-1 px-6">
          <Text className="mb-4 text-lg text-center text-red-600">⚠️ {error}</Text>
          <TouchableOpacity onPress={retry} className="px-6 py-3 bg-blue-500 rounded-lg">
            <Text className="font-bold text-white">Retry</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Card Area */}
      {!error && (
        <View className="items-center justify-center flex-1 px-6">
          {loading ? (
            <ActivityIndicator size="large" color="#3b82f6" />
          ) : submitting ? (
            <View className="items-center">
              <ActivityIndicator size="large" color="#3b82f6" />
              <Text className="mt-4 text-gray-600">Saving...</Text>
            </View>
          ) : currentCard ? (
            <FlashcardItem question={currentCard.question} answer={currentCard.answer} />
          ) : (
            <Text className="text-lg text-gray-500">No cards available</Text>
          )}
        </View>
      )}

      {/* Feedback Buttons */}
      {!error && !loading && !deckCompleted && currentCard && !submitting && (
        <View className="px-6 mb-4">
          <FlashcardFeedback
            userId={user?.$id}
            cardId={currentCard.cardId}
            topic={currentCard.topic || topic}
            onFeedback={handleFeedback}
          />
        </View>
      )}

      {/* Undo Button */}
      {!error && !loading && !submitting && lastFeedback && cards.length > 0 && (
        <View className="items-center mb-4">
          <TouchableOpacity
            onPress={handleUndo}
            className="px-4 py-2 bg-gray-200 rounded-lg"
            accessibilityLabel="Undo last feedback"
            accessibilityRole="button"
          >
            <Text className="font-medium text-gray-700">↶ Undo</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Deck Completed */}
      {deckCompleted && (
        <DeckCompleted
          showTimePicker={showTimePicker}
          setShowTimePicker={setShowTimePicker}
          reminderTime={reminderTime}
          setReminderTime={setReminderTime}
          onSetReminder={setDailyReminder}
          settingReminder={settingReminder}
        />
      )}

      {/* Progress */}
      {!error && (
        <DeckProgress
          reviewedCount={reviewedCount}
          remainingCount={cards.length}
          offlineCount={offlineQueue.length}
        />
      )}

      {/* Confetti */}
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
