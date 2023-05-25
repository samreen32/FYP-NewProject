import { React, useState, useCallback } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Text } from "react-native";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";
import Places_Warden from "../components/Places_Warden";
import ViewComplaints from "../components/ViewComplaints";
import WardenSetting from "../components/WardenSetting";
import Help_Warden from "../components/Help_warden";
import WardenTabs from "./WardenTabs";
import CustomDrawer from "./CustomeDrawer";
import Warden_Logout from "../components/Warden_Logout";
import AddChallan from "../components/AddChallan";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LANG_API_URL, THEME_API_URL } from "../Custom_Api_Calls/api_calls";
import { useFocusEffect } from "@react-navigation/native";
import { translation } from "../components/translation";

const Drawer = createDrawerNavigator();

export default function WardenDrawer() {
  const [selectedlang, setselectedlang] = useState(0);
  const [selectedApp, setselectedApp] = useState(0);

  /********** Method to fetch Warden Language **********/
  const fetchLanguage = async () => {
    try {
      const authToken = await AsyncStorage.getItem("token");
      const response = await fetch(`${LANG_API_URL}/warden_languageId`, {
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

  /********** Method to fetch Warden Theme **********/
  const fetchTheme = async () => {
    try {
      const authToken = await AsyncStorage.getItem("token");
      const response = await fetch(`${THEME_API_URL}/warden_themeId`, {
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

  useFocusEffect(
    useCallback(() => {
      fetchLanguage();
      fetchTheme();
    }, [])
  );

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
        component={WardenTabs}
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
        name="Places_Warden"
        component={Places_Warden}
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
        name="AddChallan"
        component={AddChallan}
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
                ? translation[71].English
                : translation[71].Urdu}
            </Text>
          ),
          drawerIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="book-plus-multiple"
              size={focused ? 25 : 20}
              style={selectedApp == 1 ? { color: "white" } : { color: "black" }}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="View Complaint"
        component={ViewComplaints}
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
                ? translation[68].English
                : translation[68].Urdu}
            </Text>
          ),
          drawerIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="comment-multiple"
              size={focused ? 25 : 20}
              style={selectedApp == 1 ? { color: "white" } : { color: "black" }}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="WardenSetting"
        component={WardenSetting}
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
        name="Help_Warden"
        component={Help_Warden}
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
        name="Warden_Logout"
        component={Warden_Logout}
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
