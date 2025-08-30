import { responsive } from "@/hooks/resposive";
import { Ionicons } from "@expo/vector-icons"; // Expo comes with this
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface InputfieldProps {
  label?: string;
  value?: string;
  mendatory?: boolean;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
  error?: string;
  [key: string]: any;
}

const Inputfield: React.FC<InputfieldProps> = ({
  label,
  value,
  onChangeText,
  mendatory = false,
  secureTextEntry = false,
  error = "",
  ...rest
}) => {
  const [isSecure, setIsSecure] = useState(secureTextEntry);

  return (
    <View style={styles.container}>
      {label && (
        <Text style={styles.label}>
          {label}
          {mendatory && <Text style={{ color: "#FF0000" }}>&nbsp;*</Text>}
        </Text>
      )}

      <View style={styles.inputWrapper}>
        <TextInput
          style={[styles.input, error ? styles.inputError : null]}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isSecure}
          placeholderTextColor="#fff"
          {...rest}
        />

        {secureTextEntry && (
          <TouchableOpacity
            style={styles.icon}
            onPress={() => setIsSecure(!isSecure)}
          >
            <Ionicons
              name={isSecure ? "eye-off" : "eye"}
              size={20}
              color="#fff"
            />
          </TouchableOpacity>
        )}
      </View>

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
  inputWrapper: {
    position: "relative",
    width: "100%",
    justifyContent: "center",
  },
  input: {
    width: "100%",
    color: "#fff",
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 2,
    padding: responsive.number(10),
    paddingRight: responsive.number(40), // space for eye icon
  },
  inputError: {
    borderColor: "#FF6B6B",
  },
  icon: {
    position: "absolute",
    right: responsive.number(10),
    top: "50%",
    transform: [{ translateY: -10 }],
  },
  errorText: {
    marginTop: responsive.number(8),
    color: "#FF6B6B",
    fontSize: responsive.fontSize(12),
  },
});
