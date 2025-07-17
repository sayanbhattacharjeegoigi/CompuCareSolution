import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tabs from ".";
import screens from "../screens";
import { Routes } from "../utils/Routes";
const RootStack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {/* Auth Screens */}
        <RootStack.Screen name={Routes.LogIn} component={screens.Login} />
        <RootStack.Screen
          name={Routes.Registration}
          component={screens.Registration}
        />

        {/* Main App Screens */}
        <RootStack.Screen name={Routes.Tab} component={Tabs} />
        <RootStack.Screen
          name={Routes.ServiceRequestDetails}
          component={screens.ServiceRequestDetails as React.ComponentType<any>}
        />
        <RootStack.Screen
          name={Routes.NotificationDetails}
          component={screens.NotificationDetails as React.ComponentType<any>}
        />
        <RootStack.Screen
          name={Routes.RepairFlow}
          component={screens.RepairFlowScreen}
        />
        <RootStack.Screen
          name={Routes.ScheduleServiceScreen}
          component={screens.ScheduleServiceScreen}
        />
        <RootStack.Screen
          name={Routes.ScheduleScreen}
          component={screens.ScheduleScreen}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
export default AppNavigator;
