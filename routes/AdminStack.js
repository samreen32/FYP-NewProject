import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AdminScreen from "../screens/AdminScreen";
import Places from "../components/Places";
import Notifications from "../components/Notifications";
import CameraComponent from "../components/CameraComponent";
import Search from "../components/Search";
import Help from "../components/Help";
import HandleComplaints from "../components/HandleComplaints";
import ManageChallan from "../components/ManageChallan";
import RemoveWarden from "../components/RemoveWarden";
import ChallanHistory from "../components/ChallanHistory";
import AdminProfile from "../components/AdminProfile";
import AdminEditProfile from "../components/AdminEditProfile";
import Rules from "../components/Rules";
import Setting from "../components/Setting";

const Stack = createNativeStackNavigator();

export default function AdminStack() {
  return (
    <Stack.Navigator
      initialRouteName="CitizenScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="CitizenScreen" component={AdminScreen} />
      <Stack.Screen
        name="Places"
        component={Places}
        options={{
          headerShown: true,
          title: "Current Loaction",
        }}
      />
      <Stack.Screen
        name="Notifications"
        component={Notifications}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="HandleComplaints"
        component={HandleComplaints}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ManageChallan"
        component={ManageChallan}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ChallanHistory"
        component={ChallanHistory}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="RemoveWarden"
        component={RemoveWarden}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CameraComponent"
        component={CameraComponent}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="AdminProfile"
        component={AdminProfile}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AdminEditProfile"
        component={AdminEditProfile}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Setting"
        component={Setting}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Rules"
        component={Rules}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Help"
        component={Help}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
