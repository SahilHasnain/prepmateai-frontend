import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect, useCallback } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import LottieView from "lottie-react-native";
import Animated, {
  FadeInRight,
  FadeOutLeft,
  Easing,
} from "react-native-reanimated";
import FlashcardItem from "../../components/FlashcardItem";
import FlashcardFeedback from "../../components/FlashcardFeedback";
import DeckHeader from "../../components/DeckHeader";
import DeckProgress from "../../components/DeckProgress";
import DeckCompleted from "../../components/DeckCompleted";
import ErrorState from "../../components/atoms/ErrorState";
import { useDeckPlayer } from "../../hooks/useDeckPlayer";
import { useOfflineQueue } from "../../hooks/useOfflineQueue";
import { useAuth } from "../../hooks/useAuth";
import { useReminderManager } from "../../hooks/useReminderManager";
import { useFeedbackTracking } from "../../hooks/useFeedbackTracking";
import { colors, gradients } from "../../utils/colors";

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
    streak,
    totalCards,
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

  // Reminder management hook
  const {
    showTimePicker,
    reminderTime,
    settingReminder,
    showPicker,
    hidePicker,
    setReminderTime,
    setReminder,
  } = useReminderManager(user?.$id);

  // Feedback tracking hook
  const { counts, trackFeedback, revertFeedback } = useFeedbackTracking();

  // Local state (only UI-specific)
  const [showConfetti, setShowConfetti] = useState(false);

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

  // Handle feedback with optimistic UI
  const handleFeedback = useCallback(
    async (feedback) => {
      if (!currentCard) return;

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

      // Track feedback using hook
      trackFeedback(feedback);

      // Instant UI update
      setCards((prev) => prev.filter((_, idx) => idx !== currentIndex));
      setReviewedCount((prev) => prev + 1);

      // Background API call
      submitFeedback(feedbackData);
    },
    [
      currentCard,
      currentIndex,
      user,
      topic,
      submitFeedback,
      setCards,
      setReviewedCount,
      setLastFeedback,
      trackFeedback,
    ],
  );

  // Handle undo
  const handleUndo = useCallback(() => {
    const feedback = undo();
    if (!feedback) return;

    // Revert feedback using hook
    const lastFeedbackType = feedback.feedback.feedback;
    revertFeedback(lastFeedbackType);

    setCards((prev) => {
      const newCards = [...prev];
      newCards.splice(feedback.index, 0, feedback.card);
      return newCards;
    });
    setReviewedCount((prev) => Math.max(0, prev - 1));
  }, [undo, setCards, setReviewedCount, revertFeedback]);

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.s1 }}>
      <DeckHeader
        topic={topic}
        nextReview={nextReview}
        onBack={() => router.back()}
        onShuffle={shuffle}
        showShuffle={!deckCompleted && cards.length > 1}
      />

      {/* Error State */}
      {error && <ErrorState error={error} onRetry={retry} />}

      {/* Card Area */}
      {!error && !deckCompleted && (
        <View className="items-center justify-center flex-1 px-6">
          {loading ? (
            <ActivityIndicator size="large" color="#3b82f6" />
          ) : currentCard ? (
            // Smooth card transition with custom easing for natural feel
            <Animated.View
              key={currentCard.cardId}
              entering={FadeInRight.duration(400).easing(
                Easing.out(Easing.cubic),
              )}
              exiting={FadeOutLeft.duration(300).easing(
                Easing.in(Easing.cubic),
              )}
              className="w-full"
            >
              <FlashcardItem
                question={currentCard.question}
                answer={currentCard.answer}
                difficulty={currentCard.difficulty || "medium"}
              />
            </Animated.View>
          ) : (
            <Text className="text-lg text-gray-500">No cards available</Text>
          )}
        </View>
      )}

      {/* Feedback Buttons */}
      {!error && !loading && !deckCompleted && currentCard && (
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
      {!error && !loading && lastFeedback && cards.length > 0 && (
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
          onShowTimePicker={showPicker}
          onHideTimePicker={hidePicker}
          reminderTime={reminderTime}
          setReminderTime={setReminderTime}
          onSetReminder={setReminder}
          settingReminder={settingReminder}
          reviewedCount={reviewedCount}
          totalCards={totalCards}
          streak={streak}
          topic={topic}
          greens={counts.greens}
          yellows={counts.yellows}
          reds={counts.reds}
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
    </SafeAreaView>
  );
}

export default DeckPlayer;
