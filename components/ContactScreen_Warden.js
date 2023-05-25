import React, { useCallback, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { translation } from "../components/translation";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LANG_API_URL, THEME_API_URL } from "../Custom_Api_Calls/api_calls";

const ContactScreen_Warden = ({ navigation }) => {
  const [selectedlang, setselectedlang] = useState(0);
  const [selectedApp, setselectedApp] = useState(0);

  /********** Method to fetch Citizen Language **********/
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

  /********** Method to fetch warden Theme **********/
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
    <View
      style={
        selectedApp == 1
          ? [{ backgroundColor: "#333333" }, styles.container]
          : [{ backgroundColor: "#fff" }, styles.container]
      }
    >
      {/* Header */}
      <View
        style={
          selectedApp == 1
            ? [{ backgroundColor: "black" }, styles.header]
            : [{ backgroundColor: "rgba(10,76,118,1)" }, styles.header]
        }
      >
        {/* Back Arrow Icon */}
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        {/* Header Text */}
        <Text style={styles.headerText}>
          {selectedlang == 0 ? translation[49].English : translation[49].Urdu}
        </Text>
        <View style={{ width: 24 }}></View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text
          style={
            selectedApp == 1
              ? [{ color: "white" }, styles.boldText]
              : [{ color: "black" }, styles.boldText]
          }
        >
          {" "}
          {selectedlang == 0 ? translation[145].English : translation[145].Urdu}
        </Text>
        {/* Phone */}
        <View style={styles.contactInfo}>
          <Ionicons name="call" size={20} color="rgba(24,154,180,1)" />
          <Text
            style={
              selectedApp == 1
                ? [{ color: "white" }, styles.contactText]
                : [{ color: "black" }, styles.contactText]
            }
          >
            051-256278-5
          </Text>
        </View>
        {/* Email */}
        <View style={styles.contactInfo}>
          <Ionicons name="mail" size={20} color="rgba(24,154,180,1)" />
          <Text
            style={
              selectedApp == 1
                ? [{ color: "white" }, styles.contactText]
                : [{ color: "black" }, styles.contactText]
            }
          >
            Eparking@gmail.com
          </Text>
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
        {/* Logo */}
        <View style={styles.logo}>
          <Ionicons name="car" size={20} color="white" />
          <Text style={styles.appName}>
            {" "}
            {selectedlang == 0
              ? translation[146].English
              : translation[146].Urdu}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: 18,
    fontFamily: "poppins-bold",
    color: "white",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  boldText: {
    fontSize: 20,
    fontFamily: "poppins-bold",
    marginBottom: 10,
  },
  contactInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  contactText: {
    marginLeft: 10,
    fontSize: 16,
    fontFamily: "poppins-regular",
  },
  footer: {
    height: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    height: 30,
    width: 140,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  appName: {
    fontSize: 14,
    fontFamily: "poppins-bold",
    color: "white",
  },
});

export default ContactScreen_Warden;
