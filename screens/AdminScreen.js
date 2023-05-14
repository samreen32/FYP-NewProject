import React, { useEffect } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { AntDesign, Ionicons, Entypo } from "@expo/vector-icons";
import { globalStyles } from "../styles/globalStyles";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { userLogin } from "../context/AuthContext";
import { NOTIFI_API_URL } from "../Custom_Api_Calls/api_calls";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AdminScreen({ navigation }) {
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

  return (
    <View style={globalStyles.twMain}>
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
          <Ionicons name="menu" size={33} color="black" />
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
          <Ionicons name="notifications" size={33} color="black" />
        </TouchableOpacity>
      </View>

      {/* Location top */}
      <View style={globalStyles.locationTop}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Places");
          }}
        >
          <Text style={globalStyles.locationTop_Text}>{addressText}</Text>
        </TouchableOpacity>
      </View>

      {/* Profile */}
      <View style={globalStyles.tw_ProfileGroup2}>
        <View>
          <Text style={globalStyles.tw_Profile_Name}>
            Hi, {profile.name.charAt(0).toUpperCase() + profile.name.slice(1)}
          </Text>
        </View>
        <View>
          <Text style={globalStyles.tw_Profile_goodMorning}>{greeting}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("AdminProfile");
          }}
        >
          <Ionicons name="md-person-circle-outline" size={50} />
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={globalStyles.searchIcon}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("AdminSearch");
          }}
        >
          <Ionicons name="search" size={30} color="black" />
        </TouchableOpacity>
      </View>

      {/* Manage Challan rect */}
      <View style={globalStyles.easeTraffic_Rect}></View>
      <Text style={globalStyles.itsEasy_toPay}>It's easy to manage.</Text>

      {/* Manage Challan */}
      <View
        style={[
          globalStyles.viewPlaces_btn,
          { width: responsiveWidth(40), height: responsiveHeight(5.5) },
        ]}
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
              Manage Challan
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
        style={[globalStyles.payChallan_Rect, { height: responsiveHeight(23) }]}
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
            Remove{"\n"}Warden
          </Text>
        </TouchableOpacity>
      </View>

      {/* Handle Complaints */}
      <View
        style={[
          globalStyles.payChallan_Rect,
          { height: responsiveHeight(17), marginTop: responsiveHeight(69) },
        ]}
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
            Handle{"\n"}Complaints
          </Text>
        </TouchableOpacity>
      </View>

      {/* Places */}
      <View
        style={[
          globalStyles.fileHistory_Complaints_Rect,
          { marginTop: responsiveHeight(45), height: responsiveHeight(17) },
        ]}
      >
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Places");
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
              View {"\n"}Places
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={[
          globalStyles.fileHistory_Complaints_Rect,
          { marginTop: responsiveHeight(63), height: responsiveHeight(23) },
        ]}
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
            Manage {"\n"}Challan
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
