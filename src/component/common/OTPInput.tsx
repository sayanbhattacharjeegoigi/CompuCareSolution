import { responsive } from "@/hooks/resposive";
import React, { useRef } from "react";
import { StyleSheet, TextInput, View } from "react-native";

type Props = {
  otp: string[];
  setOtp: (otp: string[]) => void;
};

const OTPInput = ({ otp, setOtp }: Props) => {
  const inputs = useRef<(TextInput | null)[]>([]);

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Move to next input
    if (text && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.container}>
      {otp.map((digit, index) => (
        <TextInput
          key={index}
          placeholder="_"
          placeholderTextColor={"#ccc"}
          ref={(el) => {
            inputs.current[index] = el;
          }}
          style={styles.inputBox}
          keyboardType="numeric"
          maxLength={1}
          value={digit}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
        />
      ))}
    </View>
  );
};

export default OTPInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: responsive.number(10),
    gap: responsive.number(2),
  },
  inputBox: {
    width: responsive.number(38),
    height: undefined,
    aspectRatio: 1,
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: responsive.number(10),
    textAlign: "center",
    fontSize: responsive.fontSize(12),
    backgroundColor: "transparent",
    color: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
