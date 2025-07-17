import { responsive } from "@/hooks/resposive";
import CurvedShape from "@/src/component/ui/CurvedBackground ";
import { Routes } from "@/src/utils/Routes";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import {
  Alert,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const availableSlots = [
  "6:00 AM - 6:45 AM",
  "6:45 AM - 7:30 AM",
  "7:30 AM - 8:15 AM",
  "8:15 AM - 9:00 AM",
  "9:00 AM - 9:45 AM",
  "9:45 AM - 10:30 AM",
  "10:30 AM - 11:15 AM",
  "11:15 AM - 12:00 PM",
  "12:00 PM - 12:45 PM",
  "12:45 PM - 1:30 PM",
];

export default function ScheduleScreen({ navigation }: any) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isDateSelected, setisDateSelected] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  // const selectLocation = async (item: string) => {
  //   console.log("item", item);

  //   const APIKEY = "AIzaSyCtg6oeRPEkRL9_CE-us3QdvXjupbgG14A";
  //   const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${item.place_id}&key=${APIKEY}`;
  //   try {
  //     const resp = await fetch(detailsUrl);
  //     const details = await resp.json();
  //     if (details.status === "OK") {
  //     }
  //   } catch (e) {
  //     console.error("Place details error", e);
  //   }
  // };
  const onChange = (event: any, selected: Date | undefined) => {
    setisDateSelected(false);
    const currentDate = selected || selectedDate;
    setShowPicker(Platform.OS === "ios");
    setSelectedDate(currentDate);
    setisDateSelected(true);
  };

  const handleSubmit = () => {
    if (selectedDate === null) {
      return;
    }
    if (!selectedSlot) return alert("Please select a time slot");
    Alert.alert(
      "Scheduled!",
      `Scheduled on ${selectedDate.toDateString()} at ${selectedSlot}`,
      [
        {
          text: "OK",
          onPress: () => navigation.navigate(Routes.Tab, { screen: "Service" }),
        },
      ],
      { cancelable: false }
    );
    // optionally add event to device calendar here
  };

  return (
    <View style={styles.container}>
      <CurvedShape
        title="Select Repair Category"
        handeleBackButtonPrees={() => {
          navigation.goBack();
        }}
      >
        <View style={styles.scrollContainer}>
          <Text style={styles.title}>Schedule Service Request</Text>

          {Platform.OS === "ios" ? (
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <Text style={[styles.dateText, { color: "#18B0A5" }]}>
                Select a date
              </Text>
              <DateTimePicker
                value={selectedDate}
                mode="date"
                minimumDate={new Date()}
                display="default"
                onChange={onChange}
              />
            </View>
          ) : (
            <>
              <TouchableOpacity
                style={[styles.button]}
                onPress={() => setShowPicker(true)}
              >
                <Text style={styles.dateText}> Select a date</Text>
              </TouchableOpacity>

              {showPicker && (
                <DateTimePicker
                  value={selectedDate}
                  mode="date"
                  minimumDate={new Date()}
                  display="default"
                  onChange={onChange}
                />
              )}
            </>
          )}
          {isDateSelected && (
            <>
              <Text style={styles.subtitle}>
                Available slots for {selectedDate.toDateString()}
              </Text>

              <FlatList
                data={availableSlots}
                numColumns={2}
                columnWrapperStyle={styles.row}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.slot,
                      selectedSlot === item && styles.selectedSlot,
                    ]}
                    onPress={() => setSelectedSlot(item)}
                  >
                    <Text
                      style={[
                        styles.slotText,
                        selectedSlot === item && styles.selectedSlotText,
                      ]}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                )}
              />
              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Submit Request</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </CurvedShape>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContainer: {
    marginTop: "2%",
    padding: responsive.number(16),
    // backgroundColor: "#fff",
    paddingBottom: "25%",
  },
  title: {
    fontSize: responsive.fontSize(20),
    fontWeight: "bold",
    marginBottom: responsive.number(16),
  },
  dateText: {
    fontSize: responsive.fontSize(16),
    color: "#fff",
    marginBottom: responsive.number(10),
  },
  subtitle: {
    fontSize: responsive.fontSize(16),
    marginTop: responsive.number(10),
    marginBottom: responsive.number(12),
  },
  row: {
    justifyContent: "space-between",
    marginBottom: responsive.number(10),
  },
  slot: {
    flex: 1,
    padding: responsive.number(12),
    margin: responsive.number(4),
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: responsive.number(8),
    alignItems: "center",
  },
  selectedSlot: {
    backgroundColor: "#18B0A5",
    borderColor: "#18B0A5",
  },
  slotText: {
    fontSize: responsive.fontSize(14),
  },
  selectedSlotText: {
    color: "#fff",
    fontWeight: "600",
  },
  button: {
    marginTop: responsive.number(20),
    backgroundColor: "#0047AB",
    padding: responsive.number(14),
    borderRadius: responsive.number(10),
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: responsive.fontSize(16),
    fontWeight: "bold",
  },
});
