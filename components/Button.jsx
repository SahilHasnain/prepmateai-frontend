import { TouchableOpacity, Text, ActivityIndicator } from "react-native";

// Reusable button component with variants and loading state
export default function Button({
  title,
  onPress,
  loading = false,
  variant = "default",
}) {
  const isOutline = variant === "outline";

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={loading}
      className={`py-3 rounded-xl items-center ${
        isOutline ? "border border-blue-500 bg-transparent" : "bg-blue-500"
      }`}
    >
      {loading ? (
        <ActivityIndicator color={isOutline ? "#3b82f6" : "#fff"} />
      ) : (
        <Text
          className={`font-semibold ${
            isOutline ? "text-blue-500" : "text-white"
          }`}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}
