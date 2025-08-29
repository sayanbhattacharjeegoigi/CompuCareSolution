import { responsive } from "@/hooks/resposive";
import { help_and_support } from "@/src/apis/ApiEndPoint";
import { CallApi_GET } from "@/src/apis/ApiRequest";
import CurvedShape from "@/src/component/ui/CurvedBackground ";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
interface SupportProps {
  id: number;
  heading: string;
  description: string;
}
const Support = ({ navigation }: any) => {
  const [data, setData] = useState<SupportProps>({
    id: 0,
    heading: "",
    description: "",
  });
  const fecthData = () => {
    CallApi_GET(help_and_support)
      .then((res) => {
        if (res?.status === 1) {
          setData({
            heading: res?.list?.heading,
            description: res?.list?.description,
            id: res?.list?.id,
          });
        }
      })
      .catch((error) => {
        console.log("Error fetching help and support data:", error);
      });
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fecthData();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <CurvedShape
        title="Help & Support"
        handeleBackButtonPrees={() => navigation.goBack()}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          <Text
            style={{
              fontSize: responsive.fontSize(18),
              fontWeight: "600",
              marginBottom: responsive.number(10),
              color: "#000",
            }}
          >
            {data.heading}
          </Text>
          <Text
            style={{
              fontSize: responsive.fontSize(16),
              color: "#333",
            }}
          >
            {data.description}
          </Text>
        </ScrollView>
      </CurvedShape>
    </View>
  );
};

export default Support;

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
});
