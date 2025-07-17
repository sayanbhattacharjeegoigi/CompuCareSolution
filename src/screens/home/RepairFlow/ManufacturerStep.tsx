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

const brands = [
  "Accer",
  "Samsung",
  "Apple",
  "Dell",
  "Hp",
  "Sony",
  "MSI",
  "Testing Battery",
];
type CategoryStepProps = {
  onNext: (selectedCategory: string) => void;
  onBack: () => void;
};
const ManufacturerStep = ({ onNext, onBack }: CategoryStepProps) => {
  return (
    <View style={styles.container}>
      <CurvedShape
        title="Select Manufacturer"
        handeleBackButtonPrees={() => {
          onBack();
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          <Text style={styles.title}>Please Choose Device</Text>
          <Text style={styles.highlight}>Manufacturer</Text>
          <View style={styles.grid}>
            {brands.map((brand, index) => (
              <TouchableOpacity
                key={index}
                style={styles.card}
                onPress={() => onNext(brand)}
              >
                <Text style={styles.label}>{brand}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </CurvedShape>
    </View>
  );
};

export default ManufacturerStep;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContainer: {
    marginTop: responsive.number(30),
    paddingHorizontal: responsive.number(15),
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
