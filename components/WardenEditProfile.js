import { React, useState, useCallback } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { TextInput } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Progress from "../Loader/Progress";
import { userLogin } from "../context/AuthContext";
import {
  PROFILES_API_URL,
  THEME_API_URL,
  LANG_API_URL,
} from "../Custom_Api_Calls/api_calls";
import { translation } from "./translation";
import { useFocusEffect } from "@react-navigation/native";

export default function WardenEditProfile({ navigation }) {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    phone: "",
    liscenceID: "",
  });
  const { name, email, phone, liscenceID } = credentials;
  const [profileImage, setProfileImage] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const {
    profile,
    setProfile,
    showToast,
    isValidEmail,
    isValidPhone,
    isValidObjField,
    updateError,
    error,
    setError,
  } = userLogin();

  const [selectedlang, setselectedlang] = useState(0);
  const [selectedApp, setselectedApp] = useState(0);

  /******************Function to open image browser for selction*************/
  const openImageSelection = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry need camera roll permission");
    }
    if (status === "granted") {
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
        base64: true,
        exif: true,
      });
      if (!response.canceled && response.assets.length > 0) {
        const { uri } = response.assets[0];
        setProfileImage(uri);
      }
    }
  };

  /***************Function to upload image********************/
  const UploadImage = async () => {
    const formData = new FormData();
    formData.append("profile", {
      name: new Date() + "_profile",
      uri: profileImage,
      type: "image/jpg",
    });
    const DEMO_TOKEN = await AsyncStorage.getItem("token");
    try {
      if (DEMO_TOKEN != null) {
        console.log("tokenresponse", DEMO_TOKEN);
        const response = await axios.post(
          `${PROFILES_API_URL}/wardenprofile`,
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
          // Update the profile state with the new image URL
          const updatedProfile = {
            ...profile,
            avatar: response.data.wardenProfile.avatar,
          };
          setProfile(updatedProfile);
          showToast("New Profile has been set.");
          setUploadProgress(0);
        }
      }
    } catch (e) {
      showToast(`Profile Image error ${e}`);
    }
  };

  /*************** Function to update profile details *************/
  const updateProfileDetails = async (name, email, phone, liscenceID) => {
    try {
      if (!isValidObjField(credentials)) {
        return updateError("Require all fields!", setError);
      }
      if (name.length < 3) {
        return updateError("Name must be 3 character long!", setError);
      }
      if (!isValidEmail(email)) {
        return updateError("Enter a valid emai!", setError);
      }
      if (!isValidPhone(phone)) {
        return updateError("Phone Number is not valid!", setError);
      }
      const token = await AsyncStorage.getItem("token");
      if (token != null) {
        const response = await axios.put(
          `${PROFILES_API_URL}/update_warden_profile`,
          { name, email, phone, liscenceID },
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "auth-token": token,
            },
            onUploadProgress: ({ loaded, total }) =>
              setUploadProgress(loaded / total),
          }
        );
        if (response.data.success) {
          showToast("Your Profile Details Updated.");
          navigation.goBack();
          setCredentials({ name: "", email: "", phone: "", liscenceID: "" });
          setUploadProgress(0);
        } else {
          showToast("Profile Details Not Updated.");
        }
      } else {
        showToast("Token not found");
      }
    } catch (e) {
      showToast(`Error occur: ${e}`);
    }
  };

  const onChange = (value, fieldName) => {
    setCredentials({ ...credentials, [fieldName]: value });
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
            ? [{ backgroundColor: "black" }, styles.purple_background]
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
          <Ionicons
            style={styles.back_icon}
            name={"chevron-back-outline"}
            size={45}
            color={"white"}
          />
          <Text style={styles.Edit_Profile_Text}>
            {selectedlang == 0 ? translation[34].English : translation[34].Urdu}{" "}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.Change_Profile_Rectangle}>
        <TouchableOpacity onPress={openImageSelection} style={styles.uploadBtn}>
          {profileImage ? (
            <Image
              source={{ uri: profileImage }}
              style={{ width: "100%", height: "100%" }}
            />
          ) : profile ? (
            <Image
              source={{
                uri:
                  profile.avatar ||
                  "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
              }}
              style={{ width: "100%", height: "100%" }}
            />
          ) : (
            <Text style={styles.uploadBtnText}>Upload Profile Image</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity>
          {profileImage ? (
            <Text
              style={
                selectedApp == 1
                  ? [{ backgroundColor: "#333333" }, styles.Change_Image_Btn]
                  : [
                      { backgroundColor: "rgba(24,154,180,1)" },
                      styles.Change_Image_Btn,
                    ]
              }
              onPress={UploadImage}
            >
              {selectedlang == 0
                ? translation[62].English
                : translation[62].Urdu}{" "}
            </Text>
          ) : null}
        </TouchableOpacity>
      </View>

      <View
        style={{ height: responsiveHeight(60), width: responsiveWidth(100) }}
      >
        {error ? (
          <Text
            style={{
              color: "red",
              fontSize: responsiveFontSize(2.5),
              textAlign: "center",
              marginTop: responsiveHeight(1),
            }}
          >
            {error}
          </Text>
        ) : null}

        <ScrollView>
          <TextInput
            style={styles.style_Rectangle4}
            onChangeText={(value) => onChange(value, "name")}
            value={name}
            label={
              selectedlang == 0 ? translation[5].English : translation[5].Urdu
            }
            keyboardType="default"
            mode="outlined"
            activeOutlineColor="rgba(10,76,118,1)"
            outlineColor="rgba(24,154,180,1)"
            editable
            autoCapitalize="none"
          />
          <TextInput
            style={styles.style_Rectangle5}
            onChangeText={(value) => onChange(value, "email")}
            value={email}
            label={
              selectedlang == 0 ? translation[6].English : translation[6].Urdu
            }
            keyboardType="default"
            mode="outlined"
            activeOutlineColor="rgba(10,76,118,1)"
            outlineColor="rgba(24,154,180,1)"
            editable
            autoCapitalize="none"
          />
          <TextInput
            style={styles.style_Rectangle6}
            onChangeText={(value) => onChange(value, "liscenceID")}
            value={liscenceID}
            label={
              selectedlang == 0 ? translation[128].English : translation[128].Urdu
            }
            keyboardType="default"
            mode="outlined"
            activeOutlineColor="rgba(10,76,118,1)"
            outlineColor="rgba(24,154,180,1)"
            editable
            autoCapitalize="none"
          />
          <TextInput
            style={styles.style_Rectangle7}
            onChangeText={(value) => onChange(value, "phone")}
            value={phone}
            label={
              selectedlang == 0 ? translation[64].English : translation[64].Urdu
            }
            keyboardType="numeric"
            mode="outlined"
            activeOutlineColor="rgba(10,76,118,1)"
            outlineColor="rgba(24,154,180,1)"
            editable
            autoCapitalize="none"
          />
        </ScrollView>
      </View>

      <TouchableOpacity
        style={
          selectedApp == 1
            ? [{ backgroundColor: "black" }, styles.save_btn]
            : [{ backgroundColor: "rgba(24,154,180,1)" }, styles.save_btn]
        }
        onPress={() => {
          updateProfileDetails(name, email, phone, liscenceID);
        }}
      >
        <Text style={styles.save_text}>
          {selectedlang == 0 ? translation[65].English : translation[65].Urdu}{" "}
        </Text>
      </TouchableOpacity>
      {uploadProgress ? <Progress /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  uploadBtnText: {
    textAlign: "center",
    opacity: 0.3,
    fontSize: responsiveFontSize(1.5),
  },
  uploadBtn: {
    height: responsiveHeight(18),
    width: responsiveWidth(36),
    borderRadius: 125 / 2,
    justifyContent: "center",
    borderWidth: 1,
    overflow: "hidden",
  },
  style_Rectangle4: {
    marginLeft: responsiveWidth(8),
    marginTop: responsiveHeight(2),
    width: responsiveWidth(87),
    height: responsiveHeight(8),
    backgroundColor: "rgba(217,217,217,1)",
  },
  style_Rectangle6: {
    marginLeft: responsiveWidth(8),
    marginTop: responsiveHeight(1),
    width: responsiveWidth(87),
    height: responsiveHeight(8),
    backgroundColor: "rgba(217,217,217,1)",
  },
  style_Rectangle7: {
    marginLeft: responsiveWidth(8),
    marginTop: responsiveHeight(1),
    width: responsiveWidth(87),
    height: responsiveHeight(8),
    backgroundColor: "rgba(217,217,217,1)",
  },
  style_Rectangle5: {
    marginLeft: responsiveWidth(8),
    marginTop: responsiveHeight(1),
    width: responsiveWidth(87),
    height: responsiveHeight(8),
    backgroundColor: "rgba(217,217,217,1)",
  },

  purple_background: {
    //backgroundColor: "rgba(10,76,118,1)",
    width: responsiveWidth(100),
    height: responsiveHeight(30),
  },
  Edit_Profile_Text: {
    color: "white",
    textAlign: "center",
    marginTop: responsiveHeight(-6),
    marginLeft: responsiveWidth(3.5),
    fontSize: responsiveFontSize(3.5),
    letterSpacing: 1.0,
    fontFamily: "poppins-bold",
    //lineheight: 114.99999761581421,
  },
  Change_Profile_Rectangle: {
    height: responsiveHeight(30),
    width: responsiveWidth(85),
    backgroundColor: "#D9D9D9",
    justifyContent: "center",
    marginTop: responsiveHeight(-15),
    marginLeft: responsiveWidth(8),
    borderRadius: responsiveWidth(5),
    alignItems: "center",
  },
  Change_Image_Btn: {
    //backgroundColor: "rgba(24,154,180,1)",
    marginTop: responsiveHeight(2),
    width: responsiveWidth(44),
    height: responsiveHeight(5.7),
    textAlign: "center",
    justifyContent: "center",
    borderRadius: responsiveWidth(8),
    fontSize: responsiveFontSize(2),
    letterSpacing: 1.0,
    fontFamily: "poppins-regular",
    //lineheight: 114.99999761581421,
    color: "white",
    paddingTop: responsiveHeight(1),
  },
  save_btn: {
    //backgroundColor: "rgba(24,154,180,1)",
    width: responsiveWidth(30),
    height: responsiveHeight(7.5),
    marginTop: responsiveHeight(-16),
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
  back_icon: {
    marginTop: responsiveHeight(5),
    marginLeft: responsiveWidth(6),
  },
});
