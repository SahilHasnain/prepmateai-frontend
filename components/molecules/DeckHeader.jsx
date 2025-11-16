import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors, gradients } from "../../utils/colors";

const DeckHeader = () => {
  return (
    <LinearGradient
      colors={gradients.g4}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.header}
    >
      <View style={styles.content}>
        <Text style={styles.heading}>
          Tiny steps today, mastery tomorrow. 💛
        </Text>
        <Text style={styles.subtext}>
          Show up calmly — the rest will follow.
        </Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 28,
  },
  content: {
    marginTop: 8,
  },
  heading: {
    color: colors.p4,
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 6,
  },
  subtext: {
    color: colors.p5,
    fontSize: 14,
    marginBottom: 8,
  },
});

export default DeckHeader;
