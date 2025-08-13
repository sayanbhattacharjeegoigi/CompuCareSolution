// SnackBar.tsx
import { responsive } from "@/hooks/resposive";
import React from "react";
import Toast from "react-native-toast-message";

export const TIME_LENGTH = {
  LONG: 10000,
  SHORT: 5000,
};

interface PropType {
  alert: string;
  setAlert: (val: string) => void;
  type: "LONG" | "SHORT";
}

// This component just initializes Toast. Nothing visual here.
export function SnackBar({ alert, setAlert, type }: PropType) {
  React.useEffect(() => {
    if (alert.length > 0) {
      console.log("SnackBar alert:", alert);
      Toast.show({
        position: "bottom",
        bottomOffset: responsive.number(10),
        avoidKeyboard: true,
        type: "info",
        text1: alert,
        visibilityTime: TIME_LENGTH[type],
        onHide: () => setAlert(""),
      });
    }
  }, [alert]);

  return <Toast />;
}
