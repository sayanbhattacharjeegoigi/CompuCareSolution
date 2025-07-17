import { responsive } from "@/hooks/resposive";
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
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        bounces={false}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        style={{ width: responsive.deviceWidth }}
      >
        <View style={{ flex: 1, width: "100%", backgroundColor: "#1E3A8A" }}>
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
        <View style={{ flex: 1, width: "100%", backgroundColor: "#fff" }}>
          <KeyboardAvoidingView
            style={{ flex: 1, width: "100%" }}
            contentContainerStyle={{ width: "100%" }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={
              Platform.OS === "ios" ? 0 : StatusBar.currentHeight || 0
            }
          >
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
              />
              <Inputfield
                label="Last Name"
                onChangeText={(val) => setLastName(val)}
                value={lastName}
                placeholder="Enter your last name"
              />
              <Inputfield
                label="Email"
                onChangeText={(val) => setEmail(val)}
                value={email}
                keyboardType="email-address"
                placeholder="Enter your email"
              />
              <Inputfield
                label="Phone Number"
                onChangeText={(val) => setPhnNo(val)}
                value={phnNo}
                placeholder="Enter your phone number"
                keyboardType="number-pad"
              />
              <Inputfield
                label="Password"
                onChangeText={(val) => setPassword(val)}
                value={password}
                placeholder="Enter your password"
                secureTextEntry={true}
              />
              <Inputfield
                label="Confirm Password"
                onChangeText={(val) => setConfirmPassword(val)}
                value={confirmPassword}
                placeholder="Enter your confirm password"
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
                  navigation.navigate(Routes.Tab, { screen: Routes.Home });
                }}
                style={styles.signinButton}
              >
                <Text style={styles.siginText}>Sign up</Text>
              </TouchableOpacity>

              <Pressable
                hitSlop={hitSlope}
                onPress={() => {
                  navigation.navigate(Routes.Stack, {
                    screen: Routes.LogIn,
                  });
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
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
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
