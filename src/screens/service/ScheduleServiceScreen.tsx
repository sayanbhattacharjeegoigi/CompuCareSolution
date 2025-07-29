// ScheduleServiceScreen.tsx
import { responsive } from "@/hooks/resposive";
import AddressInputWithSuggestions from "@/src/component/common/AddressInputWithSuggestions";
import CurvedShape from "@/src/component/ui/CurvedBackground ";
import { Routes } from "@/src/utils/Routes";
import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const ScheduleServiceScreen = ({ navigation }: any) => {
  const [delivery, setDelivery] = useState("pickup_dropoff");
  const [address, setAddress] = useState("");
  const [descriptions, setDescriptions] = useState([""]);
  const [locationSuggestions, setLocationSuggestions] = useState<[]>([]);

  const addMoreDescription = () => {
    setDescriptions([...descriptions, ""]);
  };

  const updateDescription = (text: string, index: number): void => {
    const newDescriptions = [...descriptions];
    newDescriptions[index] = text;
    setDescriptions(newDescriptions);
  };

  const removeDescription = (index: number) => {
    const updatedDescriptions = descriptions.filter((_, i) => i !== index);
    setDescriptions(updatedDescriptions);
  };

  const fetchLocationSuggestions = async (input: string) => {
    setAddress(input);
    const APIKEY = "AIzaSyCtg6oeRPEkRL9_CE-us3QdvXjupbgG14A";
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
      input
    )}&key=${APIKEY}&types=(cities)`;
    try {
      const res = await fetch(url);
      const json = await res.json();
      console.log("Location suggestions:", json);
      if (json.status === "OK") setLocationSuggestions(json.predictions);
      else setLocationSuggestions([]);
    } catch (e) {
      console.error("Places autocomplete error", e);
      setLocationSuggestions([]);
    }
  };
  // const getPlaceDetails = async (placeId: string) => {
  //   try {
  //     const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${APIKEY}`;

  //     const response = await fetch(detailsUrl);
  //     const data = await response.json();

  //     if (data.status === "OK") {
  //       const result = data.result;
  //       console.log("Formatted Address:", result.formatted_address);
  //       console.log("Coordinates:", result.geometry.location);
  //       return result;
  //     } else {
  //       console.warn("Error fetching place details:", data.status);
  //     }
  //   } catch (error) {
  //     console.error("Failed to fetch place details", error);
  //   }
  // };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "padding"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0} // tweak if needed
      >
        <View style={styles.container}>
          <CurvedShape
            title="Select Repair Category"
            handeleBackButtonPrees={() => {
              navigation.goBack();
            }}
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled={true}
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
              <AddressInputWithSuggestions />
              {/* Descriptions */}
              {descriptions.map((desc, index) => (
                <View key={index} style={styles.descriptionGroup}>
                  <Text style={styles.label}>Description {index + 1}</Text>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TextInput
                      style={[styles.textArea, { flex: 1 }]}
                      placeholder="Enter description"
                      multiline
                      value={desc}
                      onChangeText={(text) => updateDescription(text, index)}
                    />
                    {index === 0 && (
                      //  {/* Add More Button */}
                      <TouchableOpacity
                        style={styles.addMoreButton}
                        onPress={addMoreDescription}
                      >
                        <Text style={styles.addMoreText}>Add More</Text>
                      </TouchableOpacity>
                    )}
                    {index !== 0 && (
                      <TouchableOpacity
                        onPress={() => removeDescription(index)}
                        style={styles.removeButton}
                      >
                        <Text style={styles.removeText}>Remove</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              ))}

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
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
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
    flexGrow: 1,
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
    alignSelf: "center",
    backgroundColor: "#18B0A5",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    // marginTop: 12,
    marginLeft: 8,
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
  button: {
    width: "100%",
    backgroundColor: "#1D3A85",
    marginTop: responsive.number(40),
    paddingVertical: responsive.number(14),
    borderRadius: responsive.number(10),
    alignItems: "center",
  },
  nextText: {
    color: "#fff",
    fontWeight: "600",
  },
  removeButton: {
    backgroundColor: "#E53935",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginLeft: 8,
  },
  removeText: {
    color: "#fff",
    fontWeight: "600",
  },
});
