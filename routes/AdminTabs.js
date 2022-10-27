import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PayChallan from "../components/PayChallan";
import Profile from "../components/Profile";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet } from "react-native";
import AdminStack from "./AdminStack";

const Tab = createBottomTabNavigator();

export default function CitizenTabs() {
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
          left: 20,
          right: 20,
          borderBottomLeftRadius: 50,
          borderTopLeftRadius: 50,
          borderBottomRightRadius: 50,
          borderTopRightRadius: 50,
          elevation: 0,
          backgroundColor: "pink",
          height: 80,
          ...styles.shadow,
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={AdminStack}
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
