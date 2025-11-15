import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Easing,
  withSpring,
} from "react-native-reanimated";
import Animated from "react-native-reanimated";

// Flashcard Item Component with Flip Animation - Dark Mode
const FlashcardItem = ({ question, answer, onFlip, difficulty = "medium" }) => {
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);

  // Handle card flip with smooth ease-in-out
  const flipCard = () => {
    scale.value = withSpring(0.95, { damping: 15 }, () => {
      scale.value = withSpring(1, { damping: 15 });
    });
    rotation.value = withTiming(rotation.value === 0 ? 180 : 0, {
      duration: 260,
      easing: Easing.inOut(Easing.ease),
    });
    onFlip?.();
  };

  // Front side animation style
  const frontStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 1000 },
      { scale: scale.value },
      { rotateY: `${interpolate(rotation.value, [0, 180], [0, 180])}deg` },
    ],
    backfaceVisibility: "hidden",
  }));

  // Back side animation style
  const backStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 1000 },
      { scale: scale.value },
      { rotateY: `${interpolate(rotation.value, [0, 180], [180, 360])}deg` },
    ],
    backfaceVisibility: "hidden",
  }));

  const getDifficultyStyle = () => {
    switch (difficulty) {
      case "easy":
        return { bg: "#324D44", text: "#45F6C3" };
      case "hard":
        return { bg: "#4A2F2F", text: "#F8B4B4" };
      default:
        return { bg: "#3F3A1F", text: "#FDE68A" };
    }
  };

  const diffStyle = getDifficultyStyle();

  return (
    <TouchableOpacity
      onPress={flipCard}
      style={styles.container}
      accessibilityLabel="Tap to flip flashcard"
      accessibilityRole="button"
      activeOpacity={0.95}
    >
      <View style={styles.cardWrapper}>
        {/* Front Side - Question */}
        <Animated.View style={[frontStyle, styles.card, styles.cardShadow]}>
          {/* Difficulty Badge - Top Right Corner */}
          <View style={styles.badgeContainer}>
            <View style={[styles.badge, { backgroundColor: diffStyle.bg }]}>
              <Text style={[styles.badgeText, { color: diffStyle.text }]}>
                {difficulty.toUpperCase()}
              </Text>
            </View>
          </View>

          <Text style={styles.questionText}>{question}</Text>
          <Text style={styles.tapHint}>Tap to flip</Text>
        </Animated.View>

        {/* Back Side - Answer */}
        <Animated.View style={[backStyle, styles.card, styles.cardShadow]}>
          <Text style={styles.answerText}>{answer}</Text>
          <Text style={styles.tapHint}>Tap to flip</Text>
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 384,
  },
  cardWrapper: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
  card: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "#1C1F24",
    borderRadius: 26,
    paddingVertical: 28,
    paddingHorizontal: 22,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#2A2D33",
  },
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 18,
    elevation: 6,
  },
  badgeContainer: {
    position: "absolute",
    top: 16,
    right: 16,
  },
  badge: {
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  questionText: {
    color: "#E5E7EB",
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    lineHeight: 28,
  },
  answerText: {
    color: "#E5E7EB",
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
    lineHeight: 26,
  },
  tapHint: {
    color: "#6B7280",
    fontSize: 14,
    fontStyle: "italic",
    opacity: 0.8,
    marginTop: 16,
  },
});

export default FlashcardItem;
