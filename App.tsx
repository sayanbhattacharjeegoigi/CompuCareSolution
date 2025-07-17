import React from "react";
import { View } from "react-native";
import AppNavigator from "./src/navigation/AppNavigation";

export default function App() {
  return (
    <View style={{ flex: 1, backgroundColor: "#1E3A8A" }}>
      {/* View under status bar to set background color */}

      {/* <StatusBar
          translucent
          barStyle={
            Platform.OS === "android" ? "light-content" : "dark-content"
          }
        /> */}
      <AppNavigator />
    </View>
  );
}
