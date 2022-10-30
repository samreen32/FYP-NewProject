import { React, useState } from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { Ionicons, AntDesign } from '@expo/vector-icons';

export default function Statistics({navigation}) {
  return (
    <View>
      <View style={styles.purple_background}>
        <Text style={styles.Statistics_Text}>Statistics</Text>

        <TouchableOpacity
          onPress={()=>{
            navigation.goBack();
          }}
        >
        <Ionicons name="arrow-back" size={50} color="black" style={styles.backArrow}/>
        </TouchableOpacity>

      </View>
      <View>
        <Text style={styles.challan_Text}>Total Challan</Text>
        <AntDesign name="piechart" size={300} color="black" style={styles.Pie_img}/>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  purple_background: {
    backgroundColor: "rgba(215,152,246,1)",
    width: responsiveWidth(100),
    height: responsiveHeight(13),
    position: "absolute",
  },
  Statistics_Text: {
    color: "white",
    textAlign: "center",
    marginTop: responsiveHeight(5),
    fontSize: responsiveFontSize(3.5),
    letterSpacing: 1.0,
    fontFamily: "poppins-bold",
    marginLeft: responsiveWidth(-2.5),
  },
  challan_Text: {
    color: "black",
    marginTop: responsiveHeight(18),
    fontSize: responsiveFontSize(3),
    alignItems: "center",
    letterSpacing: 1.0,
    fontFamily: "poppins-regular",
    marginLeft: responsiveWidth(25),
    fontWeight: "bold",
  },
  Pie_img: {
    marginLeft: responsiveWidth(8),
    marginTop: responsiveHeight(5),
  },
  backArrow: {
    marginLeft: responsiveWidth(5),
    marginTop: responsiveHeight(-7.5),
  }
});
