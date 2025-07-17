import { responsive } from "@/hooks/resposive";
import { requestDetails } from "@/src/constants/Data";
import { Routes } from "@/src/utils/Routes";
import AntDesign from "@expo/vector-icons/AntDesign";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

type ServiceScreenProps = {
  navigation: NativeStackNavigationProp<any>;
};

const Service = ({ navigation }: ServiceScreenProps) => {
  type RequestDetail = typeof requestDetails extends (infer U)[] ? U : never;

  const renderItem = ({
    item,
    index,
  }: {
    item: RequestDetail;
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
          <Text>{item?.serviceRequestId}</Text>
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
              navigation.navigate(Routes.ServiceRequestDetails, { item });
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
            <Text>Pending</Text>
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
        <View
          style={{
            flex: 1,
            width: "100%",
            paddingHorizontal: responsive.number(30),
            paddingVertical: responsive.number(30),
            // backgroundColor: "red",
          }}
        >
          <FlatList
            data={requestDetails}
            renderItem={renderItem}
            contentContainerStyle={{ gap: responsive.number(20) }}
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
