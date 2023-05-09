import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { userLogin } from "../context/AuthContext";
import AppLoader from "../Loader/AppLoader";
import { globalStyles } from "../styles/globalStyles";
import { Card } from "react-native-paper";
import { AUTH_API_URL } from "../Custom_Api_Calls/api_calls";

export default function Warden_Logout({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const { setIsLogIn, showToast } = userLogin();

  /****** Warden Logout Function  ******/
  const handleLogout = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      console.log(token);
      if (token) {
        setIsLoading(true);
        const response = await fetch(`${AUTH_API_URL}/warden_logout`, {
          method: "POST",
          headers: {
            "auth-token": token,
          },
        });
        const responseData = await response.json();
        if (responseData.success) {
          await AsyncStorage.removeItem("token");
          setIsLoading(false);
          setIsLogIn(false);
          showToast("You have been Logged Out.");
        } else {
          showToast("Error", "Failed to logout. Please try again.");
          setIsLoading(false);
        }
      } else {
        showToast("Error", "Token not found. Please login again.");
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      showToast("Error", "Failed to logout. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Modal>
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <Card
                mode="outlined"
                style={{
                  borderRadius: responsiveWidth(7),
                  width: responsiveWidth(80),
                  height: responsiveHeight(35),
                }}
              >
                <Card.Content>
                  <Text
                    variant="titleLarge"
                    style={{
                      fontSize: responsiveFontSize(2.2),
                      fontFamily: "poppins-bold",
                      textAlign: "center",
                      marginTop: responsiveHeight(5),
                    }}
                  >
                    Do You Want to Log Out ?
                  </Text>
                </Card.Content>

                <Card.Actions
                  style={{
                    marginTop: responsiveHeight(13),
                  }}
                >
                  <TouchableOpacity
                    onPress={handleLogout}
                    style={[
                      {
                        backgroundColor: "rgba(10,76,118,1)",
                        width: responsiveWidth(33),
                        height: responsiveHeight(6),
                        borderRadius: responsiveWidth(12),
                        right: 15,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        globalStyles.Register_Text,
                        {
                          marginTop: responsiveHeight(1),
                          marginLeft: responsiveWidth(7),
                        },
                      ]}
                    >
                      Sign Out
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      {
                        right: 7,
                        backgroundColor: "black",
                        width: responsiveWidth(33),
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
                      onPress={() => navigation.goBack()}
                    >
                      Cancel
                    </Text>
                  </TouchableOpacity>
                  
                </Card.Actions>
              </Card>
            </View>
          </View>
        </Modal>
      </View>
      {isLoading ? <AppLoader /> : null}
    </>
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

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#008080",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
