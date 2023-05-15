import { React, useState, useEffect, useCallback } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { TextInput } from "react-native-paper";
import { globalStyles } from "../styles/globalStyles";
import { userLogin } from "../context/AuthContext";
import AppLoader from "../Loader/AppLoader";
import { translation } from "./translation";
import { useFocusEffect } from "@react-navigation/native";
import {
  LANG_API_URL,
  THEME_API_URL,
  AUTH_API_URL,
} from "../Custom_Api_Calls/api_calls";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Citizen_ChangePassword({ navigation }) {
  const [selectedlang, setselectedlang] = useState(0);
  const [selectedApp, setselectedApp] = useState(0);
  const [credentials, setCredentials] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const { oldPassword, newPassword, confirmPassword } = credentials;
  const {
    isLoading,
    setIsLoading,
    isValidObjField,
    updateError,
    isPassSecure,
    setIsPassSecure,
    error,
    setError,
    showToast,
  } = userLogin();

  /*************** Function to change password ********************/
  const handleChangePassword = async () => {
    if (!isValidObjField(credentials)) {
      return updateError("Require all fields!", setError);
    }
    if (!newPassword.trim() || newPassword.length < 5) {
      return updateError("New password must be 5 character long!", setError);
    }
    if (newPassword !== confirmPassword) {
      return updateError("Passwords do not match!", setError);
    }
    if (oldPassword === newPassword) {
      return updateError("Please enter a different password!", setError);
    }
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        setIsLoading(true);
        const response = await fetch(
          `${AUTH_API_URL}/citizen_change_password`,
          {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "auth-token": token,
            },
            body: JSON.stringify({
              oldPassword: oldPassword,
              newPassword: newPassword,
            }),
          }
        );
        const responseData = await response.json();
        if (responseData.success) {
          showToast("Your password changed successfully.");
          navigation.goBack();
          setIsLoading(false);
        } else {
          updateError("Old password is not correct!", setError);
          setIsLoading(false);
        }
      }
    } catch (error) {
      showToast(error, "Failed to change password.");
      setIsLoading(false);
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
          {selectedlang == 0 ? translation[122].English : translation[122].Urdu}{" "}
        </Text>
        <View style={{ width: 24 }}></View>
      </View>

      <ScrollView>
        <View
          style={{
            marginTop: responsiveHeight(12),
            alignItems: "center",
          }}
        >
          {error ? (
            <Text
              style={{
                color: "red",
                fontSize: responsiveFontSize(2.5),
                textAlign: "center",
                marginTop: responsiveHeight(-2),
              }}
            >
              {error}
            </Text>
          ) : null}

          <TextInput
            style={[globalStyles.textInput, { marginTop: responsiveHeight(5) }]}
            onChangeText={(value) => onChange(value, "oldPassword")}
            value={oldPassword}
            label={
              selectedlang == 0
                ? translation[123].English
                : translation[123].Urdu
            }
            keyboardType="alphabet"
            mode="outlined"
            activeOutlineColor="rgba(10,76,118,1)"
            outlineColor="rgba(24,154,180,1)"
            editable
            autoCapitalize="none"
            secureTextEntry={isPassSecure}
            right={
              <TextInput.Icon
                icon={isPassSecure ? "eye" : "eye-off"}
                onPress={() => {
                  setIsPassSecure((prev) => !prev);
                }}
              />
            }
          />

          <TextInput
            style={[
              globalStyles.textInput,
              { marginTop: responsiveHeight(17) },
            ]}
            onChangeText={(value) => onChange(value, "newPassword")}
            value={newPassword}
            label={
              selectedlang == 0
                ? translation[124].English
                : translation[124].Urdu
            }
            keyboardType="alphabet"
            mode="outlined"
            activeOutlineColor="rgba(10,76,118,1)"
            outlineColor="rgba(24,154,180,1)"
            editable
            autoCapitalize="none"
            secureTextEntry={isPassSecure}
            right={
              <TextInput.Icon
                icon={isPassSecure ? "eye" : "eye-off"}
                onPress={() => {
                  setIsPassSecure((prev) => !prev);
                }}
              />
            }
          />

          <TextInput
            style={[
              globalStyles.textInput,
              { marginTop: responsiveHeight(29) },
            ]}
            onChangeText={(value) => onChange(value, "confirmPassword")}
            value={confirmPassword}
            label={
              selectedlang == 0
                ? translation[125].English
                : translation[125].Urdu
            }
            keyboardType="alphabet"
            mode="outlined"
            activeOutlineColor="rgba(10,76,118,1)"
            outlineColor="rgba(24,154,180,1)"
            editable
            autoCapitalize="none"
            secureTextEntry={isPassSecure}
            right={
              <TextInput.Icon
                icon={isPassSecure ? "eye" : "eye-off"}
                onPress={() => {
                  setIsPassSecure((prev) => !prev);
                }}
              />
            }
          />

          <TouchableOpacity
            style={
              selectedApp == 1
                ? [
                    {
                      backgroundColor: "black",
                      marginTop: responsiveHeight(50),
                    },
                    styles.submit_btn,
                  ]
                : [
                    {
                      backgroundColor: "#D9D9D9",
                      marginTop: responsiveHeight(50),
                    },
                    styles.submit_btn,
                  ]
            }
            onPress={() => {
              handleChangePassword();
            }}
          >
            <Text style={styles.submit_text}>Done</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {isLoading ? <AppLoader /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  Help_Text: {
    color: "white",
    textAlign: "center",
    fontSize: responsiveFontSize(3.5),
    textAlign: "center",
    letterSpacing: 1.0,
    fontFamily: "poppins-bold",
    lineheight: 114.99999761581421,
  },
  submit_btn: {
    //backgroundColor: "rgba(10,76,118,1)",
    width: responsiveWidth(30),
    height: responsiveHeight(7),
    borderRadius: responsiveWidth(7),
    // marginTop: responsiveHeight(30),
  },
  submit_text: {
    fontSize: responsiveFontSize(2.5),
    justifyContent: "center",
    textAlign: "center",
    letterSpacing: 1.0,
    color: "white",
    fontFamily: "poppins-bold",
    paddingTop: responsiveHeight(1.6),
  },
  backArrow: {
    marginLeft: responsiveWidth(5),
    marginTop: responsiveHeight(5),
  },
  backArrowInBtn: {
    marginTop: responsiveHeight(2),
    marginLeft: responsiveWidth(27),
  },
});
