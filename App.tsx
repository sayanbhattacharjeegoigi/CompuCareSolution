import React from "react";
import { View } from "react-native";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";
import AppNavigator from "./src/navigation/AppNavigation";
import { store } from "./src/redux/store/Store";
export default function App() {
  return (
    <Provider store={store}>
      <View style={{ flex: 1, backgroundColor: "#1E3A8A" }}>
        <AppNavigator />
        <Toast />
      </View>
    </Provider>
  );
}
