import { React, useState, useCallback } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { TextInput } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userLogin } from "../context/AuthContext";
import {
  LANG_API_URL,
  MOTORS_API_URL,
  THEME_API_URL,
} from "../Custom_Api_Calls/api_calls";
import AppLoader from "../Loader/AppLoader";
import { translation } from "./translation";
import { useFocusEffect } from "@react-navigation/native";
import { globalStyles } from "../styles/globalStyles";

export default function Citizen_AddMotors({ navigation }) {
  const [selectedlang, setselectedlang] = useState(0);
  const [selectedApp, setselectedApp] = useState(0);
  const [credentials, setCredentials] = useState({
    motorName: "",
    motorType: "",
    vehicleNo: "",
    regNo: "",
  });
  const { motorName, motorType, vehicleNo, regNo } = credentials;
  const { isLoading, setIsLoading, showToast, updateError, error, setError } =
    userLogin();

  /******  Function to add motors  *****/
  const handleAddMotors = async () => {
    if (motorName == "") {
      return updateError("Enter a Motor Name!", setError);
    }
    if (motorType == "") {
      return updateError("Enter a Motor Type!", setError);
    }
    if (vehicleNo == "") {
      return updateError("Enter a Vehicle Number!", setError);
    }
    if (regNo == "") {
      return updateError("Enter a Registration Number!", setError);
    }

    const token = await AsyncStorage.getItem("token");
    if (token != null) {
      setIsLoading(true);
      await fetch(`${MOTORS_API_URL}/addMotors`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({
          motorName: motorName,
          motorType: motorType,
          vehicleNo: vehicleNo,
          regNo: regNo,
        }),
      })
        .then((response) => response.json())
        .then((responseData) => {
          if (responseData.success) {
            showToast("New Motor has been added.");
            setCredentials({
              motorName: "",
              motorType: "",
              vehicleNo: "",
              regNo: "",
            });
            navigation.navigate("Citizen_ViewChallanMotors");
            setIsLoading(false);
          } else {
            showToast("Try again after some time!");
            setIsLoading(false);
          }
        })
        .catch((error) => {
          showToast(error);
        });
    }
  };

  const onChange = (value, fieldName) => {
    setCredentials({ ...credentials, [fieldName]: value });
  };

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
          {selectedlang == 0 ? translation[101].English : translation[101].Urdu}{" "}
        </Text>
        <View style={{ width: 24 }}></View>
      </View>

      <ScrollView>
        <View
          style={
            selectedApp == 1
              ? {
                  backgroundColor: "#333333",
                  height: responsiveHeight(60),
                  width: responsiveWidth(100),
                  marginTop: responsiveHeight(8),
                }
              : {
                  backgroundColor: "white",
                  height: responsiveHeight(60),
                  width: responsiveWidth(100),
                  marginTop: responsiveHeight(8),
                }
          }
        >
          {error ? (
            <Text
              style={{
                color: "red",
                fontSize: responsiveFontSize(2.2),
                textAlign: "center",
              }}
            >
              {error}
            </Text>
          ) : null}

          <TextInput
            style={styles.style_Rectangle}
            onChangeText={(value) => onChange(value, "motorName")}
            value={motorName}
            label={
              selectedlang == 0
                ? translation[102].English
                : translation[102].Urdu
            }
            keyboardType="default"
            mode="outlined"
            activeOutlineColor="rgba(10,76,118,1)"
            outlineColor="rgba(24,154,180,1)"
            editable
            autoCapitalize="none"
          />
          <TextInput
            style={[
              styles.style_Rectangle,
              { marginTop: responsiveHeight(14) },
            ]}
            onChangeText={(value) => onChange(value, "motorType")}
            value={motorType}
            label={
              selectedlang == 0
                ? translation[106].English
                : translation[106].Urdu
            }
            keyboardType="default"
            mode="outlined"
            activeOutlineColor="rgba(10,76,118,1)"
            outlineColor="rgba(24,154,180,1)"
            editable
            autoCapitalize="none"
          />
          <TextInput
            style={[
              styles.style_Rectangle,
              { marginTop: responsiveHeight(25) },
            ]}
            onChangeText={(value) => onChange(value, "vehicleNo")}
            value={vehicleNo}
            label={
              (selectedlang == 0
                ? translation[54].English
                : translation[54].Urdu) +
              " " +
              (selectedlang == 0
                ? translation[105].English
                : translation[105].Urdu)
            }
            keyboardType="default"
            mode="outlined"
            activeOutlineColor="rgba(10,76,118,1)"
            outlineColor="rgba(24,154,180,1)"
            editable
            autoCapitalize="none"
          />
          <TextInput
            style={[
              styles.style_Rectangle,
              { marginTop: responsiveHeight(36) },
            ]}
            onChangeText={(value) => onChange(value, "regNo")}
            value={regNo}
            label={
              (selectedlang == 0
                ? translation[57].English
                : translation[57].Urdu) +
              (selectedlang == 0
                ? translation[53].English
                : translation[53].Urdu)
            }
            keyboardType="default"
            mode="outlined"
            activeOutlineColor="rgba(10,76,118,1)"
            outlineColor="rgba(24,154,180,1)"
            editable
            autoCapitalize="none"
          />
        </View>

        <TouchableOpacity
          style={
            selectedApp == 1
              ? [{ backgroundColor: "black" }, styles.save_btn]
              : [{ backgroundColor: "rgba(24,154,180,1)" }, styles.save_btn]
          }
          onPress={handleAddMotors}
        >
          <Text style={styles.save_text}>
            {selectedlang == 0
              ? translation[104].English
              : translation[104].Urdu}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {isLoading ? <AppLoader /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  style_Rectangle: {
    marginLeft: responsiveWidth(8),
    marginTop: responsiveHeight(3),
    position: "absolute",
    width: responsiveWidth(87),
    height: responsiveHeight(9),
    opacity: 1,
    color: "grey",
    backgroundColor: "rgba(217,217,217,1)",
    borderRadius: responsiveWidth(6),
  },
  save_btn: {
    // backgroundColor: "rgba(24,154,180,1)",
    width: responsiveWidth(30),
    height: responsiveHeight(7.5),
    marginTop: responsiveHeight(-6),
    borderRadius: responsiveWidth(3),
    marginLeft: responsiveWidth(35),
  },
  save_text: {
    fontSize: responsiveFontSize(2.5),
    justifyContent: "center",
    textAlign: "center",
    letterSpacing: 1.0,
    fontFamily: "poppins-bold",
    paddingTop: responsiveHeight(1.6),
    color: "white",
  },
});
