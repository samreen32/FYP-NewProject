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
    Name: "Anyone",
    Complain: "Anyone is always complaining about...",
    image_source: require("../assets/smiley.jpg"),
  },
  {
    id: "2",
    Name: "Anyone",
    Complain: "Anyone is always complaining about...",
    image_source: require("../assets/smiley.jpg"),
  },

  {
    id: "3",
    Name: "Anyone",
    Complain: "Anyone is always complaining about...",
    image_source: require("../assets/smiley.jpg"),
  },
  {
    id: "4",
    Name: "Anyone",
    Complain: "Anyone is always complaining about...",
    image_source: require("../assets/smiley.jpg"),
  },
  {
    id: "5",
    Name: "Anyone",
    Complain: "Anyone is always complaining about...",
    image_source: require("../assets/smiley.jpg"),
  },
  {
    id: "6",
    Name: "Anyone",
    Complain: "Anyone is always complaining about...",
    image_source: require("../assets/smiley.jpg"),
  },
  {
    id: "7",
    Name: "Anyone",
    Complain: "Anyone is always complaining about...",
    image_source: require("../assets/smiley.jpg"),
  },
  {
    id: "8",
    Name: "Anyone",
    Complain: "Anyone is always complaining about...",
    image_source: require("../assets/smiley.jpg"),
  },
  {
    id: "9",
    Name: "Anyone",
    Complain: "Anyone is always complaining about...",
    image_source: require("../assets/smiley.jpg"),
  },
];

export default function ViewComplaints({ navigation }) {
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
          <Text style={styles.Complain_Text_Header}>Complaints</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={DATA}
        renderItem={({ item, description }) => (
          <View style={styles.Complain_Container}>
            <TouchableOpacity>
              <Image
                style={styles.Image}
                source={item.image_source}
                resizeMode="contain"
              />
            </TouchableOpacity>

            <View>
              <Text style={styles.Name_Text}>{item.Name}</Text>
              <Text style={styles.description_Text}>{item.Complain}</Text>
            </View>
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
  Complain_Text_Header: {
    color: "white",
    fontFamily: "poppins-bold",
    fontSize: responsiveFontSize(3.5),
    marginLeft: responsiveWidth(28),
    marginTop: responsiveHeight(-6),
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
    width: responsiveWidth(17),
    height: responsiveHeight(10),
    marginLeft: responsiveWidth(3),
    marginTop: responsiveHeight(2.5),
    borderRadius: responsiveWidth(7),
  },
  Name_Text: {
    color: "#000000",
    fontFamily: "poppins-bold",
    fontSize: responsiveFontSize(2.3),
    marginLeft: responsiveWidth(5),
    marginTop: responsiveHeight(0.5),
    paddingTop: responsiveHeight(2),
  },
  description_Text: {
    width: responsiveWidth(65.3),
    height: responsiveHeight(20),
    marginLeft: responsiveWidth(5),
    marginTop: responsiveHeight(-1),
    color: "#FFFFFF",
    fontFamily: "poppins-regular",
  },
  backArrow: {
    marginLeft: responsiveWidth(5),
    marginTop: responsiveHeight(4),
  },
});
