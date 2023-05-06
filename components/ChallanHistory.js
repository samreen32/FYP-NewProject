import { React, useState } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  Linking,
  TextInput,
  FlatList,
  TouchableOpacity,
  Button,
  Pressable,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";


const DATA = [
  {
    id: "1",
    status: "CHALLAN PAID",
    date: "10/02/2022",
    Vehicle_no: "RIM \n2883",
  },
  {
    id: "2",
    status: "CHALLAN PAID",
    date: "10/02/2022",
    Vehicle_no: "RIM \n2883",
  },

  {
    id: "3",
    status: "CHALLAN PAID",
    date: "10/02/2022",
    Vehicle_no: "RIM \n2883",
  },
  {
    id: "4",
    status: "CHALLAN PAID",
    date: "10/02/2022",
    Vehicle_no: "RIM \n2883",
  },
  {
    id: "5",
    status: "CHALLAN PAID",
    date: "10/02/2022",
    Vehicle_no: "RIM \n2883",
  },
  {
    id: "6",
    status: "CHALLAN PAID",
    date: "10/02/2022",
    Vehicle_no: "RIM \n2883",
  },
  {
    id: "7",
    status: "CHALLAN PAID",
    date: "10/02/2022",
    Vehicle_no: "RIM \n2883",
  },
  {
    id: "8",
    status: "CHALLAN PAID",
    date: "10/02/2022",
    Vehicle_no: "RIM \n2883",
  },
  {
    id: "9",
    status: "CHALLAN PAID",
    date: "10/02/2022",
    Vehicle_no: "RIM \n2883",
  },
];

export default function ChallanHistory({navigation}) {
  return (
    <View>
<View style={styles.purple_background}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
         <Ionicons
            name="arrow-back"
            size={45}
            color="white"
            style={styles.backArrow}
          />
        <Text style={styles.Challan_Text_Header}>Challan History</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={DATA}
        renderItem={({ item, description }) => (
          <View style={styles.Challan_Container}>
            <View>
              <Text style={styles.Status_Text}>{item.status}</Text>
              <Text style={styles.description_Text}>{item.date}</Text>
            </View>
            <Text style={styles.Vehicle_no_text}>{item.Vehicle_no}</Text>
          </View>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  purple_background: {
    backgroundColor: "rgba(10,76,118,1)",
    width: responsiveWidth(100),
    height: responsiveHeight(15),
  },
  Challan_Text_Header: {
    color: "white",
    fontFamily: "poppins-bold",
    fontSize: responsiveFontSize(3.5),
    marginLeft: responsiveWidth(23),
    marginTop: responsiveHeight(-6),
  },
  Challan_Container: {
    backgroundColor: "rgba(24,154,180,1)",
    height: responsiveHeight(12),
    marginLeft: responsiveWidth(6),
    marginTop: responsiveHeight(3.5),
    marginRight: responsiveWidth(6),
    marginVertical: responsiveHeight(-2),
    borderRadius: 15,
  },
  Status_Text: {
    color: "#000000",
    fontWeight: "bold",
    fontSize: responsiveFontSize(2.3),
    marginLeft: responsiveWidth(5),
    marginTop: responsiveHeight(0.5),
    paddingTop: responsiveHeight(2),
  },
  description_Text: {
    marginLeft: responsiveWidth(5),
    marginTop: responsiveHeight(0.5),
    color: "#FFFFFF",
  },
  Vehicle_no_text: {
    color: "white",
    fontSize: responsiveFontSize(3),
    fontWeight: "bold",
    marginLeft: responsiveWidth(55),
    marginTop: responsiveHeight(-8),
  },
  backArrow: {
    marginLeft: responsiveWidth(5),
    marginTop: responsiveHeight(4),
  }
});
