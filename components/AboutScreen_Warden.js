import React, { useCallback, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { translation } from "../components/translation";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LANG_API_URL, THEME_API_URL } from "../Custom_Api_Calls/api_calls";

const AboutScreen_Warden = ({ navigation }) => {
  const [selectedlang, setselectedlang] = useState(0);
  const [selectedApp, setselectedApp] = useState(0);

  /********** Method to fetch warden Language **********/
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
          ? [{ backgroundColor: "hsl(0, 0%, 20%)" }, styles.container]
          : [{ backgroundColor: "#fff" }, styles.container]
      }
    >
      <View
        style={
          selectedApp == 1
            ? [{ backgroundColor: "#292424" }, styles.header]
            : [{ backgroundColor: "rgba(10,76,118,1)" }, styles.header]
        }
      >
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="arrow-back-outline" size={24} color="white" />
        </TouchableOpacity>
        <Text
          style={
            selectedlang == 1
              ? [{ textAlign: "left" }, styles.headerText]
              : styles.headerText
          }
        >
          {selectedlang == 0 ? translation[147].English : translation[147].Urdu}
        </Text>
        <View style={{ width: 24 }} />
      </View>
      <View
        style={
          selectedApp == 1
            ? [{ backgroundColor: "rgb(53,40,30)" }, styles.box]
            : [{ backgroundColor: "rgba(10,76,118,1)" }, styles.box]
        }
      >
        <View style={styles.logoContainer}>
          <Ionicons name="car-outline" size={64} color="white" />
          <Text style={styles.appName}>
            {selectedlang == 0
              ? translation[148].English
              : translation[148].Urdu}
          </Text>
          <Text style={styles.version}>
          {selectedlang == 0
              ? translation[149].English
              : translation[149].Urdu}
          </Text>
        </View>
        <Text style={styles.description}>
          {selectedlang == 0 ? translation[150].English : translation[150].Urdu}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 80,
    paddingHorizontal: 20,
  },
  headerText: {
    fontFamily: "poppins-bold",
    fontSize: 20,
    color: "white",
  },
  box: {
    width: "auto",
    height: "55%",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    marginVertical: 10,
    marginHorizontal: 15,
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  appName: {
    fontFamily: "poppins-bold",
    fontSize: 24,
    marginVertical: 10,
    color: "white",
  },
  version: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: "poppins-regular",
    color: "white",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "poppins-regular",
    color: "white",
  },
});

export default AboutScreen_Warden;
