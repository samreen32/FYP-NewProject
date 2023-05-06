import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "../screens/WelcomeScreen";
import WardenDrawer from "./WardenDrawer";
import CitizenDrawer from "./CitizenDrawer";
import AdminDrawer from "./AdminDrawer";
import ChooseView from "../screens/ChooseView";
import AdminLogin from "../views/AdminLogin";
import CitizenRegister from "../views/CitizenRegister";
import CitizenLogin from "../views/CitizenLogin";
import CitizenForgotPassword from "../components/CitizenForgotPassword";
import CitizenResetPassword from "../components/CitizenResetPassword";
import WardenRegister from "../views/WardenRegister";
import WardenLogin from "../views/WardenLogin";
import WardenForgotPassword from "../components/WardenForgotPassword";
import WardenResetPassword from "../components/WardenResetPassword";
import AdminForgotPassword from "../components/AdminForgotPassword";
import AdminResetPassword from "../components/AdminResetPassword";
import { userLogin } from "../context/AuthContext";

const Stack = createNativeStackNavigator();

export default function MainStack() {
  const { isLogIn } = userLogin();

  return (
    <Stack.Navigator
      initialRouteName="WelcomeScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      {isLogIn ? (
        <>
          <Stack.Screen name="CitizenDrawer" component={CitizenDrawer} />
          <Stack.Screen name="WardenDrawer" component={WardenDrawer} />
          <Stack.Screen name="AdminDrawer" component={AdminDrawer} />
        </>
      ) : (
        <>
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
          <Stack.Screen name="ChooseView" component={ChooseView} />
          <Stack.Screen name="WardenRegister" component={WardenRegister} />
          <Stack.Screen name="WardenLogin" component={WardenLogin} />
          <Stack.Screen
            name="WardenForgotPassword"
            component={WardenForgotPassword}
          />
          <Stack.Screen
            name="WardenResetPassword"
            component={WardenResetPassword}
          />

          <Stack.Screen name="CitizenRegister" component={CitizenRegister} />
          <Stack.Screen name="CitizenLogin" component={CitizenLogin} />
          <Stack.Screen
            name="CitizenForgotPassword"
            component={CitizenForgotPassword}
          />
          <Stack.Screen
            name="CitizenResetPassword"
            component={CitizenResetPassword}
          />

          <Stack.Screen name="AdminLogin" component={AdminLogin} />
          <Stack.Screen
            name="AdminForgotPassword"
            component={AdminForgotPassword}
          />
          <Stack.Screen
            name="AdminResetPassword"
            component={AdminResetPassword}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
