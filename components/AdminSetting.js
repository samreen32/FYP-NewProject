import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ModalsLang from "./ModalsLang";
import ModalsApp from "./ModalsApp";
import { useEffect } from "react";
import { useState } from "react";
import { translation } from "./translation";
import { globalStyles } from "../styles/globalStyles";
import { LANG_API_URL, THEME_API_URL } from "../Custom_Api_Calls/api_calls";

export default function AdminSetting({ navigation }) {
  const [langmodalvisible, setlangmodalvisible] = useState(false);
  const [selectedlang, setselectedlang] = useState(0);
  const [selectedApp, setselectedApp] = useState(0);
  const [Appmodalvisible, setAppmodalvisible] = useState(false);

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

  const saveselectedlanguage = async (index) => {
    try {
      const authToken = await AsyncStorage.getItem("token");

      const response = await fetch(`${LANG_API_URL}/admin_language`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        },
        body: JSON.stringify({ language: index }),
      });

      if (!response.ok) {
        throw new Error("Failed to update language preference");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const saveselectedApp = async (index) => {
    try {
      const authToken = await AsyncStorage.getItem("token");

      const response = await fetch(`${THEME_API_URL}/admin_theme`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        },
        body: JSON.stringify({ theme: index }),
      });

      if (!response.ok) {
        throw new Error("Failed to update theme preference");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <ModalsLang
        langmodalvisible={langmodalvisible}
        setlangmodalvisible={setlangmodalvisible}
        onSelectlang={(x) => {
          setselectedlang(x);
          saveselectedlanguage(x);
        }}
      />

      <View style={styles.container}>
        <View
          style={
            selectedApp == 1
              ? [{ backgroundColor: "black" }, globalStyles.header]
              : [{ backgroundColor: "rgba(10,76,118,1)" }, globalStyles.header]
          }
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color="white"
            onPress={() => {
              navigation.goBack();
            }}
          />
          <Text style={globalStyles.headerText}>
            {" "}
            {selectedlang == 0 ? translation[21].English : translation[21].Urdu}
          </Text>
          <View style={{ width: 24 }}></View>
        </View>

        {/* Content */}
        <View
          style={
            selectedApp == 1
              ? [{ backgroundColor: "#333333" }, styles.content]
              : [{ backgroundColor: "white" }, styles.content]
          }
        >
          {/* Account */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="person" size={24} color="rgba(24,154,180,1)" />
              <Text
                style={
                  selectedApp == 1
                    ? [{ color: "white" }, styles.sectionHeaderText]
                    : [{ color: "black" }, styles.sectionHeaderText]
                }
              >
                {" "}
                {selectedlang == 0
                  ? translation[7].English
                  : translation[7].Urdu}
              </Text>
            </View>

            <View
              style={
                selectedApp == 1
                  ? [{ backgroundColor: "grey" }, styles.sectionBody]
                  : [{ backgroundColor: "#F6F6F6" }, styles.sectionBody]
              }
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("AdminEditProfile");
                }}
              >
                <Text style={styles.sectionItem}>
                  {" "}
                  {selectedlang == 0
                    ? translation[34].English
                    : translation[34].Urdu}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Admin_ChangePassword");
                }}
              >
                <Text style={styles.sectionItem}>
                  <Text style={styles.sectionItem}>
                    {" "}
                    {selectedlang == 0
                      ? translation[45].English
                      : translation[45].Urdu}
                  </Text>
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Places_Admin");
                }}
              >
                <Text style={styles.sectionItem}>
                  {" "}
                  {selectedlang == 0
                    ? translation[46].English
                    : translation[46].Urdu}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* General */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="settings" size={24} color="rgba(24,154,180,1)" />
              <Text
                style={
                  selectedApp == 1
                    ? [{ color: "white" }, styles.sectionHeaderText]
                    : [{ color: "black" }, styles.sectionHeaderText]
                }
              >
                {" "}
                {selectedlang == 0
                  ? translation[50].English
                  : translation[50].Urdu}
              </Text>
            </View>

            <View
              style={
                selectedApp == 1
                  ? [{ backgroundColor: "grey" }, styles.sectionBody]
                  : [{ backgroundColor: "#F6F6F6" }, styles.sectionBody]
              }
            >
              <TouchableOpacity
                onPress={() => {
                  setAppmodalvisible(!Appmodalvisible);
                }}
              >
                <Text style={styles.sectionItem}>
                  {selectedlang == 0
                    ? translation[15].English
                    : translation[15].Urdu}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setlangmodalvisible(!langmodalvisible);
                }}
              >
                <Text style={styles.sectionItem}>
                  {selectedlang == 0
                    ? translation[17].English
                    : translation[17].Urdu}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Statistics */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <MaterialCommunityIcons
                name="server-security"
                size={24}
                color="rgba(24,154,180,1)"
              />
              <Text
                style={
                  selectedApp == 1
                    ? [{ color: "white" }, styles.sectionHeaderText]
                    : [{ color: "black" }, styles.sectionHeaderText]
                }
              >
                {" "}
                {selectedlang == 0
                  ? translation[129].English
                  : translation[129].Urdu}
              </Text>
            </View>

            <View
              style={
                selectedApp == 1
                  ? [{ backgroundColor: "grey" }, styles.sectionBody]
                  : [{ backgroundColor: "#F6F6F6" }, styles.sectionBody]
              }
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Admin_AppStatistics");
                }}
              >
                <Text style={styles.sectionItem}>
                  {" "}
                  {selectedlang == 0
                    ? translation[70].English
                    : translation[70].Urdu}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View
          style={
            selectedApp == 1
              ? [{ backgroundColor: "black" }, styles.footer]
              : [{ backgroundColor: "rgba(10,76,118,1)" }, styles.footer]
          }
        >
          {/* Logout */}
          <View style={styles.logout}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Admin_Logout");
              }}
            >
              <Ionicons name="log-out" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.logoutText}>
              {" "}
              {selectedlang == 0
                ? translation[28].English
                : translation[28].Urdu}
            </Text>
          </View>
        </View>
      </View>

      <ModalsApp
        Appmodalvisible={Appmodalvisible}
        setAppmodalvisible={setAppmodalvisible}
        onSelectApp={(y) => {
          setselectedApp(y);
          console.log(y);
          saveselectedApp(y);
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  section: {
    marginBottom: 40,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionHeaderText: {
    fontFamily: "poppins-bold",
    fontSize: 18,
    marginLeft: 10,
  },
  sectionBody: {
    backgroundColor: "#F6F6F6",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sectionItem: {
    fontFamily: "poppins-regular",
    fontSize: 16,
    marginBottom: 10,
  },
  footer: {
    height: 50,
    //backgroundColor: "rgba(10,76,118,1)",
    justifyContent: "center",
    alignItems: "center",
  },
  logout: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoutText: {
    fontFamily: "poppins-bold",
    fontSize: 16,
    color: "white",
    marginLeft: 10,
  },
});
