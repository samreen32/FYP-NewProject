import { React, useState } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  Linking,
  TextInput,
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

export default function Help({navigation}) {
  const [name, setname] = useState("");
  return (
    <View>
      <View style={styles.purple_background}>
        <TouchableOpacity
          onPress={()=>{
            navigation.goBack();
          }}
        >
          <Text style={styles.Help_Text}>Help</Text>
        <Ionicons name="arrow-back" size={50} color="black" style={styles.backArrow}/>
        </TouchableOpacity>
      </View>

      <View style={styles.icon_border}>
        <Ionicons name={"help-circle"} size={160} color={"purple"} />
      </View>
      <View
        style={{ height: responsiveHeight(67), width: responsiveWidth(100) }}
      >
        <TextInput
          style={styles.style_Rectangle4}
          onChangeText={(value) => setname(value)}
          placeholder="    Enter Name"
          keyboardType="alphabet"
          editable
          maxLength={20}
        />
        <TextInput
          style={styles.style_Rectangle5}
          onChangeText={(value) => setname(value)}
          placeholder="    Email"
          keyboardType="email"
          editable
          maxLength={20}
        />
        <TextInput
          style={styles.style_Rectangle6}
          onChangeText={(value) => setname(value)}
          placeholder="    Description"
          multiline
          keyboardType="alphabet"
          editable
          maxLength={20}
        />
        <TextInput
          style={styles.style_Rectangle7}
          onChangeText={(value) => setname(value)}
          placeholder="    Any Comment"
          multiline
          keyboardType="alphabet"
          editable
          maxLength={20}
        />
      </View>
      <TouchableOpacity style={styles.submit_btn}
      onPress={()=>{
        navigation.goBack();
      }}>
        <Text style={styles.submit_text}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  style_Rectangle4: {
    marginLeft: responsiveWidth(8),
    marginTop: responsiveHeight(2),
    position: "absolute",
    width: responsiveWidth(87),
    height: responsiveHeight(10),
    opacity: 1,
    color: "grey",

    backgroundColor: "rgba(217,217,217,1)",
    borderRadius: responsiveWidth(6),
  },
  style_Rectangle6: {
    marginLeft: responsiveWidth(8),
    marginTop: responsiveHeight(24),
    position: "absolute",
    width: responsiveWidth(87),
    height: responsiveHeight(10),
    opacity: 1,
    color: "grey",
    paddingTop: responsiveHeight(3),
    backgroundColor: "rgba(217,217,217,1)",
    borderRadius: responsiveWidth(6),
  },
  style_Rectangle7: {
    marginLeft: responsiveWidth(8),
    marginTop: responsiveHeight(35),
    position: "absolute",
    width: responsiveWidth(87),
    height: responsiveHeight(10),
    opacity: 1,
    color: "grey",
    paddingTop: responsiveHeight(3),
    backgroundColor: "rgba(217,217,217,1)",
    borderRadius: responsiveWidth(6),
  },
  style_Rectangle5: {
    marginLeft: responsiveWidth(8),
    marginTop: responsiveHeight(13),
    position: "absolute",
    width: responsiveWidth(87),
    height: responsiveHeight(10),
    opacity: 1,
    color: "grey",
    background: "#D9D9D9",

    backgroundColor: "rgba(217,217,217,1)",
    borderRadius: responsiveWidth(6),
  },
  icon_border: {
    marginTop: responsiveHeight(-16),
    marginLeft: responsiveWidth(28),
  },
  purple_background: {
    backgroundColor: "rgba(215,152,246,1)",
    width: responsiveWidth(100),
    height: responsiveHeight(30),
  },
  Help_Text: {
    color: "white",
    textAlign: "center",
    marginTop: responsiveHeight(5),
    fontSize: responsiveFontSize(4),
    letterSpacing: 1.0,
    fontFamily: "poppins-bold",
    lineheight: 114.99999761581421,
  },

  submit_btn: {
    backgroundColor: "rgba(215,152,246,1)",
    width: responsiveWidth(30),
    height: responsiveHeight(7),
    marginTop: responsiveHeight(-19),
    borderRadius: responsiveWidth(3),
    marginLeft: responsiveWidth(37),
  },
  submit_text: {
    fontSize: responsiveFontSize(2.5),
    justifyContent: "center",
    textAlign: "center",
    letterSpacing: 1.0,
    fontFamily: "poppins-bold",
    fontWeight: "bold",
    paddingTop: responsiveHeight(1.6),
  },
  backArrow: {
    marginLeft: responsiveWidth(5),
    marginTop: responsiveHeight(-7.8),
  }
});
