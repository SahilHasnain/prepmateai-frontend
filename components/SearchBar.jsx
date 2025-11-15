import { View, TextInput, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { getMessage } from "../utils/messages";

/**
 * SearchBar Component - Dark mode
 * Minimalist search input for deck filtering
 */
const SearchBar = ({ value, onChangeText }) => {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Feather name="search" size={20} color="#6B7280" />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={getMessage("search.placeholder")}
          placeholderTextColor="#6B7280"
          style={styles.input}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#0F1115",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: "#1C1F24",
    borderWidth: 1.5,
    borderColor: "#2A2D33",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
    color: "#E5E7EB",
  },
});

export default SearchBar;
