import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "../screens/WelcomeScreen";
import Register from "../screens/Register";
import Login from "../screens/Login";
import WardenDrawer from "./WardenDrawer";
import CitizenDrawer from "./CitizenDrawer";
import AdminDrawer from "./AdminDrawer";

const Stack = createNativeStackNavigator();

export default function MainStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="WelcomeScreen"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" component={Login} />

        <Stack.Screen name="WardenDrawer" component={WardenDrawer} />
        <Stack.Screen name="CitizenDrawer" component={CitizenDrawer} />
        <Stack.Screen name="AdminDrawer" component={AdminDrawer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
