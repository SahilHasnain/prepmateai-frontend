import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { Slot, useRouter } from "expo-router";
import { useAuth } from "../../hooks/useAuth";

// Protected route wrapper - redirects to login if not authenticated
export default function MainLayout() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading]);

  // Show loading spinner
  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  // Render protected routes
  return user ? <Slot /> : null;
}
