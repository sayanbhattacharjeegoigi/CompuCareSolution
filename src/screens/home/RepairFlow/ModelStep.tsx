import { responsive } from "@/hooks/resposive";
import { api_get__modal_by_manufacturer } from "@/src/apis/ApiEndPoint";
import { CallApi_GET } from "@/src/apis/ApiRequest";
import CurvedShape from "@/src/component/ui/CurvedBackground ";
import { modelListType } from "@/src/constants/Data";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const models = ["Aspire", "Swift", "Predator", "TravelMate"];
type CategoryStepProps = {
  manufacturerId: number;
  onNext: (data: modelListType) => void;
  onBack: () => void;
};
const ModelStep = ({ manufacturerId, onNext, onBack }: CategoryStepProps) => {
  const [modelList, setModelList] = useState<modelListType[]>([]);

  const getManufacturers = async () => {
    try {
      if (!manufacturerId) {
        return;
      }
      const res = await CallApi_GET(
        api_get__modal_by_manufacturer + manufacturerId
      );
      if (res?.status === 1) {
        setModelList(res?.list || []);
      } else {
        console.error(
          "Failed to fetch categories:",
          res?.error || "Unknown error"
        );
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  useEffect(() => {
    getManufacturers();
  }, []);

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
            {modelList.map((model, index) => (
              <TouchableOpacity
                key={index}
                style={styles.card}
                onPress={() => onNext(model)}
              >
                <Text style={styles.label}>{model.name}</Text>
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
