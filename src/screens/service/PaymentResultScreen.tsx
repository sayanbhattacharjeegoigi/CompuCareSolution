import { clearRequest } from "@/src/redux/slice/serviceRequestSlice";
import { Routes } from "@/src/utils/Routes";
import { useNavigation, useRoute } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";

export default function PaymentResultScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const { status, txnId, msg } = route?.params as {
    status: "success" | "failure";
    txnId?: string;
  };

  const isSuccess = status === "success";

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      dispatch(clearRequest());
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isSuccess ? "#2ecc709f" : "#E74C3C" },
      ]}
    >
      <LottieView
        source={
          isSuccess
            ? require("@/src/assets/animation/success.json")
            : require("@/src/assets/animation/failure.json")
        }
        autoPlay
        loop={false}
        style={styles.animation}
      />

      <Text style={styles.title}>
        {isSuccess ? "Payment Successful!" : "Payment Failed"}
      </Text>
      <Text style={styles.subtitle}>
        {isSuccess
          ? "Thank you! Your payment has been processed."
          : msg || "Please try again."}
      </Text>
      {/* {isSuccess && txnId && (
        <Text style={styles.txnId}>Transaction ID: {txnId}</Text>
      )} */}

      <TouchableOpacity
        style={styles.button}
        onPress={
          () =>
            // isSuccess
            //   ?
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: Routes.Tab, // go to the Tabs navigator
                  state: {
                    index: 0, // Home tab index
                    routes: [{ name: "Service" }], // tab screen name
                  },
                },
              ],
            })
          // : navigation.replace(Routes.PaymentScreen)
        }
      >
        <Text style={styles.buttonText}>
          {isSuccess ? "Go to Home" : "Try Again"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  animation: {
    width: 150,
    height: 150,
  },
  txnId: {
    fontSize: 14,
    color: "#fff",
    marginTop: 8,
    fontStyle: "italic",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  buttonText: {
    color: "#2C3E50",
    fontWeight: "600",
    fontSize: 16,
  },
});
