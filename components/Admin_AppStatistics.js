import React, { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { responsiveHeight } from "react-native-responsive-dimensions";
import { PieChart } from "react-native-chart-kit";
import { Ionicons } from "@expo/vector-icons";
import {
  LANG_API_URL,
  STATISTICS_API_URL,
  THEME_API_URL,
} from "../Custom_Api_Calls/api_calls";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userLogin } from "../context/AuthContext";
import { translation } from "./translation";
import { useFocusEffect } from "@react-navigation/native";

export default function Admin_AppStatistics({ navigation }) {
  const [appStatsCount, setAppStatsCount] = useState([]);
  const { showToast } = userLogin();
  const [selectedlang, setselectedlang] = useState(0);
  const [selectedApp, setselectedApp] = useState(0);

  /******* Function to fetch total challans added *******/
  const fetchChallanData = async () => {
    const token = await AsyncStorage.getItem("token");
    try {
      if (token != null) {
        const response = await fetch(
          `${STATISTICS_API_URL}/count_appStatistics`,
          {
            headers: {
              "auth-token": token,
            },
          }
        );
        const data = await response.json();
        setAppStatsCount([
          {
            name: "Citizens",
            count: data.citizenCount,
            color: "blue",
            legendFontColor: "white",
            legendFontSize: 15,
          },
          {
            name: "Wardens",
            count: data.wardenCount,
            color: "#4CAF50",
            legendFontColor: "white",
            legendFontSize: 15,
          },
          {
            name: "Admins",
            count: data.adminCount,
            color: "#FFEB3B",
            legendFontColor: "white",
            legendFontSize: 15,
          },
          {
            name: "Challans",
            count: data.totalChallanCount,
            color: "#F44336",
            legendFontColor: "white",
            legendFontSize: 15,
          },
          {
            name: "Paid",
            count: data.totalPaidChallans,
            color: "purple",
            legendFontColor: "white",
            legendFontSize: 15,
          },
          {
            name: "Unpaid",
            count: data.totalUnpaidChallans,
            color: "pink",
            legendFontColor: "white",
            legendFontSize: 15,
          },
          {
            name: "Complaints",
            count: data.totalComplaints,
            color: "black",
            legendFontColor: "white",
            legendFontSize: 15,
          },
        ]);
      }
    } catch (error) {
      showToast("Error occur", error.message);
    }
  };

  useEffect(() => {
    fetchChallanData();
  }, []);

  /********** Method to fetch admin Language **********/
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
        <Text style={[globalStyles.headerText, { textTransform: "uppercase" }]}>
          {selectedlang == 0 ? translation[70].English : translation[70].Urdu}{" "}
        </Text>
        <View style={{ width: 24 }}></View>
      </View>

      <View
        style={[
          { backgroundColor: selectedApp === 1 ? "grey" : "rgba(10,76,118,1)" },
          globalStyles.easeTraffic_Rect,
          { height: responsiveHeight(60) },
        ]}
      >
        <PieChart
          style={styles.PieChart}
          data={appStatsCount}
          width={360}
          height={250}
          chartConfig={{
            backgroundColor: "#FFFFFF",
            backgroundGradientFrom: "#FFFFFF",
            backgroundGradientTo: "#FFFFFF",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          accessor={"count"}
          backgroundColor={"transparent"}
          paddingLeft={"15"}
          center={[0, 0]}
          absolute
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  PieChart: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
