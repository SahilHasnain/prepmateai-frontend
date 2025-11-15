import { View, Text, TextInput, StyleSheet } from "react-native";

// Atom: Input - dark mode labeled text field with calming aesthetics
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
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#6B7280"
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        style={styles.input}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: "#9CA3AF",
    marginBottom: 8,
    fontWeight: "500",
  },
  input: {
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#2A2D33",
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: "#1C1F24",
    color: "#E5E7EB",
    fontSize: 15,
  },
  error: {
    fontSize: 13,
    color: "#F8B4B4", // Pastel red for soft error
    marginTop: 6,
  },
});
