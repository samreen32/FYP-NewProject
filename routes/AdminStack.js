import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AdminScreen from "../screens/AdminScreen";
import Places from "../components/Places";
import HandleComplaints from "../components/HandleComplaints";
import ManageChallan from "../components/ManageChallan";
import RemoveWarden from "../components/RemoveWarden";
import ChallanHistory from "../components/ChallanHistory";
import AdminProfile from "../components/AdminProfile";
import AdminEditProfile from "../components/AdminEditProfile";
import Guidelines from "../components/Guidelines";
import AdminSetting from "../components/AdminSetting";
import AdminSearch from "../components/AdminSearch";
import Admin_Notifications from "../components/Admin_Notifications";
import Admin_ChangePassword from "../components/Admin_ChangePassword";

const Stack = createNativeStackNavigator();

export default function AdminStack() {
  return (
    <Stack.Navigator
      initialRouteName="AdminScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="AdminScreen" component={AdminScreen} />
      <Stack.Screen
        name="Places"
        component={Places}
        options={{
          headerShown: true,
          title: "Your Loaction",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "rgba(10,76,118,1)" },
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
        name="Admin_Notifications"
        component={Admin_Notifications}
        options={{
          headerShown: true,
          headerTintColor: "white",
          headerStyle: { backgroundColor: "rgba(10,76,118,1)" },
          headerTitle: "Notifications",
        }}
      />
      <Stack.Screen
        name="AdminSearch"
        component={AdminSearch}
        options={{
          headerShown: true,
          headerTintColor: "white",
          headerStyle: { backgroundColor: "rgba(10,76,118,1)" },
          headerTitle: "Search",
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
        name="Admin_ChangePassword"
        component={Admin_ChangePassword}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AdminSetting"
        component={AdminSetting}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Guidelines"
        component={Guidelines}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}