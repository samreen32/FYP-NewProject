import React, { useEffect } from "react";
import { globalStyles } from "../styles/globalStyles";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  FlatList,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import EmptyNotifications from "../Loader/EmptyNotifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userLogin } from "../context/AuthContext";
import { NOTIFI_API_URL } from "../Custom_Api_Calls/api_calls";

export default function Warden_Notifications() {
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

  return (
    <>
      <FlatList
        data={notifications}
        renderItem={({ item }) => (
          <View
            style={[
              globalStyles.NotificationItem,
              { height: responsiveHeight(17) },
            ]}
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
            <Text style={styles.notifi_time}>{item.date}</Text>
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
    </>
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
