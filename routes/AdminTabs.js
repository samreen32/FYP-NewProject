import { React, useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AdminProfile from "../components/AdminProfile";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet } from "react-native";
import AdminStack from "./AdminStack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { Text } from "react-native";
import { translation } from "../components/translation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LANG_API_URL, THEME_API_URL } from "../Custom_Api_Calls/api_calls";

const Tab = createBottomTabNavigator();

export default function AdminTabs() {
  const [selectedlang, setselectedlang] = useState(0);
  const [selectedApp, setselectedApp] = useState(0);

  /********** Method to fetch Admin Language **********/
  const fetchLanguage = async () => {
    try {
      const authToken = await AsyncStorage.getItem("token");
      const response = await fetch(`${LANG_API_URL}/admin_languageId`, {
        headers: {
          "auth-token": authToken,
        },
      });
      const data = await response.json();
      console.log(data);
      const langs = data.language;

      setselectedlang(langs);
      console.log("chk" + selectedlang);
      console.log("lang is" + langs);
    } catch (err) {
      console.error(err);
    }
  };

  /********** Method to fetch Admin Theme **********/
  const fetchTheme = async () => {
    try {
      const authToken = await AsyncStorage.getItem("token");
      const response = await fetch(`${THEME_API_URL}/admin_themeId`, {
        headers: {
          "auth-token": authToken,
        },
      });
      const data = await response.json();
      console.log(data);
      const themes = data.theme;
      setselectedApp(themes);

      console.log("theme is" + themes);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLanguage();
    fetchTheme();
  }, []);

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
          title: ({ focused }) => (
            <Text
              style={[
                selectedApp == 1
                  ? { color: "white", fontFamily: "poppins-bold", top: -5 }
                  : { color: "white", top: -10 },
                selectedlang == 1 ? { textAlign: "left" } : null,
              ]}
            >
              {selectedlang == 0
                ? translation[43].English
                : translation[43].Urdu}
            </Text>
          ),
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
            backgroundColor: selectedApp == 1 ? "grey" : "rgba(10,76,118,1)",
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
          title: ({ focused }) => (
            <Text
              style={[
                selectedApp == 1
                  ? { color: "white", fontFamily: "poppins-bold", top: -5 }
                  : { color: "white", top: -10 },
                selectedlang == 1 ? { textAlign: "left" } : null,
              ]}
            >
              {selectedlang == 0
                ? translation[23].English
                : translation[23].Urdu}
            </Text>
          ),
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
    routeName?.includes("Places_Admin") ||
    routeName?.includes("AdminSetting") ||
    routeName?.includes("AdminSearch") ||
    routeName?.includes("Admin_AppStatistics") ||
    routeName?.includes("Guidelines")
  ) {
    return "none";
  }
  return "flex";
};
