import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useCallback } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

const DeckCard = ({
  topic,
  progress,
  totalCards,
  masteredCards,
  lastReviewed,
  onPress,
  onDelete,
}) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.95);
  }, [scale]);

  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1);
  }, [scale]);

  const getBorderColor = () => {
    if (progress >= 0.7) return "#45F6C3"; // Mint
    if (progress >= 0.4) return "#FDE68A"; // Soft yellow
    return "#F8B4B4"; // Soft red
  };

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[styles.card, { borderColor: getBorderColor() }]}
      >
        <View style={styles.header}>
          <Text style={styles.topic}>{topic}</Text>
          {onDelete && (
            <TouchableOpacity
              onPress={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              style={styles.deleteButton}
            >
              <Text style={styles.deleteIcon}>🗑️</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.progressBarBg}>
          <View
            style={[styles.progressBarFill, { width: `${progress * 100}%` }]}
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.masteredText}>
            {masteredCards}/{totalCards} Mastered
          </Text>
          {lastReviewed && (
            <Text style={styles.dateText}>
              {new Date(lastReviewed).toLocaleDateString()}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginBottom: 12,
    backgroundColor: "#1C1F24",
    borderWidth: 2,
    borderRadius: 14,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  topic: {
    flex: 1,
    fontSize: 18,
    fontWeight: "600",
    color: "#E5E7EB",
  },
  deleteButton: {
    padding: 8,
  },
  deleteIcon: {
    color: "#F8B4B4",
    fontSize: 18,
  },
  progressBarBg: {
    height: 8,
    marginBottom: 8,
    overflow: "hidden",
    backgroundColor: "#2A2D33",
    borderRadius: 9999,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#93C5FD",
    borderRadius: 9999,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  masteredText: {
    fontSize: 14,
    color: "#9CA3AF",
  },
  dateText: {
    fontSize: 12,
    color: "#6B7280",
  },
});

export default DeckCard;
