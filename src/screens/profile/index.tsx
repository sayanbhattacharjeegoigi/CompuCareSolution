import { responsive } from "@/hooks/resposive";
import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const profileOptions = [
  {
    label: "Contact Information",
    icon: <Ionicons name="send" size={20} color="#fff" />,
    route: "ContactInfo",
  },
  {
    label: "Saved Addresses",
    icon: <Ionicons name="location-sharp" size={20} color="#fff" />,
    route: "SavedAddresses",
  },
  {
    label: "Payment Methods",
    icon: <FontAwesome5 name="wallet" size={20} color="#fff" />,
    route: "PaymentMethods",
  },
  {
    label: "Notification",
    icon: <Ionicons name="notifications" size={20} color="#fff" />,
    route: "Notification",
  },
  {
    label: "Help & Support",
    icon: <MaterialIcons name="support-agent" size={20} color="#fff" />,
    route: "HelpSupport",
  },
  {
    label: "Logout",
    icon: <MaterialIcons name="logout" size={20} color="#fff" />,
    route: "Logout",
  },
];
const Profile = () => {
  return (
    <View style={[styles.container, { backgroundColor: "#1E3A8A" }]}>
      <View
        style={[
          styles.container,
          {
            borderBottomLeftRadius: responsive.number(60),
            borderTopRightRadius: responsive.number(60),
          },
        ]}
      >
        <View
          style={{
            flex: 1,
            width: "100%",
            paddingHorizontal: responsive.number(30),
            paddingVertical: responsive.number(30),
            // backgroundColor: "red",
          }}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}
          >
            <View style={styles.avatarContainer}>
              <Image
                source={require("@/assets/images/user.png")} // or use any static dummy image
                style={styles.avatar}
              />
            </View>

            {profileOptions.map((item, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.optionRow}
                onPress={() => {}}
              >
                <View style={styles.iconWrapper}>{item.icon}</View>
                <Text style={styles.optionLabel}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default Profile;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    width: "100%",
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: "#11BFB6", // teal border
    backgroundColor: "#ccc",
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  iconWrapper: {
    backgroundColor: "#11BFB6",
    borderRadius: 20,
    padding: 10,
    marginRight: 16,
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
  },
});
