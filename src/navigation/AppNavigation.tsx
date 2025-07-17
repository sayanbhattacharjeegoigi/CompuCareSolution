import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Tabs from ".";
import screens from "../screens";
import { Routes } from "../utils/Routes";

const Stack = createNativeStackNavigator();
// Define your stack navigator screens
const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={Routes.LogIn}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={Routes.LogIn} component={screens.Login} />
      <Stack.Screen
        name={Routes.Registration}
        component={screens.Registration}
      />
      <Stack.Screen
        name={Routes.ServiceRequestDetails}
        component={screens.ServiceRequestDetails}
      />
      <Stack.Screen
        name={Routes.NotificationDetails}
        component={screens.NotificationDetails}
      />
      <Stack.Screen
        name={Routes.RepairFlow}
        component={screens.RepairFlowScreen}
      />
      <Stack.Screen
        name={Routes.ScheduleServiceScreen}
        component={screens.ScheduleServiceScreen}
      />
      <Stack.Screen
        name={Routes.ScheduleScreen}
        component={screens.ScheduleScreen}
      />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={Routes.Stack}>
        {/* Stack screens */}
        <Stack.Screen
          name={Routes.Tab}
          component={Tabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={Routes.Stack}
          component={StackNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
