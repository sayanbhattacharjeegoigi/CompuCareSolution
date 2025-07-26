import { responsive } from "@/hooks/resposive";
import { api_get_repair_category } from "@/src/apis/ApiEndPoint";
import { CallApi_GET } from "@/src/apis/ApiRequest";
import CurvedShape from "@/src/component/ui/CurvedBackground ";
import { RepairCategory } from "@/src/constants/Data";
import { useNavigation } from "@react-navigation/native";

import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type CategoryStepProps = {
  onNext: (data: RepairCategory) => void;
};
const CategoryStep = ({ onNext }: CategoryStepProps) => {
  const [category, setCategory] = useState<RepairCategory[]>([]);
  const navigation = useNavigation();
  const getCategory = async () => {
    try {
      const res = await CallApi_GET(api_get_repair_category);
      if (res?.status === 1) {
        setCategory(res?.list || []);
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
    getCategory();
  }, []);

  return (
    <View style={styles.container}>
      <CurvedShape
        title="Select Repair Category"
        handeleBackButtonPrees={() => {
          navigation.goBack();
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          <Text style={styles.title}>Please Choose Device</Text>
          <Text style={styles.highlight}>Category</Text>
          <View style={styles.grid}>
            {category?.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.card}
                onPress={() => onNext(item)}
              >
                <Image
                  source={{ uri: item?.image }}
                  style={styles.icon}
                  resizeMode="contain"
                />
                <Text style={styles.label}>{item?.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </CurvedShape>
    </View>
  );
};

export default CategoryStep;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContainer: {
    marginTop: "8%",
    padding: responsive.number(16),
    // backgroundColor: "#fff",
    paddingBottom: "25%",
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
    alignItems: "center",
    marginBottom: responsive.number(16),
  },
  icon: {
    width: responsive.number(60),
    height: responsive.number(60),
  },
  label: {
    fontSize: responsive.fontSize(14),
    marginTop: responsive.number(10),
  },
});
