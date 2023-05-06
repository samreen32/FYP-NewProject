import { React } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  Ionicons,
  FontAwesome,
  Entypo,
  FontAwesome5,
} from "@expo/vector-icons";
import Places from "../components/Places";
import FileComplaint from "../components/FileComplaint";
import CitizenSetting from "../components/CitizenSetting";
import Help from "../components/Help";
import CitizenTabs from "./CitizenTabs";
import CustomDrawer from "../routes/CustomeDrawer";
import Citizen_Logout from "../components/Citizen_Logout";
import Citizen_AddMotors from "../components/Citizen_AddMotors";

const Drawer = createDrawerNavigator();

export default function CitizenDrawer() {
  return (
    <Drawer.Navigator
      useLegacyImplementation
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        drawerType: "slide",
        drawerPosition: "left",
        drawerHideStatusBarOnOpen: true,
        drawerStyle: { backgroundColor: "rgba(24,154,180,1)", width: 300 },
        headerShown: false,
        swipeEnabled: true,
        gestureEnabled: true,
        headerStyle: { backgroundColor: "rgba(10,76,118,1)", height: 69 },
        headerTintColor: "white",
        headerTitleStyle: { fontSize: 23, fontWeight: "bold" },
        drawerLabelStyle: { marginLeft: -25, color: "white" },
        drawerActiveBackgroundColor: "black",
        draweractiveTintColor: "red",
      }}
    >
      <Drawer.Screen
        name="Dashboard"
        component={CitizenTabs}
        options={{
          title: "Dashboard",
          drawerIcon: ({ focused }) => (
            <Ionicons
              name="person"
              size={focused ? 25 : 20}
              color={focused ? "rgba(10,76,118,1)" : "black"}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Places"
        component={Places}
        options={{
          headerShown: true,
          title: "Your location",
          drawerIcon: ({ focused }) => (
            <Ionicons
              name="location"
              size={focused ? 25 : 20}
              color={focused ? "rgba(10,76,118,1)" : "black"}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="File Complaint"
        component={FileComplaint}
        options={{
          headerShown: false,
          drawerIcon: ({ focused }) => (
            <Entypo
              name="emoji-sad"
              size={focused ? 25 : 20}
              color={focused ? "rgba(10,76,118,1)" : "black"}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Citizen_AddMotors"
        component={Citizen_AddMotors}
        options={{
          headerShown: false,
          title: "Add Motors",
          drawerIcon: ({ focused }) => (
            <FontAwesome5
              name="car"
              size={focused ? 25 : 20}
              color={focused ? "rgba(10,76,118,1)" : "black"}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="CitizenSetting"
        component={CitizenSetting}
        options={{
          headerShown: false,
          title: "Setting",
          drawerIcon: ({ focused }) => (
            <Ionicons
              name="settings"
              size={focused ? 25 : 20}
              color={focused ? "rgba(10,76,118,1)" : "black"}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Help"
        component={Help}
        options={{
          headerShown: false,
          title: "Help",
          drawerIcon: ({ focused }) => (
            <FontAwesome
              name="question"
              size={focused ? 25 : 20}
              color={focused ? "rgba(10,76,118,1)" : "black"}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Citizen_Logout"
        component={Citizen_Logout}
        options={{
          headerShown: false,
          title: "Sign Out",
          drawerIcon: ({ focused }) => (
            <Ionicons
              name="log-out"
              size={focused ? 25 : 20}
              color={focused ? "rgba(10,76,118,1)" : "black"}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
