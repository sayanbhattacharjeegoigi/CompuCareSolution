import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

interface FormInputProps extends TextInputProps {
  value: string;
  onChangeText?: (text: string) => void;
  lebel: string;
  placeholder: string;
  mendatory: boolean;
  cHeight: number;
  tHeight: number;
  keyboardType: KeyboardTypeOptions;
  secureTextEntry: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
  value,
  onChangeText,
  lebel,
  placeholder,
  mendatory,
  cHeight,
  tHeight,
  keyboardType,
  secureTextEntry,
  editable = true,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const showToggle = secureTextEntry;

  return (
    <View style={[styles.inputContainer, { height: cHeight }]}>
      <Text style={styles.label}>
        {lebel}
        {mendatory && <Text style={{ color: "#FF0000" }}>*</Text>}
      </Text>
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={"#8C8C8C"}
          style={[styles.txtInput, { height: tHeight, flex: 1 }]}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          secureTextEntry={showToggle && !isPasswordVisible}
          key={isPasswordVisible ? "visible" : "hidden"}
          editable={editable}
        />
        {showToggle && (
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            style={styles.iconTouchable}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons
              name={isPasswordVisible ? "eye-off" : "eye"}
              size={20}
              color="#8C8C8C"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormInput;

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    justifyContent: "space-between",
    paddingVertical: 5,
    marginVertical: 10,
  },
  label: {
    fontSize: 12,
    color: "#000",
    fontWeight: "400",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  txtInput: {
    color: "#000",
    fontSize: 13,
    paddingVertical: Platform.OS === "android" ? 2 : 0, // Ensures alignment
  },
  iconTouchable: {
    padding: 10,
  },
});
