import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { globalStyles } from "../styles/globalStyles";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { Ionicons } from "@expo/vector-icons";

const QrScanner = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [qrData, setQRData] = useState(null);

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
        <View style={styles.header}>
          <Ionicons
            name="arrow-back"
            size={24}
            color="white"
            onPress={() => {
              navigation.goBack();
            }}
          />
          <Text style={styles.headerText}>SCAN QR CODE</Text>
          <View style={{ width: 24 }}></View>
        </View>

        <View style={[globalStyles.camera, { bottom: 20 }]}>
          <View
            style={[
              globalStyles.easeTraffic_Rect,
              { height: responsiveHeight(60) },
            ]}
          >
            <Text style={styles.qrDataHeader}>CHALLAN DETAILS</Text>
            <Text style={styles.qrDataText}>
              Challan Number: {qrData.challanNum}
            </Text>
            <Text style={styles.qrDataText}>
              Registration Number: {qrData.regNumber}
            </Text>
            <Text style={styles.qrDataText}>
              Vehicle Number: {qrData.vehicleNo}
            </Text>
            <Text style={styles.qrDataText}>
              Amount (fine): {qrData.amount}
            </Text>
            <Text style={styles.qrDataText}>Car Type: {qrData.carType}</Text>
            <Text style={styles.qrDataText}>Due Date: {qrData.due_date}</Text>
            <Text style={styles.qrDataText}>Location: {qrData.location}</Text>
            <Text style={styles.qrDataText}>
              Extra Comments: {qrData.anyComment}
            </Text>
          </View>

          <TouchableOpacity
            style={[
              globalStyles.cameraButtns,
              { width: responsiveWidth(45), top: 260 },
            ]}
            onPress={handleRescan}
          >
            <Text style={globalStyles.submitChallan_Text}>Scan QR</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }

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
        <Text style={styles.headerText}>SCAN QR CODE</Text>
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
    height: 80,
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
  },
  qrDataHeader: {
    top: 25,
    textAlign: "center",
    color: "white",
    fontSize: 18,
    fontFamily: "poppins-bold",
    marginBottom: 10,
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
