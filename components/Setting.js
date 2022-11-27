import { React, useState } from "react";
import {
  Text,
  TouchableHighlight,
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

export default function Setting({ navigation }) {
  const [name, setname] = useState("");

  return (
    <View>
      <View style={styles.purple_background}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons
            style={styles.back_icon}
            name={"chevron-back-outline"}
            size={45}
            color={"white"}
          />
          <Text style={styles.Setting_Text}>Setting</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.Account_length}>
        <View style={[styles.Remaining_item_length, {marginTop: responsiveHeight(21),}]}>
          <TouchableOpacity style={styles.style_container}>
            <Ionicons name={"person-outline"} size={20} color={"rgba(10,76,118,1)"} />
            <Text style={styles.style_text}>Account</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.Account_line}></View>
      <View style={styles.Remaining_item_length}>
        <TouchableOpacity
          style={styles.style_container}
          onPress={() => {
            navigation.navigate("Notifications");
          }}
        >
          <Ionicons name={"notifications-outline"} size={20} color={"rgba(10,76,118,1)"} />
          <Text style={styles.style_text}>Notification</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.line}></View>
      <View style={styles.Remaining_item_length}>
        <TouchableOpacity style={styles.style_container}>
          <Ionicons name={"eye-outline"} size={20} color={"rgba(10,76,118,1)"} />
          <Text style={styles.style_text}>Appearance</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.line}></View>
      <View style={styles.Remaining_item_length}>
        <TouchableOpacity style={styles.style_container}>
          <Ionicons name={"shield-outline"} size={20} color={"rgba(10,76,118,1)"} />
          <Text style={styles.style_text}>Security</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.line}></View>
      <View style={styles.Remaining_item_length}>
        <TouchableOpacity style={styles.style_container}>
          <Ionicons name={"globe-outline"} size={20} color={"rgba(10,76,118,1)"} />
          <Text style={styles.style_text}>Language</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.line}></View>
      <View style={styles.Remaining_item_length}>
        <TouchableOpacity
          style={styles.style_container}
          onPress={() => {
            navigation.navigate("Rules");
          }}
        >
          <Ionicons name={"newspaper-outline"} size={20} color={"rgba(10,76,118,1)"} />
          <Text style={styles.style_text}>Rules</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.line}></View>
      <View style={styles.Remaining_item_length}>
        <TouchableOpacity
          style={styles.style_container}
          onPress={() => {
            navigation.navigate("Help");
          }}
        >
          <Ionicons name={"help-circle-outline"} size={20} color={"rgba(10,76,118,1)"} />
          <Text style={styles.style_text}>Help and Support</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.line}></View>
      <View style={styles.Remaining_item_length}>
        <TouchableOpacity style={styles.style_container}>
          <Ionicons
            name={"information-circle-outline"}
            size={20}
            color={"rgba(10,76,118,1)"}
          />
          <Text style={styles.style_text}>About</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.line}></View>
    </View>
  );
}
const styles = StyleSheet.create({
  Account_length: {
    height: responsiveHeight(50),
    width: responsiveWidth(100),
  },
  Remaining_item_length: {
    height: responsiveHeight(10),
    width: responsiveWidth(100),
  },
  Account_line: {
    height: responsiveHeight(0.2),
    backgroundColor: "rgba(24,154,180,1)",
    alignSelf: "stretch",
    marginLeft: responsiveWidth(9),
    marginRight: responsiveWidth(9),
    marginTop: responsiveHeight(-20),
  },
  back_icon: {
    marginTop: responsiveHeight(5),
    marginLeft: responsiveWidth(6),
  },
  line: {
    height: responsiveHeight(0.2),
    backgroundColor: "rgba(24,154,180,1)",
    alignSelf: "stretch",
    marginLeft: responsiveWidth(9),
    marginRight: responsiveWidth(9),
    marginTop: responsiveHeight(-1),
  },
  style_container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: responsiveWidth(80),
    paddingLeft: responsiveWidth(5),
    marginTop: responsiveHeight(-1),
    marginLeft: responsiveWidth(5),
  },
  style_text: {
    fontSize: responsiveFontSize(2.5),
    marginLeft: responsiveWidth(3),
    letterSpacing: 1.0,
    fontFamily: "poppins-regular",
    lineheight: 114.99999761581421,
    color: "rgb(1,1,1)",
  },
  purple_background: {
    backgroundColor: "rgba(10,76,118,1)",
    width: responsiveWidth(100),
    height: responsiveHeight(15),
    position: "absolute",
  },
  Setting_Text: {
    color: "white",
    textAlign: "center",
    marginTop: responsiveHeight(-6.5),
    fontSize: responsiveFontSize(3.5),
    letterSpacing: 1.0,
    fontFamily: "poppins-bold",
    lineheight: 114.99999761581421,
    marginLeft: responsiveWidth(-5),
  },
});
