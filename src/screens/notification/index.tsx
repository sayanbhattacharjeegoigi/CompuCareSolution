import { responsive } from "@/hooks/resposive";
import { notification_list } from "@/src/apis/ApiEndPoint";
import { CallApi_GET } from "@/src/apis/ApiRequest";
import LoaderIndicator from "@/src/component/common/LoaderIndicator";
import { notificationListType } from "@/src/constants/Data";
import { showToast } from "@/src/utils/toastUtils";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";

const Notification = ({ navigation }: any) => {
  const { userDetails } = useSelector((state: any) => state.auth);
  const [notificationList, setNotificationList] = useState<
    notificationListType[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const getServiceList = async (fromRefresh = false) => {
    if (fromRefresh) {
      setRefreshing(true);
    } else {
      setIsLoading(true);
    }

    try {
      const res = await CallApi_GET(notification_list + userDetails?.userId);
      if (res?.status) {
        const uniqueList: notificationListType[] = res?.list?.filter(
          (
            item: notificationListType,
            index: number,
            self: notificationListType[]
          ) =>
            index ===
            self.findIndex((t: notificationListType) => t.id === item.id)
        );
        setNotificationList(uniqueList);
      } else {
        showToast({ type: "error", text1: res?.error });
      }
    } catch (error) {
      console.log("Notification Fetch Error:", error);
      showToast({ type: "error", text1: "Failed to fetch notifications" });
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getServiceList();
    });

    return unsubscribe;
  }, [navigation]);

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
        <LoaderIndicator isLoading={isLoading} />
        <View
          style={{
            flex: 1,
            width: "100%",
            paddingHorizontal: responsive.number(30),
            paddingVertical: responsive.number(30),
          }}
        >
          <FlatList
            data={notificationList}
            style={{ marginTop: responsive.number(10) }}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => getServiceList(true)}
                colors={["#11BFB6"]}
                tintColor="#11BFB6"
              />
            }
            renderItem={({ item }) => (
              <TouchableOpacity
                // onPress={() => {
                //   navigation.navigate(Routes.NotificationDetails, {
                //     notification: item,
                //   });
                // }}
                style={styles.notificationCard}
              >
                <View style={styles.iconContainer}>
                  <Ionicons name="notifications" size={20} color="#1E3A8A" />
                </View>
                <Text style={styles.notificationTitle}>
                  {item?.message?.trim() || "No message available."}
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item?.id?.toString()}
            ListEmptyComponent={
              !isLoading ? (
                <Text style={{ textAlign: "center", marginTop: 20 }}>
                  No notifications available.
                </Text>
              ) : null
            }
          />
        </View>
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

  notificationCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
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
    backgroundColor: "#11BFB6",
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
    flex: 1,
    flexWrap: "wrap",
  },
});
