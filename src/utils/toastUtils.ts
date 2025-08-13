// utils/toastUtils.ts
import Toast from "react-native-toast-message";

export const showToast = ({
  type = "info",
  text1,
  text2 = "",
  duration = 5000,
}: {
  type?: "success" | "error" | "info";
  text1: string;
  text2?: string;
  duration?: number;
}) => {
  Toast.show({
    type,
    text1,
    text2,
    position: "bottom",
    bottomOffset: 60,
    visibilityTime: duration,
  });
};
