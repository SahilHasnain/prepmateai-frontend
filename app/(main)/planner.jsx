import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../hooks/useAuth";
import PlannerForm from "../../components/organisms/PlannerForm";

export default function Planner() {
  const { user } = useAuth();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1">
        <PlannerForm userId={user?.$id} />
      </ScrollView>
    </SafeAreaView>
  );
}
