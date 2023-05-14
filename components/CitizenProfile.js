import { React } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { userLogin } from "../context/AuthContext";

export default function CitizenProfile({ navigation }) {
  const { profile } = userLogin();

  return (
    <>
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
          <Text style={styles.Profile_Text}>Profile</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.Profile_Rectangle}>
        <Text style={styles.Richard_Text}>
          {profile.name.charAt(0).toUpperCase() + profile.name.slice(1)}
        </Text>
        <TouchableOpacity
          style={styles.Edit_Profile_Btn}
          onPress={() => {
            navigation.navigate("CitizenEditProfile");
          }}
        >
          <Text style={styles.Edit_Profile_Btn}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      <View
        style={{ height: responsiveHeight(50), width: responsiveWidth(100) }}
      >
        <TouchableOpacity
          style={styles.style_dashboard}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name={"keypad"} size={25} color={"rgba(10,76,118,1)"} />
          <Text style={styles.dashboard_text}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.style_challan_History}
          onPress={() => {
            navigation.navigate("ChallanHistory");
          }}
        >
          <Ionicons name={"clipboard"} size={25} color={"rgba(10,76,118,1)"} />
          <Text style={styles.challan_History_text}>Challan History</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.style_Pay}
          onPress={() => {
            navigation.navigate("PayChallan");
          }}
        >
          <Ionicons name={"logo-usd"} size={25} color={"rgba(10,76,118,1)"} />
          <Text style={styles.Pay_text}>Pay Challan</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.style_Logout}
          onPress={() => {
            navigation.navigate("Citizen_Logout");
          }}
        >
          <Ionicons name={"log-out"} size={25} color={"rgba(10,76,118,1)"} />
          <Text style={styles.Logout_text}>Logout</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  style_dashboard: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: responsiveWidth(80),
    paddingLeft: responsiveWidth(5),
    marginTop: responsiveHeight(1),
    marginLeft: responsiveWidth(10),
  },
  dashboard_text: {
    fontSize: responsiveFontSize(2.5),
    marginLeft: responsiveWidth(3),
    letterSpacing: 1.0,
    fontFamily: "poppins-regular",
    //lineheight: 114.99999761581421,
    color: "rgb(1,1,1)",
  },
  purple_background: {
    backgroundColor: "rgba(10,76,118,1)",
    width: responsiveWidth(100),
    height: responsiveHeight(30),
  },
  Profile_Text: {
    color: "white",
    textAlign: "center",
    marginTop: responsiveHeight(-6.5),
    fontSize: responsiveFontSize(4),
    letterSpacing: 1.0,
    fontFamily: "poppins-bold",
    //lineheight: 114.99999761581421,
  },
  Profile_Rectangle: {
    height: responsiveHeight(30),
    width: responsiveWidth(85),
    backgroundColor: "#D9D9D9",
    justifyContent: "center",
    marginTop: responsiveHeight(-15),
    marginLeft: responsiveWidth(8),
    borderRadius: responsiveWidth(5),
    alignItems: "center",
  },
  Richard_Text: {
    marginTop: responsiveHeight(3),
    fontSize: responsiveFontSize(3),
    letterSpacing: 1.0,
    fontFamily: "poppins-regular",
    //lineheight: 114.99999761581421,
    color: "rgb(1,1,1)",
    marginBottom: responsiveHeight(2),
  },
  Edit_Profile_Btn: {
    backgroundColor: "rgba(24,154,180,1)",
    width: responsiveWidth(39),
    height: responsiveHeight(6.5),
    textAlign: "center",
    justifyContent: "center",
    borderRadius: responsiveWidth(8),
    fontSize: responsiveFontSize(2.5),
    letterSpacing: 1.0,
    fontFamily: "poppins-regular",
    //lineheight: 114.99999761581421,
    color: "white",
    paddingTop: responsiveHeight(1),
  },
  style_challan_History: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: responsiveWidth(80),
    paddingLeft: responsiveWidth(5),
    marginTop: responsiveHeight(-7),
    marginLeft: responsiveWidth(10),
  },
  challan_History_text: {
    fontSize: responsiveFontSize(2.5),
    marginLeft: responsiveWidth(3),
    letterSpacing: 1.0,
    fontFamily: "poppins-regular",
    //lineheight: 114.99999761581421,
    color: "rgb(1,1,1)",
  },
  style_Logout: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: responsiveWidth(80),
    paddingLeft: responsiveWidth(5),
    marginTop: responsiveHeight(-7),
    marginLeft: responsiveWidth(10),
  },
  Logout_text: {
    fontSize: responsiveFontSize(2.5),
    marginLeft: responsiveWidth(3),
    letterSpacing: 1.0,
    fontFamily: "poppins-regular",
    //lineheight: 114.99999761581421,
    color: "rgb(1,1,1)",
  },
  style_Pay: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: responsiveWidth(80),
    paddingLeft: responsiveWidth(5),
    marginTop: responsiveHeight(-7),
    marginLeft: responsiveWidth(10),
  },
  Pay_text: {
    fontSize: responsiveFontSize(2.5),
    marginLeft: responsiveWidth(3),
    letterSpacing: 1.0,
    fontFamily: "poppins-regular",
    //lineheight: 114.99999761581421,
    color: "rgb(1,1,1)",
  },
  back_icon: {
    marginTop: responsiveHeight(5),
    marginLeft: responsiveWidth(6),
  },
});
