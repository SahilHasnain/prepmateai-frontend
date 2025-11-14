import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useAuth } from "../../hooks/useAuth";
import Button from "../../components/atoms/Button";
import { logout } from "../../services/appwrite";

// Dashboard screen - protected route
export default function Dashboard() {
  const { user, refreshUser } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    const { success } = await logout();
    if (success) {
      refreshUser();
      router.replace("/login");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="items-center justify-center flex-1 px-6">
        <Text className="mb-4 text-3xl font-bold">Dashboard</Text>
        <Text className="mb-8 text-lg text-gray-600">
          Welcome, {user?.name}!
        </Text>

        {/* Temporary Navigation for Testing */}
        <View className="w-full gap-3 mb-8">
          <Button
            title="Study Planner"
            onPress={() => router.push("/(main)/planner")}
          />
          <Button
            title="Flashcards"
            onPress={() => router.push("/(main)/flashcards")}
          />
        </View>

        <Button title="Logout" onPress={handleLogout} variant="outline" />
      </View>
    </SafeAreaView>
  );
}
