import React, { useEffect, useCallback, useState } from "react";
import { Text, View, TouchableOpacity, Image, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  MaterialCommunityIcons,
  FontAwesome5,
  Entypo,
} from "@expo/vector-icons";
import { globalStyles } from "../styles/globalStyles";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { userLogin } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NOTIFI_API_URL } from "../Custom_Api_Calls/api_calls";
import { useFocusEffect } from "@react-navigation/native";
import { translation } from "../components/translation";

export default function CitizenScreen({ navigation }) {
  const { profile, badgeValue, setBadgeValue, greeting, addressText } =
    userLogin();
  const [selectedlang, setselectedlang] = useState(0);
  const [selectedApp, setselectedApp] = useState(0);

  /*************** Fetch Badge Value on Notification Icon *************/
  useEffect(() => {
    const getBadgeValue = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          const response = await fetch(`${NOTIFI_API_URL}/badge_value`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "auth-token": token,
            },
          });
          const data = await response.json();
          setBadgeValue(data.badgeValue); // set the badge value for the current user
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    getBadgeValue();
  }, []);

  /*************** Reset Badge Value on Notification Icon after being clicked *************/
  const reset_notification_badge = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        await fetch(`${NOTIFI_API_URL}/reset_notification_badge`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        });
        setBadgeValue(0); // set the badge value for the current user
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  /********** Method for onPress function **********/
  const notificationIconPressing = () => {
    navigation.navigate("Citizen_Notifications");
    reset_notification_badge();
  };

  /********** Method to fetch Citizen Language **********/
  const fetchLanguage = async () => {
    try {
      const authToken = await AsyncStorage.getItem("token");
      const response = await fetch(
        "http://192.168.8.100:8000/api/language/citizen_languageId",
        {
          headers: {
            "auth-token": authToken,
          },
        }
      );
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
      const response = await fetch(
        "http://192.168.8.100:8000/api/theme/citizen_themeId",
        {
          headers: {
            "auth-token": authToken,
          },
        }
      );
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
          ? [{ backgroundColor: "#292424", flex: 1 }, globalStyles.twMain]
          : [{ backgroundColor: "white" }, globalStyles.twMain]
      }
    >
      {/* Drawer icon */}
      <View
        style={[
          globalStyles.Notifi_MenuIcon,
          { marginLeft: responsiveWidth(6), width: responsiveWidth(10) },
        ]}
      >
        <Pressable
          onPress={() => {
            navigation.openDrawer();
          }}
        >
          <Ionicons
            name="menu"
            size={33}
            style={selectedApp == 1 ? { color: "white" } : { color: "black" }}
          />
        </Pressable>
      </View>

      {/* Notification */}
      <View
        style={[
          globalStyles.Notifi_MenuIcon,
          { marginLeft: responsiveWidth(85) },
        ]}
      >
        <TouchableOpacity onPress={notificationIconPressing}>
          {badgeValue > 0 && (
            <Text style={globalStyles.NotificationBadge}>{badgeValue}</Text>
          )}
          <Ionicons
            name="notifications"
            size={33}
            style={selectedApp == 1 ? { color: "white" } : { color: "black" }}
          />
        </TouchableOpacity>
      </View>

      {/* Location Top */}
      <View style={globalStyles.locationTop}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Places");
          }}
        >
          <Text
            style={
              selectedApp == 1
                ? [{ color: "white", flex: 1 }, globalStyles.locationTop_Text]
                : [{ color: "black" }, globalStyles.locationTop_Text]
            }
          >
            {addressText}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Citizen Profile */}
      <View style={globalStyles.tw_ProfileGroup2}>
        <Text
          style={
            selectedApp == 1
              ? [{ color: "white", flex: 1 }, globalStyles.tw_Profile_Name]
              : [{ color: "black" }, globalStyles.tw_Profile_Name]
          }
        >
          Hi, {profile.name.charAt(0).toUpperCase() + profile.name.slice(1)}
        </Text>
        <Text
          style={
            selectedApp == 1
              ? [
                  { color: "white", flex: 1 },
                  globalStyles.tw_Profile_goodMorning,
                ]
              : [{ color: "black" }, globalStyles.tw_Profile_goodMorning]
          }
        >
          {greeting}
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("CitizenProfile");
          }}
        >
          <Ionicons
            name="md-person-circle-outline"
            size={50}
            style={selectedApp == 1 ? { color: "white" } : { color: "black" }}
          />
        </TouchableOpacity>
      </View>

      {/* Citizen Search */}
      <View style={globalStyles.searchIcon}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("CitizenSearch");
          }}
        >
          <Ionicons
            name="search"
            size={30}
            style={selectedApp == 1 ? { color: "white" } : { color: "black" }}
          />
        </TouchableOpacity>
      </View>

      {/* Pay challan rect */}
      <View
        style={
          selectedApp == 1
            ? [{ backgroundColor: "grey" }, globalStyles.easeTraffic_Rect]
            : [
                { backgroundColor: "rgba(10,76,118,1)" },
                globalStyles.easeTraffic_Rect,
              ]
        }
      ></View>

      {/* Text ...'Its easy to pay' */}
      <Text style={globalStyles.itsEasy_toPay}>
        {selectedlang == 0 ? translation[41].English : translation[41].Urdu}{" "}
        {"\n"}
        {selectedlang == 0 ? translation[42].English : translation[42].Urdu}
      </Text>

      {/* QR Scanner */}
      <View
        style={
          selectedApp == 1
            ? [{ backgroundColor: "#292424" }, globalStyles.viewPlaces_btn]
            : [
                { backgroundColor: "rgba(24,154,180,1)" },
                globalStyles.viewPlaces_btn,
              ]
        }
      >
        <View style={globalStyles.viewPlaces}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("QrScanner");
            }}
          >
            <Text
              style={
                selectedlang == 1
                  ? [{ textAlign: "left" }, globalStyles.viewPlaces_Text]
                  : globalStyles.viewPlaces_Text
              }
            >
              {selectedlang == 0
                ? translation[29].English
                : translation[29].Urdu}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Image
        style={{
          marginTop: responsiveHeight(24.5),
          marginLeft: responsiveWidth(54),
          zIndex: 1,
          width: responsiveWidth(42),
          height: responsiveHeight(20),
        }}
        source={require("../assets/images/citizen.png")}
      />

      {/* Pay Challan */}
      <View
        style={
          selectedApp == 1
            ? [{ backgroundColor: "grey" }, globalStyles.payChallan_Rect]
            : [
                { backgroundColor: "rgba(24,154,180,1)" },
                globalStyles.payChallan_Rect,
              ]
        }
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("PayChallan");
          }}
        >
          <MaterialCommunityIcons
            name="credit-card-check-outline"
            size={100}
            color="black"
            style={{
              marginTop: responsiveHeight(1),
              marginLeft: responsiveWidth(9),
            }}
          />
          <Text
            style={
              selectedlang == 1
                ? [{ textAlign: "left" }, globalStyles.payChallan_Text]
                : globalStyles.payChallan_Text
            }
          >
            {selectedlang == 0 ? translation[36].English : translation[36].Urdu}{" "}
            {"\n"}
            {selectedlang == 0 ? translation[37].English : translation[37].Urdu}
          </Text>
        </TouchableOpacity>
      </View>

      {/* File Complaint */}
      <View
        style={
          selectedApp == 1
            ? [
                { backgroundColor: "grey", marginTop: responsiveHeight(45) },
                globalStyles.fileHistory_Complaints_Rect,
              ]
            : [
                {
                  backgroundColor: "rgba(24,154,180,1)",
                  marginTop: responsiveHeight(45),
                },
                globalStyles.fileHistory_Complaints_Rect,
              ]
        }
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("FileComplaint");
          }}
        >
          <Entypo
            name="emoji-sad"
            size={33}
            color="black"
            style={{
              marginTop: responsiveHeight(2.5),
              marginLeft: responsiveWidth(24),
            }}
          />
          <FontAwesome5
            name="comment-alt"
            size={60}
            color="black"
            style={{
              marginTop: responsiveHeight(-6),
              marginLeft: responsiveWidth(20),
            }}
          />
          <Text
            style={
              selectedlang == 1
                ? [
                    { textAlign: "right", left: 18, top: 8 },
                    globalStyles.fileHistoryComplaints_Text,
                  ]
                : [
                    { left: 18, top: 8 },
                    globalStyles.fileHistoryComplaints_Text,
                  ]
            }
          >
            {" "}
            {selectedlang == 0
              ? translation[38].English
              : translation[38].Urdu}{" "}
            {"\n"}
            {selectedlang == 0
              ? translation[39].English
              : translation[39].Urdu}{" "}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Challan History */}
      <View
        style={
          selectedApp == 1
            ? [
                { backgroundColor: "grey", marginTop: responsiveHeight(60) },
                globalStyles.fileHistory_Complaints_Rect,
              ]
            : [
                {
                  backgroundColor: "rgba(24,154,180,1)",
                  marginTop: responsiveHeight(60),
                },
                globalStyles.fileHistory_Complaints_Rect,
              ]
        }
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ChallanHistory");
          }}
        >
          <Image
            source={require("../assets/images/timer.png")}
            style={{
              width: responsiveWidth(17.5),
              height: responsiveHeight(9),
              marginTop: responsiveHeight(2.5),
              marginLeft: responsiveWidth(4),
            }}
          />

          <Text
            style={
              selectedlang == 1
                ? [{ left: 83 }, globalStyles.fileHistoryComplaints_Text]
                : [{ left: 83 }, globalStyles.fileHistoryComplaints_Text]
            }
          >
            {" "}
            {selectedlang == 0 ? translation[37].English : translation[37].Urdu}
            {"\n"}{" "}
            {selectedlang == 0 ? translation[40].English : translation[40].Urdu}{" "}
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={[
          globalStyles.bottomGroup,
          {
            marginTop: responsiveHeight(0),
            marginLeft: responsiveWidth(2),
            width: responsiveWidth(35),
          },
        ]}
      >
        {/* Settings */}
        <View
          style={
            selectedApp == 1
              ? [{ backgroundColor: "grey" }, globalStyles.settingCircle]
              : [
                  { backgroundColor: "rgba(24,154,180,1)" },
                  globalStyles.settingCircle,
                ]
          }
        >
          <View style={globalStyles.settingIcon}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("CitizenSetting");
              }}
            >
              <Ionicons name="settings" size={30} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <Text
          style={
            selectedApp == 1
              ? [{ color: "white", flex: 1 }, globalStyles.setting_Text]
              : [{ color: "black" }, globalStyles.setting_Text]
          }
        >
          {selectedlang == 0 ? translation[26].English : translation[26].Urdu}
        </Text>

        {/* Places */}
        <View
          style={
            selectedApp == 1
              ? [{ backgroundColor: "grey" }, globalStyles.placesCircle]
              : [
                  { backgroundColor: "rgba(24,154,180,1)" },
                  globalStyles.placesCircle,
                ]
          }
        >
          <View style={globalStyles.placesIcon}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Places");
              }}
            >
              <Ionicons name="location" size={30} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <Text
          style={
            selectedApp == 1
              ? [{ color: "white", flex: 1 }, globalStyles.places_Text]
              : [{ color: "black" }, globalStyles.places_Text]
          }
        >
          {selectedlang == 0 ? translation[31].English : translation[31].Urdu}
        </Text>

        {/* Guidelines */}
        <View
          style={
            selectedApp == 1
              ? [{ backgroundColor: "grey" }, globalStyles.rulesCircle]
              : [
                  { backgroundColor: "rgba(24,154,180,1)" },
                  globalStyles.rulesCircle,
                ]
          }
        >
          <View style={globalStyles.rulesIcon}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Guidelines");
              }}
            >
              <Ionicons name="newspaper" size={30} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <Text
          style={
            selectedApp == 1
              ? [{ color: "white", flex: 1 }, globalStyles.rules_Text]
              : [{ color: "black" }, globalStyles.rules_Text]
          }
        >
          {selectedlang == 0 ? translation[18].English : translation[18].Urdu}
        </Text>

        {/* Help */}
        <View
          style={
            selectedApp == 1
              ? [{ backgroundColor: "grey" }, globalStyles.helpCircle]
              : [
                  { backgroundColor: "rgba(24,154,180,1)" },
                  globalStyles.helpCircle,
                ]
          }
        >
          <View style={globalStyles.helpIcon}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Help");
              }}
            >
              <MaterialCommunityIcons
                name="chat-question"
                size={30}
                color="black"
              />
            </TouchableOpacity>
          </View>
        </View>
        <Text
          style={
            selectedApp == 1
              ? [{ color: "white", flex: 1 }, globalStyles.help_Text]
              : [{ color: "black" }, globalStyles.help_Text]
          }
        >
          {selectedlang == 0 ? translation[27].English : translation[27].Urdu}
        </Text>
      </View>
    </View>
  );
}
