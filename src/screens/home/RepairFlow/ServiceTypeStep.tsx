import { responsive } from "@/hooks/resposive";
import { api_get_service_type_by_repair_category } from "@/src/apis/ApiEndPoint";
import { CallApi_GET } from "@/src/apis/ApiRequest";
import CurvedShape from "@/src/component/ui/CurvedBackground ";
import { serviceType } from "@/src/constants/Data";
import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface Props {
  repairCategoryId: number;
  onNext: (data: serviceType) => void;
  onBack: () => void;
}

const ServiceTypeStep: React.FC<Props> = ({
  repairCategoryId,
  onNext,
  onBack,
}) => {
  const [serviceType, setServiceType] = useState<serviceType[]>([]);

  const getServiceType = async () => {
    console.log("Fetching service types for category ID:", repairCategoryId);

    try {
      if (!repairCategoryId) {
        return;
      }
      const res = await CallApi_GET(
        api_get_service_type_by_repair_category + repairCategoryId
      );
      if (res?.status === 1) {
        setServiceType(res?.list || []);
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
    getServiceType();
  }, [repairCategoryId]);

  return (
    <View style={styles.container}>
      <CurvedShape
        title="Select Service Type"
        handeleBackButtonPrees={() => {
          onBack();
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          <Text style={styles.title}>Please Choose</Text>
          <Text style={styles.highlight}>Service Type</Text>
          <View style={styles.grid}>
            {serviceType.map((item, index) => (
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
                <Text style={styles.label}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </CurvedShape>
    </View>
  );
};

export default ServiceTypeStep;

const styles = StyleSheet.create({
  container: {
    // padding: responsive.number(16),
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
    justifyContent: "flex-start",
    gap: responsive.number(10),
    width: "100%",
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
    textAlign: "center",
  },
});
