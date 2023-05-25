import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AdminScreen from "../screens/AdminScreen";
import Places_Admin from "../components/Places_Admin";
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
import Admin_AppStatistics from "../components/Admin_AppStatistics";

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
        name="Places_Admin"
        component={Places_Admin}
        options={{
          headerShown: false,
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
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AdminSearch"
        component={AdminSearch}
        options={{
          headerShown: false,
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
        name="Admin_AppStatistics"
        component={Admin_AppStatistics}
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
