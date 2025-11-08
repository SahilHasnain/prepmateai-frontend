import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../../hooks/useAuth";
import Button from "../../components/Button";
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
    <View className="flex-1 justify-center items-center bg-white px-6">
      <Text className="text-3xl font-bold mb-4">Dashboard</Text>
      <Text className="text-lg text-gray-600 mb-8">
        Welcome, {user?.name}!
      </Text>
      <Button title="Logout" onPress={handleLogout} variant="outline" />
    </View>
  );
}
