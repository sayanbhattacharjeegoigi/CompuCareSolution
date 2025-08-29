import { responsive } from "@/hooks/resposive";
import { api_get_slots, api_schedule_request } from "@/src/apis/ApiEndPoint";
import { CallApi_Without_Token } from "@/src/apis/ApiRequest";
import LoaderIndicator from "@/src/component/common/LoaderIndicator";
import CurvedShape from "@/src/component/ui/CurvedBackground ";
import { slotsType } from "@/src/constants/Data";
import { Routes } from "@/src/utils/Routes";
// import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment-timezone";
import React, { useState } from "react";
import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";

// Optional: move these to selector.ts
const availableSelector = (state: any) => ({
  slots: state.serviceRequest.slots,
  loading: state.serviceRequest.loading,
  requestId: state.serviceRequest.requestId,
  serviceTypeId: state.serviceRequest.serviceTypeId,
  address: state.serviceRequest.address,
  description: state.serviceRequest.description,
});

export default function ScheduleScreen({ navigation, route }: any) {
  const deliveryData = route?.params?.params;
  const { userDetails } = useSelector((state: any) => state.auth);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [isDateSelected, setIsDateSelected] = useState(false);
  const [availableSlots, setAvailableSlots] = useState<slotsType[]>([]);

  const { slots, loading, requestId, serviceTypeId } =
    useSelector(availableSelector);

  // useEffect(() => {
  //   if (requestId && serviceTypeId && isDateSelected) {
  //     const formattedDate = moment(selectedDate).format("YYYY-MM-DD");
  //     dispatch(
  //       fetchAvailableSlots({
  //         requestId,
  //         serviceTypeId,
  //         date: formattedDate,
  //         timezone: moment.tz.guess(),
  //       })
  //     );
  //   }
  // }, [selectedDate, isDateSelected]);
  const getSlot = (time: string) => {
    const formattedDate = moment(time).format("YYYY-MM-DD");

    let payload = {
      requestId: requestId,
      service_type_id: serviceTypeId,
      date: formattedDate,
      user_timezone: userDetails?.timezone || moment.tz.guess(),
    };
    console.log("payload==>", payload);

    CallApi_Without_Token(api_get_slots, payload).then((res: any) => {
      console.log("Available slots response:", res);
      setAvailableSlots(res?.slots || []);
    });
  };

  const onChange = (_event: any, selected: Date | undefined) => {
    setIsDateSelected(false);
    const currentDate = selected || selectedDate;
    setShowPicker(Platform.OS === "ios");
    setSelectedDate(currentDate);
    setIsDateSelected(true);
    setSelectedSlot(null);
    getSlot(selected?.toISOString() || selectedDate.toISOString());
  };

  const handleSubmit = () => {
    if (!selectedSlot) {
      Toast.show({
        type: "error",
        text1: "Please select a time slot",
      });
      return;
    }

    const payload = {
      requestId: requestId?.toString(),
      phoneNumber: deliveryData?.phoneNumber,
      delivery_type: deliveryData?.delivery_type,
      address: deliveryData?.address || "",
      description: deliveryData?.descriptions?.join(", "),
      country: deliveryData?.country,
      state: deliveryData?.state,
      city: deliveryData?.city,
      zipcode: deliveryData?.zipcode,
      latitude: deliveryData?.latitude,
      longitude: deliveryData?.longitude,
      slot: selectedSlot,
      date: moment(selectedDate).format("YYYY-MM-DD"),
      paymentMode: deliveryData?.paymentMode,
    };
    console.log("Payload for scheduling:", deliveryData);

    CallApi_Without_Token(api_schedule_request, payload).then((res: any) => {
      if (res?.status === "1") {
        Toast.show({
          type: "success",
          text1: res?.message || "Service scheduled successfully",
          onHide: () => {
            if (deliveryData?.paymentMode === "card") {
              navigation.navigate(Routes.PaymentScreen, {
                requestId: requestId?.toString(),
              });
            } else {
              navigation.navigate(Routes.PaymentResultScreen, {
                status: "success",
              });
            }
          },
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Failed to schedule",
          text2: res?.error || "Something went wrong",
        });
        console.log("res?.error ", res?.error);
      }
    });
  };

  return (
    <View style={styles.container}>
      <CurvedShape
        title="Select Repair Category"
        handeleBackButtonPrees={() => {
          navigation.goBack();
        }}
      >
        <LoaderIndicator isLoading={loading} />
        <View style={styles.scrollContainer}>
          <Text style={styles.title}>Schedule Service Request</Text>

          {Platform.OS === "ios" ? (
            <View style={styles.iosPicker}>
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
            <View style={{ flexShrink: 1 }}>
              <Text style={styles.subtitle}>
                Available slots for {selectedDate.toDateString()}
              </Text>

              <FlatList
                data={availableSlots}
                numColumns={2}
                style={{ marginBottom: responsive.number(100) }}
                columnWrapperStyle={styles.row}
                keyExtractor={(item) => item?.time}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.slot,
                      selectedSlot === item?.time && styles.selectedSlot,
                    ]}
                    onPress={() => setSelectedSlot(item.time)}
                    disabled={item?.status !== "available"}
                  >
                    <Text
                      style={[
                        styles.slotText,
                        selectedSlot === item?.time
                          ? styles.selectedSlotText
                          : {
                              color:
                                item?.status === "available"
                                  ? "#000"
                                  : "#fc0303",
                            },
                        ,
                      ]}
                    >
                      {item?.time}
                    </Text>
                  </TouchableOpacity>
                )}
                ListEmptyComponent={
                  <Text style={{ textAlign: "center", width: "100%" }}>
                    No slots available for this date
                  </Text>
                }
                ListFooterComponent={
                  <TouchableOpacity
                    style={[
                      styles.button,
                      {
                        opacity:
                          selectedSlot !== null && isDateSelected ? 1 : 0.5,
                      },
                    ]}
                    disabled={!selectedSlot || !isDateSelected}
                    onPress={handleSubmit}
                  >
                    <Text style={styles.buttonText}>Submit Request</Text>
                  </TouchableOpacity>
                }
              />
            </View>
          )}
        </View>
      </CurvedShape>
      <Toast />
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
  iosPicker: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});
