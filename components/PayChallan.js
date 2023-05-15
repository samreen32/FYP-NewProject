import React, { useState, useEffect, useCallback } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
} from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import {
  AUTH_API_URL,
  CHALLAN_API_URL,
  LANG_API_URL,
  MOTORS_API_URL,
  THEME_API_URL,
} from "../Custom_Api_Calls/api_calls";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NoComplaint_Box from "../Loader/NoComplaint_Box";
import { useFocusEffect } from "@react-navigation/native";
import { translation } from "./translation";

export default function PayChallan({ navigation }) {
  const [selectedlang, setselectedlang] = useState(0);
  const [selectedApp, setselectedApp] = useState(0);
  const [challans, setChallans] = useState([]);

  /************** Function to fecth all the challans ****************/
  const fetchChallans = async () => {
    const token = await AsyncStorage.getItem("token");
    try {
      if (token != null) {
        // Fetch the vehicle number of the current citizen
        const vehicleNoResponse = await fetch(
          `${AUTH_API_URL}/citizen_vehicleNo`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "auth-token": token,
            },
          }
        );
        const vehicleNoData = await vehicleNoResponse.json();
        console.log("Citizen Vehcile", vehicleNoData);

        // Fetch the list of motors and extract their vehicle numbers
        const motorsResponse = await fetch(`${MOTORS_API_URL}/fetch_motors`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        });
        const motorsData = await motorsResponse.json();
        const vehicleNos = motorsData.map((motor) => motor.vehicleNo);

        // Combine the citizen's vehicle number with the list of vehicle numbers from the motors
        const allVehicleNos = [...vehicleNos, vehicleNoData.vehicleNo];
        console.log("All vehcile numbers", allVehicleNos);

        // Fetch the challans for all the vehicle numbers
        const challansResponse = await fetch(
          `${CHALLAN_API_URL}/show_UnpaidChallans`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token": token,
            },
            body: JSON.stringify({ vehicleNo: allVehicleNos }),
          }
        );
        const challansData = await challansResponse.json();
        console.log(challansData);
        setChallans(challansData.challans); // Set the state of challans with the fetched data
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchChallans();
  }, []);

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
          ? { backgroundColor: "#333333" }
          : { backgroundColor: "none" }
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
          {selectedlang == 0 ? translation[36].English : translation[36].Urdu}{" "}
          {selectedlang == 0 ? translation[37].English : translation[37].Urdu}
        </Text>
        <View style={{ width: 24 }}></View>
      </View>

      <FlatList
        data={challans}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View
            style={
              selectedApp == 1
                ? [{ backgroundColor: "grey" }, styles.Complain_Container]
                : [
                    { backgroundColor: "rgba(24,154,180,1)" },
                    styles.Complain_Container,
                  ]
            }
          >
            <TouchableOpacity
              style={[
                globalStyles.searchIcon,
                {
                  marginTop: responsiveHeight(5),
                  marginLeft: responsiveWidth(76),
                },
              ]}
              onPress={() => {
                navigation.navigate("PayChaSecond", { challanId: item._id });
              }}
            >
              <AntDesign name="right" size={50} color="black" />
            </TouchableOpacity>

            <TouchableOpacity>
              <View style={globalStyles.pendingChallanImage}>
                <Image
                  source={{ uri: item.add_img }}
                  style={[
                    globalStyles.pendingChallanImage,
                    {
                      width: responsiveWidth(28),
                      height: responsiveHeight(13),
                    },
                  ]}
                />
              </View>
            </TouchableOpacity>

            <View
              style={[
                globalStyles.hisStat_Group,
                {
                  marginLeft: responsiveWidth(28),
                  marginTop: responsiveHeight(5),
                },
              ]}
            >
              <Text
                style={[
                  globalStyles.tw_Profile_Name,
                  {
                    fontSize: responsiveFontSize(2),
                    marginLeft: responsiveWidth(3),
                  },
                ]}
              >
                {item.vehicleNo.toUpperCase()}
              </Text>
              <View style={[globalStyles.tw_Profile_goodMorning]}>
                <Text>RS. {item.amount}</Text>
              </View>
              <Text
                style={[
                  styles.description_Text,
                  { width: responsiveWidth(60), marginTop: 52, left: 17 },
                ]}
              >
                {item.due_date}
              </Text>
            </View>
          </View>
        )}
      />

      {challans.length === 0 && <NoComplaint_Box />}
    </View>
  );
}

const styles = StyleSheet.create({
  Complain_Container: {
    flexDirection: "row",
    height: responsiveHeight(18.5),
    marginLeft: responsiveWidth(5),
    marginTop: responsiveHeight(3),
    marginRight: responsiveWidth(5),
    marginVertical: responsiveHeight(-1),
    borderRadius: 15,
  },
  Image: {
    width: responsiveWidth(20),
    height: responsiveHeight(10),
    marginLeft: responsiveWidth(3),
    marginTop: responsiveHeight(2.5),
    borderRadius: responsiveWidth(7),
    borderColor: "black",
    borderWidth: 2,
  },
  imageText: {
    marginTop: responsiveHeight(2),
    color: "white",
    fontFamily: "poppins-regular",
    textAlign: "center",
  },
  description_Text: {
    width: responsiveWidth(65.3),
    height: responsiveHeight(20),
    marginLeft: responsiveWidth(5),
    color: "#FFFFFF",
    fontFamily: "poppins-regular",
  },
  Name_Text: {
    color: "#000000",
    fontFamily: "poppins-bold",
    fontSize: responsiveFontSize(2.3),
    marginLeft: responsiveWidth(5),
    marginTop: responsiveHeight(2),
    paddingTop: responsiveHeight(2),
  },
});
