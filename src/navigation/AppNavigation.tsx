import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store/Store";

import Tabs from ".";
import { loadUserFromStorage } from "../redux/slice/authSlice";
import screens from "../screens";
import { Routes } from "../utils/Routes";

const RootStack = createNativeStackNavigator();

const AppNavigator = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state: RootState) => state.auth);
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    const load = async () => {
      await dispatch(loadUserFromStorage() as any);
      setAppReady(true);
    };
    load();
  }, [dispatch]);

  // if (!appReady || loading) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  //       <ActivityIndicator size="large" />
  //     </View>
  //   );
  // }

  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={user ? Routes.Tab : Routes.LogIn}
      >
        {user ? (
          // ✅ User is logged in, show app
          <>
            <RootStack.Screen name={Routes.Tab} component={Tabs} />
            <RootStack.Screen
              name={Routes.ServiceRequestDetails}
              component={
                screens.ServiceRequestDetails as React.ComponentType<any>
              }
            />
            <RootStack.Screen
              name={Routes.NotificationDetails}
              component={
                screens.NotificationDetails as React.ComponentType<any>
              }
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
            <RootStack.Screen
              name={Routes.PaymentScreen}
              component={screens.PaymentScreen as React.ComponentType<any>}
            />
            <RootStack.Screen
              name={Routes.PaymentResultScreen}
              component={screens.PaymentResultScreen}
            />
            <RootStack.Screen
              name={Routes.ContactInformation}
              component={screens.ContactInformation}
            />
            <RootStack.Screen
              name={Routes.Support}
              component={screens.Support}
            />
          </>
        ) : (
          // 🔒 Not logged in, show login/register
          <>
            <RootStack.Screen name={Routes.LogIn} component={screens.Login} />
            <RootStack.Screen
              name={Routes.Registration}
              component={screens.Registration}
            />
            <RootStack.Screen
              name={Routes.ForgotPassword}
              component={screens.ForgotPassword}
            />
            <RootStack.Screen
              name={Routes.ResetPassword}
              component={screens.ResetPassword}
            />
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
