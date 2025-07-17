import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
type LoaderIndicatorProps = {
  isLoading: boolean;
};
const LoaderIndicator: React.FC<LoaderIndicatorProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#FF0000" />
    </View>
  );
};

export default LoaderIndicator;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
  },
});
