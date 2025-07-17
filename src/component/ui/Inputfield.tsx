import { responsive } from "@/hooks/resposive";
import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

interface InputfieldProps {
  label?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
  [key: string]: any;
}

const Inputfield: React.FC<InputfieldProps> = ({
  label,
  value,
  onChangeText,
  secureTextEntry = false,
  ...rest
}) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        placeholderTextColor="#fff"
        {...rest}
      />
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
});
