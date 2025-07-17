// ScheduleServiceScreen.tsx
import { responsive } from "@/hooks/resposive";
import CurvedShape from "@/src/component/ui/CurvedBackground ";
import { Routes } from "@/src/utils/Routes";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const ScheduleServiceScreen = ({ navigation }: any) => {
  const [delivery, setDelivery] = useState("pickup_dropoff");
  const [address, setAddress] = useState("");
  const [descriptions, setDescriptions] = useState([""]);

  const addMoreDescription = () => {
    setDescriptions([...descriptions, ""]);
  };

  const updateDescription = (text, index) => {
    const newDescriptions = [...descriptions];
    newDescriptions[index] = text;
    setDescriptions(newDescriptions);
  };

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
          <Text style={styles.title}>Schedule Service Request</Text>

          {/* Delivery Options */}
          <Text style={styles.label}>Delivery *</Text>
          <View style={styles.radioGroup}>
            <TouchableOpacity
              style={styles.radioOption}
              onPress={() => setDelivery("pickup_dropoff")}
            >
              <View
                style={[
                  styles.radioCircle,
                  delivery === "pickup_dropoff" && styles.selected,
                ]}
              />
              <Text style={styles.radioText}>Pick-up + Drop-off</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.radioOption}
              onPress={() => setDelivery("self_delivery")}
            >
              <View
                style={[
                  styles.radioCircle,
                  delivery === "self_delivery" && styles.selected,
                ]}
              />
              <Text style={styles.radioText}>Self Delivery + Pick-up</Text>
            </TouchableOpacity>
          </View>

          {/* Address Input */}
          <Text style={styles.label}>Address *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter a location"
            value={address}
            onChangeText={setAddress}
          />

          {/* Descriptions */}
          {descriptions.map((desc, index) => (
            <View key={index} style={styles.descriptionGroup}>
              <Text style={styles.label}>Description {index + 1}</Text>
              <TextInput
                style={styles.textArea}
                placeholder="Enter description"
                multiline
                value={desc}
                onChangeText={(text) => updateDescription(text, index)}
              />
            </View>
          ))}

          {/* Add More Button */}
          <TouchableOpacity
            style={styles.addMoreButton}
            onPress={addMoreDescription}
          >
            <Text style={styles.addMoreText}>Add More</Text>
          </TouchableOpacity>

          {/* Navigation Buttons */}
          <View style={styles.footer}>
            <TouchableOpacity
              onPress={() => navigation.navigate(Routes.ScheduleScreen)}
              style={styles.button}
            >
              <Text style={styles.nextText}>Next</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </CurvedShape>
    </View>
  );
};

export default ScheduleServiceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContainer: {
    padding: responsive.number(16),
  },
  title: {
    fontSize: responsive.fontSize(22),
    fontWeight: "700",
    marginBottom: responsive.number(20),
  },
  label: {
    fontSize: responsive.fontSize(16),
    fontWeight: "600",
    marginTop: responsive.number(20),
    marginBottom: responsive.number(8),
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: responsive.number(8),
    padding: responsive.number(10),
  },
  radioGroup: {
    flexDirection: "row",
    gap: responsive.number(16),
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: "#18B0A5",
    marginRight: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  selected: {
    backgroundColor: "#18B0A5",
  },
  radioText: {
    fontSize: responsive.fontSize(14),
  },
  descriptionGroup: {
    marginTop: responsive.number(16),
  },
  textArea: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: responsive.number(8),
    padding: responsive.number(10),
    height: responsive.number(100),
    textAlignVertical: "top",
  },
  addMoreButton: {
    alignSelf: "flex-end",
    backgroundColor: "#18B0A5",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginTop: 12,
  },
  addMoreText: {
    color: "#fff",
    fontWeight: "600",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: responsive.number(32),
  },
  backButton: {
    backgroundColor: "#ccc",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  button: {
    width: "100%",
    backgroundColor: "#1D3A85",
    marginTop: responsive.number(40),
    paddingVertical: responsive.number(14),
    borderRadius: responsive.number(10),
    alignItems: "center",
  },
  backText: {
    color: "#000",
    fontWeight: "600",
  },
  nextText: {
    color: "#fff",
    fontWeight: "600",
  },
});
