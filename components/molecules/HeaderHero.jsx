import { View, Text, Animated, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import LottieView from "lottie-react-native";
import { getMessage } from "../../utils/messages";
import { colors, gradients } from "../../utils/colors";

/**
 * HeaderHero Component - Dark mode with calming gradient
 * Soft gradient header with supportive messaging for NEET/JEE students
 */
const HeaderHero = ({ stats, subtitleFadeAnim }) => {
  return (
    <LinearGradient
      colors={gradients.g2}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.gradient}
    >
      {/* Lottie background glow */}
      <LottieView
        source={require("../assets/header-glow.json")}
        autoPlay
        loop={false}
        style={styles.lottie}
      />

      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{getMessage("header.title")}</Text>
          <Animated.Text
            style={[styles.subtitle, { opacity: subtitleFadeAnim }]}
          >
            {getMessage("header.subtitle")}
          </Animated.Text>
        </View>

        {/* Streak badge */}
        {stats && stats.streak > 0 && (
          <View style={styles.streakBadge}>
            <Text style={styles.streakText}>
              {getMessage("header.streakPrefix")}
              {stats.streak}
              {getMessage("header.streakSuffix")}
            </Text>
          </View>
        )}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    position: "relative",
    paddingHorizontal: 24,
    paddingVertical: 24,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  lottie: {
    position: "absolute",
    width: "100%",
    height: "100%",
    opacity: 0.08,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: colors.p4,
  },
  subtitle: {
    marginTop: 6,
    fontSize: 14,
    color: colors.p5,
    lineHeight: 20,
  },
  streakBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 9999,
    backgroundColor: "rgba(253, 230, 138, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(253, 230, 138, 0.2)",
  },
  streakText: {
    fontSize: 12,
    fontWeight: "500",
    color: colors.p3,
  },
});

export default HeaderHero;
