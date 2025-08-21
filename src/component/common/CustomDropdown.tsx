import { responsive } from "@/hooks/resposive";
import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface Item {
  label: string;
  value: string | number;
}

interface Props {
  items: Item[];
  selectedValue: string | number | null;
  onValueChange: (value: string | number) => void;
  placeholder?: string;
  label?: string;
  mandetory?: boolean;
}

const CustomDropdown: React.FC<Props> = ({
  items,
  selectedValue,
  onValueChange,
  placeholder = "Select",
  label = "",
  mandetory = false,
}) => {
  const [visible, setVisible] = useState(false);

  const selectedLabel =
    items.find((item) => item.value === selectedValue)?.label || placeholder;

  return (
    <View style={{}}>
      {label ? (
        <Text allowFontScaling={false} style={styles.label}>
          {label}{" "}
          {mandetory ? <Text style={{ color: "#FF0000" }}>*</Text> : null}
        </Text>
      ) : null}
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setVisible(true)}
      >
        <Text allowFontScaling={false} style={styles.dropdownText}>
          {selectedLabel}
        </Text>
        <AntDesign name="down" size={16} color="#555" />
      </TouchableOpacity>

      <Modal visible={visible} transparent animationType="fade">
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setVisible(false)}
        >
          <View style={styles.modalContent}>
            <FlatList
              data={items}
              keyExtractor={(item) => item.value.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => {
                    onValueChange(item.value);
                    setVisible(false);
                  }}
                >
                  <Text allowFontScaling={false} style={styles.optionText}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: responsive.fontSize(16),
    fontWeight: "600",
    marginTop: responsive.number(20),
    marginBottom: responsive.number(8),
    color: "#333",
  },
  dropdown: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: responsive.number(8),
    padding: responsive.number(10),
    backgroundColor: "#fff",
  },
  dropdownText: {
    fontSize: 14,
    color: "#333",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 8,
    maxHeight: 300,
  },
  option: {
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
});

export default CustomDropdown;
