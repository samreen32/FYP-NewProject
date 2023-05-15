import { React, useState, useEffect } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  Ionicons,
  FontAwesome,
  Entypo,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Text } from "react-native";
import Places from "../components/Places";
import FileComplaint from "../components/FileComplaint";
import CitizenSetting from "../components/CitizenSetting";
import Help from "../components/Help";
import CitizenTabs from "./CitizenTabs";
import CustomDrawer from "../routes/CustomeDrawer";
import Citizen_Logout from "../components/Citizen_Logout";
import QrScanner from "../components/QrScanner";
import Citizen_ViewChallanMotors from "../components/Citizen_ViewChallanMotors";
import { translation } from "../components/translation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LANG_API_URL, THEME_API_URL } from "../Custom_Api_Calls/api_calls";

const Drawer = createDrawerNavigator();

export default function CitizenDrawer() {
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
    <Drawer.Navigator
      useLegacyImplementation
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        drawerType: "slide",
        drawerPosition: "left",
        drawerHideStatusBarOnOpen: true,
        drawerStyle:
          selectedApp === 1
            ? {
                backgroundColor: "#333333",
                flex: 1,
                width: 300,
              }
            : {
                backgroundColor: "rgba(24,154,180,1)",
                width: 300,
              },

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
        component={CitizenTabs}
        options={{
          title: ({ focused }) => (
            <Text
              style={[
                selectedApp == 1
                  ? { color: "white", fontFamily: "poppins-bold", right: 26 }
                  : { color: "white", fontFamily: "poppins-bold", right: 26 },
                selectedlang == 1 ? { textAlign: "left" } : null,
              ]}
            >
              {selectedlang == 0
                ? translation[98].English
                : translation[98].Urdu}
            </Text>
          ),
          drawerIcon: ({ focused }) => (
            <Ionicons
              name="person"
              size={focused ? 25 : 20}
              style={selectedApp == 1 ? { color: "white" } : { color: "black" }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Places"
        component={Places}
        options={{
          headerShown: true,
          title: ({ focused }) => (
            <Text
              style={[
                selectedApp == 1
                  ? { color: "white", fontFamily: "poppins-bold", right: 26 }
                  : { color: "white", fontFamily: "poppins-bold", right: 26 },
                selectedlang == 1 ? { textAlign: "left" } : null,
              ]}
            >
              {selectedlang == 0
                ? translation[24].English
                : translation[24].Urdu}
            </Text>
          ),
          drawerIcon: ({ focused }) => (
            <Ionicons
              name="location"
              size={focused ? 25 : 20}
              style={selectedApp == 1 ? { color: "white" } : { color: "black" }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="QrScanner"
        component={QrScanner}
        options={{
          headerShown: false,
          title: ({ focused }) => (
            <Text
              style={[
                selectedApp == 1
                  ? { color: "white", fontFamily: "poppins-bold", right: 26 }
                  : { color: "white", fontFamily: "poppins-bold", right: 26 },
                selectedlang == 1 ? { textAlign: "left" } : null,
              ]}
            >
              {selectedlang == 0
                ? translation[99].English
                : translation[99].Urdu}
            </Text>
          ),
          drawerIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="qrcode-scan"
              size={focused ? 25 : 20}
              style={selectedApp == 1 ? { color: "white" } : { color: "black" }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="FileComplaint"
        component={FileComplaint}
        options={{
          headerShown: false,
          title: ({ focused }) => (
            <Text
              style={[
                selectedApp == 1
                  ? { color: "white", fontFamily: "poppins-bold", right: 26 }
                  : { color: "white", fontFamily: "poppins-bold", right: 26 },
                selectedlang == 1 ? { textAlign: "left" } : null,
              ]}
            >
              {selectedlang == 0
                ? translation[25].English
                : translation[25].Urdu}
            </Text>
          ),
          drawerIcon: ({ focused }) => (
            <Entypo
              name="emoji-sad"
              size={focused ? 25 : 20}
              style={selectedApp == 1 ? { color: "white" } : { color: "black" }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Citizen_ViewChallanMotors"
        component={Citizen_ViewChallanMotors}
        options={{
          headerShown: false,
          title: ({ focused }) => (
            <Text
              style={[
                selectedApp == 1
                  ? { color: "white", fontFamily: "poppins-bold", right: 26 }
                  : { color: "white", fontFamily: "poppins-bold", right: 26 },
                selectedlang == 1 ? { textAlign: "left" } : null,
              ]}
            >
              {selectedlang == 0
                ? translation[100].English
                : translation[100].Urdu}
            </Text>
          ),
          drawerIcon: ({ focused }) => (
            <FontAwesome5
              name="car"
              size={focused ? 25 : 20}
              style={selectedApp == 1 ? { color: "white" } : { color: "black" }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="CitizenSetting"
        component={CitizenSetting}
        options={{
          headerShown: false,
          title: ({ focused }) => (
            <Text
              style={[
                selectedApp == 1
                  ? { color: "white", fontFamily: "poppins-bold", right: 26 }
                  : { color: "white", fontFamily: "poppins-bold", right: 26 },
                selectedlang == 1 ? { textAlign: "left" } : null,
              ]}
            >
              {selectedlang == 0
                ? translation[26].English
                : translation[26].Urdu}
            </Text>
          ),
          drawerIcon: ({ focused }) => (
            <Ionicons
              name="settings"
              size={focused ? 25 : 20}
              style={selectedApp == 1 ? { color: "white" } : { color: "black" }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Help"
        component={Help}
        options={{
          headerShown: false,
          title: ({ focused }) => (
            <Text
              style={[
                selectedApp == 1
                  ? { color: "white", fontFamily: "poppins-bold", right: 26 }
                  : { color: "white", fontFamily: "poppins-bold", right: 26 },
                selectedlang == 1 ? { textAlign: "left" } : null,
              ]}
            >
              {selectedlang == 0
                ? translation[27].English
                : translation[27].Urdu}
            </Text>
          ),
          drawerIcon: ({ focused }) => (
            <FontAwesome
              name="question"
              size={focused ? 25 : 20}
              style={selectedApp == 1 ? { color: "white" } : { color: "black" }}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Citizen_Logout"
        component={Citizen_Logout}
        options={{
          headerShown: false,
          title: ({ focused }) => (
            <Text
              style={[
                selectedApp == 1
                  ? { color: "white", fontFamily: "poppins-bold", right: 26 }
                  : { color: "white", fontFamily: "poppins-bold", right: 26 },
                selectedlang == 1 ? { textAlign: "left" } : null,
              ]}
            >
              {selectedlang == 0
                ? translation[28].English
                : translation[28].Urdu}
            </Text>
          ),
          drawerIcon: ({ focused }) => (
            <Ionicons
              name="log-out"
              size={focused ? 25 : 20}
              style={selectedApp == 1 ? { color: "white" } : { color: "black" }}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
