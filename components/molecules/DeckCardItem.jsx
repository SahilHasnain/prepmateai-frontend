import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from "react-native";
import { useRef, useEffect } from "react";
import { getProgressFeedback } from "../../utils/messages";
import { colors } from "../../utils/colors";

/**
 * DeckCard Component - Dark mode
 * Individual deck card with animated progress bar and left accent border
 */
const DeckCard = ({ deck, onPress, onDelete }) => {
  const progressAnim = useRef(new Animated.Value(0)).current;

  // Animate progress bar width on mount or progress change
  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: deck.progress,
      duration: 600,
      useNativeDriver: false, // width animation requires layout
    }).start();
  }, [deck.progress]);

  // Color mapping based on progress (pastel colors for calm aesthetic)
  const leftBorderColor =
    deck.progress >= 1
      ? colors.p1 // Mint
      : deck.progress >= 0.6
        ? colors.p3 // Soft yellow
        : "#F8B4B4"; // Soft red

  const progressBarColor =
    deck.progress >= 1
      ? colors.p1
      : deck.progress >= 0.6
        ? colors.p3
        : "#F8B4B4";

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        styles.card,
        {
          borderLeftWidth: 4,
          borderLeftColor: leftBorderColor,
        },
      ]}
    >
      <View style={styles.header}>
        <Text style={styles.topic}>{deck.topic}</Text>
        <IconButton
          icon="🗑️"
          onPress={(e) => {
            e?.stopPropagation?.();
            onDelete();
          }}
          variant="transparent"
          size="small"
          accessibilityLabel="Delete deck"
        />
      </View>

      {/* Animated Progress Bar */}
      <View style={styles.progressBarBg}>
        <Animated.View
          style={[
            styles.progressBarFill,
            {
              width: progressAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ["0%", "100%"],
              }),
              backgroundColor: progressBarColor,
            },
          ]}
        />
      </View>

      {/* Progress Feedback Text */}
      <Text style={styles.feedbackText}>
        {getProgressFeedback(deck.progress)}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginBottom: 24,
    backgroundColor: colors.s2,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    borderRadius: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  topic: {
    flex: 1,
    paddingRight: 8,
    fontSize: 18,
    fontWeight: "700",
    color: colors.p4,
  },
  progressBarBg: {
    height: 8,
    overflow: "hidden",
    backgroundColor: colors.s3,
    borderRadius: 9999,
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 9999,
  },
  feedbackText: {
    marginTop: 8,
    fontSize: 12,
    fontStyle: "italic",
    color: colors.p5,
  },
});

export default DeckCard;
