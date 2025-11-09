import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, Alert, ToastAndroid, Platform } from 'react-native';
import { useState } from 'react';

// Show toast notification
const showToast = (message) => {
  if (Platform.OS === 'android') {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  } else {
    Alert.alert('Success', message);
  }
};

export default function Planner() {
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [hours, setHours] = useState('');
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState([]);

  // Available topics for NEET/JEE
  const topics = [
    'Kinematics', 'Thermodynamics', 'Organic Chemistry', 'Cell Biology',
    'Calculus', 'Algebra', 'Optics', 'Electromagnetism'
  ];

  // Toggle topic selection
  const toggleTopic = (topic) => {
    setSelectedTopics(prev =>
      prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
    );
  };

  // Generate study plan
  const generatePlan = async () => {
    if (selectedTopics.length === 0 || !hours) {
      Alert.alert('Error', 'Please select topics and enter hours');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/ai/generate-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 'USER_123', // Replace with actual userId from auth
          weakTopics: selectedTopics,
          availableHours: parseFloat(hours)
        })
      });

      const result = await response.json();
      
      if (result.success) {
        setPlan(result.data);
        showToast('AI Plan Generated ✅');
      } else {
        Alert.alert('Error', result.message || 'Failed to generate plan');
      }
    } catch (error) {
      Alert.alert('Error', 'Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  // Difficulty badge color
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold mb-4">Study Planner</Text>

      {/* Topic Selection */}
      <Text className="text-lg font-semibold mb-2">Select Weak Topics</Text>
      <View className="flex-row flex-wrap gap-2 mb-4">
        {topics.map(topic => (
          <TouchableOpacity
            key={topic}
            onPress={() => toggleTopic(topic)}
            className={`px-4 py-2 rounded-full ${
              selectedTopics.includes(topic) ? 'bg-blue-500' : 'bg-gray-200'
            }`}
          >
            <Text className={selectedTopics.includes(topic) ? 'text-white' : 'text-black'}>
              {topic}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Hours Input */}
      <Text className="text-lg font-semibold mb-2">Available Hours</Text>
      <TextInput
        value={hours}
        onChangeText={setHours}
        keyboardType="numeric"
        placeholder="Enter hours (e.g., 5)"
        className="border border-gray-300 rounded-lg p-3 mb-4"
      />

      {/* Generate Button */}
      <TouchableOpacity
        onPress={generatePlan}
        disabled={loading}
        className="bg-blue-500 rounded-lg p-4 items-center mb-6"
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white font-bold text-lg">Generate Plan</Text>
        )}
      </TouchableOpacity>

      {/* Plan Display */}
      {plan.length > 0 && (
        <>
          <Text className="text-xl font-bold mb-3">Your Study Plan</Text>
          {plan.map((item, index) => (
            <View key={index} className="bg-gray-50 rounded-lg p-4 mb-3 border border-gray-200">
              <Text className="text-lg font-semibold mb-1">{item.topic}</Text>
              <Text className="text-gray-600 mb-2">{item.duration} minutes</Text>
              <View className={`${getDifficultyColor(item.difficulty)} px-3 py-1 rounded-full self-start`}>
                <Text className="text-white text-sm font-medium">{item.difficulty}</Text>
              </View>
            </View>
          ))}
        </>
      )}
    </ScrollView>
  );
}
