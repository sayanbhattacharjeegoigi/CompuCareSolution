import { responsive } from "@/hooks/resposive";
import CurvedShape from "@/src/component/ui/CurvedBackground ";
import { RequestDetailType } from "@/src/constants/Data";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
interface Props {
  route: { params: RequestDetailType };
  navigation: any;
}
const ServiceRequestDetails: React.FC<Props> = ({ navigation, route }: any) => {
  const serviceData = route?.params;
  return (
    <View style={styles.container}>
      <CurvedShape
        title="View Service Details"
        handeleBackButtonPrees={() => navigation.goBack()}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          {/* Simple Fields */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Service Request Id:</Text>
            <Text style={styles.value}>{serviceData.serviceRequestId}</Text>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Repair Category:</Text>
            <Text style={styles.value}>{serviceData.repairCategory}</Text>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Service Request Type:</Text>
            <Text style={styles.value}>{serviceData.serviceRequestType}</Text>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Brand:</Text>
            <Text style={styles.value}>{serviceData.brand}</Text>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Model:</Text>
            <Text style={styles.value}>{serviceData.model}</Text>
          </View>

          {/* Repair Issues */}
          <View
            style={[
              styles.fieldGroup,
              { flexDirection: "column", alignItems: "flex-start" },
            ]}
          >
            <Text style={styles.label}>Repair Issue:</Text>
            {serviceData.repairIssues.map((issue, idx) => (
              <Text key={idx} style={styles.bulletText}>
                ● {issue}
              </Text>
            ))}
          </View>

          {/* Additional Info */}
          {[
            { label: "Delivery Type", value: serviceData.deliveryType },
            { label: "Technician Name", value: serviceData.technicianName },
            { label: "Technician Email", value: serviceData.technicianEmail },
            { label: "Technician Phone", value: serviceData.technicianPhone },
            { label: "Pickup Person", value: serviceData.pickupPerson },
          ].map((item, idx) => (
            <View key={idx} style={styles.fieldGroup}>
              <Text style={styles.label}>{item.label}:</Text>
              <Text style={styles.value}>{item.value || "-"}</Text>
            </View>
          ))}

          {/* Uploaded Images */}
          <Text style={[styles.label, { marginTop: 12 }]}>
            Uploaded Image(s)
          </Text>
          <View style={styles.imageRow}>
            {serviceData.uploadedImages?.length > 0
              ? serviceData.uploadedImages.map((img, idx) => (
                  <Image
                    key={idx}
                    source={{ uri: img }}
                    style={styles.imagePlaceholder}
                  />
                ))
              : [1, 2, 3, 4].map((item) => (
                  <TouchableOpacity key={item} style={styles.imagePlaceholder}>
                    <Ionicons name="add" size={32} color="#000" />
                  </TouchableOpacity>
                ))}
          </View>
        </ScrollView>
      </CurvedShape>
    </View>
  );
};

export default ServiceRequestDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  scrollContainer: {
    alignItems: "flex-start",
    marginTop: "12%",
    padding: responsive.number(16),
    // backgroundColor: "#fff",
    paddingBottom: "25%",
  },
  fieldGroup: {
    width: "100%",
    marginBottom: responsive.number(16),
    paddingBottom: responsive.number(5),
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#7E7E7E",
  },
  label: {
    fontWeight: "600",
    fontSize: responsive.fontSize(16),
    color: "#333",
  },
  value: {
    fontSize: responsive.fontSize(16),
    color: "#000",
  },
  bulletText: {
    fontSize: responsive.fontSize(16),
    color: "#000",
    marginLeft: responsive.number(12),
    marginBottom: responsive.number(2),
  },
  imageRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: responsive.number(8),
  },
  imagePlaceholder: {
    width: responsive.number(60),
    height: responsive.number(60),
    backgroundColor: "#ddd",
    borderRadius: responsive.number(12),
    justifyContent: "center",
    alignItems: "center",
  },
});
