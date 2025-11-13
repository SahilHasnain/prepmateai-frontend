import { View, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { getMessage } from "../utils/messages";

/**
 * EmptyState Component
 * First-time user onboarding with illustration and CTA
 * Centered layout with emotional encouragement
 */
const EmptyState = ({ onCreateDeck }) => {
  return (
    <View
      className="items-center justify-center flex-1 px-6"
      style={{ marginTop: -20 }}
    >
      {/* Illustration */}
      <View className="items-center">
        <Text style={{ fontSize: 80, lineHeight: 90 }}>📚</Text>
        <View
          className="px-6 py-2 bg-white rounded-full"
          style={{
            marginTop: 10,
            shadowColor: "#6366f1",
            shadowOpacity: 0.1,
            shadowRadius: 12,
            shadowOffset: { width: 0, height: 4 },
            elevation: 3,
          }}
        >
          <Text className="text-xs font-medium text-indigo-500">
            {getMessage("emptyState.badge")}
          </Text>
        </View>
      </View>

      {/* Title */}
      <Text
        className="mb-2 text-2xl font-bold text-center text-gray-800"
        style={{ marginTop: 24 }}
      >
        {getMessage("emptyState.title")}
      </Text>

      {/* Subtitle */}
      <Text
        className="max-w-xs text-base leading-6 text-center text-gray-500"
        style={{ marginBottom: 24 }}
      >
        {getMessage("emptyState.subtitle")}
      </Text>

      {/* CTA Button */}
      <TouchableOpacity
        onPress={onCreateDeck}
        activeOpacity={0.8}
        style={{ marginTop: 12 }}
      >
        <LinearGradient
          colors={["#6366f1", "#8b5cf6"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            paddingVertical: 16,
            paddingHorizontal: 32,
            borderRadius: 12, // rounded-xl
            shadowColor: "#6366f1",
            shadowOpacity: 0.25,
            shadowRadius: 12,
            shadowOffset: { width: 0, height: 4 },
            elevation: 6,
          }}
        >
          <Text className="text-base font-semibold text-center text-white">
            {getMessage("emptyState.ctaButton")}
          </Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Helper text */}
      <Text
        className="text-xs text-center text-gray-400"
        style={{ marginTop: 16 }}
      >
        {getMessage("emptyState.helperText")}
      </Text>
    </View>
  );
};

export default EmptyState;
