import { responsive } from "@/hooks/resposive";
import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

interface InputfieldProps {
  label?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
  error?: string; // <-- Add this
  [key: string]: any;
}

const Inputfield: React.FC<InputfieldProps> = ({
  label,
  value,
  onChangeText,
  secureTextEntry = false,
  error = "", // <-- Default to empty string
  ...rest
}) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[
          styles.input,
          error ? styles.inputError : null, // red border if error
        ]}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        placeholderTextColor="#fff"
        {...rest}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default Inputfield;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: responsive.number(20),
  },
  label: {
    color: "#fff",
    marginBottom: responsive.number(15),
  },
  input: {
    width: "100%",
    color: "#fff",
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 2,
    padding: responsive.number(10),
  },
  inputError: {
    borderColor: "#FF6B6B",
  },
  errorText: {
    marginTop: responsive.number(8),
    color: "#FF6B6B",
    fontSize: responsive.fontSize(12),
  },
});
