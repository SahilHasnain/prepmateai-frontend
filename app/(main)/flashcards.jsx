import { View, Text, TextInput, TouchableOpacity, FlatList, ActivityIndicator, Alert, ToastAndroid, Platform } from 'react-native';
import { useState, useCallback } from 'react';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, interpolate } from 'react-native-reanimated';

// Show toast notification
const showToast = (message) => {
  if (Platform.OS === 'android') {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  } else {
    Alert.alert('Success', message);
  }
};

// Flashcard Item Component (internal)
const FlashcardItem = ({ question, answer }) => {
  const rotation = useSharedValue(0);

  // Flip card animation
  const flipCard = () => {
    rotation.value = withTiming(rotation.value === 0 ? 180 : 0, { duration: 500 });
  };

  const frontAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotateY: `${interpolate(rotation.value, [0, 180], [0, 180])}deg` }],
    backfaceVisibility: 'hidden'
  }));

  const backAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotateY: `${interpolate(rotation.value, [0, 180], [180, 360])}deg` }],
    backfaceVisibility: 'hidden'
  }));

  return (
    <TouchableOpacity onPress={flipCard} className="w-80 h-96 mx-4">
      <View className="relative w-full h-full">
        {/* Front */}
        <Animated.View style={frontAnimatedStyle} className="absolute w-full h-full bg-blue-500 rounded-2xl p-6 items-center justify-center">
          <Text className="text-white text-xl font-bold text-center">{question}</Text>
          <Text className="text-white/70 text-sm mt-4">Tap to flip</Text>
        </Animated.View>

        {/* Back */}
        <Animated.View style={backAnimatedStyle} className="absolute w-full h-full bg-green-500 rounded-2xl p-6 items-center justify-center">
          <Text className="text-white text-lg text-center">{answer}</Text>
          <Text className="text-white/70 text-sm mt-4">Tap to flip</Text>
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
};

// Main Flashcards Screen
function Flashcards() {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [flashcards, setFlashcards] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // Generate flashcards
  const generateFlashcards = async () => {
    if (!topic.trim()) {
      Alert.alert('Error', 'Please enter a topic');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/ai/generate-flashcards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 'USER_123', // Replace with actual userId from auth
          topic: topic.trim()
        })
      });

      const result = await response.json();
      
      if (result.success) {
        setFlashcards(result.data.flashcards);
        showToast('Flashcards Generated ✅');
      } else {
        Alert.alert('Error', result.message || 'Failed to generate flashcards');
      }
    } catch (error) {
      Alert.alert('Error', 'Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="p-4 bg-blue-500">
        <Text className="text-2xl font-bold text-white mb-4">Flashcards</Text>

        {/* Topic Input */}
        <TextInput
          value={topic}
          onChangeText={setTopic}
          placeholder="Enter topic (e.g., Thermodynamics)"
          placeholderTextColor="#fff9"
          className="bg-white/20 text-white rounded-lg p-3 mb-3"
        />

        {/* Generate Button */}
        <TouchableOpacity
          onPress={generateFlashcards}
          disabled={loading}
          className="bg-white rounded-lg p-3 items-center"
        >
          {loading ? (
            <ActivityIndicator color="#3b82f6" />
          ) : (
            <Text className="text-blue-500 font-bold">Generate Flashcards</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Flashcards Display */}
      {flashcards.length > 0 ? (
        <View className="flex-1 justify-center">
          <FlatList
            data={flashcards}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={useCallback((e) => {
              const index = Math.round(e.nativeEvent.contentOffset.x / 320);
              setActiveIndex(index);
            }, [])}
            renderItem={useCallback(({ item }) => (
              <FlashcardItem question={item.question} answer={item.answer} />
            ), [])}
            keyExtractor={useCallback((item, index) => `flashcard-${index}`, [])}
          />

          {/* Progress Indicator */}
          <View className="flex-row justify-center items-center py-4">
            <Text className="text-gray-600 font-medium">
              {activeIndex + 1} / {flashcards.length}
            </Text>
          </View>
        </View>
      ) : (
        <View className="flex-1 items-center justify-center">
          <Text className="text-gray-400 text-lg">No flashcards yet</Text>
          <Text className="text-gray-400 text-sm mt-2">Enter a topic to generate</Text>
        </View>
      )}
    </View>
  );
}

export default Flashcards;
