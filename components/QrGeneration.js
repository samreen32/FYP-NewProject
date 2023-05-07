// import React, { useEffect, useState } from "react";
// import { View, Text, StyleSheet, Button } from "react-native";
// import Ionicons from "@expo/vector-icons/Ionicons";
// import * as Print from "expo-print";
// import QRCode from "react-native-qrcode-svg";
// import * as FileSystem from "expo-file-system";

// export default function QrGeneration({ navigation, route }) {
//   const [selectedPrinter, setSelectedPrinter] = React.useState();
//   const [qrUri, setQrUri] = useState();
//   const [data, setData] = useState("This is aaaaapppppppppppppp");

//   useEffect(() => {
//     generateQrCode();
//   }, []);

//   const generateQrCode = async () => {
//     try {
//       const response = await fetch(
//         `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${data}`
//       );
//       const blob = await response.blob();
//       const fileUri = `${FileSystem.documentDirectory}qr.png`;
//       await FileSystem.writeAsStringAsync(fileUri, blob, {
//         encoding: FileSystem.EncodingType.Base64,
//       });
//       setQrUri(fileUri);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const html = `
//   <html>
//     <head>
//       <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
//     </head>
//     <body style="text-align: center;">
//       <h1 style="font-size: 50px; font-family: Helvetica Neue; font-weight: normal;">
//         QR Code
//       </h1>
//       <div style="display: flex; justify-content: center;">
//         <img src="${qrUri}" alt="QR Code" />
//       </div>
//       <div style="display: flex; justify-content: center;">
//         <text>${data}</text>
//       </div>
//     </body>
//   </html>
// `;

//   const print = async () => {
//     await Print.printAsync({
//       html,
//       printerUrl: selectedPrinter?.url, // iOS only
//     });
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <View style={styles.header}>
//         <Ionicons
//           name="arrow-back"
//           size={24}
//           color="white"
//           onPress={() => {
//             navigation.goBack();
//           }}
//         />
//         <Text style={styles.headerText}>QR CODE</Text>
//         <View style={{ width: 24 }}></View>
//       </View>

//       <View style={styles.qrCode_View}>
//         <Text style={styles.qrCode_Text}>
//           Challan has been Added{"\n"}
//           {"    "}You can print the QR.{"\n"}
//           {data}
//         </Text>
//         <QRCode value={data} size={200} color="black" backgroundColor="white" />
//         <Button title="Print" onPress={print} />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   header: {
//     height: 80,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingHorizontal: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: "#ccc",
//     backgroundColor: "rgba(10,76,118,1)",
//   },
//   headerText: {
//     fontFamily: "poppins-bold",
//     color: "white",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   qrCode_View: {
//     paddingTop: 150,
//     alignItems: "center",
//   },
//   qrCode_Text: {
//     fontFamily: "poppins-regular",
//     marginBottom: 30,
//   },
// });

import React, { useState } from 'react';
import { View, Image, Button, Text } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import * as Print from 'expo-print';

const QrGeneration = () => {
  const [qrCodeData, setQRCodeData] = useState('');

  const handlePrint = async () => {
    if (qrCodeData) {
      const printJob = {
        html: `<img src="${qrCodeData}" />`,
        orientation: Print.Orientation.portrait,
      };
      await Print.printAsync(printJob);
    }
  };

  const handleFetchQRCodeData = async () => {
    try {
      const response = await fetch('http://192.168.8.101:8000/api/challans/qrcode');
      const dataUrl = await response.text();
      setQRCodeData(dataUrl);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {qrCodeData ? (
        <QRCode value={qrCodeData} size={200} />
      ) : (
        <Text>Nothing to show...</Text>
      )}
      <Button title="Generate QR Code" onPress={handleFetchQRCodeData} />
      <Button title="Print" onPress={handlePrint} />
    </View>
  );
};

export default QrGeneration;


// const {
//   challanId,
//   challanNum,
//   vehicleNo,
//   RegNo,
//   carType,
//   amount,
//   location,
//   due_date,
//   anyComment,
// } = route.params;

//const data = `Challan ID: ${challanId},${"\n"}Challan Number: ${challanNum},${"\n"}Vehicle Number: ${vehicleNo},${"\n"}Registration Number: ${RegNo},${"\n"}Car : ${carType},${"\n"}Fine Amount: ${amount},${"\n"}Location : ${location},${"\n"}Due Date: ${due_date},${"\n"}Extra Comment: ${anyComment}`;

// useEffect(() => {
//   // Create a new instance of the BLE manager
//   const manager = new BleManager();
//   // Scan for nearby Bluetooth devices
//   manager.startDeviceScan(null, null, async (error, device) => {
//     if (error) {
//       console.error(error);
//       return;
//     }

//     // Check if the device is a Phomemo printer
//     if (device.name === "Mr.in_M02") {
//       // Stop scanning for devices
//       manager.stopDeviceScan();

//       // Connect to the printer
//       const connectedDevice = await device.connect();
//       setPrinter(connectedDevice);
//     }
//   });
// }, []);

// const printQRCode = async () => {
//   if (!printer) {
//     console.log("Printer not connected");
//     return;
//   }
//   // Print the QR code
//   const command = `SIZE 48,48${"\n"}GAP 2mm,0${"\n"}CLS${"\n"}TEXT 50,50,"0",0,1,1,"${data}"${"\n"}BARCODE 200,50,"128M",100,1,0,3,5,"${data}"${"\n"}PRINT 1,1${"\n"}`;
//   await printer.writeCharacteristicWithResponse(
//     "<UUID of the printer write characteristic>",
//     Buffer.from(command, "utf-8")
//   );
// };
