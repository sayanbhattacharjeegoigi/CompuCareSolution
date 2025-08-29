// ScheduleServiceScreen.tsx
import { responsive } from "@/hooks/resposive";
import { api_schedule_request } from "@/src/apis/ApiEndPoint";
import { CallApi_Without_Token } from "@/src/apis/ApiRequest";
import AddressInputWithSuggestions from "@/src/component/common/AddressInputWithSuggestions";
import CurvedShape from "@/src/component/ui/CurvedBackground ";
import { Routes } from "@/src/utils/Routes";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";

interface AddressData {
  fullAddress: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  latitude: number | null;
  longitude: number | null;
  placeId: string;
}
const allPaymentOptions = [
  { label: "Pay by Card", value: "card" },
  { label: "Cash on Drop-Off", value: "Cash on Drop-Off" },
  { label: "Cash on Pickup", value: "Cash on Pickup" },
];
const deliveryOptions = [
  { label: "Pick-up + Drop-off", value: "1" },
  { label: "Self Delivery + Pick-up", value: "2" },
];
// Optional: move these to selector.ts
const availableSelector = (state: any) => ({
  slots: state.serviceRequest.slots,
  loading: state.serviceRequest.loading,
  requestId: state.serviceRequest.requestId,
  serviceTypeId: state.serviceRequest.serviceTypeId,
  address: state.serviceRequest.address,
  description: state.serviceRequest.description,
});

