import { View, Text, TouchableOpacity } from 'react-native';
import { useCallback, useMemo } from 'react';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

// Reusable Deck Card Component
const DeckCard = ({ topic, progress, difficulty, onPress }) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }]
  }));

  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.95);
  }, [scale]);

  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1);
  }, [scale]);
  const borderColors = {
    easy: 'border-green-400',
    medium: 'border-yellow-400',
    hard: 'border-red-400'
  };

  const learned = useMemo(() => Math.round(progress * 10), [progress]);
  const total = 10;

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        className={`p-4 mb-3 bg-white border-2 rounded-xl ${borderColors[difficulty]}`}
      >
      {/* Topic Title */}
      <Text className="mb-3 text-lg font-semibold text-gray-800">{topic}</Text>

      {/* Progress Bar */}
      <View className="h-2 mb-2 overflow-hidden bg-gray-200 rounded-full">
        <View className="h-full bg-blue-500" style={{ width: `${progress * 100}%` }} />
      </View>

      {/* Mastered Text */}
      <Text className="text-sm text-gray-600">{learned}/{total} Mastered</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default DeckCard;
