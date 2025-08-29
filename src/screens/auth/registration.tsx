import { responsive } from "@/hooks/resposive";
import { api_signup } from "@/src/apis/ApiEndPoint";
import { CallApi_Without_Token } from "@/src/apis/ApiRequest";
import LoaderIndicator from "@/src/component/common/LoaderIndicator";
import Inputfield from "@/src/component/ui/Inputfield";
import { Colors } from "@/src/constants/Colors";
import { hitSlope } from "@/src/constants/HitSlope";
import { Routes } from "@/src/utils/Routes";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
const Registration = ({ navigation }: { navigation: any }) => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phnNo, setPhnNo] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isRememberMe, setIsRememberMe] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [alert, setAlert] = useState(""); // if you use SnackBar

  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!firstName.trim()) newErrors.firstName = "First name is required";
    if (!lastName.trim()) newErrors.lastName = "Last name is required";

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email.trim())) {
      newErrors.email = "Invalid email format";
    }

    if (!phnNo.trim()) {
      newErrors.phnNo = "Phone number is required";
    } else if (!/^\d{10}$/.test(phnNo.trim())) {
      newErrors.phnNo = "Phone number must be 10 digits";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!isRememberMe) {
      newErrors.terms = "You must accept the terms";
    }

    setErrors(newErrors);

    // If errors exist, show first one via SnackBar
    if (Object.keys(newErrors).length > 0) {
      const firstError = Object.values(newErrors)[0];
      setAlert(firstError); // if using SnackBar
      return false;
    }

    return true;
  };

  const handelRagistration = async () => {
    try {
      if (!validateForm()) return;

      setIsLoading(true);
      let payload = {
        fname: firstName,
        lname: lastName,
        email: email,
        phoneNumber: phnNo,
        password: password,
        confirmPassword: confirmPassword,
      };
      const response = await CallApi_Without_Token(api_signup, payload);
      if (response?.status === "1") {
        navigation.navigate(Routes.LogIn);
      } else {
        setAlert(JSON.stringify(response?.error) || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setAlert("An error occurred during registration. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#1E3A8A" }}>
      <LoaderIndicator isLoading={isLoading} />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "padding"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0} // tweak if needed
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1 }}
          bounces={false}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ width: "100%", backgroundColor: "#1E3A8A" }}>
            <View style={styles.topContainer}>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <View style={styles.externalView}>
                  <LinearGradient
                    // Background Linear Gradient
                    colors={["#1E3A8A", "#20B2AA"]}
                    style={styles.background}
                  />
                </View>

                <Image
                  source={require("../../../assets/images/frontViewMan.png")}
                  style={{
                    height: responsive.deviceHeight * 0.45,
                    resizeMode: "contain",
                    bottom: responsive.number(10),
                  }}
                />
              </View>
            </View>
          </View>
          <View style={{ width: "100%", backgroundColor: "#fff" }}>
            <View style={styles.bottomContainner}>
              <Text style={[styles.welcomeTxt, styles.textColor]}>
                Create an Account
              </Text>
              <Text style={[styles.enterTxt, styles.textColor]}>
                Please enter your details.
              </Text>
              <Inputfield
                label="First Name"
                onChangeText={(val) => setFirstName(val)}
                value={firstName}
                placeholder="Enter your first name"
                error={errors.firstName}
              />
              <Inputfield
                label="Last Name"
                onChangeText={(val) => setLastName(val)}
                value={lastName}
                placeholder="Enter your last name"
                error={errors.lastName}
              />
              <Inputfield
                label="Email"
                onChangeText={(val) => setEmail(val)}
                value={email}
                keyboardType="email-address"
                placeholder="Enter your email"
                error={errors.email}
              />
              <Inputfield
                label="Phone Number"
                onChangeText={(val) => setPhnNo(val)}
                value={phnNo}
                placeholder="Enter your phone number"
                keyboardType="number-pad"
                error={errors.phnNo}
              />
              <Inputfield
                label="Password"
                onChangeText={(val) => setPassword(val)}
                value={password}
                placeholder="Enter your password"
                secureTextEntry={true}
                error={errors.password}
              />
              <Inputfield
                label="Confirm Password"
                onChangeText={(val) => setConfirmPassword(val)}
                value={confirmPassword}
                placeholder="Enter your confirm password"
                error={errors.confirmPassword}
              />
              <View style={styles.rememberMeContainer}>
                <Pressable
                  onPress={() => {
                    setIsRememberMe((prev) => !prev);
                  }}
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <FontAwesome
                    name={isRememberMe ? "check-square" : "square-o"}
                    size={24}
                    color="#fff"
                  />
                  <Text
                    style={[
                      styles.textColor,
                      { marginLeft: responsive.number(5) },
                    ]}
                  >
                    I accept the Privacy Services and Terms.
                  </Text>
                </Pressable>
              </View>

              <TouchableOpacity
                onPress={() => {
                  // navigation.navigate(Routes.Tab, { screen: Routes.Home });
                  handelRagistration();
                }}
                style={styles.signinButton}
              >
                <Text style={styles.siginText}>Sign up</Text>
              </TouchableOpacity>

              <Pressable
                hitSlop={hitSlope}
                onPress={() => {
                  navigation.navigate(Routes.LogIn);
                }}
                style={{
                  marginTop: responsive.number(20),
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={styles.registerText}>
                  Already have an account?
                  <Text style={styles.registerTextColor}>  Sign In</Text>
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Registration;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: responsive.deviceWidth,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  topContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    backgroundColor: "#fff",
    borderBottomLeftRadius: responsive.number(100),
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  externalView: {
    height: responsive.deviceHeight * 0.37,
    width: undefined,
    aspectRatio: 1,
    borderRadius: responsive.deviceHeight,
    overflow: "hidden",
    position: "absolute",
  },
  bottomContainner: {
    width: "100%",
    backgroundColor: "#1E3A8A",
    paddingHorizontal: "14.67%",
    paddingTop: "14%",
    borderTopRightRadius: responsive.number(100),
    paddingBottom: responsive.number(50),
  },
  textColor: {
    color: "#fff",
  },
  welcomeTxt: {
    fontWeight: "600",
    fontSize: responsive.fontSize(24),
  },
  enterTxt: {
    fontWeight: "500",
    fontSize: responsive.fontSize(18),
    marginTop: responsive.number(20),
  },
  rememberMeContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: responsive.number(20),
  },
  signinButton: {
    width: "100%",
    backgroundColor: Colors.green,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: responsive.number(24),
    borderRadius: responsive.number(10),
    marginTop: responsive.number(20),
  },
  siginText: {
    fontSize: responsive.fontSize(18),
    fontWeight: "600",
    color: "#000",
  },
  registerText: {
    color: "#fff",
    fontSize: responsive.fontSize(16),
    fontWeight: "700",
  },
  registerTextColor: {
    color: Colors.green,
  },
});
