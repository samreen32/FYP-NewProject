import { React, useState, useEffect } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons, AntDesign, Feather } from "@expo/vector-icons";
import Places_Admin from "../components/Places_Admin";
import HandleComplaints from "../components/HandleComplaints";
import AdminSetting from "../components/AdminSetting";
import Admin_Logout from "../components/Admin_Logout";
import AdminTabs from "./AdminTabs";
import CustomDrawer from "../routes/CustomeDrawer";
import Guidelines from "../components/Guidelines";
import RemoveWarden from "../components/RemoveWarden";
import { Text } from "react-native";
import { translation } from "../components/translation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LANG_API_URL, THEME_API_URL } from "../Custom_Api_Calls/api_calls";

const Drawer = createDrawerNavigator();

export default function AdminDrawer() {
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
        component={AdminTabs}
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
        name="Add Guidelines"
        component={Guidelines}
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
                ? translation[94].English
                : translation[94].Urdu}
            </Text>
          ),
          onPress: () => setIsAddingRule(true),
          drawerIcon: ({ focused }) => (
            <Ionicons
              name="ios-remove-circle-outline"
              size={focused ? 25 : 20}
              style={selectedApp == 1 ? { color: "white" } : { color: "black" }}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Remove Warden"
        component={RemoveWarden}
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
                ? translation[89].English
                : translation[89].Urdu}
            </Text>
          ),
          drawerIcon: ({ focused }) => (
            <Feather
              name="user-minus"
              size={focused ? 25 : 20}
              style={selectedApp == 1 ? { color: "white" } : { color: "black" }}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Places_Admin"
        component={Places_Admin}
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
        name="Handle Complaint"
        component={HandleComplaints}
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
                ? translation[90].English
                : translation[90].Urdu}
            </Text>
          ),
          drawerIcon: ({ focused }) => (
            <AntDesign
              name="customerservice"
              size={focused ? 25 : 20}
              style={selectedApp == 1 ? { color: "white" } : { color: "black" }}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="AdminSetting"
        component={AdminSetting}
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
        name="Admin_Logout"
        component={Admin_Logout}
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
