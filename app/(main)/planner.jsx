import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  ToastAndroid,
  Platform,
} from "react-native";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

// Show toast notification
const showToast = (message) => {
  if (Platform.OS === "android") {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  } else {
    Alert.alert("Success", message);
  }
};

export default function Planner() {
  const { user } = useAuth();
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [hours, setHours] = useState("");
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState([]);

  // Available topics for NEET/JEE
  const topics = [
    "Kinematics",
    "Thermodynamics",
    "Organic Chemistry",
    "Cell Biology",
    "Calculus",
    "Algebra",
    "Optics",
    "Electromagnetism",
  ];

  // Toggle topic selection
  const toggleTopic = (topic) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic],
    );
  };

  // Generate study plan
  const generatePlan = async () => {
    if (selectedTopics.length === 0 || !hours) {
      Alert.alert("Error", "Please select topics and enter hours");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        "http://192.168.31.143:5000/api/ai/generate-plan",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user?.$id,
            weakTopics: selectedTopics,
            availableHours: parseFloat(hours),
          }),
        },
      );

      const result = await response.json();

      if (result.success) {
        setPlan(result.data);
        showToast("AI Plan Generated ✅");
      } else {
        Alert.alert("Error", result.message || "Failed to generate plan");
      }
    } catch (error) {
      Alert.alert("Error", "Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  // Difficulty badge color
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-500";
      case "medium":
        return "bg-yellow-500";
      case "hard":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <ScrollView className="flex-1 p-4 bg-white">
      <Text className="mb-4 text-2xl font-bold">Study Planner</Text>

      {/* Topic Selection */}
      <Text className="mb-2 text-lg font-semibold">Select Weak Topics</Text>
      <View className="flex-row flex-wrap gap-2 mb-4">
        {topics.map((topic) => (
          <TouchableOpacity
            key={topic}
            onPress={() => toggleTopic(topic)}
            className={`px-4 py-2 rounded-full ${
              selectedTopics.includes(topic) ? "bg-blue-500" : "bg-gray-200"
            }`}
          >
            <Text
              className={
                selectedTopics.includes(topic) ? "text-white" : "text-black"
              }
            >
              {topic}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Hours Input */}
      <Text className="mb-2 text-lg font-semibold">Available Hours</Text>
      <TextInput
        value={hours}
        onChangeText={setHours}
        keyboardType="numeric"
        placeholder="Enter hours (e.g., 5)"
        className="p-3 mb-4 border border-gray-300 rounded-lg"
      />

      {/* Generate Button */}
      <TouchableOpacity
        onPress={generatePlan}
        disabled={loading}
        className="items-center p-4 mb-6 bg-blue-500 rounded-lg"
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-lg font-bold text-white">Generate Plan</Text>
        )}
      </TouchableOpacity>

      {/* Plan Display */}
      {plan.length > 0 && (
        <>
          <Text className="mb-3 text-xl font-bold">Your Study Plan</Text>
          {plan.map((item, index) => (
            <View
              key={index}
              className="p-4 mb-3 border border-gray-200 rounded-lg bg-gray-50"
            >
              <Text className="mb-1 text-lg font-semibold">{item.topic}</Text>
              <Text className="mb-2 text-gray-600">
                {item.duration} minutes
              </Text>
              <View
                className={`${getDifficultyColor(item.difficulty)} px-3 py-1 rounded-full self-start`}
              >
                <Text className="text-sm font-medium text-white">
                  {item.difficulty}
                </Text>
              </View>
            </View>
          ))}
        </>
      )}
    </ScrollView>
  );
}
