import React from "react";
import LottieView from "lottie-react-native";
import { View, StyleSheet } from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";

export default function NoSearch() {
  return (
    <View style={[StyleSheet.absoluteFillObject, styles.container]}>
      <LottieView
        source={require("../assets/JSON_Animations/searching.json")}
        autoPlay
        loop
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    width: responsiveWidth(100),
    height: responsiveHeight(100),
    marginTop: responsiveHeight(7)
  },
});
