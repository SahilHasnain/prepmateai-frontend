import { Alert } from "react-native";

// Unified user-friendly error handler
export const handleError = (msg) => {
  Alert.alert("Error", msg || "Something went wrong, please try again.");
};
