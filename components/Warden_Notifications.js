import React, { useState, useEffect, useCallback } from "react";
import { globalStyles } from "../styles/globalStyles";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  FlatList,
} from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import EmptyNotifications from "../Loader/EmptyNotifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userLogin } from "../context/AuthContext";
import {
  LANG_API_URL,
  NOTIFI_API_URL,
  THEME_API_URL,
} from "../Custom_Api_Calls/api_calls";
import { useFocusEffect } from "@react-navigation/native";
import { translation } from "./translation";

export default function Warden_Notifications() {
  const [selectedlang, setselectedlang] = useState(0);
  const [selectedApp, setselectedApp] = useState(0);
  const { notifications, setNotifications, showToast } = userLogin();

  /************* View Notifications Method *************/
  const viewNotifications = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token != null) {
        await fetch(`${NOTIFI_API_URL}/wardenFetch_notifications`, {
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        })
          .then((response) => response.json())
          .then((data) => setNotifications(data.notificationsData))
          .catch((error) => console.error(error));
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  /************* Delete Notification Method *************/
  const removeNotification = async (id) => {
    const token = await AsyncStorage.getItem("token");
    if (token != null) {
      fetch(`${NOTIFI_API_URL}/wardenDelete_notification/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            showToast("Notification has been Deleted.");
          } else {
            showToast("Invalid notification ID or other error occurred");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  useEffect(() => {
    if (AsyncStorage.getItem("token")) {
      viewNotifications();
    } else {
      redirect("/WardenLogin");
    }
  }, [notifications]);

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
          {selectedlang == 0 ? translation[115].English : translation[115].Urdu}{" "}
        </Text>
        <View style={{ width: 24 }}></View>
      </View>

      <FlatList
        data={notifications}
        renderItem={({ item }) => (
          <View
            style={
              selectedApp == 1
                ? [
                    { backgroundColor: "grey", height: responsiveHeight(17) },
                    globalStyles.NotificationItem,
                  ]
                : [
                    {
                      backgroundColor: "rgba(217,217,217,1)",
                      height: responsiveHeight(17),
                    },
                    globalStyles.NotificationItem,
                  ]
            }
          >
            <Text style={styles.Name_Text}>{item.title}</Text>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              variant="bodyMedium"
              style={styles.description_Text}
            >
              {item.body}
            </Text>
            <Text
              style={[
                selectedApp == 1
                  ? [{ color: "white" }, styles.notifi_time]
                  : [{ color: "gray" }, styles.notifi_time],
              ]}
            >
              {item.date}
            </Text>
            <TouchableOpacity
              onPress={() => {
                removeNotification(item._id);
              }}
            >
              <FontAwesome
                name="trash"
                size={24}
                color="black"
                style={{
                  marginLeft: responsiveWidth(70),
                }}
              />
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item._id}
      />
      {notifications.length === 0 && <EmptyNotifications />}
    </View>
  );
}

const styles = StyleSheet.create({
  notifi_time: {
    fontFamily: "poppins-bold",
    fontStyle: "italic",
    color: "gray",
  },
  Name_Text: {
    color: "#000000",
    fontWeight: "bold",
    fontFamily: "poppins-bold",
    fontSize: responsiveFontSize(2),
  },
  description_Text: {
    fontFamily: "poppins-regular",
    fontFamily: "poppins-regular",
    marginTop: responsiveHeight(0.5),
    color: "#000000",
  },
});
