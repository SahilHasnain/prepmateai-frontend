// New Deck Generator Screen - AI creates flashcards
import { View, Text, Alert, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { useRouter } from "expo-router";
import Input from "../../components/atoms/Input";
import Button from "../../components/atoms/Button";
import { NODE_API_BASE_URL } from "../../config/env";
import { useAuth } from "../../hooks/useAuth";
import { getMessage } from "../../utils/messages";
import { colors, gradients } from "../../utils/colors";

export default function NewDeck() {
  const router = useRouter();
  const { user } = useAuth();
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) {
      Alert.alert("Topic needed", getMessage("errors.invalidTopic"));
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `${NODE_API_BASE_URL}/api/ai/generate-flashcards`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user.$id, topic: topic.trim() }),
        }
      );
      const json = await res.json();

      if (json.success) {
        Alert.alert("Deck created! 🎉", "Your flashcards are ready to review.");
        router.back();
      } else {
        Alert.alert(
          "Couldn't create deck",
          json.message || getMessage("errors.saveFailed")
        );
      }
    } catch (e) {
      Alert.alert("Network issue", getMessage("errors.networkError"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.heading}>Create a new deck 🌱</Text>
        <Text style={styles.subtitle}>
          Enter any topic — AI will generate thoughtful flashcards for you.
        </Text>

        <Input
          label="Topic or Subject"
          value={topic}
          onChangeText={setTopic}
          placeholder="e.g., Organic Chemistry, Kinematics"
        />

        <Button
          title="Generate Flashcards"
          onPress={handleGenerate}
          loading={loading}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.s1,
  },
  container: {
    padding: 24,
  },
  heading: {
    fontSize: 26,
    fontWeight: "700",
    color: colors.p4,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: colors.p5,
    marginBottom: 24,
    lineHeight: 22,
  },
});
