import { responsive } from "@/hooks/resposive";
import { api_get_manufacturer_by_repair_category } from "@/src/apis/ApiEndPoint";
import { CallApi_GET } from "@/src/apis/ApiRequest";
import CurvedShape from "@/src/component/ui/CurvedBackground ";
import { manufacturerType } from "@/src/constants/Data";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type CategoryStepProps = {
  repairCategoryId: number;
  onNext: (data: manufacturerType) => void;
  onBack: () => void;
};
const ManufacturerStep = ({
  repairCategoryId,
  onNext,
  onBack,
}: CategoryStepProps) => {
  const [manufacturers, setManufacturers] = useState<manufacturerType[]>([]);

  const getManufacturers = async () => {
    console.log("Fetching service types for category ID:", repairCategoryId);

    try {
      if (!repairCategoryId) {
        return;
      }
      const res = await CallApi_GET(
        api_get_manufacturer_by_repair_category + repairCategoryId
      );
      if (res?.status === 1) {
        setManufacturers(res?.list || []);
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
  }, [repairCategoryId]);

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
            {manufacturers.map((brand, index) => (
              <TouchableOpacity
                key={index}
                style={styles.card}
                onPress={() => onNext(brand)}
              >
                <Text style={styles.label}>{brand.name}</Text>
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
