import { React, useState, useEffect } from "react";
import { Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CitizenProfile from "../components/CitizenProfile";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet } from "react-native";
import CitizenStack from "./CitizenStack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import Citizen_AddMotors from "../components/Citizen_AddMotors";
import { translation } from "../components/translation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LANG_API_URL, THEME_API_URL } from "../Custom_Api_Calls/api_calls";

const Tab = createBottomTabNavigator();

export default function CitizenTabs() {
  const [selectedlang, setselectedlang] = useState(0);
  const [selectedApp, setselectedApp] = useState(0);

  /********** Method to fetch Citizen Language **********/
  const fetchLanguage = async () => {
    try {
      const authToken = await AsyncStorage.getItem("token");
      const response = await fetch(`${LANG_API_URL}/citizen_languageId`, {
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

  /********** Method to fetch Citizen Theme **********/
  const fetchTheme = async () => {
    try {
      const authToken = await AsyncStorage.getItem("token");
      const response = await fetch(`${THEME_API_URL}/citizen_themeId`, {
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
            size = focused ? 30 : 35;
            color = focused ? "black" : "black";
          } else if (route.name === "Add Motors") {
            iconName = "car";
            size = focused ? 30 : 45;
            color = focused ? "black" : "black";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={CitizenStack}
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
        name="Add Motors"
        component={Citizen_AddMotors}
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
                ? translation[101].English
                : translation[101].Urdu}
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

      <Tab.Screen
        name="Profile"
        component={CitizenProfile}
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
  console.log(routeName);
  if (
    routeName?.includes("PayChallan") ||
    routeName?.includes("PayChaSecond") ||
    routeName?.includes("Places") ||
    routeName?.includes("Citizen_Notifications") ||
    routeName?.includes("CitizenProfile") ||
    routeName?.includes("CitizenEditProfile") ||
    routeName?.includes("Citizen_AddMotors") ||
    routeName?.includes("Citizen_ViewChallanMotors") ||
    routeName?.includes("CitizenSearch") ||
    routeName?.includes("FileComplaint") ||
    routeName?.includes("CitizenSetting") ||
    routeName?.includes("Guidelines") ||
    routeName?.includes("Help") ||
    routeName?.includes("CitizenForgotPassword") ||
    routeName?.includes("CitizenResetPassword") ||
    routeName?.includes("Citizen_ChangePassword") ||
    routeName?.includes("ChallanHistory") ||
    routeName?.includes("ContactScreen") ||
    routeName?.includes("AboutScreen") ||
    routeName?.includes("Citizen_Logout") ||
    routeName?.includes("FAQScreen")
  ) {
    return "none";
  }
  return "flex";
};
