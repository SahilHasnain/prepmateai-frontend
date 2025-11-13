import { View, Text, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import LottieView from "lottie-react-native";
import { getMessage } from "../utils/messages";

/**
 * HeaderHero Component
 * Gradient header with title, subtitle, and optional streak badge
 * Sticky positioning for scroll persistence
 */
const HeaderHero = ({ stats, subtitleFadeAnim }) => {
  return (
    <LinearGradient
      colors={["#6366f1", "#8b5cf6", "#a78bfa"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      className="relative px-6 py-6"
      style={{
        shadowColor: "#6366f1",
        shadowOpacity: 0.12,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
      }}
    >
      {/* Lottie background glow */}
      <LottieView
        source={require("../assets/header-glow.json")}
        autoPlay
        loop={false}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          opacity: 0.15,
        }}
      />

      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          <Text className="text-2xl font-semibold text-white">
            {getMessage("header.title")}
          </Text>
          <Animated.Text
            className="mt-1.5 text-sm text-indigo-100 leading-5"
            style={{ opacity: subtitleFadeAnim }}
          >
            {getMessage("header.subtitle")}
          </Animated.Text>
        </View>

        {/* Streak badge */}
        {stats && stats.streak > 0 && (
          <View className="px-3 py-1.5 rounded-full bg-white/15 border border-white/20">
            <Text className="text-xs font-medium text-amber-200">
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

export default HeaderHero;
