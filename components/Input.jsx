import { View, Text, TextInput } from "react-native";

// Reusable input component with label and error handling
export default function Input({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = "default",
  error,
}) {
  return (
    <View className="mb-4">
      {label && <Text className="text-sm text-gray-700 mb-2">{label}</Text>}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        className="rounded-md border border-gray-300 p-3 bg-white"
      />
      {error && <Text className="text-sm text-red-500 mt-1">{error}</Text>}
    </View>
  );
}
