import { View, Text, TextInput, TouchableOpacity, FlatList, ActivityIndicator, Alert, ToastAndroid, Platform } from 'react-native';
import { useState, useCallback } from 'react';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, interpolate } from 'react-native-reanimated';
import { useAuth } from '../../hooks/useAuth';

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
    <TouchableOpacity onPress={flipCard} className="mx-4 w-80 h-96">
      <View className="relative w-full h-full">
        {/* Front */}
        <Animated.View style={frontAnimatedStyle} className="absolute items-center justify-center w-full h-full p-6 bg-blue-500 rounded-2xl">
          <Text className="text-xl font-bold text-center text-white">{question}</Text>
          <Text className="mt-4 text-sm text-white/70">Tap to flip</Text>
        </Animated.View>

        {/* Back */}
        <Animated.View style={backAnimatedStyle} className="absolute items-center justify-center w-full h-full p-6 bg-green-500 rounded-2xl">
          <Text className="text-lg text-center text-white">{answer}</Text>
          <Text className="mt-4 text-sm text-white/70">Tap to flip</Text>
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
};

// Main Flashcards Screen
function Flashcards() {
  const { user } = useAuth();
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
      const response = await fetch('http://192.168.31.143:5000/api/ai/generate-flashcards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.$id,
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
        <Text className="mb-4 text-2xl font-bold text-white">Flashcards</Text>

        {/* Topic Input */}
        <TextInput
          value={topic}
          onChangeText={setTopic}
          placeholder="Enter topic (e.g., Thermodynamics)"
          placeholderTextColor="#fff9"
          className="p-3 mb-3 text-white rounded-lg bg-white/20"
        />

        {/* Generate Button */}
        <TouchableOpacity
          onPress={generateFlashcards}
          disabled={loading}
          className="items-center p-3 bg-white rounded-lg"
        >
          {loading ? (
            <ActivityIndicator color="#3b82f6" />
          ) : (
            <Text className="font-bold text-blue-500">Generate Flashcards</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Flashcards Display */}
      {flashcards.length > 0 ? (
        <View className="justify-center flex-1">
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
          <View className="flex-row items-center justify-center py-4">
            <Text className="font-medium text-gray-600">
              {activeIndex + 1} / {flashcards.length}
            </Text>
          </View>
        </View>
      ) : (
        <View className="items-center justify-center flex-1">
          <Text className="text-lg text-gray-400">No flashcards yet</Text>
          <Text className="mt-2 text-sm text-gray-400">Enter a topic to generate</Text>
        </View>
      )}
    </View>
  );
}

export default Flashcards;
