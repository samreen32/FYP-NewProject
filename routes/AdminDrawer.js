import { React } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons, AntDesign, Feather } from "@expo/vector-icons";
import Places from "../components/Places";
import HandleComplaints from "../components/HandleComplaints";
import AdminSetting from "../components/AdminSetting";
import Admin_Logout from "../components/Admin_Logout";
import AdminTabs from "./AdminTabs";
import CustomDrawer from "../routes/CustomeDrawer";
import Guidelines from "../components/Guidelines";
import RemoveWarden from "../components/RemoveWarden";

const Drawer = createDrawerNavigator();

export default function AdminDrawer() {
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
        component={AdminTabs}
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
        name="Add Guidelines"
        component={Guidelines}
        options={{
          title: "Add Guidelines",
          onPress: () => setIsAddingRule(true),
          drawerIcon: ({ focused }) => (
            <Ionicons
              name="ios-remove-circle-outline"
              size={focused ? 25 : 20}
              color={focused ? "rgba(10,76,118,1)" : "black"}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Remove Warden"
        component={RemoveWarden}
        options={{
          title: "Remove Warden",
          drawerIcon: ({ focused }) => (
            <Feather
              name="user-minus"
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
        name="Handle Complaint"
        component={HandleComplaints}
        options={{
          headerShown: false,
          drawerIcon: ({ focused }) => (
            <AntDesign
              name="customerservice"
              size={focused ? 25 : 20}
              color={focused ? "rgba(10,76,118,1)" : "black"}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="AdminSetting"
        component={AdminSetting}
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
        name="Admin_Logout"
        component={Admin_Logout}
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
