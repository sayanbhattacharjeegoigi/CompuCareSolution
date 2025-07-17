import { responsive } from "@/hooks/resposive";
import CurvedShape from "@/src/component/ui/CurvedBackground ";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const services = [
  {
    label: "Custom New PC Builds",
    image: require("@/assets/images/service_custom_pc.png"), // Replace with actual icon path
  },
];

interface Props {
  onNext: (selectedService: string) => void;
  onBack: () => void;
}

const ServiceTypeStep: React.FC<Props> = ({ onNext, onBack }) => {
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
            {services.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.card}
                onPress={() => onNext(item.label)}
              >
                <Image
                  source={item.image}
                  style={styles.icon}
                  resizeMode="contain"
                />
                <Text style={styles.label}>{item.label}</Text>
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
