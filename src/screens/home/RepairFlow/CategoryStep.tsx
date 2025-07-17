import { responsive } from "@/hooks/resposive";
import CurvedShape from "@/src/component/ui/CurvedBackground ";
import { useNavigation } from "@react-navigation/native";

import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const categories = [
  { label: "Computer", image: require("@/assets/images/computer.png") },
  { label: "Laptop", image: require("@/assets/images/laptop.png") },
  {
    label: "Laptop Screen",
    image: require("@/assets/images/laptop_screen.png"),
  },
];
type CategoryStepProps = {
  onNext: (selectedCategory: string) => void;
};
const CategoryStep = ({ onNext }: CategoryStepProps) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <CurvedShape
        title="Select Repair Category"
        handeleBackButtonPrees={() => {
          navigation.goBack();
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          <Text style={styles.title}>Please Choose Device</Text>
          <Text style={styles.highlight}>Category</Text>
          <View style={styles.grid}>
            {categories.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.card}
                onPress={() => onNext(item.label)}
              >
                <Image
                  source={item.image}
                  style={styles.icon}
                  resizeMode="contain"
                />
                <Text style={styles.label}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </CurvedShape>
    </View>
  );
};

export default CategoryStep;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContainer: {
    marginTop: "8%",
    padding: responsive.number(16),
    // backgroundColor: "#fff",
    paddingBottom: "25%",
  },
  title: {
    fontSize: responsive.fontSize(18),
    fontWeight: "600",
  },
  highlight: {
    fontSize: responsive.fontSize(18),
    fontWeight: "700",
    color: "#18B0A5",
    marginBottom: responsive.number(20),
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "47%",
    borderWidth: 1,
    borderColor: "#888",
    borderRadius: responsive.number(10),
    padding: responsive.number(12),
    alignItems: "center",
    marginBottom: responsive.number(16),
  },
  icon: {
    width: responsive.number(60),
    height: responsive.number(60),
  },
  label: {
    fontSize: responsive.fontSize(14),
    marginTop: responsive.number(10),
  },
});
