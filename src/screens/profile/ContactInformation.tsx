import { responsive } from "@/hooks/resposive";
import { timezoneList, updateProfile } from "@/src/apis/ApiEndPoint";
import { CallApi_GET, CallApi_Without_Token } from "@/src/apis/ApiRequest";
import AddressInputWithSuggestions from "@/src/component/common/AddressInputWithSuggestions";
import CustomDropdown from "@/src/component/common/CustomDropdown";
import LoaderIndicator from "@/src/component/common/LoaderIndicator";
import CurvedShape from "@/src/component/ui/CurvedBackground ";
import { AddressData, genderArr, TimezoneOption } from "@/src/constants/Data";
import { fetchUserDetails } from "@/src/redux/slice/authSlice";
import { Routes } from "@/src/utils/Routes";
import Entypo from "@expo/vector-icons/Entypo";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import moment from "moment-timezone";
import React, { useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";

const ContactInformation = () => {
  const navigation = useNavigation();
  const { userDetails } = useSelector((state: any) => state.auth);
  const [firstName, setFirstName] = useState(userDetails?.fname || "");
  const [lastName, setLastName] = useState(userDetails?.lname || "");
  const [email, setEmail] = useState(userDetails?.email || "");
  const [phnNumber, setPhnNumber] = useState(userDetails?.phoneNumber || "");
  const [gender, setGender] = useState(
    genderArr?.find((element) => element?.label === userDetails?.gender)
      ?.value || ""
  );
  const [dob, setDOB] = useState(userDetails?.date_of_birth || null);
  const [timeZone, setTimeZone] = useState(userDetails?.timezoneId || "");
  const [address, setAddress] = useState(userDetails?.address || "");
  const [city, setCity] = useState(userDetails?.city || "");
  const [state, setState] = useState(userDetails?.state || "");
  const [country, setCountry] = useState(userDetails?.country || "");
  const [postalCode, setPostalCode] = useState(userDetails?.zip_code || "");
  const [description, setDescription] = useState(
    userDetails?.profile_description || ""
  );
  const [longitude, setLongitude] = useState(userDetails?.longitude || "");
  const [latitude, setLatitude] = useState(userDetails?.latitude || "");
  const [showError, setShowError] = useState(false);

  const [showPicker, setShowPicker] = useState(false);
  const [showImagePicker, setImageShowPicker] = useState(false);
  const [timeZoneList, setTimeZoneList] = useState<TimezoneOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const onChange = (_event: any, selected: Date | undefined) => {
    const currentDate = selected || new Date(dob);
    setShowPicker(false);
    setDOB(moment(currentDate).format("YYYY-MM-DD"));
  };

  const getTimeZoneList = () => {
    // Function to fetch timezone list from API
    // This function can be implemented to fetch the timezone list from your backend
    CallApi_GET(timezoneList)
      .then((response) => {
        if (response?.status === 1) {
          // Handle the response and update state if needed
          console.log("Timezone List:", response?.list);
          const transformed = response?.list?.map((item: any) => ({
            value: item.id,
            label: item.timezonePrefix,
            timezone: item.timezone,
            currentTimezone: item.currentTimezone,
          }));
          setTimeZoneList(transformed);
        } else {
          console.error("Failed to fetch timezone list:", response?.error);
        }
      })
      .catch((error) => {
        console.error("Error fetching timezone list:", error);
      });
  };
  const handelUpdate = () => {
    let payload = {
      userId: userDetails?.userId,
      fname: firstName,
      lname: lastName,
      email: email,
      phoneNumber: phnNumber,
      address: address,
      country: country,
      state: state,
      city: city,
      zip_code: postalCode,
      latitude: latitude,
      longitude: longitude,
      gender: genderArr?.find((element) => element?.value === gender)?.label,
      date_of_birth: dob,
      timezoneId: timeZone,
      profile_description: description,
    };
    if (!payload.fname?.trim()) {
      Toast.show({ type: "error", text1: "First name is required" });
      return false;
    }
    if (!payload.lname?.trim()) {
      Toast.show({ type: "error", text1: "First name is required" });
      return false;
    }

    if (!payload.email?.trim() || !/\S+@\S+\.\S+/.test(payload.email)) {
      Toast.show({ type: "error", text1: "Enter a valid email address" });
      return false;
    }
    if (!payload?.phoneNumber?.trim() || payload?.phoneNumber?.length < 8) {
      Toast.show({ type: "error", text1: "Enter a valid phone number" });
      return false;
    }
    if (!payload?.timezoneId) {
      Toast.show({ type: "error", text1: "Timezone is required" });
      return false;
    }

    if (!payload?.address?.trim()) {
      Toast.show({ type: "error", text1: "Address is required" });
      return false;
    }

    if (!payload?.country?.trim()) {
      Toast.show({ type: "error", text1: "Country is required" });
      return false;
    }

    if (!payload?.state?.trim()) {
      Toast.show({ type: "error", text1: "State is required" });
      return false;
    }

    if (!payload?.city?.trim()) {
      Toast.show({ type: "error", text1: "City is required" });
      return false;
    }

    if (!payload?.zip_code?.trim()) {
      Toast.show({ type: "error", text1: "Zip code is required" });
      return false;
    }

    console.log("Payload for update:", payload);

    CallApi_Without_Token(updateProfile, payload)
      .then((response) => {
        console.log("Update Profile Response:", response);

        if (response?.status === "1") {
          Toast.show({
            type: "success",
            text1: response?.message,
            onHide: () => {
              navigation.reset({
                index: 0,
                routes: [
                  {
                    name: Routes.Tab, // go to the Tabs navigator
                    state: {
                      index: 0, // Home tab index
                      routes: [{ name: "Home" }], // tab screen name
                    },
                  },
                ],
              });
            },
          });
        } else {
          Toast.show({ type: "error", text1: response?.error });
        }
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        Toast.show({ type: "error", text1: "Failed to update profile" });
      });
  };

  const uploadImage = async (imgUri: string) => {
    try {
      // Get the user ID from Redux
      const userId = userDetails?.userId;

      // Create a FormData object
      const formData = new FormData();

      // Append the user ID and image data to the FormData object
      formData.append("userId", userId || ""); // Use empty string as fallback if userId is null
      formData.append("profilePhoto", {
        uri: imgUri,
        name: `profileImage${userId}.jpg`, // Adjust the filename as needed
        type: "image/jpg", // Adjust the image type as needed
      } as any);

      // Make the API call
      setIsLoading(true);

      const response = await fetch(
        "https://techb.igiapp.com/compucaresolutions/api/uploadProfile",
        {
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",

            // Add any additional headers if needed
          },
        }
      );

      // Parse the response JSON
      const res = await response.json();
      console.log("Response:", res);

      if (res.status === "1") {
        // Handle successful upload
        Toast.show({ type: "success", text1: "Upload successful" });
        const user = await dispatch(fetchUserDetails() as any);
        if (user) {
          setIsLoading(false);
        } else {
          navigation.goBack();
        }
      } else {
        // Handle upload failure
        Toast.show({ type: "error", text1: res.error });
        console.error("Upload failed:", res.error);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const pickImageAsync = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        console.error("Permission to access camera roll was denied");
        return;
      }

      // Launch the image picker
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });

      console.log(result);

      if (!result.canceled) {
        setImageShowPicker(false);
        // Upload the selected image

        console.log(result.assets[0].uri);
        // setProfileData((prevData: any) => ({
        //   ...prevData,
        //   profileImage: result.assets[0].uri,
        // }));
        await uploadImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error picking image:", error);
    } finally {
      // Close any modals or loading indicators
      setImageShowPicker(false);
    }
  };
  const pickImageFromCamera = async () => {
    try {
      // Request permission to use the camera
      const permissionResult =
        await ImagePicker.requestCameraPermissionsAsync();

      if (permissionResult.granted === false) {
        alert("You've refused to allow this app to access your camera!");
        return;
      }

      // Launch the camera
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });

      if (!result.canceled) {
        setImageShowPicker(false);

        const imgUri = result.assets[0].uri;

        console.log(imgUri);

        // setProfileData((prevData: any) => ({
        //   ...prevData,
        //   profileImage: imgUri,
        // }));

        await uploadImage(imgUri);
      }
    } catch (error) {
      console.error("Error capturing image:", error);
    } finally {
      setImageShowPicker(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getTimeZoneList();

      return unsubscribe;
    });
  }, [navigation]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "padding"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0} // tweak if needed
      >
        <LoaderIndicator isLoading={isLoading} />
        <View style={styles.container}>
          <CurvedShape
            title="Edit Profile"
            handeleBackButtonPrees={() => {
              navigation.goBack();
            }}
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled={true}
              contentContainerStyle={styles.scrollContainer}
            >
              <View style={styles.avatarContainer}>
                <Pressable
                  style={{}}
                  onPress={() => {
                    // Handle avatar change logic here
                    // For example, open image picker or camera
                    setImageShowPicker(true);
                  }}
                >
                  {userDetails?.profileImg ? (
                    <Image
                      source={{ uri: userDetails?.profileImg }} // or use any static dummy image
                      style={styles.avatar}
                    />
                  ) : (
                    <Image
                      source={require("@/assets/images/user.png")} // or use any static dummy image
                      style={styles.avatar}
                    />
                  )}
                  <View
                    style={{
                      width: responsive.number(40),
                      height: undefined,
                      aspectRatio: 1,
                      borderRadius: responsive.number(20),
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#1E3A8A",
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                    }}
                  >
                    <Entypo
                      name="camera"
                      size={responsive.number(24)}
                      color="#fff"
                    />
                  </View>
                </Pressable>
              </View>
              <>
                <View style={{ width: "100%" }}>
                  <Text style={styles.label}>
                    First Name <Text style={{ color: "#FF0000" }}>*</Text>
                  </Text>
                  <TextInput
                    style={styles.input}
                    keyboardType="default"
                    textContentType="name"
                    value={firstName}
                    onChangeText={setFirstName}
                    placeholder="Enter your first name"
                  />
                </View>
                <View style={{ width: "100%" }}>
                  <Text style={styles.label}>
                    Last Name <Text style={{ color: "#FF0000" }}>*</Text>
                  </Text>
                  <TextInput
                    style={styles.input}
                    keyboardType="default"
                    textContentType="name"
                    value={lastName}
                    onChangeText={setLastName}
                    placeholder="Enter your last name"
                  />
                </View>
                <View style={{ width: "100%" }}>
                  <Text style={styles.label}>
                    Email <Text style={{ color: "#FF0000" }}>*</Text>
                  </Text>
                  <TextInput
                    style={styles.input}
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Enter your email"
                  />
                </View>
                <View style={{ width: "100%" }}>
                  <Text style={styles.label}>
                    Phone Number <Text style={{ color: "#FF0000" }}>*</Text>
                  </Text>
                  <TextInput
                    style={styles.input}
                    keyboardType="number-pad"
                    textContentType="telephoneNumber"
                    value={phnNumber}
                    onChangeText={setPhnNumber}
                    placeholder="Enter your phone number"
                  />
                </View>
                <View style={{ width: "100%" }}>
                  <CustomDropdown
                    label="Gender"
                    placeholder="Select your gender"
                    items={genderArr}
                    selectedValue={gender}
                    onValueChange={setGender}
                  />
                </View>
                {Platform.OS === "ios" ? (
                  <>
                    <Text style={styles.label}>Date of Birth</Text>
                    <DateTimePicker
                      value={dob ? new Date(dob) : new Date()}
                      mode="date"
                      maximumDate={new Date()}
                      display="default"
                      onChange={onChange}
                      onTouchCancel={() => setShowPicker(false)}
                      onTouchEnd={() => setShowPicker(false)}
                    />
                  </>
                ) : (
                  <>
                    <Pressable
                      onPress={() => {
                        setShowPicker(true);
                      }}
                      style={{ width: "100%" }}
                    >
                      <Text style={styles.label}>Date of Birth</Text>
                      <TextInput
                        style={styles.input}
                        keyboardType="default"
                        textContentType="birthdate"
                        placeholder="YYYY-MM-DD"
                        value={dob ? moment(dob).format("YYYY-MM-DD") : ""}
                        editable={false}
                      />
                    </Pressable>
                    {showPicker && (
                      <DateTimePicker
                        value={dob ? new Date(dob) : new Date()}
                        mode="date"
                        maximumDate={new Date()}
                        display="default"
                        onChange={onChange}
                        onTouchCancel={() => setShowPicker(false)}
                        onTouchEnd={() => setShowPicker(false)}
                      />
                    )}
                  </>
                )}

                <View style={{ width: "100%" }}>
                  <CustomDropdown
                    label="Time Zone"
                    placeholder="Select your time zone"
                    items={timeZoneList}
                    selectedValue={timeZone}
                    onValueChange={setTimeZone}
                    mandetory={true}
                  />
                </View>
                <AddressInputWithSuggestions
                  selectedAddress={address}
                  setSelectedAddress={(val: AddressData) => {
                    setAddress(val?.fullAddress);
                    setCity(val?.city);
                    setState(val?.state);
                    setCountry(val?.country);
                    setPostalCode(val?.postalCode);
                    setLatitude(val?.latitude?.toString() || "");
                    setLongitude(val?.longitude?.toString() || "");
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
                    value={postalCode}
                    onChangeText={setPostalCode}
                    placeholder="Enter your postal code"
                  />
                </View>
                <View style={{ width: "100%" }}>
                  <Text style={styles.label}>Description</Text>
                  <TextInput
                    style={styles.input}
                    keyboardType="default"
                    value={description}
                    onChangeText={setDescription}
                    placeholder="Enter your description"
                    multiline={true}
                    numberOfLines={4}
                    textAlignVertical="top"
                  />
                </View>
              </>
              <View style={styles.footer}>
                <TouchableOpacity
                  onPress={() => handelUpdate()}
                  style={styles.button}
                >
                  <Text style={styles.nextText}>Update Profile</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </CurvedShape>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={showImagePicker}
          onRequestClose={() => {
            setImageShowPicker(false);
          }}
        >
          <Pressable
            style={{
              flex: 1,
              width: "100%",
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
            onPress={() => setImageShowPicker(false)}
          >
            <Pressable style={styles.containerbottom}>
              <View style={styles.contentContainer}>
                <Text
                  style={{
                    fontSize: responsive.fontSize(18),
                    marginBottom: 20,
                  }}
                >
                  Choose an option
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    pickImageAsync();
                    // setImageShowPicker(false);
                  }}
                  style={{
                    width: "100%",

                    borderTopWidth: 1,

                    borderColor: "#ccc",
                    padding: responsive.number(10),
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: responsive.fontSize(16),
                      marginBottom: 10,
                    }}
                  >
                    Pick from Gallery
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    pickImageFromCamera();
                    // setImageShowPicker(false);
                  }}
                  style={{
                    width: "100%",

                    borderTopWidth: 1,

                    borderColor: "#ccc",
                    padding: responsive.number(10),
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ fontSize: responsive.fontSize(16) }}>
                    Take a Photo
                  </Text>
                </TouchableOpacity>
              </View>
            </Pressable>
          </Pressable>
        </Modal>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default ContactInformation;

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
    color: "#333",
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: "#11BFB6", // teal border
    backgroundColor: "#ccc",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: responsive.number(8),
    padding: responsive.number(10),
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
  containerbottom: {
    position: "absolute",
    borderTopRightRadius: responsive.number(20),
    borderTopLeftRadius: responsive.number(20),
    backgroundColor: "#fff",
    width: "100%",
    bottom: 0,
    shadowColor: "#000",
    // borderTopWidth: 1,
    // borderTopColor: "#ccc",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,

    elevation: 18,
  },
  contentContainer: {
    paddingVertical: 36,
    paddingHorizontal: responsive.number(20),
    alignItems: "center",
  },
});
