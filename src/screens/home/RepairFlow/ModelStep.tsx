import { responsive } from "@/hooks/resposive";
import CurvedShape from "@/src/component/ui/CurvedBackground ";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const models = ["Aspire", "Swift", "Predator", "TravelMate"];
type CategoryStepProps = {
  onNext: (selectedCategory: string) => void;
  onBack: () => void;
};
const ModelStep = ({ onNext, onBack }: CategoryStepProps) => {
  return (
    <View style={styles.container}>
      <CurvedShape
        title="Select Model"
        handeleBackButtonPrees={() => {
          onBack();
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          <Text style={styles.title}>Please Choose Device</Text>
          <Text style={styles.highlight}>Model</Text>
          <View style={styles.grid}>
            {models.map((model, index) => (
              <TouchableOpacity
                key={index}
                style={styles.card}
                onPress={() => onNext(model)}
              >
                <Text style={styles.label}>{model}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </CurvedShape>
    </View>
  );
};

export default ModelStep;

const styles = StyleSheet.create({
  container: {
    // padding: responsive.number(16),
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContainer: {
    padding: responsive.number(16),
  },
  title: {
    fontSize: responsive.fontSize(18),
    fontWeight: "600",
  },
  highlight: {
    fontSize: responsive.fontSize(18),
    fontWeight: "700",
    color: "#18B0A5",
    marginBottom: responsive.number(20),
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "47%",
    borderWidth: 1,
    borderColor: "#888",
    borderRadius: responsive.number(10),
    padding: responsive.number(12),
    marginBottom: responsive.number(16),
    alignItems: "center",
  },
  label: {
    fontSize: responsive.fontSize(14),
  },
});
