import { responsive } from "@/hooks/resposive";
import LoaderIndicator from "@/src/component/common/LoaderIndicator";
import Inputfield from "@/src/component/ui/Inputfield";
import { Colors } from "@/src/constants/Colors";
import { hitSlope } from "@/src/constants/HitSlope";
import { login } from "@/src/redux/slice/authSlice";
import type { RootState } from "@/src/redux/store/Store";
import { Routes } from "@/src/utils/Routes";
import { showToast } from "@/src/utils/toastUtils";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import type { ThunkDispatch } from "@reduxjs/toolkit";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

const Login = ({ navigation }: { navigation: any }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isRememberMe, setIsRememberMe] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [alert, setAlert] = useState("");
  const dispatch = useDispatch<ThunkDispatch<RootState, any, any>>(); // <-- type the dispatch hook for thunks
  const { loading, error } = useSelector((state: any) => state.auth);

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

    if (!password.trim()) {
      setPasswordError("Password is required");
      showToast({ text1: "Password is required", type: "error" });
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  return (
    <SafeAreaView style={styles.container}>
      <LoaderIndicator isLoading={loading} />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "padding"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                  Welcome Back
                </Text>
                <Text style={[styles.enterTxt, styles.textColor]}>
                  Welcome back. Please enter your details.
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
                <Inputfield
                  label="password"
                  onChangeText={(val) => {
                    setPassword(val);
                    if (passwordError) setPasswordError("");
                  }}
                  value={password}
                  secureTextEntry={true}
                  placeholder="password"
                  error={passwordError}
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
                      Remember me
                    </Text>
                  </Pressable>
                  <Text
                    style={[{ flex: 1, textAlign: "right" }, styles.textColor]}
                  >
                    Forgot Password?
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() => {
                    if (validateForm()) {
                      dispatch(login(email.trim(), password));
                    }
                  }}
                  style={styles.signinButton}
                >
                  <Text style={styles.siginText}>Sign in</Text>
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
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;

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
