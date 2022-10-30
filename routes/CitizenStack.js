import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CitizenScreen from "../screens/CitizenScreen";
import Places from "../components/Places";
import Notifications from "../components/Notifications";
import PayChallan from "../components/PayChallan";
import PayChaSecond from "../components/PayChaSecond";
import CameraComponent from "../components/CameraComponent";
import Search from "../components/Search";
import Help from "../components/Help";
import FileComplaint from "../components/FileComplaint";
import ChallanHistory from "../components/ChallanHistory";
import Profile from "../components/Profile";
import CitizenEditProfile from "../components/CitizenEditProfile";
import Rules from "../components/Rules";
import Setting from "../components/Setting";

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
        name="Profile"
        component={Profile}
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
