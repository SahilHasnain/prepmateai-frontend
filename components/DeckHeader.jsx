import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import IconButton from "./atoms/IconButton";
import { colors, gradients } from "../utils/colors";

const DeckHeader = ({ topic, nextReview, onBack, onShuffle, showShuffle }) => {
  return (
    <LinearGradient
      colors={gradients.g4}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.header}
    >
      <View style={styles.topRow}>
        <TouchableOpacity
          onPress={onBack}
          style={styles.backButton}
          accessibilityLabel="Go back"
          accessibilityRole="button"
        >
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        {showShuffle && (
          <IconButton
            icon="🔀"
            onPress={onShuffle}
            variant="transparent"
            size="medium"
            accessibilityLabel="Shuffle cards"
          />
        )}
      </View>

      <View style={styles.content}>
        <Text style={styles.heading}>Let's revise gently 💛</Text>
        <Text style={styles.subtext}>One small step at a time.</Text>
        {nextReview && (
          <Text style={styles.nextReview}>
            Next review:{" "}
            {new Date(nextReview).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        )}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 28,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: colors.s2,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 3,
  },
  backText: {
    color: colors.p4,
    fontSize: 14,
    fontWeight: "500",
  },
  content: {
    marginTop: 8,
  },
  heading: {
    color: colors.p4,
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 6,
  },
  subtext: {
    color: colors.p5,
    fontSize: 14,
    marginBottom: 8,
  },
  nextReview: {
    color: colors.p5,
    fontSize: 12,
    marginTop: 4,
  },
});

export default DeckHeader;
