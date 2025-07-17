import React from "react";
import { StyleSheet, View, Modal, ActivityIndicator } from "react-native";
const Loader: React.FC = () => {
  return (
    <Modal transparent={true} animationType={"fade"} visible={true}>
      <View style={styles.container}>
        <ActivityIndicator size={40} color={"#FF0000"} style={styles.content} />
      </View>
    </Modal>
  );
};
export default Loader;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2E2E2E98",
  },
  content: { marginTop: -100 },
});