const ScheduleServiceScreen = ({ navigation }: any) => {
  const { userDetails } = useSelector((state: any) => state.auth);
  const { slots, loading, requestId, serviceTypeId } =
    useSelector(availableSelector);
  const [delivery, setDelivery] = useState("1");
  const [descriptions, setDescriptions] = useState([""]);
  const [paymentMethod, setPaymentMethod] = useState(
    allPaymentOptions[0].value
  );
  const [phone, setPhone] = useState(userDetails?.phoneNumber);
  const [address, setAddress] = useState<any>(null);
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [zipCode, setZipCode] = useState<string>("");

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
  const paymentOptions =
    delivery === "1"
      ? allPaymentOptions.filter((opt) => opt.value !== "Cash on Pickup")
      : allPaymentOptions.filter((opt) => opt.value !== "Cash on Drop-Off");

  const handelNext = () => {
    // Basic field validations
    if (!delivery) {
      Toast.show({ type: "error", text1: "Please select a delivery option" });
      return;
    }
    if (!phone || phone.trim().length < 8) {
      Toast.show({ type: "error", text1: "Please enter a valid phone number" });
      return;
    }
    if (!paymentMethod) {
      Toast.show({ type: "error", text1: "Please select a payment method" });
      return;
    }
    if (!address?.fullAddress) {
      Toast.show({ type: "error", text1: "Please select an address" });
      return;
    }
    if (!city) {
      Toast.show({ type: "error", text1: "Please enter your city" });
      return;
    }
    if (!state) {
      Toast.show({ type: "error", text1: "Please enter your state" });
      return;
    }
    if (!country) {
      Toast.show({ type: "error", text1: "Please enter your country" });
      return;
    }
    if (!zipCode) {
      Toast.show({ type: "error", text1: "Please enter your postal code" });
      return;
    }
    let payload = {
      deliveryType: delivery,
      descriptions,
      paymentMethod,
      phone,
      address,
    };
    console.log("payload", payload);
    if (delivery === "2") {
      let selfDeliveryPayload = {
        requestId: requestId?.toString(),
        phoneNumber: payload?.phone,
        delivery_type: payload?.deliveryType,
        address: payload?.address?.fullAddress || "",
        description: payload?.descriptions?.join(", "),
        country: payload?.address?.country || country,
        state: payload?.address?.state || state,
        city: payload?.address?.city || city,
        zipcode: payload?.address?.postalCode || zipCode,
        latitude: payload?.address?.latitude,
        longitude: payload?.address?.longitude,
        paymentMode: payload?.paymentMethod,
      };
      console.log("selfDeliveryPayload", selfDeliveryPayload);

      CallApi_Without_Token(api_schedule_request, selfDeliveryPayload).then(
        (res: any) => {
          if (res?.status === "1") {
            Toast.show({
              type: "success",
              text1: res?.message || "Service scheduled successfully",
              onHide: () => {
                if (payload?.paymentMethod === "card") {
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
        }
      );
    } else {
      console.log("payload", payload);
      let params = {
        phoneNumber: payload?.phone,
        delivery_type: payload?.deliveryType,
        address: payload?.address?.fullAddress || "",
        description: payload?.descriptions?.join(", "),
        country: payload?.address?.country || country,
        state: payload?.address?.state || state,
        city: payload?.address?.city || city,
        zipcode: payload?.address?.postalCode || zipCode,
        latitude: payload?.address?.latitude,
        longitude: payload?.address?.longitude,
        paymentMode: payload?.paymentMethod,
      };
      navigation.navigate(Routes.ScheduleScreen, { params });
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#fff" }}
      behavior={Platform.OS === "ios" ? "padding" : "padding"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0} // tweak if needed
    >
      {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}> */}
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
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.scrollContainer}
          >
            <Text style={styles.title}>Schedule Service Request</Text>

            {/* Delivery Options */}
            <Text style={styles.label}>
              Delivery <Text style={{ color: "#FF0000" }}>*</Text>
            </Text>
            <View style={styles.radioGroup}>
              {deliveryOptions.map((opt) => (
                <TouchableOpacity
                  key={opt.value}
                  onPress={() => setDelivery(opt.value)}
                  style={styles.radioOption}
                >
                  <View
                    style={[
                      styles.radioCircle,
                      delivery === opt.value && styles.selected,
                    ]}
                  />
                  <Text style={styles.radioText}>{opt.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
            {/* Phone */}
            <Text style={styles.label}>
              Phone Number <Text style={{ color: "#FF0000" }}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
              placeholder="Enter your phone number"
            />

            {/* Payment Method */}
            <Text style={styles.label}>
              Payment Method <Text style={{ color: "#FF0000" }}>*</Text>
            </Text>
            <View style={styles.radioGroup}>
              {paymentOptions.map((opt, index) => {
                return (
                  <TouchableOpacity
                    key={opt.value}
                    onPress={() => setPaymentMethod(opt.value)}
                    style={styles.radioOption}
                  >
                    <View
                      style={[
                        styles.radioCircle,
                        paymentMethod === opt.value && styles.selected,
                      ]}
                    />
                    <Text style={styles.radioText}>{opt.label}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Address Input */}
            <AddressInputWithSuggestions
              selectedAddress={address}
              setSelectedAddress={(val: AddressData) => {
                setAddress(val);
                setCity(val?.city);
                setState(val?.state);
                setCountry(val?.country);
                setZipCode(val?.postalCode);
              }}
            />

            <View style={{ width: "100%" }}>
              <Text style={styles.label}>
                City <Text style={{ color: "#FF0000" }}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                keyboardType="default"
                value={city}
                onChangeText={setCity}
                placeholder="Enter your city"
              />
            </View>

            <View style={{ width: "100%" }}>
              <Text style={styles.label}>
                State <Text style={{ color: "#FF0000" }}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                keyboardType="default"
                value={state}
                onChangeText={setState}
                placeholder="Enter your state"
              />
            </View>
            <View style={{ width: "100%" }}>
              <Text style={styles.label}>
                Country <Text style={{ color: "#FF0000" }}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                keyboardType="default"
                value={country}
                onChangeText={setCountry}
                placeholder="Enter your country"
              />
            </View>
            <View style={{ width: "100%" }}>
              <Text style={styles.label}>
                Postal Code <Text style={{ color: "#FF0000" }}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                keyboardType="default"
                value={zipCode}
                onChangeText={setZipCode}
                placeholder="Enter your postal code"
              />
            </View>
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
                onPress={() => handelNext()}
                style={styles.button}
              >
                <Text style={styles.nextText}>Next</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </CurvedShape>
      </View>
      {/* </TouchableWithoutFeedback> */}
    </KeyboardAvoidingView>
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
