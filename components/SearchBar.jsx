import { View, TextInput } from "react-native";
import { Feather } from "@expo/vector-icons";
import { getMessage } from "../utils/messages";

/**
 * SearchBar Component
 * Glass-morphism style search input with icon
 * Sticky positioning below header
 */
const SearchBar = ({ value, onChangeText }) => {
  return (
    <View className="px-4 py-3 bg-gray-50">
      <View
        className="flex-row items-center px-4 py-3 rounded-2xl"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          shadowColor: "#6366f1",
          shadowOpacity: 0.06,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 2 },
          elevation: 2,
        }}
      >
        <Feather name="search" size={20} color="#9ca3af" />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={getMessage("search.placeholder")}
          placeholderTextColor="#9ca3af"
          className="flex-1 ml-3 text-gray-700"
          style={{ fontSize: 15 }}
        />
      </View>
    </View>
  );
};

export default SearchBar;
