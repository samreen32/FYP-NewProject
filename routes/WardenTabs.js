import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Challan from "../components/Challan";
import WardenProfile from "../components/WardenProfile";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet } from "react-native";
import StackWarden from "./StackWarden";
import {getFocusedRouteNameFromRoute} from "@react-navigation/native";


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
          backgroundColor: "rgba(24,154,180,1)",
          height: 80,
          ...styles.shadow,
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={StackWarden}
        options = {{ headerShown: false}}
    
        // options={({route}) => (
        //   { 
        //  tabBarStyle:{display: getRouteName(route)} })}
      />
      <Tab.Screen
        name="Add Challan"
        component={Challan}
        tabBarStyle= {{display: 'none'}}
        options={{ headerShown: false }}
      />

      <Tab.Screen
        name="Profile"
        component={WardenProfile}
        tabBarStyle= {{display: 'none'}}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({});

const getRouteName=(route) =>{
  const routeName=getFocusedRouteNameFromRoute(route);
  console.log(routeName);
  if(routeName?.includes("Challan") || routeName?.includes("Places") || routeName?.includes("Notifications") ){
    return 'none';
  }
  return 'flex';
};