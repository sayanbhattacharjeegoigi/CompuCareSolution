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
type CategoryStepProps = {
  data: any;
  onNext: (selectedCategory: any) => void;
  onBack: () => void;
  onSubmit: () => void;
};
const SummaryStep = ({ data, onSubmit, onBack }: CategoryStepProps) => {
  return (
    <View style={styles.container}>
      <CurvedShape
        title="View Service Details"
        handeleBackButtonPrees={() => {
          onBack();
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          <Text style={[styles.title, { textAlign: "center" }]}>Summary</Text>

          <View style={styles.row}>
            <Text style={styles.label}>Category: </Text>
            <Text style={styles.value}>{data.category}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Service Type: </Text>
            <Text style={styles.value}>Custom New PC Builds</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Manufacturer: </Text>
            <Text style={styles.value}>{data.manufacturer}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Model: </Text>
            <Text style={styles.value}>{data.model}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Problems: </Text>
            {/* <Text style={styles.value}>{data.problems.join(", ")}</Text> */}
          </View>

          <TouchableOpacity style={styles.button} onPress={onSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </ScrollView>
      </CurvedShape>
    </View>
  );
};
export default SummaryStep;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContainer: {
    marginTop: "12%",
    padding: responsive.number(16),
    // backgroundColor: "#fff",
    paddingBottom: "25%",
  },
  title: {
    fontSize: responsive.fontSize(20),
    fontWeight: "700",
    color: "#18B0A5",
    marginBottom: responsive.number(20),
  },
  row: {
    flexDirection: "row",
    marginBottom: responsive.number(12),
  },
  label: {
    fontSize: responsive.fontSize(14),
    fontWeight: "600",
    color: "#000",
  },
  value: {
    fontSize: responsive.fontSize(14),
    fontWeight: "400",
    color: "#000",
  },
  button: {
    backgroundColor: "#1D3A85",
    marginTop: responsive.number(40),
    paddingVertical: responsive.number(14),
    borderRadius: responsive.number(10),
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: responsive.fontSize(16),
    fontWeight: "600",
  },
});
