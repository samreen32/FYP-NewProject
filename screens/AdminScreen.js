import React, { useEffect, useState, useCallback } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { AntDesign, Ionicons, Entypo } from "@expo/vector-icons";
import { globalStyles } from "../styles/globalStyles";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { userLogin } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  LANG_API_URL,
  NOTIFI_API_URL,
  THEME_API_URL,
} from "../Custom_Api_Calls/api_calls";
import { translation } from "../components/translation";
import { useFocusEffect } from "@react-navigation/native";

export default function AdminScreen({ navigation }) {
  const [selectedlang, setselectedlang] = useState(0);
  const [selectedApp, setselectedApp] = useState(0);
  const {
    profile,
    greeting,
    badgeValue,
    setBadgeValue,
    showToast,
    addressText,
  } = userLogin();

  /*************** Fetch Badge Value on Notification Icon *************/
  useEffect(() => {
    const getBadgeValue = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          const response = await fetch(`${NOTIFI_API_URL}/adminBadge_value`, {
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
        await fetch(`${NOTIFI_API_URL}/adminReset_notifi_badge`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        });
        setBadgeValue(0); // set the badge value for the current user
      }
    } catch (error) {
      showToast(error.message);
    }
  };

  /********** Method for onPress function **********/
  const notificationIconPressing = () => {
    navigation.navigate("Admin_Notifications");
    reset_notification_badge();
  };

  /********** Method to fetch Admin Language **********/
  const fetchLanguage = async () => {
    try {
      const authToken = await AsyncStorage.getItem("token");
      const response = await fetch(`${LANG_API_URL}/admin_languageId`, {
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

  /********** Method to fetch Admin Theme **********/
  const fetchTheme = async () => {
    try {
      const authToken = await AsyncStorage.getItem("token");
      const response = await fetch(`${THEME_API_URL}/admin_themeId`, {
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
          ? [{ backgroundColor: "#242124", flex: 1 }, globalStyles.twMain]
          : [{ backgroundColor: "white" }, globalStyles.twMain]
      }
    >
      {/* Drawer icon */}
      <View
        style={[
          globalStyles.Notifi_MenuIcon,
          {
            marginLeft: responsiveWidth(6),
            width: responsiveWidth(10),
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.openDrawer();
          }}
        >
          <Ionicons
            name="menu"
            size={33}
            style={selectedApp == 1 ? { color: "white" } : { color: "black" }}
          />
        </TouchableOpacity>
      </View>

      {/* Notifications */}
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

      {/* Location top */}
      <View style={globalStyles.locationTop}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Places_Admin");
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

      {/* Profile */}
      <View style={globalStyles.tw_ProfileGroup2}>
        <View>
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
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("AdminProfile");
          }}
        >
          <Ionicons
            name="md-person-circle-outline"
            size={50}
            style={selectedApp == 1 ? { color: "white" } : { color: "black" }}
          />
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={globalStyles.searchIcon}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("AdminSearch");
          }}
        >
          <Ionicons
            name="search"
            size={30}
            style={selectedApp == 1 ? { color: "white" } : { color: "black" }}
          />
        </TouchableOpacity>
      </View>

      {/* Manage Challan rect */}
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
      <View>
        <Text style={globalStyles.letsEase_theTraffic}>
          {selectedlang == 0 ? translation[92].English : translation[92].Urdu}
        </Text>
      </View>

      {/* Manage Challan */}
      <View
        style={
          selectedApp == 1
            ? [
                {
                  backgroundColor: "black",
                  width: responsiveWidth(38),
                  height: responsiveHeight(5.5),
                  position: "absolute",
                  marginTop: responsiveHeight(36),
                  marginLeft: responsiveWidth(8),
                  marginRight: responsiveWidth(6),
                  borderRadius: responsiveWidth(10),
                  opacity: 1,
                },
              ]
            : [
                {
                  backgroundColor: "rgba(24,154,180,1)",
                  width: responsiveWidth(38),
                  height: responsiveHeight(5.5),
                  position: "absolute",
                  marginTop: responsiveHeight(36),
                  marginLeft: responsiveWidth(8),
                  marginRight: responsiveWidth(6),
                  borderRadius: responsiveWidth(10),
                  opacity: 1,
                },
              ]
        }
      >
        <View
          style={[
            globalStyles.viewPlaces,
            { width: responsiveWidth(35), height: responsiveHeight(5) },
          ]}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ManageChallan");
            }}
          >
            <Text
              style={[
                globalStyles.viewPlaces_Text,
                { fontSize: responsiveFontSize(1.8) },
              ]}
            >
              {selectedlang == 0
                ? translation[91].English
                : translation[91].Urdu}{" "}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Image
        style={{
          marginTop: responsiveHeight(21.5),
          marginLeft: responsiveWidth(50),
          zIndex: 1,
          width: responsiveWidth(48),
          height: responsiveHeight(23),
        }}
        source={require("../assets/images/repair.png")}
      />

      {/* Remove Warden */}
      <View
        style={
          selectedApp == 1
            ? [
                {
                  backgroundColor: "grey",
                  height: responsiveHeight(23),
                  position: "absolute",
                  width: responsiveWidth(45),
                  marginTop: responsiveHeight(45),
                  marginLeft: responsiveWidth(4),
                  marginRight: responsiveWidth(6),
                  borderRadius: responsiveWidth(10),
                  opacity: 1,
                },
                // globalStyles.payChallan_Rect,
              ]
            : [
                {
                  backgroundColor: "rgba(24,154,180,1)",
                  height: responsiveHeight(23),
                  position: "absolute",
                  width: responsiveWidth(45),
                  marginTop: responsiveHeight(45),
                  marginLeft: responsiveWidth(4),
                  marginRight: responsiveWidth(6),
                  borderRadius: responsiveWidth(10),
                  opacity: 1,
                },
                // globalStyles.payChallan_Rect,
              ]
        }
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("RemoveWarden");
          }}
        >
          <AntDesign
            name="minuscircle"
            size={50}
            color="red"
            style={{
              marginTop: responsiveHeight(3),
              marginLeft: responsiveWidth(15),
            }}
          />
          <Text
            style={[
              globalStyles.payChallan_Text,
              {
                marginTop: responsiveHeight(11),
                marginLeft: responsiveWidth(7),
                fontSize: responsiveFontSize(3.2),
              },
            ]}
          >
            {selectedlang == 0 ? translation[89].English : translation[89].Urdu}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Handle Complaints */}
      <View
        style={
          selectedApp == 1
            ? [
                {
                  backgroundColor: "grey",
                  height: responsiveHeight(17),
                  marginTop: responsiveHeight(69),
                  position: "absolute",
                  width: responsiveWidth(45),
                  marginLeft: responsiveWidth(4),
                  marginRight: responsiveWidth(6),
                  borderRadius: responsiveWidth(10),
                  opacity: 1,
                },
                // globalStyles.payChallan_Rect,
              ]
            : [
                {
                  backgroundColor: "rgba(24,154,180,1)",
                  marginTop: responsiveHeight(69),
                  height: responsiveHeight(17),
                  position: "absolute",
                  width: responsiveWidth(45),
                  marginLeft: responsiveWidth(4),
                  marginRight: responsiveWidth(6),
                  borderRadius: responsiveWidth(10),
                  opacity: 1,
                },
                // globalStyles.payChallan_Rect,
              ]
        }
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("HandleComplaints");
          }}
        >
          <AntDesign
            name="customerservice"
            size={55}
            color="black"
            style={{
              marginTop: responsiveHeight(1),
              marginLeft: responsiveWidth(15.5),
            }}
          />
          <Text
            style={[
              globalStyles.payChallan_Text,
              {
                marginTop: responsiveHeight(7.5),
                marginLeft: responsiveWidth(5),
                fontSize: responsiveFontSize(2.5),
              },
            ]}
          >
            {" "}
            {selectedlang == 0 ? translation[90].English : translation[90].Urdu}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Places */}
      <View
        style={
          selectedApp == 1
            ? [
                {
                  backgroundColor: "grey",
                  marginTop: responsiveHeight(45),
                  height: responsiveHeight(17),
                  position: "absolute",
                  width: responsiveWidth(45),
                  marginLeft: responsiveWidth(51),
                  marginRight: responsiveWidth(6),
                  borderRadius: responsiveWidth(10),
                  opacity: 1,
                },
                // globalStyles.fileHistory_Complaints_Rect,
              ]
            : [
                {
                  backgroundColor: "rgba(24,154,180,1)",
                  marginTop: responsiveHeight(45),
                  height: responsiveHeight(17),
                  position: "absolute",
                  width: responsiveWidth(45),
                  marginLeft: responsiveWidth(51),
                  marginRight: responsiveWidth(6),
                  borderRadius: responsiveWidth(10),
                  opacity: 1,
                },
                //globalStyles.fileHistory_Complaints_Rect,
              ]
        }
      >
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Places_Admin");
            }}
          >
            <Entypo
              name="location"
              size={50}
              color="black"
              style={{
                marginTop: responsiveHeight(1),
                marginLeft: responsiveWidth(14.5),
              }}
            />
            <Text
              style={[
                globalStyles.fileHistoryComplaints_Text,
                {
                  marginLeft: responsiveWidth(13),
                  marginTop: responsiveHeight(8),
                  fontSize: responsiveFontSize(2.5),
                },
              ]}
            >
              {" "}
              {selectedlang == 0
                ? translation[93].English
                : translation[93].Urdu}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={
          selectedApp == 1
            ? [
                {
                  backgroundColor: "grey",
                  marginTop: responsiveHeight(63),
                  height: responsiveHeight(23),
                  position: "absolute",
                  width: responsiveWidth(45),
                  marginLeft: responsiveWidth(51),
                  marginRight: responsiveWidth(6),
                  borderRadius: responsiveWidth(10),
                  opacity: 1,
                },
                //globalStyles.fileHistory_Complaints_Rect,
              ]
            : [
                {
                  backgroundColor: "rgba(24,154,180,1)",
                  marginTop: responsiveHeight(63),
                  height: responsiveHeight(23),
                  position: "absolute",
                  width: responsiveWidth(45),
                  marginLeft: responsiveWidth(51),
                  marginRight: responsiveWidth(6),
                  borderRadius: responsiveWidth(10),
                  opacity: 1,
                },
                //globalStyles.fileHistory_Complaints_Rect,
              ]
        }
      >
        {/* Manage Challan */}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ManageChallan");
          }}
        >
          <Ionicons
            name="settings"
            size={50}
            color="black"
            style={{
              marginTop: responsiveHeight(2),
              marginLeft: responsiveWidth(19),
            }}
          />

          <Ionicons
            name="settings-outline"
            size={40}
            color="black"
            style={{
              marginTop: responsiveHeight(-6),
              marginLeft: responsiveWidth(10),
            }}
          />
          <Ionicons
            name="settings-outline"
            size={42}
            color="white"
            style={{
              marginTop: responsiveHeight(-2),
              marginLeft: responsiveWidth(15),
            }}
          />
          <Text
            style={[
              globalStyles.fileHistoryComplaints_Text,
              {
                marginLeft: responsiveWidth(10),
                marginTop: responsiveHeight(12.5),
                fontSize: responsiveFontSize(2.5),
              },
            ]}
          >
            {selectedlang == 0 ? translation[91].English : translation[91].Urdu}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
