import LoaderIndicator from "@/src/component/common/LoaderIndicator";
import { clearRequest } from "@/src/redux/slice/serviceRequestSlice";
import { Routes } from "@/src/utils/Routes";
import { useNavigation } from "@react-navigation/native";
import React, { useRef } from "react";
import { View } from "react-native";
import Toast from "react-native-toast-message";
import { WebView } from "react-native-webview";
import { useDispatch } from "react-redux";

interface PaymentScreenProps {
  route: {
    params: {
      requestId: number;
    };
  };
}

const PaymentScreen = ({ route }: PaymentScreenProps) => {
  const webviewRef = useRef(null);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { requestId } = route.params;

  const handleMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);

      if (data.status === "succeeded") {
        Toast.show({
          type: "success",
          text1: data.message || "Payment Successful!",
          onHide: () => {
            // Clear Redux state
            dispatch(clearRequest());

            // Optionally navigate to Home / Success screen
            navigation.reset({
              index: 0,
              routes: [{ name: Routes.Home }],
            });
          },
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Payment Failed",
          text2: data.message || "Try again.",
        });
      }
    } catch (error) {
      console.warn("Invalid JSON from WebView:", event.nativeEvent.data);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <WebView
        ref={webviewRef}
        source={{
          uri: `https://techb.igiapp.com/compucaresolutions/api/customer-down-payment?requestId=${requestId}`,
        }}
        javaScriptEnabled
        domStorageEnabled
        onMessage={handleMessage}
        startInLoadingState
        renderLoading={() => <LoaderIndicator isLoading={true} />}
      />
    </View>
  );
};

export default PaymentScreen;
