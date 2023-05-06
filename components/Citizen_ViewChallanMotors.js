import { React, useEffect, useState } from "react";
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
import { MOTORS_API_URL } from "../Custom_Api_Calls/api_calls";
import { Card } from "react-native-paper";
import NoComplaint_Box from "../Loader/NoComplaint_Box";

export default function Citizen_ViewChallanMotors({ navigation }) {
  const [motors, setMotors] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalDetails, setModalDetails] = useState([]);
  const [challanDetails, setChallanDetails] = useState(null);
  const { showToast } = userLogin();

  /************** Function to fetch challan count corres to motor vehicle number ****************/
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
        return data.challanCount;
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

  return (
    <>
      <View style={styles.header}>
        <Ionicons
          name="arrow-back"
          size={24}
          color="white"
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text style={styles.headerText}>AVAILABLE MOTORS</Text>
        <View style={{ width: 24 }}></View>
      </View>

      <FlatList
        data={motors}
        renderItem={({ item }) => (
          <View style={styles.Complain_Container}>
            <TouchableOpacity
              onPress={() => {
                fetchSingleMotor(item._id);
              }}
            >
              <View style={styles.Image} resizeMode="contain">
                <Text style={styles.imageText}>View Details</Text>
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
                  <Text style={styles.imageText}>
                    {item.challanCount}
                    {"\n"}Challan
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
          <View style={styles.modalView}>
            <Entypo
              name="cross"
              size={30}
              color="black"
              onPress={() => setModalVisible(!modalVisible)}
              style={{ marginLeft: responsiveWidth(60) }}
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
                  Motor Details
                </Text>
                <View style={{ marginTop: responsiveHeight(4) }}>
                  <Text
                    variant="titleLarge"
                    style={{
                      fontFamily: "poppins-regular",
                      textAlign: "center",
                    }}
                  >
                    Motor Name: {modalDetails.motorName}
                  </Text>
                  <Text
                    variant="titleLarge"
                    style={{
                      fontFamily: "poppins-regular",
                      textAlign: "center",
                    }}
                  >
                    Motor Type: {modalDetails.motorType}
                  </Text>
                  <Text
                    variant="titleLarge"
                    style={{
                      fontFamily: "poppins-regular",
                      textAlign: "center",
                    }}
                  >
                    Vehicle Number: {modalDetails.vehicleNo}
                  </Text>
                  <Text
                    variant="bodyMedium"
                    style={{
                      fontFamily: "poppins-regular",
                      textAlign: "center",
                    }}
                  >
                    Registration Number: {modalDetails.regNo}
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
          <View style={[styles.modalView, { height: responsiveHeight(65) }]}>
            <Entypo
              name="cross"
              size={30}
              color="black"
              onPress={() => setChallanDetails(null)}
              style={{ marginLeft: responsiveWidth(60) }}
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
                    Challan Details
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
                          Challan number: {item.challanNum}
                        </Text>
                        <View style={styles.footer}>
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
                                {item.showDetails ? "Show less" : "Show more"}
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                        {item.showDetails && (
                          <View
                            style={{ backgroundColor: "rgba(24,154,180,1)" }}
                          >
                            <Text
                              variant="titleLarge"
                              style={{
                                fontFamily: "poppins-regular",
                                textAlign: "center",
                                color: "white",
                              }}
                            >
                              Reg Number: {item.regNumber}
                            </Text>
                            <Text
                              variant="titleLarge"
                              style={{
                                fontFamily: "poppins-regular",
                                textAlign: "center",
                                color: "white",
                              }}
                            >
                              Amount: {item.amount}
                            </Text>
                            <Text
                              variant="bodyMedium"
                              style={{
                                fontFamily: "poppins-regular",
                                textAlign: "center",
                                color: "white",
                              }}
                            >
                              Due Date: {item.due_date}
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
    </>
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
    backgroundColor: "white",
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
    backgroundColor: "rgba(24,154,180,1)",
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
  header: {
    height: 120,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    backgroundColor: "rgba(10,76,118,1)",
  },
  headerText: {
    fontFamily: "poppins-bold",
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
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
    backgroundColor: "rgba(10,76,118,1)",
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
