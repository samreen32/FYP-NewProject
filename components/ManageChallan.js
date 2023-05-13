import { React, useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { CHALLAN_API_URL } from "../Custom_Api_Calls/api_calls";
import { globalStyles } from "../styles/globalStyles";

export default function ManageChallan({ navigation }) {
  const [challans, setChallans] = useState([]);

  /************** Function to fecth all the challans ****************/
  const fetchPaidChallans = async () => {
    try {
      const response = await fetch(`${CHALLAN_API_URL}/show_paidChallans`, {
        method: "GET",
      });
      const responseData = await response.json();
      setChallans(responseData.paidChallans);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchPaidChallans();
  }, []);

  return (
    <>
      <View style={globalStyles.header}>
        <Ionicons
          name="arrow-back"
          size={24}
          color="white"
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text style={globalStyles.headerText}>MANAGE CHALLAN</Text>
        <View style={{ width: 24 }}></View>
      </View>

      <FlatList
        data={challans}
        renderItem={({ item, description }) => (
          <View style={styles.Challan_Container}>
            <View>
              <Text style={styles.Status_Text}>
                CHALLAN {item.status.toUpperCase()}
              </Text>
              <Text style={styles.description_Text}>
                {new Date(item.date).toLocaleDateString()}
              </Text>
            </View>
            <Text style={styles.Vehicle_no_text}>
              {item.vehicleNo.toUpperCase()}
            </Text>
          </View>
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
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
    marginLeft: responsiveWidth(62),
    marginTop: responsiveHeight(-5.5),
  },
});
