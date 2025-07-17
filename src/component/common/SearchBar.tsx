import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  TextInputProps,
} from "react-native";
import Icons from "../../styles/icons";

interface SearchBarProps extends TextInputProps {
  value: string;
  onChangeText?: (text: string) => void;
  onSearchIconPress?: () => void; // <-- Add this prop to handle the icon press
  editable?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  onSearchIconPress, // we’ll call this when the glass icon is pressed
  editable = true,
  ...textInputProps
}) => {
  return (
    <View style={styles.txtContainer}>
      <TextInput
        style={styles.txt}
        placeholder="Search ..."
        placeholderTextColor={"#AEB4B7"}
        value={value}
        onChangeText={onChangeText}
        editable={editable}
        {...textInputProps}
      />

      {/* Wrap the icon in a TouchableOpacity to detect presses */}
      <TouchableOpacity
        onPress={onSearchIconPress}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Icons.Search />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  txtContainer: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#FF0000",
    height: 55,
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 15,
  },
  txt: {
    height: 55,
    width: "90%",
    fontSize: 13,
    fontWeight: "600",
    color: "#000",
  },
});
