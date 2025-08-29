import { responsive } from "@/hooks/resposive";
import { api_getOtp } from "@/src/apis/ApiEndPoint";
import { CallApi_Without_Token } from "@/src/apis/ApiRequest";
import LoaderIndicator from "@/src/component/common/LoaderIndicator";
import Inputfield from "@/src/component/ui/Inputfield";
import { Colors } from "@/src/constants/Colors";
import { hitSlope } from "@/src/constants/HitSlope";
import { Routes } from "@/src/utils/Routes";
import { showToast } from "@/src/utils/toastUtils";
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
import Toast from "react-native-toast-message";

const ForgotPassword = ({ navigation }: any) => {
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const validateForm = () => {
    let isValid = true;

    if (!email.trim()) {
      setEmailError("Email is required");
      showToast({ type: "error", text1: "Email is required" });
      isValid = false;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email.trim())) {
      setEmailError("Invalid email format");
      showToast({ type: "error", text1: "Invalid email format" });

      isValid = false;
    } else {
      setEmailError("");
    }

    return isValid;
  };

  const getOtp = () => {
    let payload = {
      email,
    };
    CallApi_Without_Token(api_getOtp, payload)
      .then((res) => {
        if (res?.status === 1) {
          Toast.show({
            type: "success",
            text1: "success",
            text2: "Otp sent to your email",
            visibilityTime: 3000,
            onHide() {
              //   console.log("userid", res?.userId);
              navigation.navigate(Routes.ResetPassword, {
                userId: res?.userId,
                email: email,
              });
            },
          });
        } else {
          Toast.show({
            type: "error",
            text1: "Failed",
            text2: res?.error || "Something went wrong",
          });
        }
      })
      .catch((error) => {
        console.log("Get Otp Error:", error);
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <LoaderIndicator isLoading={loading} />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "padding"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
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
                Forgot Password?
              </Text>
              <Text style={[styles.enterTxt, styles.textColor]}>
                Forgot your password? Don’t worry, enter your registered email
                to reset it
              </Text>

              <Inputfield
                label="email"
                onChangeText={(val) => {
                  setEmail(val);
                  if (emailError) setEmailError(""); // clear on change
                }}
                value={email}
                placeholder="email"
                error={emailError}
              />

              <TouchableOpacity
                onPress={() => {
                  if (validateForm()) {
                    getOtp();
                  }
                }}
                style={styles.signinButton}
              >
                <Text style={styles.siginText}>Get Otp</Text>
              </TouchableOpacity>

              <Pressable
                hitSlop={hitSlope}
                onPress={() => {
                  navigation.navigate(Routes.Registration);
                }}
                style={{
                  marginTop: responsive.number(20),
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={styles.registerText}>
                  Don’t have an account?
                  <Text style={styles.registerTextColor}> Register now</Text>
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: responsive.deviceWidth,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#1E3A8A",
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
    flex: 1,
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
