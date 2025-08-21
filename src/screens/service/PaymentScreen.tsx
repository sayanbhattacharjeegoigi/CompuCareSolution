import LoaderIndicator from "@/src/component/common/LoaderIndicator";
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

  const handleMessage = (state: any) => {
    try {
      const { url } = state;
      console.log("url", url);
      const urlObj = new URL(url);

      let params = {
        status: urlObj.searchParams.get("status"),
        txnId: urlObj.searchParams.get("txnId") || "",
        msg: urlObj.searchParams.get("message"),
      };
      console.log("params", params);
      if (!params?.status) {
        return;
      }
      if (params?.status === "succeeded") {
        Toast.show({
          type: "success",
          text1: params.msg || "Payment Successful!",
          onShow: () => {
            navigation.navigate(Routes.PaymentResultScreen, {
              status: "success",
              txnId: params?.txnId,
            });
          },
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Payment Failed",
          text2: params.msg || "Try again.",
          onShow: () => {
            navigation.navigate(Routes.PaymentResultScreen, {
              status: "failure",
              msg: params?.msg,
            });
          },
        });
      }
    } catch (error) {
      // console.warn("Invalid JSON from WebView:", event.nativeEvent.data);
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
        onNavigationStateChange={handleMessage}
        renderLoading={() => <LoaderIndicator isLoading={true} />}
      />
    </View>
  );
};

export default PaymentScreen;
