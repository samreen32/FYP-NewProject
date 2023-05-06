import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AdminProfile from "../components/AdminProfile";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet } from "react-native";
import AdminStack from "./AdminStack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

export default function AdminTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size, color, fontsize }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = "home";
            size = focused ? 35 : 30;
            color = focused ? "rgba(24,154,180,1)" : "black";
          } else if (route.name === "Profile") {
            iconName = "person";
            size = focused ? 30 : 32;
            color = focused ? "black" : "black";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={AdminStack}
        options={({ route }) => ({
          tabBarStyle: {
            display: getRouteName(route),
            position: "absolute",
            marginBottom: 10,
            bottom: 5,
            left: 15,
            right: 15,
            borderBottomLeftRadius: 60,
            borderTopLeftRadius: 60,
            borderBottomRightRadius: 60,
            borderTopRightRadius: 60,
            elevation: 0,
            backgroundColor: "rgba(10,76,118,1)",
            height: 80,
            ...styles.shadow,
          },
          tabBarLabelStyle: {
            fontSize: 15,
            marginTop: -2,
            marginBottom: 15,
            color: "white",
          },
          headerShown: false,
        })}
      />
      <Tab.Screen
        name="Profile"
        component={AdminProfile}
        options={{
          tabBarStyle: { display: "none" },
          headerShown: false,
          tabBarLabelStyle: {
            fontSize: 15,
            marginTop: -2,
            marginBottom: 15,
            color: "white",
          },
        }}
      />
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({});
 
const getRouteName = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route);
  if (
    routeName?.includes("AdminProfile") ||
    routeName?.includes("AdminEditProfile") ||
    routeName?.includes("Admin_Notifications") ||
    routeName?.includes("HandleComplaints") ||
    routeName?.includes("RemoveWarden") ||
    routeName?.includes("ManageChallan") ||
    routeName?.includes("Admin_ChangePassword") ||
    routeName?.includes("Places") ||
    routeName?.includes("AdminSetting") ||
    routeName?.includes("AdminSearch") ||
    routeName?.includes("Guidelines") 
  ) {
    return "none";
  }
  return "flex";
};
