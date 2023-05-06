import React from "react";
import { Image, Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import LottieView from "lottie-react-native";
import {
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";


export default function WelcomeScreen({ navigation }) {

  return (
    <>
      <Image
        style={globalStyles.welcome_Image}
        source={require("../assets/images/carGif.gif")}
      />

      <Text style={globalStyles.style_Just_Try}> Welcome to</Text>
      <Text style={globalStyles.style_design}>E-Parking Challan App</Text>
      <View style={globalStyles.style_in_publishing}>
        <Text style={globalStyles.in_pub_text}>
          Let's ease the traffic together!{"\n"}
          Pay challan one click to go, Manage challan{"\n"}
          its easy.
        </Text>
      </View>

      <View style={globalStyles.welcome_btn_Group}>
        <TouchableOpacity
          style={[
            globalStyles.Register_btn,
            {
              backgroundColor: "rgba(10,76,118,1)",
              width: responsiveWidth(80),
              marginLeft: responsiveWidth(7),
            },
          ]}
          onPress={() => {
            navigation.navigate("ChooseView");
          }}
        >
          <Text
            style={[
              globalStyles.Register_Text,
              {
                fontSize: responsiveFontSize(2.3),
                marginLeft: responsiveWidth(10),
              },
            ]}
          >
            Get Started
          </Text>
        </TouchableOpacity>
        <View
          style={[
            StyleSheet.absoluteFillObject,
            globalStyles.welocme_animationBtn,
          ]}
        >
          <LottieView
            source={require("../assets/JSON_Animations/arrow-welcomePage.json")}
            autoPlay
            loop
          />
        </View>
      </View>
    </>
  );
}
