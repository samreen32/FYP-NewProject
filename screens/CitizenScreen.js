import React, { useEffect } from "react";
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

export default function CitizenScreen({ navigation }) {
  const { profile, badgeValue, setBadgeValue, greeting } = userLogin();

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

  return (
    <View style={globalStyles.twMain}>
      {/* Drawer icon */}
      <View
        style={[
          globalStyles.Notifi_MenuIcon,
          { marginLeft: responsiveWidth(6), width: responsiveWidth(10) },
        ]}
      >
        <Pressable
          onPress={() => {
            navigation.openDrawer("CitizenDrawer");
          }}
        >
          <Ionicons name="menu" size={33} color="black" />
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
          <Text style={globalStyles.locationTop_Text}>
            Blue Area, Islamabad
          </Text>
        </TouchableOpacity>
      </View>

      {/* Citizen Profile */}
      <View style={globalStyles.tw_ProfileGroup2}>
        <Text style={globalStyles.tw_Profile_Name}>
          Hi, {profile.name.charAt(0).toUpperCase() + profile.name.slice(1)}
        </Text>
        <Text style={globalStyles.tw_Profile_goodMorning}>{greeting}</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("CitizenProfile");
          }}
        >
          <Ionicons name="md-person-circle-outline" size={50} />
        </TouchableOpacity>
      </View>

      {/* Citizen Search */}
      <View style={globalStyles.searchIcon}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("CitizenSearch");
          }}
        >
          <Ionicons name="search" size={30} color="black" />
        </TouchableOpacity>
      </View>

      {/* Pay challan rect */}
      <View style={globalStyles.easeTraffic_Rect}></View>
      <Text style={globalStyles.itsEasy_toPay}>
        Don't Worry {"\n"}it's easy to pay.
      </Text>

      {/* Places */}
      <View style={globalStyles.viewPlaces_btn}>
        <View style={globalStyles.viewPlaces}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("QrScanner");
            }}
          >
            <Text style={globalStyles.viewPlaces_Text}>Scan QR Now</Text>
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
      <View style={globalStyles.payChallan_Rect}>
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
          <Text style={globalStyles.payChallan_Text}> Pay{"\n"}Challan</Text>
        </TouchableOpacity>
      </View>

      {/* File Complaint */}
      <View
        style={[
          globalStyles.fileHistory_Complaints_Rect,
          { marginTop: responsiveHeight(45) },
        ]}
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
              marginLeft: responsiveWidth(8.5),
            }}
          />
          <FontAwesome5
            name="comment-alt"
            size={60}
            color="black"
            style={{
              marginTop: responsiveHeight(-6),
              marginLeft: responsiveWidth(5),
            }}
          />

          <Text
            style={[
              globalStyles.fileHistoryComplaints_Text,
              { marginLeft: responsiveWidth(12) },
            ]}
          >
            {" "}
            File {"\n"}Complaints
          </Text>
        </TouchableOpacity>
      </View>

      {/* Challan History */}
      <View
        style={[
          globalStyles.fileHistory_Complaints_Rect,
          { marginTop: responsiveHeight(60) },
        ]}
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
              marginLeft: responsiveWidth(2),
            }}
          />

          <Text
            style={[
              globalStyles.fileHistoryComplaints_Text,
              { marginLeft: responsiveWidth(20) },
            ]}
          >
            Challan {"\n"} History
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
        <View style={globalStyles.settingCircle}>
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

        {/* Guidelines */}
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
