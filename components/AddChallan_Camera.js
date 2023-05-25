import React, { useState, useEffect, useCallback } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { Camera } from "expo-camera";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import { translation } from "./translation";
import { LANG_API_URL, THEME_API_URL } from "../Custom_Api_Calls/api_calls";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AddChallan_Camera({ route }) {
  let navigation = useNavigation();
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [cameraImage, setCameraImage] = useState(null);

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
  
  /************** Camera Permissions ************/
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === "granted");
    })();
  }, []);

  if (hasCameraPermission === null) {
    return <View />;
  }

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  /************** Take picture function ************/
  const takePicture = async () => {
    if (camera) {
      const options = { quality: 1, base64: true };
      const { uri } = await camera.takePictureAsync(options);
      setCameraImage({ uri: uri });
    }
  };

  /************** Move image to AddChallan screen ************/
  const handlePicture = () => {
    navigation.navigate("AddChallan", {
      cameraImage,
    });
  };

  if (cameraImage) {
    return (
      <View style={globalStyles.camera}>
        <Image
          style={{ alignSelf: "stretch", flex: 1 }}
          source={{ uri: cameraImage.uri }}
        />
        {/* Upload Image */}
        <TouchableOpacity
          style={[
            selectedApp == 1
              ? { backgroundColor: "grey" }
              : { backgroundColor: "rgba(24,154,180,1)" },
            globalStyles.cameraButtns,
            { width: responsiveWidth(95) },
          ]}
          onPress={handlePicture}
        >
          <Text style={globalStyles.submitChallan_Text}>
            {selectedlang == 0 ? translation[76].English : translation[76].Urdu}{" "}
          </Text>
        </TouchableOpacity>

        {/* Discard picture */}
        <TouchableOpacity
          style={[
            selectedApp == 1
              ? { backgroundColor: "grey" }
              : { backgroundColor: "rgba(24,154,180,1)" },
            globalStyles.cameraButtns,
            { width: responsiveWidth(95) },
          ]}
          onPress={() => setCameraImage(undefined)}
        >
          <Text style={globalStyles.submitChallan_Text}>
            {selectedlang == 0 ? translation[77].English : translation[77].Urdu}{" "}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <Camera style={globalStyles.camera} ref={setCamera}>
      <View style={[globalStyles.camera, { marginTop: responsiveHeight(88) }]}>
        {/* Take picture */}
        <TouchableOpacity
          style={[
            selectedApp == 1
              ? { backgroundColor: "grey" }
              : { backgroundColor: "rgba(24,154,180,1)" },
            globalStyles.cameraButtns,
            { width: responsiveWidth(95) },
          ]}
          onPress={takePicture}
        >
          <Text style={globalStyles.submitChallan_Text}>
            {" "}
            {selectedlang == 0
              ? translation[75].English
              : translation[75].Urdu}{" "}
          </Text>
        </TouchableOpacity>
      </View>
    </Camera>
  );
}
