import { React, useEffect, useState, useCallback } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
} from "react-native";
import { Ionicons, Entypo } from "@expo/vector-icons";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userLogin } from "../context/AuthContext";
import {
  LANG_API_URL,
  MOTORS_API_URL,
  THEME_API_URL,
} from "../Custom_Api_Calls/api_calls";
import { Card } from "react-native-paper";
import NoComplaint_Box from "../Loader/NoComplaint_Box";
import { globalStyles } from "../styles/globalStyles";
import { translation } from "./translation";
import { useFocusEffect } from "@react-navigation/native";

export default function Citizen_ViewChallanMotors({ navigation }) {
  const [selectedlang, setselectedlang] = useState(0);
  const [selectedApp, setselectedApp] = useState(0);
  const [motors, setMotors] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalDetails, setModalDetails] = useState([]);
  const [challanDetails, setChallanDetails] = useState(null);
  const { showToast } = userLogin();

  /************** Function to fetch unpaid challan count corres to motor vehicle number ****************/
  const fetchChallanCount = async (vehicleNo) => {
    const token = await AsyncStorage.getItem("token");
    try {
      if (token != null) {
        const response = await fetch(
          `${MOTORS_API_URL}/count_motor_challan/${vehicleNo}`,
          {
            headers: {
              "auth-token": token,
            },
          }
        );
        const data = await response.json();
        return data.unpaidChallanCount;
      }
    } catch (error) {
      showToast("Error occurred", error.message);
    }
  };

  /************** Function to fecth all the motors ****************/
  const fetchMotors = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token != null) {
        const response = await fetch(`${MOTORS_API_URL}/fetch_motors`, {
          headers: {
            "auth-token": token,
          },
        });
        const json = await response.json();

        // Fetch challan count for each motor and add it to the item object
        const challan = [];
        for (let i = 0; i < json.length; i++) {
          const item = json[i];
          const challanCount = await fetchChallanCount(item.vehicleNo);
          item.challanCount = challanCount;
          challan.push(item);
        }
        setMotors(challan);
      }
    } catch (error) {
      showToast(error);
    }
  };

  useEffect(() => {
    fetchMotors();
  }, []);

  /************** Function to fecth single motor ****************/
  const fetchSingleMotor = async (id) => {
    const token = await AsyncStorage.getItem("token");
    if (token != null) {
      fetch(`${MOTORS_API_URL}/fetch_single_motor/${id}`, {
        headers: {
          "auth-token": token,
        },
      })
        .then((response) => response.json())
        .then((res) => {
          setModalDetails(res);
        });
      setModalVisible(true);
    } else {
      showToast("Token not found.");
    }
  };

  /************** Function to Fecth challan details corres to motors ****************/
  const getChallanDetails = async (vehicleNo) => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token != null) {
        const response = await fetch(
          `${MOTORS_API_URL}/getChallan/${vehicleNo}`,
          {
            headers: {
              "auth-token": token,
            },
          }
        );
        const data = await response.json();
        if (data.success) {
          const challans = data.challan.map((challan) => ({
            ...challan,
            showDetails: false,
          }));
          setChallanDetails(challans);
        } else {
          showToast("No challan found");
        }
      }
    } catch (error) {
      showToast(error);
    }
  };

  /********** Method to fetch Citizen Language **********/
  const fetchLanguage = async () => {
    try {
      const authToken = await AsyncStorage.getItem("token");
      const response = await fetch(`${LANG_API_URL}/citizen_languageId`, {
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

  /********** Method to fetch Citizen Theme **********/
  const fetchTheme = async () => {
    try {
      const authToken = await AsyncStorage.getItem("token");
      const response = await fetch(`${THEME_API_URL}/citizen_themeId`, {
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
          ? { backgroundColor: "#333333" }
          : { backgroundColor: "none" }
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
          {selectedlang == 0 ? translation[107].English : translation[107].Urdu}
        </Text>
        <View style={{ width: 24 }}></View>
      </View>

      <FlatList
        data={motors}
        renderItem={({ item }) => (
          <View
            style={
              selectedApp == 1
                ? [{ backgroundColor: "grey" }, styles.Complain_Container]
                : [
                    { backgroundColor: "rgba(24,154,180,1)" },
                    styles.Complain_Container,
                  ]
            }
          >
            <TouchableOpacity
              onPress={() => {
                fetchSingleMotor(item._id);
              }}
            >
              <View style={styles.Image} resizeMode="contain">
                {/* View Details */}
                <Text style={styles.imageText}>
                  {" "}
                  {selectedlang == 0
                    ? translation[112].English
                    : translation[112].Urdu}
                </Text>
              </View>
            </TouchableOpacity>

            <View>
              <Text style={styles.Name_Text}>{item.motorName}</Text>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={[
                  styles.description_Text,
                  { width: responsiveWidth(60) },
                ]}
              >
                {item.motorType}
              </Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  getChallanDetails(item.vehicleNo);
                }}
              >
                <View
                  style={[styles.Image, { marginLeft: responsiveWidth(-22) }]}
                  resizeMode="contain"
                >
                  {/* Challan */}
                  <Text style={styles.imageText}>
                    {item.challanCount}
                    {"\n"}{" "}
                    {selectedlang == 0
                      ? translation[113].English
                      : translation[113].Urdu}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Modal to show motor details  */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View
            style={
              selectedApp == 1
                ? [{ backgroundColor: "gray" }, styles.modalView]
                : [{ backgroundColor: "white" }, styles.modalView]
            }
          >
            <Entypo
              name="cross"
              size={30}
              onPress={() => setModalVisible(!modalVisible)}
              style={
                selectedApp == 1
                  ? {
                      color: "white",
                      marginLeft: responsiveWidth(60),
                      bottom: 15,
                    }
                  : {
                      color: "black",
                      marginLeft: responsiveWidth(60),
                      bottom: 15,
                    }
              }
            />

            <Card style={styles.cardContainer}>
              <Card.Content>
                <Text
                  style={{
                    fontFamily: "poppins-bold",
                    fontSize: responsiveFontSize(3),
                    textAlign: "center",
                    marginTop: responsiveHeight(2),
                  }}
                >
                  {selectedlang == 0
                    ? translation[111].English
                    : translation[111].Urdu}
                </Text>
                <View style={{ marginTop: responsiveHeight(4) }}>
                  <Text
                    variant="titleLarge"
                    style={{
                      fontFamily: "poppins-regular",
                      textAlign: "center",
                    }}
                  >
                    {/* Motor Name */}
                    {selectedlang == 0
                      ? translation[102].English
                      : translation[102].Urdu}
                    : {modalDetails.motorName}
                  </Text>
                  <Text
                    variant="titleLarge"
                    style={{
                      fontFamily: "poppins-regular",
                      textAlign: "center",
                    }}
                  >
                    {/* Motor Type */}
                    {selectedlang == 0
                      ? translation[106].English
                      : translation[106].Urdu}
                    : {modalDetails.motorType}
                  </Text>
                  <Text
                    variant="titleLarge"
                    style={{
                      fontFamily: "poppins-regular",
                      textAlign: "center",
                    }}
                  >
                    {/* Vehicle Number */}
                    {selectedlang == 0
                      ? translation[54].English
                      : translation[54].Urdu}{" "}
                    {selectedlang == 0
                      ? translation[55].English
                      : translation[55].Urdu}{" "}
                    : {modalDetails.vehicleNo}
                  </Text>
                  <Text
                    variant="bodyMedium"
                    style={{
                      fontFamily: "poppins-regular",
                      textAlign: "center",
                    }}
                  >
                    {/* Registration Number */}
                    {selectedlang == 0
                      ? translation[57].English
                      : translation[57].Urdu}{" "}
                    {selectedlang == 0
                      ? translation[53].English
                      : translation[53].Urdu}{" "}
                    : {modalDetails.regNo}
                  </Text>
                </View>
              </Card.Content>
            </Card>
          </View>
        </View>
      </Modal>

      {/* Modal to show challan details  */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={challanDetails !== null}
        onRequestClose={() => setChallanDetails(null)}
      >
        <View style={styles.modalContainer}>
          <View
            style={
              selectedApp == 1
                ? [
                    {
                      backgroundColor: "gray",
                      margin: responsiveHeight(2.5),
                      borderRadius: responsiveHeight(5),
                      padding: 35,
                      alignItems: "center",
                      shadowColor: "#000",
                      height: responsiveHeight(65),
                      shadowOpacity: 0.25,
                      shadowRadius: 7,
                      elevation: 100,
                    },
                  ]
                : [
                    {
                      backgroundColor: "white",
                      margin: responsiveHeight(2.5),
                      borderRadius: responsiveHeight(5),
                      padding: 35,
                      alignItems: "center",
                      shadowColor: "#000",
                      height: responsiveHeight(65),
                      shadowOpacity: 0.25,
                      shadowRadius: 7,
                      elevation: 100,
                    },
                  ]
            }
          >
            <Entypo
              name="cross"
              size={30}
              color="black"
              onPress={() => setChallanDetails(null)}
              style={
                selectedApp == 1
                  ? {
                      color: "white",
                      marginLeft: responsiveWidth(60),
                      bottom: 15,
                    }
                  : {
                      color: "black",
                      marginLeft: responsiveWidth(60),
                      bottom: 15,
                    }
              }
            />

            {challanDetails && (
              <Card
                style={[styles.cardContainer, { height: responsiveHeight(50) }]}
              >
                <Card.Content>
                  <Text
                    style={{
                      fontFamily: "poppins-bold",
                      fontSize: responsiveFontSize(3),
                      textAlign: "center",
                    }}
                  >
                    {/* Challan Details */}
                    {selectedlang == 0
                      ? translation[108].English
                      : translation[108].Urdu}
                  </Text>
                  <FlatList
                    data={challanDetails}
                    ItemSeparatorComponent={() => (
                      <View
                        style={{
                          height: 1,
                          backgroundColor: "gray",
                          height: 3,
                        }}
                      />
                    )}
                    renderItem={({ item }) => (
                      <>
                        <Text
                          variant="titleLarge"
                          style={{
                            fontFamily: "poppins-regular",
                            textAlign: "center",
                            marginTop: 12,
                          }}
                        >
                          {/* Challan number  */}
                          {selectedlang == 0
                            ? translation[52].English
                            : translation[52].Urdu}{" "}
                          {selectedlang == 0
                            ? translation[53].English
                            : translation[53].Urdu}{" "}
                          : {item.challanNum}
                        </Text>
                        <View
                          style={
                            selectedApp == 1
                              ? [{ backgroundColor: "black" }, styles.footer]
                              : [
                                  { backgroundColor: "rgba(10,76,118,1)" },
                                  styles.footer,
                                ]
                          }
                        >
                          <View style={styles.logout}>
                            <TouchableOpacity
                              onPress={() =>
                                setChallanDetails((prevState) =>
                                  prevState.map((challan) =>
                                    challan.challanNum === item.challanNum
                                      ? {
                                          ...challan,
                                          showDetails: !challan.showDetails,
                                        }
                                      : challan
                                  )
                                )
                              }
                            >
                              <Text style={styles.logoutText}>
                                {item.showDetails
                                  ? selectedlang == 0
                                    ? translation[109].English
                                    : translation[109].Urdu
                                  : selectedlang == 0
                                  ? translation[110].English
                                  : translation[110].Urdu}
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                        {item.showDetails && (
                          <View
                            style={
                              selectedApp == 1
                                ? { backgroundColor: "#333333" }
                                : { backgroundColor: "rgba(24,154,180,1)" }
                            }
                          >
                            <Text
                              variant="titleLarge"
                              style={{
                                fontFamily: "poppins-regular",
                                textAlign: "center",
                                color: "white",
                              }}
                            >
                              {/* Reg Number */}
                              {selectedlang == 0
                                ? translation[57].English
                                : translation[57].Urdu}{" "}
                              {selectedlang == 0
                                ? translation[53].English
                                : translation[53].Urdu}{" "}
                              : {item.regNumber}
                            </Text>
                            <Text
                              variant="titleLarge"
                              style={{
                                fontFamily: "poppins-regular",
                                textAlign: "center",
                                color: "white",
                              }}
                            >
                              {/* Amount */}
                              {selectedlang == 0
                                ? translation[56].English
                                : translation[56].Urdu}{" "}
                              : {item.amount}
                            </Text>
                            <Text
                              variant="bodyMedium"
                              style={{
                                fontFamily: "poppins-regular",
                                textAlign: "center",
                                color: "white",
                              }}
                            >
                              {/* Due Date */}
                              {selectedlang == 0
                                ? translation[61].English
                                : translation[61].Urdu}{" "}
                              : {item.due_date}
                            </Text>
                          </View>
                        )}
                      </>
                    )}
                  />
                </Card.Content>
              </Card>
            )}
          </View>
        </View>
      </Modal>

      {motors.length === 0 && <NoComplaint_Box />}
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: responsiveWidth(70),
    height: responsiveHeight(35),
    marginTop: responsiveHeight(-1),
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modalView: {
    margin: responsiveHeight(2.5),
    borderRadius: responsiveHeight(5),
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    height: responsiveHeight(50),
    shadowOpacity: 0.25,
    shadowRadius: 7,
    elevation: 100,
  },
  Complain_Container: {
    flexDirection: "row",
    // backgroundColor: "rgba(24,154,180,1)",
    height: responsiveHeight(15),
    marginLeft: responsiveWidth(5),
    marginTop: responsiveHeight(3),
    marginRight: responsiveWidth(5),
    marginVertical: responsiveHeight(-1),
    borderRadius: 15,
  },
  Image: {
    width: responsiveWidth(20),
    height: responsiveHeight(10),
    marginLeft: responsiveWidth(3),
    marginTop: responsiveHeight(2.5),
    borderRadius: responsiveWidth(7),
    borderColor: "black",
    borderWidth: 2,
  },
  imageText: {
    marginTop: responsiveHeight(2),
    color: "white",
    fontFamily: "poppins-regular",
    textAlign: "center",
  },
  description_Text: {
    width: responsiveWidth(65.3),
    height: responsiveHeight(20),
    marginLeft: responsiveWidth(5),
    color: "#FFFFFF",
    fontFamily: "poppins-regular",
  },
  Name_Text: {
    color: "#000000",
    fontFamily: "poppins-bold",
    fontSize: responsiveFontSize(2.3),
    marginLeft: responsiveWidth(5),
    marginTop: responsiveHeight(2),
    paddingTop: responsiveHeight(2),
  },
  challanCount_Text: {
    color: "#000000",
    fontFamily: "poppins-bold",
    fontSize: responsiveFontSize(2),
    marginLeft: responsiveWidth(-20),
    marginTop: responsiveHeight(2),
    paddingTop: responsiveHeight(2),
  },
  style_Rectangle: {
    marginLeft: responsiveWidth(8),
    marginTop: responsiveHeight(3),
    position: "absolute",
    width: responsiveWidth(87),
    height: responsiveHeight(9),
    opacity: 1,
    color: "grey",
    backgroundColor: "rgba(217,217,217,1)",
    borderRadius: responsiveWidth(6),
  },
  save_btn: {
    backgroundColor: "rgba(24,154,180,1)",
    width: responsiveWidth(30),
    height: responsiveHeight(7.5),
    marginTop: responsiveHeight(-6),
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
  footer: {
    height: 40,
    // backgroundColor: "rgba(10,76,118,1)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3.5,
  },
  logout: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoutText: {
    fontFamily: "poppins-bold",
    fontSize: 16,
    color: "white",
    marginLeft: 10,
  },
});
