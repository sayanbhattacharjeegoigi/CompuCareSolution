import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
type LoaderIndicatorProps = {
  isLoading: boolean;
};
const LoaderIndicator: React.FC<LoaderIndicatorProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#11BFB6" />
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
