import { responsive } from "@/hooks/resposive";
import {
  api_add_repair_problem,
  api_add_repair_problem_by_service_request,
} from "@/src/apis/ApiEndPoint";
import { CallApi_GET, CallApi_Without_Token } from "@/src/apis/ApiRequest";
import CurvedShape from "@/src/component/ui/CurvedBackground ";
import { problemListType } from "@/src/constants/Data";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type props = {
  serviceTypeId: number;
  onNext: (data: problemListType[]) => void;
  onBack: () => void;
};
const ProblemStep = ({ serviceTypeId, onNext, onBack }: props) => {
  const [problems, setProblems] = useState<problemListType[]>();
  const [selectedProblems, setSelectedProblems] = useState<problemListType[]>(
    []
  );
  const [customProblem, setCustomProblem] = useState<string>("");

  const toggleProblem = (problem: problemListType) => {
    setSelectedProblems((prev) => {
      const isSelected = prev.some((item) => item.id === problem.id);
      if (isSelected) {
        return prev.filter((item) => item.id !== problem.id);
      } else {
        return [...prev, { id: problem.id, name: problem.name }];
      }
    });
  };
  useEffect(() => {
    getProblemList();
  }, []);
  const getProblemList = () => {
    try {
      CallApi_GET(
        api_add_repair_problem_by_service_request + serviceTypeId
      ).then((res) => {
        if (res?.status === 1) {
          setProblems(res?.list || []);
        } else {
          console.error(
            "Failed to add custom problem:",
            res?.error || "Unknown error"
          );
        }
      });
    } catch (error) {
      console.log("Error fetching problems:", error);
    }
  };
  const addCustomProblem = async () => {
    console.log("Adding custom problem:", customProblem.trim());

    let payload = {
      service_type_id: serviceTypeId,
      repair_issue: customProblem.trim(),
    };
    CallApi_Without_Token(api_add_repair_problem, payload)
      .then((res) => {
        if (res?.status === "1") {
          getProblemList();
          setCustomProblem("");
        } else {
          console.error(
            "Failed to add custom problem:",
            res?.error?.repair_issue[0] || "Unknown error"
          );
        }
      })
      .catch((error) => {
        getProblemList();
        console.error(
          "Error adding custom problem:",
          error?.response,
          error?.message
        );
      });
  };
  const handleNext = () => {
    try {
      if (selectedProblems.length === 0) {
        console.warn("Please select at least one problem.");
        return;
      }
      console.log("Selected problems:", selectedProblems);

      onNext(selectedProblems);
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
        <View style={styles.scrollContainer}>
          <Text style={styles.title}>Please Choose Device</Text>
          <Text style={styles.highlight}>Problem</Text>

          <Text style={styles.label}>
            If the problem is not listed, enter it here:
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: responsive.number(20),
            }}
          >
            <TextInput
              placeholder="Enter your custom problem..."
              placeholderTextColor="#999"
              style={styles.input}
              value={customProblem}
              onChangeText={setCustomProblem}
            />
            <Pressable
              style={[
                {
                  backgroundColor: "#1D3A85", // fallback for linear gradient
                  borderRadius: responsive.number(10),
                  alignItems: "center",
                  paddingVertical: responsive.number(10),
                  paddingHorizontal: responsive.number(20),
                  marginLeft: responsive.number(10),
                },
              ]}
              onPress={() => addCustomProblem()}
            >
              <Text style={styles.buttonText}>Add</Text>
            </Pressable>
          </View>
          <FlatList
            data={problems}
            showsVerticalScrollIndicator={false}
            style={{ marginBottom: responsive.number(20) }}
            contentContainerStyle={{
              flexGrow: 1,
              // paddingBottom: responsive.number(0),
            }}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => toggleProblem(item)}
                style={styles.checkboxWrapper}
              >
                <View style={styles.checkbox}>
                  {selectedProblems.some((p) => p.id === item.id) && (
                    <View style={styles.checked} />
                  )}
                </View>
                <Text style={styles.checkboxLabel}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />

          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
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
    flex: 1,
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
    color: "#333",
    flex: 1,
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
