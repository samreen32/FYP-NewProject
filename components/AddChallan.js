import React, { useEffect, useState, useCallback } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { globalStyles } from "../styles/globalStyles";
import { AntDesign, Ionicons, Entypo } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Card } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  CHALLAN_API_URL,
  LANG_API_URL,
  THEME_API_URL,
} from "../Custom_Api_Calls/api_calls";
import { userLogin } from "../context/AuthContext";
import AppLoader from "../Loader/AppLoader";
import { useFocusEffect } from "@react-navigation/native";
import { translation } from "./translation";

export default function AddChallan({ navigation, route }) {
  const [cameraImage, setCameraImage] = useState(null);
  const { isLoading, setIsLoading, showToast } = userLogin();
  const [selectedlang, setselectedlang] = useState(0);
  const [selectedApp, setselectedApp] = useState(0);

  useEffect(() => {
    if (route.params?.cameraImage) {
      setCameraImage(route.params.cameraImage);
    }
  }, [route.params?.cameraImage]);

  /***************** Image Picker for single image ***************/
  const pickSingleImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need media library permissions to make this work!");
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      const selectedAsset = result.assets[0];
      const image = {
        uri: selectedAsset.uri,
        name: selectedAsset.fileName,
        type: selectedAsset.type,
      };
      setCameraImage(image);
    }
  };

  /***************** Function to add challan image ***************/
  const handleAddPicture = async () => {
    const formData = new FormData();
    formData.append("add_img", {
      uri: cameraImage.uri,
      type: "image/jpeg",
      name: "image.jpg",
    });
    const DEMO_TOKEN = await AsyncStorage.getItem("token");
    try {
      if (DEMO_TOKEN != null) {
        console.log("tokenresponse", DEMO_TOKEN);
        setIsLoading(true);
        const response = await fetch(`${CHALLAN_API_URL}/addChallan`, {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
            "auth-token": DEMO_TOKEN,
          },
          body: formData,
        });
        const responseData = await response.json();
        if (responseData.success) {
          showToast("Challan Image has been added.");
          navigation.navigate("AddChallan_Details", {
            challanId: responseData.saveChallanDetails._id,
            challanNum: responseData.saveChallanDetails.challanNum,
            cameraImage: responseData.saveChallanDetails.add_img,
          });
          setIsLoading(false);
        } else {
          showToast("Try again after some time!");
          setIsLoading(false);
        }
      }
    } catch (error) {
      console.log("Error occur", error.message);
      setIsLoading(false);
    }
  };

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

  return (
    <>
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
          {selectedlang == 0 ? translation[71].English : translation[71].Urdu}{" "}
        </Text>
        <View style={{ width: 24 }}></View>
      </View>

      <View
        style={[
          { backgroundColor: selectedApp === 1 ? "grey" : "rgba(10,76,118,1)" },
          globalStyles.easeTraffic_Rect,
          { height: responsiveHeight(60), marginTop: responsiveHeight(20) },
        ]}
      >
        {cameraImage ? (
          <>
            <View
              style={{
                alignItems: "center",
              }}
            >
              <Card
                style={{
                  width: responsiveWidth(40),
                  height: responsiveHeight(27),
                  marginTop: responsiveHeight(8),
                }}
              >
                <Card.Cover source={{ uri: cameraImage?.uri }} />
              </Card>
              <TouchableOpacity
                style={[
                  globalStyles.searchIcon,
                  {
                    marginTop: responsiveHeight(38),
                    marginLeft: responsiveWidth(30),
                  },
                ]}
                onPress={pickSingleImage}
              >
                <Text
                  style={[
                    globalStyles.locationTop_Text,
                    {
                      color: "white",
                    },
                  ]}
                >
                  {selectedlang == 0
                    ? translation[78].English
                    : translation[78].Urdu}
                </Text>
              </TouchableOpacity>
              <Text
                style={[
                  globalStyles.locationTop_Text,
                  {
                    color: "white",
                    marginTop: responsiveHeight(10.5),
                  },
                ]}
              >
                {selectedlang == 0
                  ? translation[79].English
                  : translation[79].Urdu}
              </Text>
              <TouchableOpacity
                style={[
                  globalStyles.searchIcon,
                  {
                    marginTop: responsiveHeight(50),
                  },
                ]}
                onPress={() => {
                  navigation.navigate("AddChallan_Camera");
                }}
              >
                <Text
                  style={[
                    globalStyles.locationTop_Text,
                    {
                      color: "white",
                    },
                  ]}
                >
                  {selectedlang == 0
                    ? translation[80].English
                    : translation[80].Urdu}{" "}
                </Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <View style={{ marginTop: responsiveHeight(6) }}>
              <TouchableOpacity
                style={[
                  globalStyles.searchIcon,
                  {
                    marginTop: responsiveHeight(5),
                    marginLeft: responsiveWidth(39),
                  },
                ]}
                onPress={() => {
                  navigation.navigate("AddChallan_Camera");
                }}
              >
                <AntDesign name="camera" size={45} color="white" />
              </TouchableOpacity>
              <Text
                style={[
                  globalStyles.locationTop_Text,
                  {
                    marginTop: responsiveHeight(12),
                    marginLeft: responsiveWidth(30),
                    color: "white",
                  },
                ]}
              >
                {selectedlang == 0
                  ? translation[73].English
                  : translation[73].Urdu}{" "}
              </Text>
            </View>
            <>
              <TouchableOpacity
                style={[
                  globalStyles.searchIcon,
                  {
                    marginTop: responsiveHeight(33),
                    marginLeft: responsiveWidth(39),
                  },
                ]}
                onPress={pickSingleImage}
              >
                <Entypo name="images" size={45} color="white" />
              </TouchableOpacity>
              <Text
                style={[
                  globalStyles.locationTop_Text,
                  {
                    marginTop: responsiveHeight(12.5),
                    marginLeft: responsiveWidth(31.5),
                    color: "white",
                  },
                ]}
              >
                {selectedlang == 0
                  ? translation[74].English
                  : translation[74].Urdu}
              </Text>
            </>
          </>
        )}
      </View>

      {cameraImage && (
        <>
          <TouchableOpacity
            style={[
              selectedApp == 1
                ? [
                    {
                      backgroundColor: "grey",
                      marginTop: responsiveHeight(87),
                    },
                    globalStyles.submitChallan_btn,
                  ]
                : [
                    {
                      backgroundColor: "rgba(24,154,180,1)",
                      marginTop: responsiveHeight(87),
                    },
                    globalStyles.submitChallan_btn,
                  ],
            ]}
            onPress={() => {
              handleAddPicture();
            }}
          >
            <Text style={globalStyles.submitChallan_Text}>
              {" "}
              {selectedlang == 0
                ? translation[81].English
                : translation[81].Urdu}
            </Text>
          </TouchableOpacity>
        </>
      )}

      {isLoading ? <AppLoader /> : null}
    </>
  );
}
