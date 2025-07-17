import { responsive } from "@/hooks/resposive";
import CurvedShape from "@/src/component/ui/CurvedBackground ";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const problems = [
  "Battery Replacement",
  "Data Recovery / Backup / Transfer",
  "Diagnostic",
  "Install / Upgrade New macOS",
  "Keyboard or Trackpad Repair",
  "Logic Board Repair",
  "RAM / SSD / HD Upgrade",
  "Screen Repair",
  "Tune Up Software",
];
type CategoryStepProps = {
  onNext: (selectedCategory: any) => void;
  onBack: () => void;
};
const ProblemStep = ({ onNext, onBack }: CategoryStepProps) => {
  const [selectedProblems, setSelectedProblems] = useState<string[]>([]);
  const [customProblem, setCustomProblem] = useState("");

  const toggleProblem = (problem: string) => {
    if (selectedProblems.includes(problem)) {
      setSelectedProblems(selectedProblems.filter((p) => p !== problem));
    } else {
      setSelectedProblems([...selectedProblems, problem]);
    }
  };

  const handleNext = () => {
    try {
      const finalProblems = [...selectedProblems];
      if (customProblem.trim()) {
        finalProblems.push(customProblem.trim());
      }
      onNext(finalProblems);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <View style={styles.container}>
      <CurvedShape
        title="Select Problem"
        handeleBackButtonPrees={() => {
          onBack();
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          <Text style={styles.title}>Please Choose Device</Text>
          <Text style={styles.highlight}>Problem</Text>

          <Text style={styles.label}>
            If the problem is not listed, enter it here:
          </Text>
          <TextInput
            placeholder="Enter your custom problem..."
            placeholderTextColor="#999"
            style={styles.input}
            value={customProblem}
            onChangeText={setCustomProblem}
          />

          {problems.map((problem, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => toggleProblem(problem)}
              style={styles.checkboxWrapper}
            >
              <View style={styles.checkbox}>
                {selectedProblems.includes(problem) && (
                  <View style={styles.checked} />
                )}
              </View>
              <Text style={styles.checkboxLabel}>{problem}</Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </ScrollView>
      </CurvedShape>
    </View>
  );
};
export default ProblemStep;
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
    marginBottom: responsive.number(16),
  },
  label: {
    fontSize: responsive.fontSize(14),
    marginBottom: responsive.number(6),
  },
  input: {
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: responsive.number(8),
    padding: responsive.number(10),
    fontSize: responsive.fontSize(14),
    marginBottom: responsive.number(20),
  },
  checkboxWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: responsive.number(12),
  },
  checkbox: {
    width: responsive.number(20),
    height: responsive.number(20),
    borderWidth: 1,
    borderColor: "#000",
    marginRight: responsive.number(10),
    justifyContent: "center",
    alignItems: "center",
  },
  checked: {
    width: responsive.number(12),
    height: responsive.number(12),
    backgroundColor: "#18B0A5",
  },
  checkboxLabel: {
    fontSize: responsive.fontSize(14),
  },
  button: {
    // backgroundColor: "linear-gradient(90deg, #1D3A85, #18B0A5)",
    backgroundColor: "#1D3A85", // fallback for linear gradient
    marginTop: responsive.number(20),
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
