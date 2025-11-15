import { View, Text, TextInput, StyleSheet } from "react-native";
import { colors, gradients, shadows } from "../../utils/colors";

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
        placeholderTextColor={colors.p5}
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
    color: colors.p5,
    marginBottom: 8,
    fontWeight: "500",
  },
  input: {
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: colors.s3,
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: colors.s2,
    color: colors.p4,
    fontSize: 15,
  },
  error: {
    fontSize: 13,
    color: "#F8B4B4", // Pastel red for soft error
    marginTop: 6,
  },
});
