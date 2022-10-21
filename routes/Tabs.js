import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Challan from "../components/Challan";
import Profile from "../components/Profile";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, View } from "react-native";
import {
  responsiveFontSize, responsiveHeight, responsiveWidth
} from "react-native-responsive-dimensions";
// import WardenScreen from "../screens/WardenScreen";
import StackWarden from "./StackWarden";

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size, color, fontsize }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = "home";
            size = focused ? 30 : 25;
            color = focused ? "yellow" : "black";
          } else if (route.name === "Profile") {
            iconName = "person";
            size = focused ? 30 : 25;
            color = focused ? "yellow" : "black";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
         tabBarLabelStyle: {
           fontSize: responsiveFontSize(2),
           marginTop: responsiveHeight(-2),
           marginBottom: responsiveHeight(2),
         },
         tabBarStyle: {
           position: "absolute",
           marginBottom: responsiveHeight(2),
           marginLeft: responsiveWidth(3),
           marginRight: responsiveWidth(4),
           borderBottomLeftRadius: responsiveWidth(13),
           borderTopLeftRadius: responsiveWidth(13),
           borderBottomRightRadius: responsiveWidth(13),
           borderTopRightRadius: responsiveWidth(13),
           elevation: 0,
           backgroundColor: "rgba(24,154,180,1)",
           height: responsiveHeight(10),
           ...styles.shadow,
         },
      })}
    >
      <Tab.Screen
        name="Home"
        component={StackWarden}
        options={{ headerShown: false}}
      />
      <Tab.Screen
        name="Add Challan"
        component={Challan}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <View
              style={{
                marginTop: responsiveHeight(0),
                width: responsiveWidth(24),
                height: responsiveWidth(24),
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                borderTopLeftRadius: responsiveWidth(15),
                borderTopRightRadius: responsiveWidth(15),
                backgroundColor: "white",
                borderBottomLeftRadius: responsiveWidth(15),
                marginBottom: responsiveWidth(15),
                borderBottomRightRadius: responsiveWidth(15),
                borderBottomStartRadius: responsiveWidth(15),
                borderBottomEndRadius: responsiveWidth(15),
                opacity: 1,
                ...styles.shadow,
              }}
            >
              <Ionicons name="add-circle-outline" color="grey" size={68} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false}}
      />
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  shadow: {
    shadowColor: "purple",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
