import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CitizenScreen from "../screens/CitizenScreen";
import Places from "../components/Places";
import Citizen_Notifications from "../components/Citizen_Notifications";
import PayChallan from "../components/PayChallan";
import PayChaSecond from "../components/PayChaSecond";
import Help from "../components/Help";
import FileComplaint from "../components/FileComplaint";
import ChallanHistory from "../components/ChallanHistory";
import CitizenProfile from "../components/CitizenProfile";
import CitizenEditProfile from "../components/CitizenEditProfile";
import CitizenSetting from "../components/CitizenSetting";
import Guidelines from "../components/Guidelines";
import FAQScreen from "../components/FAQScreen";
import AboutScreen from "../components/AboutScreen";
import ContactScreen from "../components/ContactScreen";
import Citizen_Logout from "../components/Citizen_Logout";
import CitizenSearch from "../components/CitizenSearch";
import CitizenForgotPassword from "../components/CitizenForgotPassword";
import CitizenResetPassword from "../components/CitizenResetPassword";
import Citizen_ChangePassword from "../components/Citizen_ChangePassword";
import Citizen_AddMotors from "../components/Citizen_AddMotors";
import Citizen_ViewChallanMotors from "../components/Citizen_ViewChallanMotors";
import PayChallan_CheckOut from "../components/PayChallan_CheckOut";

const Stack = createNativeStackNavigator();

export default function CitizenStack() {
  return (
    <Stack.Navigator
      initialRouteName="CitizenScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="CitizenScreen" component={CitizenScreen} />
      <Stack.Screen
        name="Places"
        component={Places}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Citizen_Notifications"
        component={Citizen_Notifications}
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
        name="PayChallan"
        component={PayChallan}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PayChaSecond"
        component={PayChaSecond}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PayChallan_CheckOut"
        component={PayChallan_CheckOut}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="FileComplaint"
        component={FileComplaint}
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
        name="CitizenSearch"
        component={CitizenSearch}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CitizenForgotPassword"
        component={CitizenForgotPassword}
      />
      <Stack.Screen
        name="CitizenResetPassword"
        component={CitizenResetPassword}
      />
      <Stack.Screen
        name="Citizen_ChangePassword"
        component={Citizen_ChangePassword}
      />
      <Stack.Screen
        name="CitizenProfile"
        component={CitizenProfile}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CitizenEditProfile"
        component={CitizenEditProfile}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CitizenSetting"
        component={CitizenSetting}
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
        name="Citizen_AddMotors"
        component={Citizen_AddMotors}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Citizen_ViewChallanMotors"
        component={Citizen_ViewChallanMotors}
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
        name="Citizen_Logout"
        component={Citizen_Logout}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
