import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { icons } from "../constants/Icons";
import { responsive } from "../utils/responsive";

const CustomTabBar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel || options.title || route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          if (!isFocused) {
            navigation.navigate(route.name);
          }
        };

        const renderIcon = () => {
          switch (route.name) {
            case "Home":
              return (
                <Image
                  source={icons.home}
                  style={[
                    styles.iconStyle,
                    { tintColor: isFocused ? "#2E3192" : "#00A5A5" },
                  ]}
                />
              );
            case "Service":
              return (
                <Image
                  source={icons.service}
                  style={[
                    styles.iconStyle,
                    { tintColor: isFocused ? "#2E3192" : "#00A5A5" },
                  ]}
                />
              );
            case "Notifications":
              return (
                <Image
                  source={icons.notification}
                  style={[
                    styles.iconStyle,
                    { tintColor: isFocused ? "#2E3192" : "#00A5A5" },
                  ]}
                />
              );
            case "Profile":
              return (
                <Image
                  source={icons.profile}
                  style={[
                    styles.iconStyle,
                    { tintColor: isFocused ? "#2E3192" : "#00A5A5" },
                  ]}
                />
              );
            default:
              return null;
          }
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            onPress={onPress}
            style={isFocused ? styles.activeTab : styles.tab}
          >
            {renderIcon()}
            {isFocused &&
              (typeof label === "function" ? (
                label({
                  focused: isFocused,
                  color: styles.activeLabel.color,
                  position: "below-icon",
                  children: route.name,
                })
              ) : (
                <Text style={styles.activeLabel}>{label}</Text>
              ))}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: responsive.number(100),
    borderTopWidth: 0,
    borderTopRightRadius: responsive.number(60),
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#1E3A8A",
  },
  tab: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  activeTab: {
    flexDirection: "row",
    backgroundColor: "#26B2B2",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  activeLabel: {
    color: "#2E3192",
    marginLeft: 8,
    fontWeight: "600",
    fontSize: responsive.fontSize(14),
  },
  iconStyle: {
    width: responsive.number(24),
    height: undefined,
    aspectRatio: 1,
    resizeMode: "contain",
  },
});

export default CustomTabBar;
