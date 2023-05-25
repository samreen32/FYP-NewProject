import React, { useState, useCallback } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { TextInput } from "react-native-paper";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { globalStyles } from "../styles/globalStyles";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  CHALLAN_API_URL,
  LANG_API_URL,
  THEME_API_URL,
} from "../Custom_Api_Calls/api_calls";
import axios from "axios";
import { userLogin } from "../context/AuthContext";
import Progress from "../Loader/Progress";
import { useFocusEffect } from "@react-navigation/native";
import { translation } from "./translation";

export default function AddChallan({ navigation, route }) {
  const { challanId, challanNum, cameraImage } = route.params;
  const [challanDetails, setChallanDetails] = useState({
    vehicleNo: "",
    carType: "",
    amount: "",
    anyComment: "",
  });
  const { vehicleNo, carType, amount, anyComment } = challanDetails;
  const [uploadProgress, setUploadProgress] = useState(0);
  const { updateError, error, setError, showToast } = userLogin();
  const [selectedlang, setselectedlang] = useState(0);
  const [selectedApp, setselectedApp] = useState(0);

  /********** Method to fetch Warden Language **********/
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

  /********** Method to fetch Warden Theme **********/
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

  /***************** Function to save challan details ***************/
  const handleChallanDetails = async () => {
    if (vehicleNo == "") {
      return updateError("Enter a Vehicle Number!", setError);
    }
    if (carType == "") {
      return updateError("Enter a Car type!", setError);
    }
    if (amount == "") {
      return updateError("Enter Challan Amount!", setError);
    }
    const formData = new FormData();
    formData.append("vehicleNo", vehicleNo);
    formData.append("carType", carType);
    formData.append("amount", amount);
    formData.append("anyComment", anyComment);

    const DEMO_TOKEN = await AsyncStorage.getItem("token");
    try {
      if (DEMO_TOKEN != null) {
        const response = await axios.put(
          `${CHALLAN_API_URL}/updateChallan/${challanId}`,
          formData,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "multipart/form-data",
              "auth-token": DEMO_TOKEN,
            },
            onUploadProgress: ({ loaded, total }) =>
              setUploadProgress(loaded / total),
          }
        );
        if (response.data.success) {
          showToast("Challan Details has been added.");
          navigation.navigate("AddChallan_PrintDetails", {
            challanId: response.data.updatedChallanDetails._id,
            challanNum,
            cameraImage,
            vehicleNo,
            carType,
            amount,
            anyComment,
          });
          setChallanDetails({
            vehicleNo: "",
            carType: "",
            amount: "",
            anyComment: "",
          });
          setUploadProgress(0);
        } else {
          showToast("Try again after some time!");
        }
      }
    } catch (error) {
      showToast("Error occur", error.message);
    }
  };

  const onChange = (value, fieldName) => {
    setChallanDetails({ ...challanDetails, [fieldName]: value });
  };

  return (
    <View
      style={[
        selectedApp == 1
          ? { backgroundColor: "#33363D", flex: 1 }
          : { backgroundColor: "white" },
      ]}
    >
      <View
        style={[
          selectedApp == 1
            ? { backgroundColor: "black" }
            : { backgroundColor: "rgba(10,76,118,1)" },
          globalStyles.header,
        ]}
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
          {selectedlang == 0 ? translation[96].English : translation[96].Urdu}{" "}
        </Text>
        <View style={{ width: 24 }}></View>
      </View>

      {error ? (
        <Text
          style={{
            color: "red",
            fontSize: responsiveFontSize(2.5),
            textAlign: "center",
            marginTop: responsiveHeight(25),
          }}
        >
          {error}
        </Text>
      ) : null}

      <View
        style={[
          {
            backgroundColor:
              selectedApp === 1 ? "#271F1F" : "rgba(10,76,118,1)",
          },
          globalStyles.easeTraffic_Rect,
          { marginTop: responsiveHeight(16), borderRadius: responsiveWidth(6) },
        ]}
      >
        {cameraImage ? (
          <Image source={{ uri: cameraImage }} style={styles.cameraPicture} />
        ) : (
          <Text>Nothing to Display.</Text>
        )}
      </View>

      <View
        style={[
          globalStyles.bottomGroup,
          {
            width: responsiveWidth(33),
            marginTop: responsiveHeight(7),
            marginLeft: responsiveWidth(0),
          },
        ]}
      >
        <TextInput
          style={globalStyles.textInput}
          onChangeText={(value) => onChange(value, "vehicleNo")}
          value={vehicleNo}
          label={
            selectedlang == 0 ? translation[82].English : translation[82].Urdu
          }
          keyboardType="default"
          mode="outlined"
          activeOutlineColor="rgba(10,76,118,1)"
          outlineColor="rgba(24,154,180,1)"
          editable
          autoCapitalize="none"
        />
        <TextInput
          style={[globalStyles.textInput, { marginTop: responsiveHeight(44) }]}
          onChangeText={(value) => onChange(value, "carType")}
          value={carType}
          label={
            selectedlang == 0 ? translation[83].English : translation[83].Urdu
          }
          keyboardType="default"
          mode="outlined"
          activeOutlineColor="rgba(10,76,118,1)"
          outlineColor="rgba(24,154,180,1)"
          editable
          autoCapitalize="none"
        />
        <TextInput
          style={[globalStyles.textInput, { marginTop: responsiveHeight(56) }]}
          onChangeText={(value) => onChange(value, "amount")}
          value={amount}
          label={
            selectedlang == 0 ? translation[84].English : translation[84].Urdu
          }
          keyboardType="numeric"
          mode="outlined"
          activeOutlineColor="rgba(10,76,118,1)"
          outlineColor="rgba(24,154,180,1)"
          editable
          autoCapitalize="none"
        />
        <TextInput
          style={[globalStyles.textInput, { marginTop: responsiveHeight(68) }]}
          onChangeText={(value) => onChange(value, "anyComment")}
          value={anyComment}
          label={
            selectedlang == 0 ? translation[85].English : translation[85].Urdu
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
        style={[
          selectedApp == 1
            ? { backgroundColor: "grey" }
            : { backgroundColor: "rgba(10,76,118,1)" },
          globalStyles.submitChallan_btn,
          { marginTop: responsiveHeight(87.5) },
        ]}
        onPress={() => {
          handleChallanDetails();
        }}
      >
        <Text style={globalStyles.submitChallan_Text}>
          {selectedlang == 0 ? translation[86].English : translation[86].Urdu}
        </Text>
      </TouchableOpacity>

      {uploadProgress ? <Progress /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  cameraPicture: {
    alignItems: "center",
    justifyContent: "center",
    height: responsiveHeight(15),
    width: responsiveWidth(50),
    backgroundColor: "#D9D9D9",
    marginTop: responsiveHeight(2.5),
    marginLeft: responsiveWidth(21),
    borderRadius: responsiveWidth(7),
  },
});
