import { responsive } from "@/hooks/resposive";
import LoaderIndicator from "@/src/component/common/LoaderIndicator";
import Inputfield from "@/src/component/ui/Inputfield";
import { Colors } from "@/src/constants/Colors";
import { Routes } from "@/src/utils/Routes";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const ResetPassword = ({ navigation, route }: any) => {
  console.log("routes", route?.params);

  const [loading, setLoading] = useState<boolean>(false);

  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string>("");
  const handleResetPassword = () => {
    if (!otp || otp.length !== 6) {
      alert("Please enter valid 6-digit OTP");
      return;
    }
    if (!password) {
      alert("Please enter new password");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // call reset password API here
    alert("Password reset successfully!");
    navigation.navigate(Routes.Login);
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
                Reset Password
              </Text>
              <Text style={[styles.enterTxt, styles.textColor]}>
                Enter the OTP sent to your email and set a new password.
              </Text>

              <>
                <TextInput
                  placeholder="Enter 6-digit OTP"
                  placeholderTextColor="#ccc"
                  keyboardType="numeric"
                  maxLength={6}
                  value={otp}
                  onChangeText={setOtp}
                  style={styles.input}
                />

                <Inputfield
                  label="New Password"
                  onChangeText={(val) => {
                    setPassword(val);
                    if (passwordError) setPasswordError("");
                  }}
                  value={password}
                  secureTextEntry={true}
                  placeholder="password"
                  error={passwordError}
                />
                <Inputfield
                  label="Confirm Password"
                  onChangeText={(val) => {
                    setPassword(val);
                    if (passwordError) setPasswordError("");
                  }}
                  value={password}
                  secureTextEntry={true}
                  placeholder=" confirm password"
                  error={passwordError}
                />

                <TouchableOpacity
                  onPress={handleResetPassword}
                  style={styles.signinButton}
                >
                  <Text style={styles.siginText}>Reset Password</Text>
                </TouchableOpacity>
              </>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ResetPassword;

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
