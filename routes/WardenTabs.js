import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Challan from "../components/Challan";
import Profile from "../components/Profile";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, View } from "react-native";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
// import WardenScreen from "../screens/WardenScreen";
import StackWarden from "./StackWarden";

const Tab = createBottomTabNavigator();

export default function WardenTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size, color, fontsize }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = "home";

            size = focused ? 35 : 30;
            color = focused ? "yellow" : "black";
          } else if (route.name === "Profile") {
            iconName = "person";

            size = focused ? 35 : 30;
            color = focused ? "yellow" : "black";
          } else if (route.name === "Print_Challan") {
            iconName = "print-outline";

            size = focused ? 35 : 30;
            color = focused ? "yellow" : "black";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },

        tabBarLabelStyle: {
          fontSize: 15,
          marginTop: -20,
          marginBottom: 15,
        },
        tabBarStyle: {
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
          backgroundColor: "rgba(33,182,168,1)",
          height: 80,
          ...styles.shadow,
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={StackWarden}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Add Challan"
        component={Challan}
        options={{ headerShown: false }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({});
