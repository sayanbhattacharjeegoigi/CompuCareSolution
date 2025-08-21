import { responsive } from "@/hooks/resposive";
import LoaderIndicator from "@/src/component/common/LoaderIndicator";
import { fetchUserDetails } from "@/src/redux/slice/authSlice";
import { Routes } from "@/src/utils/Routes";
import React, { useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";

const Home = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: any) => state.auth);
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      const user = await dispatch(fetchUserDetails() as any);
      if (
        !user?.city ||
        !user?.state ||
        !user?.country ||
        !user?.zip_code ||
        !user?.phoneNumber
      ) {
        Toast.show({
          visibilityTime: 2000,
          type: "info",
          text1: "Please complete your profile",
          text2:
            "You need to fill in your contact information before proceeding.",
          onHide: () => {
            navigation.navigate(Routes.ContactInformation);
          },
        });
      }
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={[styles.container, { backgroundColor: "#1E3A8A" }]}>
      <LoaderIndicator isLoading={loading} />
      <View
        style={[
          styles.container,
          {
            borderBottomLeftRadius: responsive.number(60),
            borderTopRightRadius: responsive.number(60),
          },
        ]}
      >
        {/* <Button
          btnText="Add New Service"
          color="#1E3A8A"
          txtColor="#fff"
          onPress={() => {
            navigation.navigate(Routes.Stack, {
              screen: Routes.RepairFlow,
            });
          }}
        /> */}
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Top greeting and button */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate(Routes.RepairFlow);
              }}
            >
              <Text style={styles.buttonText}>Add New Request</Text>
            </TouchableOpacity>
          </View>

          {/* Cards section */}
          <View style={styles.cardsRow}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Service Request</Text>
              <Text style={styles.cardNumber}>1</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Notification</Text>
              <Text style={styles.cardNumber}>0</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  scrollContainer: {
    width: "100%",
    paddingHorizontal: responsive.number(20),
    marginTop: responsive.number(20),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: responsive.number(24),
  },
  greeting: {
    fontSize: responsive.fontSize(16),
    color: "#18B0A5",
    fontWeight: "500",
  },
  button: {
    backgroundColor: "#233B95",
    paddingVertical: responsive.number(20),
    paddingHorizontal: responsive.number(14),
    borderRadius: responsive.number(8),
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  cardsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: responsive.number(32),
  },
  card: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: responsive.number(10),
    padding: responsive.number(16),
    marginHorizontal: responsive.number(4),
    backgroundColor: "#f9f9f9",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: responsive.fontSize(16),
    fontWeight: "500",
    marginBottom: responsive.number(8),
  },
  cardNumber: {
    fontSize: responsive.fontSize(22),
    fontWeight: "700",
    color: "#233B95",
  },
  sideMenu: {
    borderTopWidth: 1,
    borderColor: "#eee",
    paddingTop: responsive.number(16),
  },
  menuItem: {
    paddingVertical: responsive.number(10),
  },
  menuText: {
    fontSize: responsive.fontSize(15),
    color: "#333",
  },
});
