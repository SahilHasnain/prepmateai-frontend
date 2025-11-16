import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { getMessage } from "../../utils/messages";
import { colors } from "../../utils/colors";

/**
 * EmptyState - Dark mode first-time onboarding
 * Encouraging message for NEET/JEE students starting their journey
 */
const EmptyState = ({ onCreateDeck }) => {
  return (
    <View style={styles.container}>
      {/* Illustration */}
      <View style={styles.illustration}>
        <Text style={styles.emoji}>📚</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{getMessage("emptyState.badge")}</Text>
        </View>
      </View>

      {/* Title */}
      <Text style={styles.title}>{getMessage("emptyState.title")}</Text>

      {/* Subtitle */}
      <Text style={styles.subtitle}>{getMessage("emptyState.subtitle")}</Text>

      {/* CTA Button */}
      <TouchableOpacity
        onPress={onCreateDeck}
        activeOpacity={0.8}
        style={styles.button}
      >
        <Text style={styles.buttonText}>
          {getMessage("emptyState.ctaButton")}
        </Text>
      </TouchableOpacity>

      {/* Helper text */}
      <Text style={styles.helperText}>
        {getMessage("emptyState.helperText")}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    marginTop: -20,
  },
  illustration: {
    alignItems: "center",
  },
  emoji: {
    fontSize: 80,
    lineHeight: 90,
  },
  badge: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    backgroundColor: "rgba(69, 246, 195, 0.1)",
    borderRadius: 9999,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "rgba(69, 246, 195, 0.2)",
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "500",
    color: colors.p1,
  },
  title: {
    marginTop: 24,
    marginBottom: 8,
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    color: colors.p4,
  },
  subtitle: {
    maxWidth: 320,
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
    color: colors.p5,
    marginBottom: 24,
  },
  button: {
    marginTop: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 14,
    backgroundColor: colors.s3,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
    borderWidth: 1.5,
    borderColor: colors.s3,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    color: colors.p4,
  },
  helperText: {
    marginTop: 16,
    fontSize: 12,
    textAlign: "center",
    color: colors.p5,
  },
});

export default EmptyState;
