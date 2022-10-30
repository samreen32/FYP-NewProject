import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import Places from "../components/Places";
import ViewComplaints from "../components/ViewComplaints";
import Setting from "../components/Setting";
import Sign_Out from "../components/Sign_Out";
import Help from "../components/Help";
import WardenTabs from "./WardenTabs";
import CustomDrawer from "./CustomeDrawer";

const Drawer = createDrawerNavigator();

export default function WardenDrawer() {
  return (
    // <Provider store={store}>
 
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawer {...props} />}
        screenOptions={{
          drawerType: "slide",
          drawerPosition: "left",
          drawerHideStatusBarOnOpen: true,
          drawerStyle: { backgroundColor: "rgba(24,154,180,1)", width: 300 },
          headerShown: false,
          swipeEnabled: true,
          gestureEnabled: true,
          headerStyle: { backgroundColor: "#F0FFFF", height: 60 },
          headerTintColor: "black",
          headerTitleStyle: { fontSize: 23, fontWeight: "bold" },
          drawerLabelStyle: { marginLeft: -25 },
          drawerActiveBackgroundColor: "#FAEBD7",
          draweractiveTintColor: "red",
        }}
      >
        <Drawer.Screen
          name="Profile"
          component={WardenTabs}
          options={{
            title: "Profile",
            drawerIcon: ({ focused }) => (
              <Ionicons
                name="alarm"
                size={focused ? 25 : 20}
                color={focused ? "yellow" : "orange"}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Places"
          component={Places}
          options={{
            headerShown: true,
            title: "Current location",
            drawerIcon: ({ focused }) => (
              <Ionicons
                name="alarm"
                size={focused ? 25 : 20}
                color={focused ? "yellow" : "orange"}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="View Complaint"
          component={ViewComplaints}
          options={{
            headerShown: false,
            // title: "Complaints",
            drawerIcon: ({ focused }) => (
              <Ionicons
                name="alarm"
                size={focused ? 25 : 20}
                color={focused ? "yellow" : "orange"}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Setting"
          component={Setting}
          options={{
            headerShown: false,
            title: "Setting",
            drawerIcon: ({ focused }) => (
              <Ionicons
                name="alarm"
                size={focused ? 25 : 20}
                color={focused ? "yellow" : "orange"}
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
              <Ionicons
                name="alarm"
                size={focused ? 25 : 20}
                color={focused ? "yellow" : "orange"}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Sign_Out"
          component={Sign_Out}
          options={{
            headerShown: false,
            title: "Sign Out",
            drawerIcon: ({ focused }) => (
              <Ionicons
                name="alarm"
                size={focused ? 25 : 20}
                color={focused ? "yellow" : "orange"}
              />
            ),
          }}
        />
      </Drawer.Navigator>

    // </Provider>
  );
}
