import { TouchableOpacity, Text, Animated, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import LottieView from "lottie-react-native";
import { getMessage } from "../../utils/messages";
import { colors, gradients } from "../../utils/colors";

/**
 * FAB - Dark mode floating action button with calming mint accent
 * Soft gradient for non-pressurizing deck creation
 */
const Fab = ({ onPress, rotateAnim }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.fab}
      accessibilityLabel={getMessage("fab.accessibility")}
      accessibilityRole="button"
    >
      <Animated.View
        style={{
          transform: [
            {
              rotate: rotateAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ["0deg", "90deg"],
              }),
            },
          ],
        }}
      >
        <LinearGradient
          colors={gradients.g3}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          {/* Lottie glow animation */}
          <LottieView
            source={require("../../assets/plus-glow.json")}
            autoPlay
            loop
            style={styles.lottie}
          />
          <Text style={styles.plusIcon}>+</Text>
        </LinearGradient>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 26,
    right: 22,
    zIndex: 10,
  },
  gradient: {
    width: 64,
    height: 64,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 9999,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
    borderWidth: 1.5,
    borderColor: colors.s3,
  },
  lottie: {
    width: 80,
    height: 80,
    position: "absolute",
    opacity: 0.5,
  },
  plusIcon: {
    zIndex: 10,
    fontSize: 32,
    fontWeight: "700",
    color: colors.p1,
  },
});

export default Fab;
