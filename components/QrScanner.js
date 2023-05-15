import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { globalStyles } from "../styles/globalStyles";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { Ionicons } from "@expo/vector-icons";
import { LANG_API_URL, THEME_API_URL } from "../Custom_Api_Calls/api_calls";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { translation } from "./translation";
import { useFocusEffect } from "@react-navigation/native";

const QrScanner = ({ navigation }) => {
  const [selectedlang, setselectedlang] = useState(0);
  const [selectedApp, setselectedApp] = useState(0);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [qrData, setQRData] = useState(null);

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

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setQRData(JSON.parse(data));
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const handleRescan = () => {
    setScanned(false);
    setQRData(null);
  };

  if (scanned) {
    return (
      <>
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
          <Text
            style={[globalStyles.headerText, { textTransform: "uppercase" }]}
          >
            {selectedlang == 0 ? translation[99].English : translation[99].Urdu}
          </Text>
          <View style={{ width: 24 }}></View>
        </View>

        <View style={[globalStyles.camera, { bottom: 20 }]}>
          <View
            style={
              selectedApp == 1
                ? [
                    {
                      backgroundColor: "grey",
                      height: responsiveHeight(60),
                      flex: 1,
                      position: "absolute",
                      width: responsiveWidth(92),
                      borderRadius: responsiveWidth(9),
                      opacity: 1,
                      marginTop: responsiveHeight(24),
                      marginLeft: responsiveWidth(4),
                      marginRight: responsiveWidth(6),
                    },
                  ]
                : [
                    {
                      backgroundColor: "rgba(10,76,118,1)",
                      height: responsiveHeight(60),
                      flex: 1,
                      position: "absolute",
                      width: responsiveWidth(92),
                      borderRadius: responsiveWidth(9),
                      opacity: 1,
                      marginTop: responsiveHeight(24),
                      marginLeft: responsiveWidth(4),
                      marginRight: responsiveWidth(6),
                    },
                  ]
            }
          >
            <Text style={styles.qrDataHeader}>
              {" "}
              {/* Challan Details */}
              {selectedlang == 0
                ? translation[108].English
                : translation[108].Urdu}
            </Text>
            <Text style={styles.qrDataText}>
              {/* Challan number  */}
              {selectedlang == 0
                ? translation[52].English
                : translation[52].Urdu}{" "}
              {selectedlang == 0
                ? translation[53].English
                : translation[53].Urdu}{" "}
              : {qrData.challanNum}
            </Text>
            <Text style={styles.qrDataText}>
              {/* Reg Number */}
              {selectedlang == 0
                ? translation[57].English
                : translation[57].Urdu}{" "}
              {selectedlang == 0
                ? translation[53].English
                : translation[53].Urdu}{" "}
              : {qrData.regNumber}
            </Text>
            <Text style={styles.qrDataText}>
              {/* Vehicle No */}
              {(selectedlang == 0
                ? translation[54].English
                : translation[54].Urdu) +
                " " +
                (selectedlang == 0
                  ? translation[105].English
                  : translation[105].Urdu) +
                " : " +
                qrData.vehicleNo}
            </Text>

            <Text style={styles.qrDataText}>
              {/* Amount (fine)*/}
              {selectedlang == 0
                ? translation[117].English
                : translation[117].Urdu}{" "}
              : {qrData.amount}
            </Text>
            <Text style={styles.qrDataText}>
              {/* Car Type */}
              {selectedlang == 0
                ? translation[119].English
                : translation[119].Urdu}{" "}
              : {qrData.carType}
            </Text>
            <Text style={styles.qrDataText}>
              {/* Due Date */}
              {selectedlang == 0
                ? translation[61].English
                : translation[61].Urdu}{" "}
              : {qrData.due_date}
            </Text>
            <Text style={styles.qrDataText}>
              {/* Location */}
              {selectedlang == 0
                ? translation[46].English
                : translation[46].Urdu}{" "}
              : {qrData.location}
            </Text>
            <Text style={styles.qrDataText}>
              {/* Extra Comments */}
              {selectedlang == 0
                ? translation[121].English
                : translation[121].Urdu}{" "}
              : {qrData.anyComment}
            </Text>
          </View>

          <TouchableOpacity
            style={
              selectedApp == 1
                ? [
                    {
                      backgroundColor: "black",
                      width: responsiveWidth(45),
                      top: 260,
                      position: "relative",
                      height: responsiveHeight(8),
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: responsiveWidth(6),
                      marginLeft: responsiveWidth(0.5),
                    },
                  ]
                : [
                    {
                      backgroundColor: "rgba(24,154,180,1)",
                      width: responsiveWidth(45),
                      top: 260,
                      position: "relative",
                      height: responsiveHeight(8),
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: responsiveWidth(6),
                      marginLeft: responsiveWidth(0.5),
                    },
                  ]
            }
            onPress={handleRescan}
          >
            <Text style={[globalStyles.submitChallan_Text, { color: "white" }]}>
              {selectedlang == 0
                ? translation[99].English
                : translation[99].Urdu}
            </Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }

  return (
    <>
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
          {selectedlang == 0 ? translation[99].English : translation[99].Urdu}
        </Text>
        <View style={{ width: 24 }}></View>
      </View>

      <View style={styles.container}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  header: {
    height: 105,
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
  qrDataHeader: {
    top: 25,
    textAlign: "center",
    color: "white",
    fontSize: 18,
    fontFamily: "poppins-bold",
    marginBottom: 10,
    textTransform: "uppercase",
  },
  qrDataText: {
    top: 35,
    textAlign: "center",
    color: "white",
    fontSize: 16,
    fontFamily: "poppins-regular",
    marginBottom: 10,
  },
  rescanButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  rescanButtonText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
});

export default QrScanner;
