import { View, Text, TouchableOpacity } from 'react-native';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import FlashcardItem from '../../components/FlashcardItem';

// Dummy flashcard data
const DUMMY_CARDS = [
  { question: 'What is Newton\'s First Law?', answer: 'An object at rest stays at rest unless acted upon by force' },
  { question: 'Define Entropy', answer: 'Measure of disorder in a system' },
  { question: 'What is Photosynthesis?', answer: 'Process by which plants convert light into energy' },
  { question: 'Explain Ohm\'s Law', answer: 'V = IR (Voltage = Current × Resistance)' },
  { question: 'What is DNA?', answer: 'Deoxyribonucleic acid - carries genetic information' },
  { question: 'Define Momentum', answer: 'Mass × Velocity' },
  { question: 'What is pH?', answer: 'Measure of acidity or alkalinity' },
  { question: 'Explain Mitosis', answer: 'Cell division producing two identical daughter cells' },
  { question: 'What is Kinetic Energy?', answer: '½mv² - energy of motion' },
  { question: 'Define Catalyst', answer: 'Substance that speeds up reaction without being consumed' }
];

// Main Deck Player Screen
function DeckPlayer() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reviewedCount, setReviewedCount] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  // Handle feedback buttons
  const handleFeedback = useCallback((type) => {
    const newReviewedCount = reviewedCount + 1;
    
    if (currentIndex < DUMMY_CARDS.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setReviewedCount(newReviewedCount);
    } else {
      setReviewedCount(DUMMY_CARDS.length);
      setShowConfetti(true);
    }
  }, [currentIndex, reviewedCount]);

  // Hide confetti after animation
  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  const currentCard = useMemo(() => DUMMY_CARDS[currentIndex], [currentIndex]);

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="flex-row items-center p-4 bg-blue-500">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <Text className="text-2xl text-white">←</Text>
        </TouchableOpacity>
        <Text className="text-xl font-bold text-white">Thermodynamics</Text>
      </View>

      {/* Card Area */}
      <View className="items-center justify-center flex-1 px-6">
        <FlashcardItem question={currentCard.question} answer={currentCard.answer} />
      </View>

      {/* Feedback Buttons */}
      <View className="flex-row justify-around px-6 mb-6">
        <TouchableOpacity onPress={() => handleFeedback('wrong')} className="items-center justify-center w-16 h-16 bg-red-500 rounded-full">
          <Text className="text-2xl">❌</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleFeedback('unsure')} className="items-center justify-center w-16 h-16 bg-yellow-500 rounded-full">
          <Text className="text-2xl">🤔</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleFeedback('correct')} className="items-center justify-center w-16 h-16 bg-green-500 rounded-full">
          <Text className="text-2xl">✅</Text>
        </TouchableOpacity>
      </View>

      {/* Footer Progress */}
      <View className="items-center pb-6">
        <Text className="text-lg font-medium text-gray-600">
          {reviewedCount} / {DUMMY_CARDS.length} cards reviewed
        </Text>
      </View>

      {/* Confetti Animation */}
      {showConfetti && (
        <View className="absolute inset-0 pointer-events-none">
          <LottieView
            source={require('../../assets/confetti.json')}
            autoPlay
            loop={false}
            style={{ width: '100%', height: '100%' }}
          />
        </View>
      )}
    </View>
  );
}

export default DeckPlayer;
