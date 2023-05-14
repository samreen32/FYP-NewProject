import React, { useEffect, useState } from "react";
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
import { CHALLAN_API_URL } from "../Custom_Api_Calls/api_calls";
import { userLogin } from "../context/AuthContext";
import AppLoader from "../Loader/AppLoader";

export default function AddChallan({ navigation, route }) {
  const [cameraImage, setCameraImage] = useState(null);
  const { isLoading, setIsLoading, showToast } = userLogin();

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

  return (
    <>
      <View style={globalStyles.header}>
        <Ionicons
          name="arrow-back"
          size={24}
          color="white"
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text style={globalStyles.headerText}>ADD CHALLAN</Text>
        <View style={{ width: 24 }}></View>
      </View>

      <View
        style={[
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
                  Pick{"\n"}Another
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
                Or
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
                  Capture Another
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
                Capture Image
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
                Pick{"\n"}Image
              </Text>
            </>
          </>
        )}
      </View>

      {cameraImage && (
        <>
          <TouchableOpacity
            style={[
              globalStyles.submitChallan_btn,
              { marginTop: responsiveHeight(87) },
            ]}
            onPress={() => {
              handleAddPicture();
            }}
          >
            <Text style={globalStyles.submitChallan_Text}>Add</Text>
          </TouchableOpacity>
        </>
      )}

      {isLoading ? <AppLoader /> : null}
    </>
  );
}