import { React, useState, useCallback } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { TextInput } from "react-native-paper";
import { globalStyles } from "../styles/globalStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userLogin } from "../context/AuthContext";
import AppLoader from "../Loader/AppLoader";
import {
  HELP_API_URL,
  LANG_API_URL,
  THEME_API_URL,
} from "../Custom_Api_Calls/api_calls";
import { useFocusEffect } from "@react-navigation/native";
import { translation } from "./translation";

export default function Help_Warden({ navigation }) {
  const [selectedlang, setselectedlang] = useState(0);
  const [selectedApp, setselectedApp] = useState(0);
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [description, setdescription] = useState("");
  const [Any_Comment, setAny_Comment] = useState("");
  const {
    isLoading,
    setIsLoading,
    showToast,
    error,
    setError,
    updateError,
    isValidEmail,
  } = userLogin();

  /*************** Function to save help request for warden ********************/
  const handleHelp = async () => {
    const url = `${HELP_API_URL}/wardenHelp`;
    const data = {
      Name,
      Email,
      description,
      Any_Comment,
    };
    const authToken = await AsyncStorage.getItem("token");
    try {
      if (Name == "") {
        return updateError("Enter your name!", setError);
      }
      if (Email == "") {
        return updateError("Enter your email!", setError);
      }
      if (!isValidEmail(Email)) {
        return updateError("Enter a valid emai!", setError);
      }
      if (description == "") {
        return updateError("Enter a description!", setError);
      }
      setIsLoading(true);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      if (responseData.success) {
        showToast("Form Submitted Successfully!");
        navigation.goBack();
        setIsLoading(false);
      } else {
        showToast("Please fill the Form Correctly!");
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

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
          ? { backgroundColor: "#333333", flex: 1 }
          : { backgroundColor: "white", flex: 1 }
      }
    >
      <View
        style={
          selectedApp == 1
            ? [{ backgroundColor: "grey" }, styles.purple_background]
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
          <Text style={styles.Help_Text}>
            {selectedlang == 0 ? translation[8].English : translation[8].Urdu}
          </Text>
          <Ionicons
            name="arrow-back"
            size={24}
            color="white"
            style={styles.backArrow}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.icon_border}>
        <Ionicons name={"help-circle"} size={160} color={"white"} />
      </View>

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

      <ScrollView>
        <View
          style={{
            marginTop: responsiveHeight(1.5),
          }}
        >
          <TextInput
            style={[
              globalStyles.textInput,
              { marginTop: responsiveHeight(-2) },
            ]}
            onChangeText={setName}
            value={Name}
            label={
              selectedlang == 0 ? translation[9].English : translation[9].Urdu
            }
            keyboardType="alphabet"
            mode="outlined"
            activeOutlineColor="rgba(10,76,118,1)"
            outlineColor="rgba(24,154,180,1)"
            editable
            autoCapitalize="none"
          />
          <TextInput
            style={[
              globalStyles.textInput,
              { marginTop: responsiveHeight(10) },
            ]}
            onChangeText={setEmail}
            value={Email}
            label={
              selectedlang == 0 ? translation[10].English : translation[10].Urdu
            }
            keyboardType="alphabet"
            mode="outlined"
            activeOutlineColor="rgba(10,76,118,1)"
            outlineColor="rgba(24,154,180,1)"
            editable
            autoCapitalize="none"
          />
          <TextInput
            style={[
              globalStyles.textInput,
              { marginTop: responsiveHeight(22) },
            ]}
            onChangeText={setdescription}
            value={description}
            label={
              selectedlang == 0 ? translation[11].English : translation[11].Urdu
            }
            keyboardType="alphabet"
            mode="outlined"
            activeOutlineColor="rgba(10,76,118,1)"
            outlineColor="rgba(24,154,180,1)"
            editable
            autoCapitalize="none"
          />
          <TextInput
            style={[
              globalStyles.textInput,
              { marginTop: responsiveHeight(34) },
            ]}
            onChangeText={setAny_Comment}
            value={Any_Comment}
            label={
              selectedlang == 0 ? translation[12].English : translation[12].Urdu
            }
            keyboardType="alphabet"
            mode="outlined"
            activeOutlineColor="rgba(10,76,118,1)"
            outlineColor="rgba(24,154,180,1)"
            editable
            autoCapitalize="none"
          />
          
          <TouchableOpacity
            style={
              selectedApp == 1
                ? [{ backgroundColor: "grey" }, styles.submit_btn]
                : [{ backgroundColor: "rgba(24,154,180,1)" }, styles.submit_btn]
            }
            onPress={() => {
              handleHelp();
            }}
          >
            <Text style={styles.submit_text}>
              {selectedlang == 0
                ? translation[13].English
                : translation[13].Urdu}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {isLoading ? <AppLoader /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  icon_border: {
    marginTop: responsiveHeight(-17),
    marginLeft: responsiveWidth(27),
  },
  purple_background: {
    width: responsiveWidth(100),
    height: responsiveHeight(30),
  },
  Help_Text: {
    color: "white",
    textAlign: "center",
    marginTop: responsiveHeight(5),
    fontSize: responsiveFontSize(4),
    letterSpacing: 1.0,
    fontFamily: "poppins-bold",
    textTransform: "uppercase",
  },

  submit_btn: {
    width: responsiveWidth(30),
    height: responsiveHeight(7),
    marginTop: responsiveHeight(48),
    borderRadius: responsiveWidth(3),
    marginLeft: responsiveWidth(36),
  },
  submit_text: {
    fontSize: responsiveFontSize(2.5),
    justifyContent: "center",
    textAlign: "center",
    letterSpacing: 1.0,
    color: "white",
    fontFamily: "poppins-bold",
    fontWeight: "bold",
    paddingTop: responsiveHeight(1.6),
  },
  backArrow: {
    left: 20,
    top: -45,
  },
});
