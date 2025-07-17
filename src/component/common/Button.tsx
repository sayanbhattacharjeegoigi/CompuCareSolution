import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
} from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  btnText: string;
  onPress: () => void;
  color: string;
  txtColor: string;
}

const Button: React.FC<ButtonProps> = ({
  btnText,
  onPress,
  color,
  txtColor,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.btnContainer,
        {
          backgroundColor: color,
        },
      ]}
      {...props}
      onPress={onPress}
    >
      <Text style={{ color: txtColor, fontSize: 13, fontWeight: "600" }}>
        {btnText}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  btnContainer: {
    width: "100%",
    height: 45,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});
