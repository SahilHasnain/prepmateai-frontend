// New Deck Generator Screen - AI creates flashcards
import { View, Text, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { useRouter } from "expo-router";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { NODE_API_BASE_URL } from "../../config/env";
import { useAuth } from "../../hooks/useAuth";
import { getMessage } from "../../utils/messages";

export default function NewDeck() {
  const router = useRouter();
  const { user } = useAuth();
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) {
      Alert.alert("Error", getMessage("errors.invalidTopic"));
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
        },
      );
      const json = await res.json();

      if (json.success) {
        Alert.alert(getMessage("success.deckCreated"), getMessage("success.deckCreated"));
        router.back();
      } else {
        Alert.alert("Error", json.message || getMessage("errors.saveFailed"));
      }
    } catch (e) {
      Alert.alert("Error", getMessage("errors.networkError"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="p-6">
        <Text className="text-2xl font-bold text-gray-800 mb-6">
          Create New Deck
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
