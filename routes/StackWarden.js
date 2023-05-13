import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WardenScreen from "../screens/WardenScreen";
import AddChallan from "../components/AddChallan";
import AddChallan_Camera from "../components/AddChallan_Camera";
import AddChallan_Details from "../components/AddChallan_Details";
import AddChallan_PrintDetails from "../components/AddChallan_PrintDetails";
import Places from "../components/Places";
import ViewComplaints from "../components/ViewComplaints";
import ChallanHistory from "../components/ChallanHistory";
import Statistics from "../components/Statistics";
import WardenProfile from "../components/WardenProfile";
import WardenEditProfile from "../components/WardenEditProfile";
import WardenSetting from "../components/WardenSetting";
import Help from "../components/Help";
import Guidelines from "../components/Guidelines";
import FAQScreen from "../components/FAQScreen";
import AboutScreen from "../components/AboutScreen";
import ContactScreen from "../components/ContactScreen";
import Warden_Notifications from "../components/Warden_Notifications";
import Warden_Logout from "../components/Warden_Logout";
import WardenSearch from "../components/WardenSearch";
import Warden_ChangePassword from "../components/Warden_ChangePassword";


const Stack = createNativeStackNavigator();

export default function StackWarden() {
  return (
    <Stack.Navigator
      initialRouteName="WardenScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="WardenScreen" component={WardenScreen} />
      <Stack.Screen
        name="Places"
        component={Places}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="AddChallan"
        component={AddChallan}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AddChallan_PrintDetails"
        component={AddChallan_PrintDetails}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AddChallan_Camera"
        component={AddChallan_Camera}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AddChallan_Details"
        component={AddChallan_Details}
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
      <Stack.Screen
        name="Help"
        component={Help}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Warden_ChangePassword"
        component={Warden_ChangePassword}
      />
      <Stack.Screen
        name="WardenSearch"
        component={WardenSearch}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ViewComplaints"
        component={ViewComplaints}
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
        name="Statistics"
        component={Statistics}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="WardenSetting"
        component={WardenSetting}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Warden_Notifications"
        component={Warden_Notifications}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="WardenProfile"
        component={WardenProfile}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="WardenEditProfile"
        component={WardenEditProfile}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="FAQScreen"
        component={FAQScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AboutScreen"
        component={AboutScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ContactScreen"
        component={ContactScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Warden_Logout"
        component={Warden_Logout}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
