import { TouchableOpacity, Text, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import LottieView from "lottie-react-native";
import { getMessage } from "../utils/messages";

/**
 * FAB (Floating Action Button) Component
 * Positioned at bottom-right with safe area spacing
 * Includes rotation animation and Lottie glow effect
 */
const Fab = ({ onPress, rotateAnim }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="absolute"
      style={{ bottom: 26, right: 22, zIndex: 10 }}
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
          colors={["#6366f1", "#8b5cf6"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="items-center justify-center w-16 h-16"
          style={{
            borderRadius: 9999, // rounded-full
            shadowColor: "#6366f1",
            shadowOpacity: 0.35,
            shadowRadius: 10,
            shadowOffset: { width: 0, height: 4 },
            elevation: 8,
            borderWidth: 1,
            borderColor: "rgba(255, 255, 255, 0.2)",
          }}
        >
          {/* Lottie glow animation */}
          <LottieView
            source={require("../assets/plus-glow.json")}
            autoPlay
            loop
            style={{
              width: 80,
              height: 80,
              position: "absolute",
            }}
          />
          <Text className="z-10 text-3xl font-bold text-white">+</Text>
        </LinearGradient>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default Fab;
