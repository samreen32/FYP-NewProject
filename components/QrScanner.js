import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { Camera } from "expo-camera";
import { BarCodeScanner } from "expo-barcode-scanner";

export default function QrScanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [qrData, setQrData] = useState("");
  const dataArray = qrData.split(",");

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setQrData(data);
  };

  const resetScanner = () => {
    setScanned(false);
    setQrData("");
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {!scanned ? (
        <BarCodeScanner
          onBarCodeScanned={handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      ) : (
        <View style={styles.scannedDataContainer}>
          <Text style={styles.scannedDataText}>
            Challan No
            {dataArray[0]}
          </Text>
          <Text style={styles.scannedDataText}>
            VehicleDetail
            {dataArray[1]}
          </Text>
          <Text style={styles.scannedDataText}>
            RegNo
            {dataArray[2]}
          </Text>
          <Text style={styles.scannedDataText}>
            Amount
            {dataArray[3]}
          </Text>
          <Text style={styles.scannedDataText}>
            DateTime
            {dataArray[4]}
          </Text>
          <Text style={styles.scannedDataText}>
            Location
            {dataArray[5]}
          </Text>
          <Text style={styles.scannedDataText}>
            DueDate
            {dataArray[6]}
          </Text>
          <Button title="Scan Again" onPress={resetScanner} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  scannedDataContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "left",
  },
  scannedDataText: {
    fontSize: 20,
    fontFamily: "poppins-regular",
  },
});
