import { responsive } from "@/hooks/resposive";
import { dummyNotifications } from "@/src/constants/Data";
import { Routes } from "@/src/utils/Routes";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Notification = ({ navigation }: any) => {
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
        <FlatList
          data={dummyNotifications}
          style={{ marginTop: responsive.number(40) }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(Routes.NotificationDetails, {
                  notification: item,
                });
              }}
              style={styles.notificationCard}
            >
              <View style={styles.iconContainer}>
                <Ionicons name="notifications" size={20} color="#1E3A8A" />
              </View>
              <Text style={styles.notificationTitle}>{item.title}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },

  scrollContainer: {
    padding: responsive.number(16),
  },

  notificationCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: responsive.number(12),
    marginBottom: responsive.number(12),
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    paddingVertical: responsive.number(12),
    paddingHorizontal: responsive.number(16),
  },

  iconContainer: {
    backgroundColor: "#11BFB6", // teal background for icon
    borderRadius: responsive.number(10),
    padding: responsive.number(8),
    marginRight: responsive.number(12),
    justifyContent: "center",
    alignItems: "center",
  },

  notificationTitle: {
    fontSize: responsive.fontSize(16),
    fontWeight: "600",
    color: "#000",
    flexShrink: 1,
  },

  tabBarContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: responsive.number(12),
    backgroundColor: "#1C3886", // dark blue
    borderTopLeftRadius: responsive.number(40),
    borderTopRightRadius: responsive.number(40),
  },

  tabItem: {
    alignItems: "center",
    justifyContent: "center",
  },

  activeTab: {
    backgroundColor: "#11BFB6",
    borderRadius: responsive.number(16),
    paddingHorizontal: responsive.number(16),
    paddingVertical: responsive.number(6),
    flexDirection: "row",
    alignItems: "center",
  },

  activeTabText: {
    color: "#1C3886",
    fontWeight: "bold",
    marginLeft: responsive.number(6),
  },

  tabText: {
    color: "#11BFB6",
    marginTop: responsive.number(4),
    fontSize: responsive.fontSize(12),
  },
});
