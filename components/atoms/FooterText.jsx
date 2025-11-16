import { Text, StyleSheet } from "react-native";
import { colors } from "../../utils/colors";

/**
 * FooterText - Micro-text for subtle messaging
 *
 * Props:
 * - children: Text content
 */

const FooterText = ({ children }) => {
  return <Text style={styles.text}>{children}</Text>;
};

export default FooterText;

const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    fontWeight: "400",
    color: colors.p5,
    textAlign: "center",
    fontStyle: "italic",
    opacity: 0.8,
  },
});
