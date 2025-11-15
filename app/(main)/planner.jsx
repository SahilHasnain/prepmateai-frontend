import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../hooks/useAuth";
import PlannerForm from "../../components/organisms/PlannerForm";
import { colors, gradients } from "../../utils/colors";

export default function Planner() {
  const { user } = useAuth();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView}>
        <PlannerForm userId={user?.$id} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.s1,
  },
  scrollView: {
    flex: 1,
  },
});
