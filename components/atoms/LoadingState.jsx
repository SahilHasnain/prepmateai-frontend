import { View, ActivityIndicator, Text } from "react-native";

/**
 * LoadingState Component (Atom)
 * Consistent loading indicator with optional message
 */
const LoadingState = ({ message = "Loading..." }) => {
  return (
    <View className="items-center justify-center flex-1">
      <ActivityIndicator size="large" color="#3b82f6" />
      {message && (
        <Text className="mt-3 text-base text-gray-600">{message}</Text>
      )}
    </View>
  );
};

export default LoadingState;
