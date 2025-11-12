import { View, Text } from "react-native";

// Dopamine trigger: streak visibility with fire icon
const StreakDisplay = ({ streak }) => {
  if (!streak || streak === 0) return null;

  return (
    <View className="flex-row items-center px-4 py-2 bg-orange-100 rounded-full">
      <Text className="mr-2 text-2xl">🔥</Text>
      <View>
        <Text className="text-lg font-bold text-orange-600">{streak}-day</Text>
        <Text className="text-xs text-orange-500">streak</Text>
      </View>
    </View>
  );
};

export default StreakDisplay;
