import { responsive } from "@/hooks/resposive";
import CurvedShape from "@/src/component/ui/CurvedBackground ";
import { NotificationType } from "@/src/constants/Data";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

interface Props {
  navigation: any;
  route: { params: { notification: NotificationType } };
}
const NotificationDetails: React.FC<Props> = ({ navigation, route }) => {
  const { notification } = route?.params;
  console.log(notification);

  return (
    <View style={styles.container}>
      <CurvedShape
        title="Notification Details"
        handeleBackButtonPrees={() => navigation.goBack()}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          <Text style={styles.title}>{notification?.title}</Text>

          {notification?.messages?.map((msg, index) => (
            <View key={index} style={styles.messageRow}>
              <Text style={styles.bullet}>●</Text>
              <Text style={styles.messageText}>{msg}</Text>
            </View>
          ))}
        </ScrollView>
      </CurvedShape>
    </View>
  );
};

export default NotificationDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  scrollContainer: {
    alignItems: "flex-start",
    marginTop: "12%",
    padding: responsive.number(16),
    // backgroundColor: "#fff",
    paddingBottom: "25%",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    marginBottom: 16,
  },
  messageRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  bullet: {
    fontSize: 16,
    color: "#000",
    marginRight: 8,
    lineHeight: 22,
  },
  messageText: {
    fontSize: 16,
    color: "#333",
    flex: 1,
    lineHeight: 22,
  },
});
