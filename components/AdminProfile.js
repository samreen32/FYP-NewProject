import { React, useState, useCallback } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { userLogin } from "../context/AuthContext";
import { LANG_API_URL, THEME_API_URL } from "../Custom_Api_Calls/api_calls";
import { useFocusEffect } from "@react-navigation/native";
import { translation } from "./translation";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AdminProfile({ navigation }) {
  const [selectedlang, setselectedlang] = useState(0);
  const [selectedApp, setselectedApp] = useState(0);
  const { profile } = userLogin();

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
          ? { backgroundColor: "#333333", flex: 1 }
          : { backgroundColor: "white", flex: 1 }
      }
    >
      <View
        style={
          selectedApp == 1
            ? [{ backgroundColor: "black" }, styles.purple_background]
            : [
                { backgroundColor: "rgba(10,76,118,1)" },
                styles.purple_background,
              ]
        }
      >
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons
            style={styles.back_icon}
            name={"chevron-back-outline"}
            size={45}
            color={"white"}
          />
          <Text style={styles.Profile_Text}>
            {selectedlang == 0 ? translation[23].English : translation[23].Urdu}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.Profile_Rectangle}>
        <Text style={styles.Richard_Text}>
          {profile.name.charAt(0).toUpperCase() + profile.name.slice(1)}
        </Text>
        <TouchableOpacity
          style={styles.Edit_Profile_Btn}
          onPress={() => {
            navigation.navigate("AdminEditProfile");
          }}
        >
          <Text
            style={
              selectedApp == 1
                ? [{ backgroundColor: "#333333" }, styles.Edit_Profile_Btn]
                : [
                    { backgroundColor: "rgba(24,154,180,1)" },
                    styles.Edit_Profile_Btn,
                  ]
            }
          >
            {selectedlang == 0 ? translation[34].English : translation[34].Urdu}
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{ height: responsiveHeight(50), width: responsiveWidth(100) }}
      >
        <TouchableOpacity
          style={styles.style_dashboard}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons
            name={"keypad"}
            size={25}
            style={
              selectedApp == 1
                ? { color: "white" }
                : { color: "rgba(10,76,118,1)" }
            }
          />
          <Text
            style={[
              selectedApp == 1
                ? [{ color: "white" }, styles.style_text]
                : [{ color: "rgb(1,1,1)" }, styles.style_text],
            ]}
          >
            {selectedlang == 0 ? translation[33].English : translation[33].Urdu}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.style_challan_History}
          onPress={() => {
            navigation.navigate("ManageChallan");
          }}
        >
          <Ionicons
            name={"clipboard"}
            size={25}
            style={
              selectedApp == 1
                ? { color: "white" }
                : { color: "rgba(10,76,118,1)" }
            }
          />
          <Text
            style={[
              selectedApp == 1
                ? [{ color: "white" }, styles.style_text]
                : [{ color: "rgb(1,1,1)" }, styles.style_text],
            ]}
          >
            {selectedlang == 0 ? translation[91].English : translation[91].Urdu}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.style_Pay}
          onPress={() => {
            navigation.navigate("HandleComplaints");
          }}
        >
          <MaterialIcons
            name="headset-mic"
            size={25}
            style={
              selectedApp == 1
                ? { color: "white" }
                : { color: "rgba(10,76,118,1)" }
            }
          />
          <Text
            style={[
              selectedApp == 1
                ? [{ color: "white" }, styles.style_text]
                : [{ color: "rgb(1,1,1)" }, styles.style_text],
            ]}
          >
            {selectedlang == 0 ? translation[90].English : translation[90].Urdu}{" "}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.style_Logout}
          onPress={() => {
            navigation.navigate("Admin_Logout");
          }}
        >
          <Ionicons
            name={"log-out"}
            size={25}
            style={
              selectedApp == 1
                ? { color: "white" }
                : { color: "rgba(10,76,118,1)" }
            }
          />
          <Text
            style={[
              selectedApp == 1
                ? [{ color: "white" }, styles.style_text]
                : [{ color: "rgb(1,1,1)" }, styles.style_text],
            ]}
          >
            {selectedlang == 0 ? translation[28].English : translation[28].Urdu}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  style_text: {
    fontSize: responsiveFontSize(2.5),
    marginLeft: responsiveWidth(3),
    letterSpacing: 1.0,
    fontFamily: "poppins-regular",
  },
  style_dashboard: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: responsiveWidth(80),
    paddingLeft: responsiveWidth(5),
    marginTop: responsiveHeight(1),
    marginLeft: responsiveWidth(10),
  },
  dashboard_text: {
    fontSize: responsiveFontSize(2.5),
    marginLeft: responsiveWidth(3),
    letterSpacing: 1.0,
    fontFamily: "poppins-regular",
    //lineHeight: 114.99999761581421,
    color: "rgb(1,1,1)",
  },
  purple_background: {
   // backgroundColor: "rgba(10,76,118,1)",
    width: responsiveWidth(100),
    height: responsiveHeight(30),
  },
  Profile_Text: {
    color: "white",
    textAlign: "center",
    marginTop: responsiveHeight(-6.5),
    fontSize: responsiveFontSize(4),
    letterSpacing: 1.0,
    fontFamily: "poppins-bold",
    //lineHeight: 114.99999761581421,
  },
  Profile_Rectangle: {
    height: responsiveHeight(30),
    width: responsiveWidth(85),
    backgroundColor: "#D9D9D9",
    justifyContent: "center",
    marginTop: responsiveHeight(-15),
    marginLeft: responsiveWidth(8),
    borderRadius: responsiveWidth(5),
    alignItems: "center",
  },
  Richard_Text: {
    marginTop: responsiveHeight(8),
    fontSize: responsiveFontSize(2.5),
    letterSpacing: 1.0,
    fontFamily: "poppins-regular",
    //lineHeight: 114.99999761581421,
    color: "rgb(1,1,1)",
    marginBottom: responsiveHeight(2),
  },
  Edit_Profile_Btn: {
    //backgroundColor: "rgba(24,154,180,1)",
    width: responsiveWidth(39),
    height: responsiveHeight(6.5),
    textAlign: "center",
    justifyContent: "center",
    borderRadius: responsiveWidth(8),
    fontSize: responsiveFontSize(2.5),
    letterSpacing: 1.0,
    fontFamily: "poppins-regular",
    //lineHeight: 114.99999761581421,
    color: "white",
    paddingTop: responsiveHeight(1),
  },
  style_challan_History: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: responsiveWidth(80),
    paddingLeft: responsiveWidth(5),
    marginTop: responsiveHeight(-7),
    marginLeft: responsiveWidth(10),
  },
  challan_History_text: {
    fontSize: responsiveFontSize(2.5),
    marginLeft: responsiveWidth(3),
    letterSpacing: 1.0,
    fontFamily: "poppins-regular",
    //lineHeight: 114.99999761581421,
    color: "rgb(1,1,1)",
  },
  style_Logout: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: responsiveWidth(80),
    paddingLeft: responsiveWidth(5),
    marginTop: responsiveHeight(-7),
    marginLeft: responsiveWidth(10),
  },
  Logout_text: {
    fontSize: responsiveFontSize(2.5),
    marginLeft: responsiveWidth(3),
    letterSpacing: 1.0,
    fontFamily: "poppins-regular",
    //lineHeight: 114.99999761581421,
    color: "rgb(1,1,1)",
  },
  style_Pay: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: responsiveWidth(80),
    paddingLeft: responsiveWidth(5),
    marginTop: responsiveHeight(-7),
    marginLeft: responsiveWidth(10),
  },
  Pay_text: {
    fontSize: responsiveFontSize(2.5),
    marginLeft: responsiveWidth(3),
    letterSpacing: 1.0,
    fontFamily: "poppins-regular",
    //lineHeight: 114.99999761581421,
    color: "rgb(1,1,1)",
  },
  back_icon: {
    marginTop: responsiveHeight(5),
    marginLeft: responsiveWidth(6),
  },
});
