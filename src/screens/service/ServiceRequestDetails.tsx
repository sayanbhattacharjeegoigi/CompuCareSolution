import { responsive } from "@/hooks/resposive";
import { service_request_details } from "@/src/apis/ApiEndPoint";
import { CallApi_GET } from "@/src/apis/ApiRequest";
import CurvedShape from "@/src/component/ui/CurvedBackground ";
import { RequestDetailType } from "@/src/constants/Data";
import { showToast } from "@/src/utils/toastUtils";
import { Image } from "expo-image";
import React, { JSX, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
interface Props {
  route: { params: RequestDetailType };
  navigation: any;
}
const ServiceRequestDetails: React.FC<Props> = ({ navigation, route }: any) => {
  const serviceId = route?.params?.serviceId;
  console.log("Service Request Details:", route?.params);

  const [serviceData, setServiceData] = useState<RequestDetailType>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getServiceDetails = () => {
    setIsLoading(true);
    CallApi_GET(service_request_details + serviceId)
      .then((res) => {
        if (res?.status === 1) {
          setServiceData(res?.userInfo);
        } else {
          showToast({ type: "error", text1: res?.error });
        }
      })
      .catch((error) => {
        console.log(error);
        throw new error();
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getServiceDetails();
    });

    return unsubscribe;
  }, [navigation]);

  if (!serviceId) {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: responsive.fontSize(18), color: "#000" }}>
          No service request details available.
        </Text>
      </View>
    );
  }
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
            <Text style={styles.value}>{serviceData?.serviceBookingId}</Text>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Repair Category:</Text>
            <Text style={styles.value}>{serviceData?.repairCategory}</Text>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Service Request Type:</Text>
            <Text style={styles.value}>{serviceData?.serviceRequestType}</Text>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Brand:</Text>
            <Text style={styles.value}>{serviceData?.brand}</Text>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Model:</Text>
            <Text style={styles.value}>{serviceData?.model}</Text>
          </View>

          {/* Repair Issues */}
          <View
            style={[
              styles.fieldGroup,
              { flexDirection: "column", alignItems: "flex-start" },
            ]}
          >
            <Text style={styles.label}>Repair Issue:</Text>
            {serviceData?.repairIssue?.map(
              (issue: string, idx: number): React.ReactElement => (
                <Text key={idx} style={styles.bulletText}>
                  ● {issue}
                </Text>
              )
            )}
          </View>

          {/* Additional Info */}
          {[
            { label: "Delivery Type", value: serviceData?.deliveryType },
            { label: "Technician Name", value: serviceData?.technicianName },
            { label: "Technician Email", value: serviceData?.technicianEmail },
            { label: "Technician Phone", value: serviceData?.technicianPhone },
            { label: "Pickup Person", value: serviceData?.pickupPerson },
          ].map((item, idx) => (
            <View key={idx} style={styles.fieldGroup}>
              <Text style={styles.label}>{item.label}:</Text>
              <Text style={styles.value}>{item.value || "-"}</Text>
            </View>
          ))}

          {/* Uploaded Images */}
          {serviceData?.uploadedImages && (
            <View>
              <Text style={[styles.label, { marginTop: 12 }]}>
                Uploaded Image(s)
              </Text>
              <View style={styles.imageRow}>
                {serviceData?.uploadedImages?.length > 0 &&
                  serviceData?.uploadedImages?.map(
                    (img: string, idx: number): JSX.Element => (
                      <Image
                        key={idx}
                        source={{ uri: img }}
                        style={styles.imagePlaceholder}
                      />
                    )
                  )}
              </View>
            </View>
          )}
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
