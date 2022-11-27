import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WardenScreen from "../screens/WardenScreen";   //stack
import Challan from "../components/Challan";
import ChallanSecond from "../components/ChallanSecond";
import Places from "../components/Places";
import Notifications from "../components/Notifications";
import CameraComponent from "../components/CameraComponent";
import Search from "../components/Search";
import Help from "../components/Help";
import ViewComplaints from "../components/ViewComplaints";
import ChallanHistory from "../components/ChallanHistory";
import Statistics from "../components/Statistics";
import WardenProfile from "../components/WardenProfile";
import EditProfile from "../components/editProfile";
import Rules from "../components/Rules";
import Setting from "../components/Setting";


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
          headerShown: true,
          title: "Your Loaction",
          headerTintColor: 'white',
          headerStyle: {backgroundColor: "rgba(10,76,118,1)"}
        }}
       
      />
      <Stack.Screen
        name="Notifications"
        component={Notifications}
        options={{
          headerShown: true,
          headerTintColor: 'white',
          headerStyle: {backgroundColor: "rgba(10,76,118,1)"}
        }}
      />
      
      <Stack.Screen
        name="Challan"
        component={Challan}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ChallanSecond"
        component={ChallanSecond}
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
        name="CameraComponent"
        component={CameraComponent}
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
        name="Search"
        component={Search}
        options={{
          headerShown: true,
          headerTintColor: 'white',
          headerStyle: {backgroundColor: "rgba(10,76,118,1)"}
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
        name="WardenProfile"
        component={WardenProfile}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="editProfile"
        component={EditProfile}
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
       
    </Stack.Navigator>
  );
}
