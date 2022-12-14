import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons, MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import Places from "../components/Places";
import ViewComplaints from "../components/ViewComplaints";
import Setting from "../components/Setting";
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
          headerStyle: { backgroundColor: "rgba(10,76,118,1)", height: 69 },
          headerTintColor: "white",
          headerTitleStyle: { fontSize: 23, fontWeight: "bold" },
          drawerLabelStyle: { marginLeft: -25, color: "white" },
          drawerActiveBackgroundColor: "black",
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
          name="View Complaint"
          component={ViewComplaints}
          options={{
            headerShown: false,
            // title: "Complaints",
            drawerIcon: ({ focused }) => (
              <MaterialCommunityIcons
                name="comment-multiple"
                size={focused ? 25 : 20}
                color={focused ? "rgba(10,76,118,1)" : "black"}
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
          name="Sign_Out"
          component={WardenTabs}
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

    // </Provider>
  );
}
