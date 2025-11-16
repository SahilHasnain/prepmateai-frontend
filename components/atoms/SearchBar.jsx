import { View, TextInput, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { getMessage } from "../../utils/messages";
import { colors } from "../../utils/colors";

/**
 * SearchBar Component - Dark mode
 * Minimalist search input for deck filtering
 */
const SearchBar = ({ value, onChangeText }) => {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Feather name="search" size={20} color={colors.p5} />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={getMessage("search.placeholder")}
          placeholderTextColor={colors.p5}
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
    backgroundColor: colors.s1,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: colors.s2,
    borderWidth: 1.5,
    borderColor: colors.s3,
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
    color: colors.p4,
  },
});

export default SearchBar;
