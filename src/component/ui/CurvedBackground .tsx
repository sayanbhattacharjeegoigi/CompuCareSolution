import { responsive } from "@/hooks/resposive";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
interface CurvedShapeProps {
  title: string;
  handeleBackButtonPrees: () => void;
  children?: React.ReactNode;
}

const CurvedShape: React.FC<CurvedShapeProps> = ({
  title,
  children,
  handeleBackButtonPrees,
}) => {
  return (
    <View
      style={{
        ...StyleSheet.absoluteFillObject,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View style={{ flex: 0.2, width: "100%", backgroundColor: "#fff" }}>
        <View
          style={{
            flex: 1,
            width: "100%",
            backgroundColor: "#1E3A8A",
            borderBottomLeftRadius: responsive.number(50),
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            paddingHorizontal: responsive.number(30),
          }}
        >
          <Pressable
            onPress={() => {
              handeleBackButtonPrees();
            }}
          >
            <Ionicons
              name="chevron-back-circle"
              size={30}
              color="rgba(255, 255, 255, 0.50)"
            />
          </Pressable>

          <Text style={styles.titleStyle}>{title}</Text>
        </View>
      </View>
      <View style={{ flex: 0.8, width: "100%", backgroundColor: "#1E3A8A" }}>
        <View
          style={{
            flex: 1,
            width: "100%",
            backgroundColor: "#fff",
            borderTopRightRadius: responsive.number(50),
          }}
        >
          {children}
        </View>
      </View>
    </View>
  );
};

export default CurvedShape;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  titleStyle: {
    color: "#FFF",

    textTransform: "capitalize",

    fontSize: responsive.fontSize(20),
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: responsive.fontSize(24),
    marginLeft: responsive.number(10),
  },
});
