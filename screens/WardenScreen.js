import React, { useEffect } from "react";
import { Image, Text, View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons, Fontisto, Ionicons } from "@expo/vector-icons";
import { globalStyles } from "../styles/globalStyles";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { userLogin } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NOTIFI_API_URL } from "../Custom_Api_Calls/api_calls";

export default function WardenScreen({ navigation }) {
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
    <View style={globalStyles.twMain}>
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
          <Ionicons name="menu" size={33} color="black" />
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
          <Ionicons name="notifications" size={33} color="black" />
        </TouchableOpacity>
      </View>

      {/* Location Top */}
      <View style={globalStyles.locationTop}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Places");
          }}
        >
          <Text style={globalStyles.locationTop_Text}>{addressText}</Text>
        </TouchableOpacity>
      </View>

      {/* Warden Profile */}
      <View style={globalStyles.tw_ProfileGroup2}>
        <Text style={globalStyles.tw_Profile_Name}>
          Hi, {profile.name.charAt(0).toUpperCase() + profile.name.slice(1)}
        </Text>
        <Text style={globalStyles.tw_Profile_goodMorning}>{greeting}</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("WardenProfile");
          }}
        >
          <Ionicons name="md-person-circle-outline" size={50} />
        </TouchableOpacity>
      </View>

      {/* Warden Search */}
      <View style={globalStyles.searchIcon}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("WardenSearch");
          }}
        >
          <Ionicons name="search" size={30} color="black" />
        </TouchableOpacity>
      </View>

      {/* Ease traffic rect */}
      <View style={globalStyles.easeTraffic_Rect}></View>
      <View>
        <Text style={globalStyles.letsEase_theTraffic}>
          Lets Ease the Traffic
        </Text>
      </View>

      {/* Places */}
      <View style={globalStyles.viewPlaces_btn}>
        <View style={globalStyles.viewPlaces}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Places");
            }}
          >
            <Text style={globalStyles.viewPlaces_Text}>View Places</Text>
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
        style={[globalStyles.challan_Rect, { marginLeft: responsiveWidth(4) }]}
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
              globalStyles.addView_Challan_Text,
              { width: responsiveWidth(25), height: responsiveHeight(10) },
            ]}
          >
            Add Challan
          </Text>
        </TouchableOpacity>
      </View>

      {/* ViewComplaints */}
      <View
        style={[globalStyles.challan_Rect, { marginLeft: responsiveWidth(51) }]}
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
            View Complaints
          </Text>
        </TouchableOpacity>
      </View>

      <View style={globalStyles.hisStat_Group}>
        {/* Challan History */}
        <View
          style={[
            globalStyles.hisStat_btn,
            {
              width: responsiveWidth(54),
              marginLeft: responsiveWidth(1),
              backgroundColor: "rgba(10,76,118,1)",
            },
          ]}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ChallanHistory");
            }}
          >
            <Text
              style={[
                globalStyles.hisStat_Text,
                {
                  width: responsiveWidth(29),
                  marginLeft: responsiveWidth(7),
                },
              ]}
            >
              History
            </Text>
          </TouchableOpacity>
        </View>

        {/* Statistics */}
        <View
          style={[
            globalStyles.hisStat_btn,
            {
              width: responsiveWidth(53),
              marginLeft: responsiveWidth(40),
              backgroundColor: "rgba(24,154,180,1)",
            },
          ]}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Statistics");
            }}
          >
            <Text
              style={[
                globalStyles.hisStat_Text,
                {
                  width: responsiveWidth(33),
                  marginLeft: responsiveWidth(11),
                },
              ]}
            >
              Statistics
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
        <View style={globalStyles.settingCircle}>
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
        <Text style={globalStyles.setting_Text}>Setting</Text>

        {/* Places */}
        <View style={globalStyles.placesCircle}>
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
        <Text style={globalStyles.places_Text}>Places</Text>

        {/* Guidlines */}
        <View style={globalStyles.rulesCircle}>
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
        <Text style={globalStyles.rules_Text}>Guidelines</Text>

        {/* Help */}
        <View style={globalStyles.helpCircle}>
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
        <Text style={globalStyles.help_Text}>Help</Text>
      </View>
    </View>
  );
}
