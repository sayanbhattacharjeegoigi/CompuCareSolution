import React from "react";
import { Platform, StatusBar, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AppNavigator from "./src/navigation/AppNavigation";

export default function App() {
  return (
    <GestureHandlerRootView>
      <View style={{ flex: 1, backgroundColor: "#1E3A8A" }}>
        {/* View under status bar to set background color */}

        <StatusBar
          translucent
          barStyle={
            Platform.OS === "android" ? "light-content" : "dark-content"
          }
        />
        <AppNavigator />
      </View>
    </GestureHandlerRootView>
  );
}
