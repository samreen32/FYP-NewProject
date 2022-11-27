import { React, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";

export default function CitizenEditProfile({navigation}) {
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
          <Text style={styles.Edit_Profile_Text}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.Change_Profile_Rectangle}>
        <Ionicons name={"person-circle"} size={95} color={"rgba(10,76,118,1)"} />
        <TouchableOpacity style={styles.Edit_Profile_Btn}>
          <Text style={styles.Change_Image_Btn}>Change Image</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{ height: responsiveHeight(60), width: responsiveWidth(100) }}
      >
        <TextInput
          style={styles.style_Rectangle4}
          onChangeText={(value) => setname(value)}
          placeholder="    Enter username"
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
          placeholder="    Change Password"
          editable
          maxLength={20}
        />
        <TextInput
          style={styles.style_Rectangle7}
          onChangeText={(value) => setname(value)}
          placeholder="    Mobile No"
          keyboardType="numeric"
          editable
          maxLength={20}
        />
      </View>
      <TouchableOpacity style={styles.save_btn}
      onPress={()=>{
        navigation.goBack()
      }}>
        <Text style={styles.save_text}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  style_Rectangle4: {
    marginLeft: responsiveWidth(8),
    marginTop: responsiveHeight(3),
    position: "absolute",
    width: responsiveWidth(87),
    height: responsiveHeight(8),
    opacity: 1,
    color: "grey",
    backgroundColor: "rgba(217,217,217,1)",
    borderRadius: responsiveWidth(6),
  },
  style_Rectangle6: {
    marginLeft: responsiveWidth(8),
    marginTop: responsiveHeight(21),
    position: "absolute",
    width: responsiveWidth(87),
    height: responsiveHeight(8),
    opacity: 1,
    color: "grey",
    backgroundColor: "rgba(217,217,217,1)",
    borderRadius: responsiveWidth(6),
  },
  style_Rectangle7: {
    marginLeft: responsiveWidth(8),
    marginTop: responsiveHeight(30),
    position: "absolute",
    width: responsiveWidth(87),
    height: responsiveHeight(8),
    opacity: 1,
    color: "grey",
    backgroundColor: "rgba(217,217,217,1)",
    borderRadius: responsiveWidth(6),
  },
  style_Rectangle5: {
    marginLeft: responsiveWidth(8),
    marginTop: responsiveHeight(12),
    position: "absolute",
    width: responsiveWidth(87),
    height: responsiveHeight(8),
    opacity: 1,
    color: "grey",
    background: "#D9D9D9",
    backgroundColor: "rgba(217,217,217,1)",
    borderRadius: responsiveWidth(6),
  },
  purple_background: {
    backgroundColor: "rgba(10,76,118,1)",
    width: responsiveWidth(100),
    height: responsiveHeight(30),
  },
  Edit_Profile_Text: {
    color: "white",
    textAlign: "center",
    marginTop: responsiveHeight(-6),
    marginLeft: responsiveWidth(3.5),
    fontSize: responsiveFontSize(3.5),
    letterSpacing: 1.0,
    fontFamily: "poppins-bold",
    lineheight: 114.99999761581421,
  },
  Change_Profile_Rectangle: {
    height: responsiveHeight(30),
    width: responsiveWidth(85),
    backgroundColor: "#D9D9D9",
    justifyContent: "center",
    marginTop: responsiveHeight(-15),
    marginLeft: responsiveWidth(8),
    borderRadius: responsiveWidth(5),
    alignItems: "center",
  },

  Change_Image_Btn: {
    backgroundColor: "rgba(24,154,180,1)",
    width: responsiveWidth(44),
    height: responsiveHeight(5.7),
    textAlign: "center",
    justifyContent: "center",
    borderRadius: responsiveWidth(8),
    fontSize: responsiveFontSize(2),
    letterSpacing: 1.0,
    fontFamily: "poppins-regular",
    lineheight: 114.99999761581421,
    color: "white",
    paddingTop: responsiveHeight(1),
  },
  save_btn: {
    backgroundColor: "rgba(24,154,180,1)",
    width: responsiveWidth(30),
    height: responsiveHeight(7.5),
    marginTop: responsiveHeight(-19),
    borderRadius: responsiveWidth(3),
    marginLeft: responsiveWidth(37),
  },
  save_text: {
    fontSize: responsiveFontSize(2.5),
    justifyContent: "center",
    textAlign: "center",
    letterSpacing: 1.0,
    fontFamily: "poppins-bold",
    paddingTop: responsiveHeight(1.6),
    color: "white",
  },
  back_icon: {
    marginTop: responsiveHeight(5),
    marginLeft: responsiveWidth(6),
  },
});
