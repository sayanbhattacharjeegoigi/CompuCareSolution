import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Home from "../screens/home";
import Notification from "../screens/notification";
import Profile from "../screens/profile";
import Service from "../screens/service";
import CustomTabBar from "./CustomTabBar";

import { responsive } from "@/hooks/resposive";
import AntDesign from "@expo/vector-icons/AntDesign";
import type { BottomTabHeaderProps } from "@react-navigation/bottom-tabs";
import { images } from "../constants/Icons";
import { Routes } from "../utils/Routes";
const Tab = createBottomTabNavigator();

const CustomHeader = ({ navigation, route, options }: BottomTabHeaderProps) => {
  return (
    <View
      style={{
        backgroundColor: "#fff",
      }}
    >
      <View
        style={{
          backgroundColor: "#1E3A8A",
          borderBottomLeftRadius: responsive.number(50),
          paddingHorizontal: responsive.number(30),
          paddingVertical: responsive.number(30),
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            marginTop: responsive.number(20),
          }}
        >
          <Image
            source={images.demoProfile}
            style={{
              width: responsive.number(40),
              height: undefined,
              aspectRatio: 1,
              resizeMode: "contain",
              borderWidth: 2,
              borderRadius: responsive.number(40) / 2,
              borderColor: "#20B2AA",
            }}
          />
          <View style={{ marginLeft: responsive.number(21) }}>
            <Text
              style={[styles.textStyle, { fontSize: responsive.fontSize(24) }]}
            >
              Hello Jonny,
            </Text>
            <Text
              style={[styles.textStyle, { fontSize: responsive.fontSize(18) }]}
            >
              Good morning
            </Text>
          </View>
        </View>
        <View style={{}}>
          {route?.name !== "Home" && (
            <Pressable
              onPress={() => {
                navigation.navigate(Routes.Stack, {
                  screen: Routes.RepairFlow,
                });
              }}
            >
              <AntDesign name="pluscircle" size={24} color="#20B2AA" />
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
};
export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        header: (props) => <CustomHeader {...props} />,
      })}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Service" component={Service} />
      <Tab.Screen name="Notifications" component={Notification} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    color: "#fff",
    fontWeight: "600",
  },
});
