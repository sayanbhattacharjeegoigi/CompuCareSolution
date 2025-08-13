import { responsive } from "@/hooks/resposive";
import { service_request_list } from "@/src/apis/ApiEndPoint";
import { CallApi_GET } from "@/src/apis/ApiRequest";
import LoaderIndicator from "@/src/component/common/LoaderIndicator";
import { requestDetails, serviceListType } from "@/src/constants/Data";
import { Routes } from "@/src/utils/Routes";
import { showToast } from "@/src/utils/toastUtils";
import AntDesign from "@expo/vector-icons/AntDesign";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSelector } from "react-redux";

type ServiceScreenProps = {
  navigation: NativeStackNavigationProp<any>;
};

const Service = ({ navigation }: ServiceScreenProps) => {
  type RequestDetail = typeof requestDetails extends (infer U)[] ? U : never;
  const { userDetails } = useSelector((state: any) => state.auth);

  const [serviceList, setServiceList] = useState<serviceListType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false); // ← NEW STATE

  const getServiceList = async (isRefresh = false) => {
    if (isRefresh) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }

    try {
      const res = await CallApi_GET(service_request_list + userDetails?.userId);
      if (res?.status) {
        setServiceList(res?.list);
      } else {
        showToast({ type: "error", text1: res?.error });
      }
    } catch (error) {
      console.log(error);
    } finally {
      if (isRefresh) {
        setIsRefreshing(false);
      } else {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getServiceList();
    });
    return unsubscribe;
  }, [navigation]);

  const renderItem = ({
    item,
    index,
  }: {
    item: serviceListType;
    index: number;
  }) => {
    return (
      <View
        style={{
          width: "100%",
          borderWidth: responsive.number(1.8),
          borderColor: "#20B2AA",
          borderRadius: responsive.number(15),
          padding: responsive.number(20),
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View style={{ flex: 0.7 }}>
          <Text>Service ID</Text>
          <Text>{item?.serviceBookingId}</Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Pressable
            onPress={() => {
              navigation.navigate(Routes.ServiceRequestDetails, {
                serviceId: item?.requestId,
              });
            }}
            style={{
              width: responsive.number(44),
              height: undefined,
              aspectRatio: 1,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: responsive.number(8),
              backgroundColor: "#20B2AA",
            }}
          >
            <AntDesign name="eye" size={24} color="black" />
          </Pressable>

          <View
            style={{
              backgroundColor: "#FFC107",
              height: responsive.number(44),
              paddingHorizontal: responsive.number(18),
              borderRadius: responsive.number(8),
              alignItems: "center",
              justifyContent: "center",
              marginLeft: responsive.number(15),
            }}
          >
            <Text
              style={{
                color: "#000",
                fontSize: responsive.number(16),
                fontWeight: "600",
              }}
            >
              {item?.status}
            </Text>
          </View>
        </View>
      </View>
    );
  };

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
            data={serviceList}
            renderItem={renderItem}
            keyExtractor={(item, index) => `${item.requestId}-${index}`}
            contentContainerStyle={{ gap: responsive.number(20) }}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={() => getServiceList(true)}
                colors={["#11BFB6"]}
                tintColor="#11BFB6"
              />
            }
            ListEmptyComponent={
              !isLoading ? (
                <Text style={{ textAlign: "center", marginTop: 20 }}>
                  No service booked.
                </Text>
              ) : null
            }
          />
        </View>
      </View>
    </View>
  );
};

export default Service;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
});
