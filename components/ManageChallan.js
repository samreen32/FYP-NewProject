import { React, useEffect, useState, useCallback } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import {
  CHALLAN_API_URL,
  THEME_API_URL,
  LANG_API_URL,
} from "../Custom_Api_Calls/api_calls";
import { useFocusEffect } from "@react-navigation/native";
import { translation } from "./translation";
import { globalStyles } from "../styles/globalStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ManageChallan({ navigation }) {
  const [selectedlang, setselectedlang] = useState(0);
  const [selectedApp, setselectedApp] = useState(0);
  const [challans, setChallans] = useState([]);

  /************** Function to fecth all the challans ****************/
  const fetchPaidChallans = async () => {
    try {
      const response = await fetch(`${CHALLAN_API_URL}/show_paidChallans`, {
        method: "GET",
      });
      const responseData = await response.json();
      setChallans(responseData.paidChallans);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchPaidChallans();
  }, []);

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
        <Text style={[globalStyles.headerText, { textTransform: "uppercase" }]}>
          {selectedlang == 0 ? translation[91].English : translation[91].Urdu}{" "}
        </Text>
        <View style={{ width: 24 }}></View>
      </View>

      <FlatList
        data={challans}
        renderItem={({ item, description }) => (
          <View
            style={[
              selectedApp == 1
                ? { backgroundColor: "grey" }
                : { backgroundColor: "rgba(24,154,180,1)" },
              styles.Challan_Container,
            ]}
          >
            <View>
              <Text style={styles.Status_Text}>
                CHALLAN {item.status.toUpperCase()}
              </Text>
              <Text style={styles.description_Text}>
                {new Date(item.date).toLocaleDateString()}
              </Text>
            </View>
            <Text style={styles.Vehicle_no_text}>
              {item.vehicleNo.toUpperCase()}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  Challan_Container: {
    // backgroundColor: "rgba(24,154,180,1)",
    height: responsiveHeight(12),
    marginLeft: responsiveWidth(6),
    marginTop: responsiveHeight(3.5),
    marginRight: responsiveWidth(6),
    marginVertical: responsiveHeight(-2),
    borderRadius: 15,
  },
  Status_Text: {
    color: "#000000",
    fontWeight: "bold",
    fontSize: responsiveFontSize(2.3),
    marginLeft: responsiveWidth(5),
    marginTop: responsiveHeight(0.5),
    paddingTop: responsiveHeight(2),
  },
  description_Text: {
    marginLeft: responsiveWidth(5),
    marginTop: responsiveHeight(0.5),
    color: "#FFFFFF",
  },
  Vehicle_no_text: {
    color: "white",
    fontSize: responsiveFontSize(3),
    fontWeight: "bold",
    marginLeft: responsiveWidth(62),
    marginTop: responsiveHeight(-5.5),
  },
});
