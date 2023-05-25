import React, { useEffect, useCallback, useState } from "react";
import { Image, Text, View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons, Fontisto, Ionicons } from "@expo/vector-icons";
import { globalStyles } from "../styles/globalStyles";
import {
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

export default function WardenScreen({ navigation }) {
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
          const response = await fetch(`${NOTIFI_API_URL}/wardenBadge_value`, {
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
        await fetch(`${NOTIFI_API_URL}/wardenReset_notifi_badge`, {
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
    navigation.navigate("Warden_Notifications");
    reset_notification_badge();
  };

 

  return (
    <View
      style={
        selectedApp == 1
          ? [{ backgroundColor: "#242124", flex: 1 }, globalStyles.twMain]
          : [{ backgroundColor: "white" }, globalStyles.twMain]
      }
    >
      {/* Drawer icon*/}
      <View
        style={[
          globalStyles.Notifi_MenuIcon,
          { marginLeft: responsiveWidth(6), width: responsiveWidth(10) },
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
            navigation.navigate("Places_Warden");
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

      {/* Warden Profile */}
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
            navigation.navigate("WardenProfile");
          }}
        >
          <Ionicons
            name="md-person-circle-outline"
            size={50}
            style={selectedApp == 1 ? { color: "white" } : { color: "black" }}
          />
        </TouchableOpacity>
      </View>

      {/* Warden Search */}
      <View style={globalStyles.searchIcon}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("WardenSearch");
          }}
        >
          <Ionicons
            name="search"
            size={30}
            style={selectedApp == 1 ? { color: "white" } : { color: "black" }}
          />
        </TouchableOpacity>
      </View>

      {/* Ease traffic rect */}
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
          {selectedlang == 0 ? translation[66].English : translation[66].Urdu}
        </Text>
      </View>

      {/* Places */}
      <View
        style={
          selectedApp == 1
            ? [{ backgroundColor: "black" }, globalStyles.viewPlaces_btn]
            : [
                { backgroundColor: "rgba(24,154,180,1)" },
                globalStyles.viewPlaces_btn,
              ]
        }
      >
        <View style={globalStyles.viewPlaces}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Places_Warden");
            }}
          >
            <Text
              style={[
                selectedlang == 1
                  ? { textAlign: "left" }
                  : { textAlign: "auto" },
                globalStyles.viewPlaces_Text,
              ]}
            >
              {selectedlang == 0
                ? translation[93].English
                : translation[93].Urdu}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Image
        style={{
          marginTop: responsiveHeight(21),
          marginLeft: responsiveWidth(50),
          width: responsiveWidth(47),
          height: responsiveHeight(22),
        }}
        source={require("../assets/images/car-park.png")}
      />

      {/* Add Challan */}
      <View
        style={
          selectedApp == 1
            ? [
                { backgroundColor: "grey", marginLeft: responsiveWidth(4) },
                globalStyles.challan_Rect,
              ]
            : [
                {
                  backgroundColor: "rgba(24,154,180,1)",
                  marginLeft: responsiveWidth(4),
                },
                globalStyles.challan_Rect,
              ]
        }
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("AddChallan");
          }}
        >
          <Ionicons
            name="create"
            size={105}
            color="black"
            style={{
              marginTop: responsiveHeight(-1),
              marginLeft: responsiveWidth(17),
            }}
          />
          <Text
            style={[
              selectedlang == 1
                ? { textAlign: "right" }
                : { textAlign: "left" },
              globalStyles.addView_Challan_Text,
              { width: responsiveWidth(25), height: responsiveHeight(10) },
            ]}
          >
            {selectedlang == 0 ? translation[71].English : translation[71].Urdu}
          </Text>
        </TouchableOpacity>
      </View>

      {/* ViewComplaints */}
      <View
        style={
          selectedApp == 1
            ? [
                { backgroundColor: "grey", marginLeft: responsiveWidth(51) },
                globalStyles.challan_Rect,
              ]
            : [
                {
                  backgroundColor: "rgba(24,154,180,1)",
                  marginLeft: responsiveWidth(51),
                },
                globalStyles.challan_Rect,
              ]
        }
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ViewComplaints");
          }}
        >
          <Fontisto
            name="commenting"
            size={40}
            color="white"
            style={{
              marginTop: responsiveHeight(2.5),
              marginLeft: responsiveWidth(31),
              zIndex: 1,
            }}
          />
          <MaterialCommunityIcons
            name="comment-multiple"
            size={97}
            color="black"
            style={{
              marginTop: responsiveHeight(-7.5),
              marginLeft: responsiveWidth(16),
            }}
          />
          <Text
            style={[
              globalStyles.addView_Challan_Text,
              { width: responsiveWidth(29), height: responsiveHeight(9) },
            ]}
          >
            {selectedlang == 0 ? translation[68].English : translation[68].Urdu}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={globalStyles.hisStat_Group}>
        {/* Challan History */}
        <View
          style={
            selectedApp == 1
              ? [
                  {
                    backgroundColor: "grey",
                    width: responsiveWidth(54),
                    marginLeft: responsiveWidth(1),
                  },
                  globalStyles.hisStat_btn,
                ]
              : [
                  {
                    backgroundColor: "rgba(24,154,180,1)",
                    marginLeft: responsiveWidth(1),
                    width: responsiveWidth(54),
                  },
                  globalStyles.hisStat_btn,
                ]
          }
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ChallanHistory_Warden");
            }}
          >
            <Text
              style={[
                selectedlang == 1
                  ? [
                      {
                        width: responsiveWidth(29),
                        marginLeft: responsiveWidth(15),
                      },
                      globalStyles.hisStat_Text,
                    ]
                  : {
                      width: responsiveWidth(29),
                      marginLeft: responsiveWidth(7),
                    },
                globalStyles.hisStat_Text,
              ]}
            >
              {selectedlang == 0
                ? translation[69].English
                : translation[69].Urdu}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Statistics */}
        <View
          style={
            selectedApp == 1
              ? [
                  {
                    backgroundColor: "#333333",
                    width: responsiveWidth(53),
                    marginLeft: responsiveWidth(40),
                  },
                  globalStyles.hisStat_btn,
                ]
              : [
                  {
                    backgroundColor: "rgba(10,76,118,1)",
                    marginLeft: responsiveWidth(40),
                    width: responsiveWidth(53),
                  },
                  globalStyles.hisStat_btn,
                ]
          }
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Statistics");
            }}
          >
            <Text
              style={[
                selectedlang == 1
                  ? [
                      { left: 65, width: responsiveWidth(33) },
                      globalStyles.hisStat_Text,
                    ]
                  : { width: responsiveWidth(33), left: 40 },
                globalStyles.hisStat_Text,
              ]}
            >
              {selectedlang == 0
                ? translation[70].English
                : translation[70].Urdu}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={[
          globalStyles.bottomGroup,
          {
            width: responsiveWidth(35),
            marginTop: responsiveHeight(-1),
            marginLeft: responsiveWidth(2),
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
                navigation.navigate("WardenSetting");
              }}
            >
              <Ionicons name="settings" size={30} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <Text
          style={[
            selectedApp == 1
              ? [{ color: "white" }, globalStyles.setting_Text]
              : [{ color: "black" }, globalStyles.setting_Text],
            selectedlang == 1
              ? [{ left: 8 }, globalStyles.setting_Text]
              : globalStyles.setting_Text,
          ]}
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
                navigation.navigate("Places_Warden");
              }}
            >
              <Ionicons name="location" size={30} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <Text
          style={[
            selectedApp == 1
              ? [{ color: "white" }, globalStyles.places_Text]
              : [{ color: "black" }, globalStyles.places_Text],
            selectedlang == 1
              ? [{ left: 3 }, globalStyles.places_Text]
              : globalStyles.places_Text,
          ]}
        >
          {selectedlang == 0 ? translation[31].English : translation[31].Urdu}
        </Text>

        {/* Guidlines */}
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
                navigation.navigate("Guidelines_Warden");
              }}
            >
              <Ionicons name="newspaper" size={30} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <Text
          style={[
            selectedApp == 1
              ? [{ color: "white" }, globalStyles.rules_Text]
              : [{ color: "black" }, globalStyles.rules_Text],
            selectedlang == 1
              ? [{ left: 20 }, globalStyles.rules_Text]
              : globalStyles.rules_Text,
          ]}
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
                navigation.navigate("Help_Warden");
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
          style={[
            selectedApp == 1
              ? [{ color: "white" }, globalStyles.help_Text]
              : [{ color: "black" }, globalStyles.help_Text],
            selectedlang == 1
              ? [{ left: 9 }, globalStyles.help_Text]
              : globalStyles.help_Text,
          ]}
        >
          {selectedlang == 0 ? translation[27].English : translation[27].Urdu}
        </Text>
      </View>
    </View>
  );
}
