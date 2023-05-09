import React, { useRef, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import {
  MaterialCommunityIcons,
  AntDesign,
  FontAwesome,
} from "@expo/vector-icons";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { Card } from "react-native-paper";

export default function ChooseView({ navigation }) {
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false, // set useNativeDriver to false
    }).start();
  }, []);

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [100, 0],
  });
  const translateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [Dimensions.get("window").width, 100],
  });

  return (
    <>
      <View style={styles.purple_background}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <AntDesign
            name="back"
            size={35}
            color="white"
            style={styles.backArrow}
          />
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: responsiveHeight(2) }}>
        <Animated.Text
          style={[styles.Help_Text, { transform: [{ translateX }] }]}
        >
          Choose
        </Animated.Text>
        <Animated.Text
          style={[styles.YourView_Text, { transform: [{ translateY }] }]}
        >
          Your View
        </Animated.Text>
      </View>

      <View style={{ alignItems: "center", marginTop: responsiveHeight(2) }}>
        <Card
          style={[
            styles.viewBlocks,
            {
              marginLeft: responsiveWidth(-55),
              transform: [{ translateX }],
            },
          ]}
          onPress={() => {
            navigation.navigate("CitizenLogin");
          }}
        >
          <Card.Content>
            <FontAwesome name="user" size={85} color="rgba(10,76,118,1)" />
            <Text style={styles.ViewsText}>Citizen</Text>
          </Card.Content>
        </Card>

        <Card
          style={[
            styles.viewBlocks,
            { marginTop: responsiveHeight(1), transform: [{ translateY }] },
          ]}
          onPress={() => {
            navigation.navigate("WardenLogin");
          }}
        >
          <Card.Content>
            <MaterialCommunityIcons
              name="human-male-board-poll"
              size={85}
              color="rgba(10,76,118,1)"
              style={{ marginLeft: responsiveWidth(8) }}
            />
            <Text style={styles.ViewsText}>Traffic Warden</Text>
          </Card.Content>
        </Card>

        <Card
          style={[
            styles.viewBlocks,
            {
              transform: [{ translateX }],
              marginLeft: responsiveWidth(-55),
              marginTop: responsiveHeight(1),
            },
          ]}
          onPress={() => {
            navigation.navigate("AdminLogin");
          }}
        >
          <Card.Content>
            <MaterialCommunityIcons
              name="account-wrench"
              size={85}
              color="rgba(10,76,118,1)"
            />
            <Text style={styles.ViewsText}>Admin</Text>
          </Card.Content>
        </Card>

      </View>
    </>
  );
}

const styles = StyleSheet.create({
  icon_border: {
    marginTop: responsiveHeight(-10),
    alignItems: "center",
  },
  viewBlocks: {
    backgroundColor: "rgba(24,154,180,1)",
    width: responsiveWidth(80),
    height: responsiveHeight(20),
    textAlign: "center",
    alignItems: "center",
  },
  ViewsText: {
    color: "white",
    textAlign: "center",
    fontSize: responsiveFontSize(2.5),
    fontFamily: "poppins-bold",
  },
  purple_background: {
    backgroundColor: "rgba(10,76,118,1)",
    width: responsiveWidth(100),
    height: responsiveHeight(12),
  },
  YourView_Text: {
    color: "black",
    textAlign: "center",
    fontSize: responsiveFontSize(4),
    letterSpacing: 1.0,
    fontFamily: "poppins-bold",
  },
  Help_Text: {
    color: "black",
    textAlign: "center",
    fontSize: responsiveFontSize(4),
    letterSpacing: 1.0,
    fontFamily: "poppins-bold",
    marginLeft: responsiveWidth(-54),
  },

  submit_btn: {
    backgroundColor: "rgba(10,76,118,1)",
    width: responsiveWidth(38),
    height: responsiveHeight(7),
    marginTop: responsiveHeight(30),
    borderRadius: responsiveWidth(6),
    marginLeft: responsiveWidth(42),
  },
  submit_text: {
    fontSize: responsiveFontSize(2.5),
    justifyContent: "center",
    textAlign: "center",
    marginLeft: responsiveWidth(-10),
    marginTop: responsiveHeight(-5.5),
    letterSpacing: 1.0,
    color: "white",
    fontFamily: "poppins-bold",
    paddingTop: responsiveHeight(1.6),
  },
  backArrow: {
    marginLeft: responsiveWidth(5),
    marginTop: responsiveHeight(5),
  },
  backArrowInBtn: {
    marginTop: responsiveHeight(2),
    marginLeft: responsiveWidth(27),
  },
});
