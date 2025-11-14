import { View, Text, TouchableOpacity } from "react-native";

/**
 * ErrorState Component (Atom)
 * Consistent error display with retry button
 */
const ErrorState = ({ error, onRetry }) => {
  return (
    <View className="items-center justify-center flex-1 px-6">
      <Text className="mb-4 text-lg text-center text-red-600">⚠️ {error}</Text>
      {onRetry && (
        <TouchableOpacity
          onPress={onRetry}
          className="px-6 py-3 bg-blue-500 rounded-lg"
        >
          <Text className="font-bold text-white">Retry</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ErrorState;
