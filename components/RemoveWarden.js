import { React, useEffect, useRef, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import NoComplaint_Box from "../Loader/NoComplaint_Box";
import { Card, Searchbar } from "react-native-paper";
import { globalStyles } from "../styles/globalStyles";
import { NOTIFI_API_URL, WARDEN_API_URL } from "../Custom_Api_Calls/api_calls";
import * as Notifications from "expo-notifications";
import { userLogin } from "../context/AuthContext";

//Default Notification settings
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function RemoveWarden({ navigation }) {
  let redirect = useNavigation();
  const [wardens, setWardens] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalDetails, setModalDetails] = useState([]);
  const [search, setSearch] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const { setBadgeValue, showToast } = userLogin();

  /************** View all the Wardens Function ****************/
  const fetchWardens = async () => {
    const response = await fetch(`${WARDEN_API_URL}/fetchallWardens`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    setWardens(json);
  };

  /************** View Details of Single Complaint Function ****************/
  const fetchSingleWarden = (id) => {
    fetch(`${WARDEN_API_URL}/fetchSingleWarden/${id}`)
      .then((response) => response.json())
      .then((res) => {
        setModalDetails(res);
      });
    setModalVisible(true);
  };

  /**************** Remove Warden with Id ****************/
  const RemoveWarden = (id) => {
    fetch(`${WARDEN_API_URL}/deleteWarden/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => setModalDetails(data));
      setModalVisible(false);
      showToast("Warden Removed Successfully");
      addNotification();
  };

  useEffect(() => {
    if (AsyncStorage.getItem("token")) {
      fetchWardens();
    } else {
      redirect("/Login");
    }
    // eslint-disable-next-line
  }, [modalDetails]);

  /**************** Search Method ****************/
  const filteredData = wardens.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  /************* Schedule Notification Method *************/
  const addNotification = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token != null) {
        await fetch(`${NOTIFI_API_URL}/adminSchedule_notification`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
          body: JSON.stringify({
            title: "New Notification",
            body: "You have Removed a Warden.",
          }),
        });

        // Retrieve the updated badge value from the server
        const response = await fetch(`${NOTIFI_API_URL}/adminBadge_value`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        });
        const { badgeValue } = await response.json();

        // Use the Notifications module to schedule the notification
        const { status } = await Notifications.requestPermissionsAsync();
        const time = new Date().toLocaleString();
        if (status === "granted") {
          const schedulingOptions = {
            content: {
              title: "New Notification",
              body: "You have Removed a Warden.",
              data: { time },
              read: false,
              badge: badgeValue,
            },
            trigger: { seconds: 1 },
          };
          await Notifications.scheduleNotificationAsync(schedulingOptions);
          setBadgeValue(badgeValue);
        }
      }
    } catch (error) {
      showToast(error.message);
    }
  };

  /************* Adding permissions for notifications *************/
  useEffect(() => {
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });
    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Text style={[styles.Complain_Text_Header]}>Remove Warden</Text>
        <Ionicons
          name="arrow-back"
          size={43}
          color="black"
          style={styles.backArrow}
        />
      </TouchableOpacity>

      {/********** Search Component *********/}
      <View style={{ height: responsiveHeight(5) }}>
        <Searchbar
          placeholder="Search here"
          onChangeText={(value) => setSearch(value)}
          value={search}
        />
      </View>

      {/********** Display all the Wardens *********/}
      <FlatList
        data={filteredData}
        renderItem={({ item }) => (
          <View style={styles.Complain_Container}>
            <View key={item._id}>
              <Text style={styles.Name_Text}>{item.name}</Text>
              <Text style={styles.description_Text}>{item.liscenceID}</Text>

              <TouchableOpacity onPress={() => fetchSingleWarden(item._id)}>
                <AntDesign
                  name="right"
                  size={50}
                  color="black"
                  style={{
                    marginTop: responsiveHeight(-7),
                    marginLeft: responsiveWidth(74),
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item) => item._id}
      />

      {/********** Modal to show details of selected Warden  *********/}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Card
              mode="outlined"
              style={{
                borderRadius: responsiveWidth(7),
                width: responsiveWidth(80),
                height: responsiveHeight(42),
              }}
            >
              <Card.Content>
                <Text
                  style={{
                    fontFamily: "poppins-bold",
                    fontSize: responsiveFontSize(3),
                    textAlign: "center",
                    marginTop: responsiveHeight(2),
                  }}
                >
                  Warden Details
                </Text>
                <View style={{ marginTop: responsiveHeight(4) }}>
                  <Text
                    variant="titleLarge"
                    style={{
                      fontFamily: "poppins-regular",
                      textAlign: "center",
                    }}
                  >
                    Name: {modalDetails.name}
                  </Text>
                  <Text
                    variant="titleLarge"
                    style={{
                      fontFamily: "poppins-regular",
                      textAlign: "center",
                    }}
                  >
                    Email: {modalDetails.email}
                  </Text>
                  <Text
                    variant="titleLarge"
                    style={{
                      fontFamily: "poppins-regular",
                      textAlign: "center",
                    }}
                  >
                    Liscence ID: {modalDetails.liscenceID}
                  </Text>
                  <Text
                    variant="bodyMedium"
                    style={{
                      fontFamily: "poppins-regular",
                      textAlign: "center",
                    }}
                  >
                    Phone Number: {modalDetails.phone}
                  </Text>
                </View>
              </Card.Content>

              <Card.Actions
                style={{
                  marginTop: responsiveHeight(6),
                }}
              >
                <TouchableOpacity
                  onPress={() => RemoveWarden(modalDetails._id)}
                  style={[
                   
                    {
                     backgroundColor: "rgba(10,76,118,1)",
                      width: responsiveWidth(35),
                      height: responsiveHeight(6),
                      borderRadius: responsiveWidth(12),
                    },
                  ]}
                >
                  <Text
                    style={[
                      globalStyles.Register_Text,
                      {
                        marginTop: responsiveHeight(1),
                        marginLeft: responsiveWidth(9),
                      },
                    ]}
                  >
                    Remove
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setModalVisible(!modalVisible)}
                  style={[
                    {
                      backgroundColor: "black",
                      width: responsiveWidth(35),
                      height: responsiveHeight(6),
                      borderRadius: responsiveWidth(12),
                    },
                  ]}
                >
                  <Text
                    style={[
                      globalStyles.Register_Text,
                      {
                        marginTop: responsiveHeight(1),
                        marginLeft: responsiveWidth(10),
                      },
                    ]}
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>
              </Card.Actions>
            </Card>
          </View>
        </View>
      </Modal>
      {wardens.length === 0 && <NoComplaint_Box />}
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    width: responsiveWidth(100),
    height: responsiveHeight(100),
  },
  modalView: {
    margin: responsiveHeight(2.5),
    backgroundColor: "rgba(10,76,118,1)",
    borderRadius: responsiveHeight(5),
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 50,
  },
  Complain_Text_Header: {
    color: "black",
    fontFamily: "poppins-bold",
    fontSize: responsiveFontSize(3.5),
    marginLeft: responsiveWidth(20),
    marginTop: responsiveHeight(6),
  },
  Complain_Container: {
    flexDirection: "row",
    backgroundColor: "rgba(24,154,180,1)",
    height: responsiveHeight(15),
    marginLeft: responsiveWidth(5),
    marginTop: responsiveHeight(3.5),
    marginRight: responsiveWidth(6),
    marginVertical: responsiveHeight(-2),
    borderRadius: 15,
  },
  Image: {
    width: responsiveWidth(17),
    height: responsiveHeight(10),
    marginLeft: responsiveWidth(3),
    marginTop: responsiveHeight(2.5),
    borderRadius: responsiveWidth(7),
  },
  Name_Text: {
    color: "#000000",
    fontWeight: "bold",
    fontFamily: "poppins-bold",
    fontSize: responsiveFontSize(2.3),
    marginLeft: responsiveWidth(5),
    marginTop: responsiveHeight(2),
    paddingTop: responsiveHeight(2),
  },
  description_Text: {
    fontFamily: "poppins-bold",
    marginLeft: responsiveWidth(5),
    marginTop: responsiveHeight(0.5),
    color: "#FFFFFF",
  },
  backArrow: {
    marginLeft: responsiveWidth(5),
    marginTop: responsiveHeight(-6.6),
  },
});