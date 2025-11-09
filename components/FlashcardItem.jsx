import { TouchableOpacity, Text, View } from 'react-native';
import { useState } from 'react';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, interpolate } from 'react-native-reanimated';

// Flashcard component with flip animation
export default function FlashcardItem({ question, answer }) {
  const rotation = useSharedValue(0);

  // Flip card on press
  const flipCard = () => {
    rotation.value = withTiming(rotation.value === 0 ? 180 : 0, { duration: 500 });
  };

  // Front side animation
  const frontAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotateY: `${interpolate(rotation.value, [0, 180], [0, 180])}deg` }],
    backfaceVisibility: 'hidden'
  }));

  // Back side animation
  const backAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotateY: `${interpolate(rotation.value, [0, 180], [180, 360])}deg` }],
    backfaceVisibility: 'hidden'
  }));

  return (
    <TouchableOpacity onPress={flipCard} className="w-80 h-96 mx-4" activeOpacity={0.9}>
      <View className="relative w-full h-full">
        {/* Front - Question */}
        <Animated.View 
          style={frontAnimatedStyle} 
          className="absolute w-full h-full bg-white rounded-xl shadow-sm p-6 items-center justify-center border border-gray-200"
        >
          <Text className="text-gray-800 text-xl font-bold text-center mb-4">
            {question}
          </Text>
          <Text className="text-gray-400 text-sm">Tap to see answer</Text>
        </Animated.View>

        {/* Back - Answer */}
        <Animated.View 
          style={backAnimatedStyle} 
          className="absolute w-full h-full bg-blue-50 rounded-xl shadow-sm p-6 items-center justify-center border border-blue-200"
        >
          <Text className="text-blue-900 text-lg text-center mb-4">
            {answer}
          </Text>
          <Text className="text-blue-400 text-sm">Tap to see question</Text>
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
}
