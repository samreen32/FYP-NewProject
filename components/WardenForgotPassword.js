import { React, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { Entypo, AntDesign } from "@expo/vector-icons";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { TextInput } from "react-native-paper";
import { globalStyles } from "../styles/globalStyles";
import { userLogin } from "../context/AuthContext";
import AppLoader from "../Loader/AppLoader";
import { AUTH_API_URL } from "../Custom_Api_Calls/api_calls";

export default function WardenForgotPassword({ navigation }) {
  const [email, setEmail] = useState("");
  const {
    isLoading,
    setIsLoading,
    isValidEmail,
    error,
    setError,
    updateError,
    showToast
  } = userLogin();

  /*************** Function to handle forgot password ********************/
  const handleForgotPassword = async () => {
    if (!isValidEmail(email)) {
      return updateError("Enter a valid emai!", setError);
    }
    setIsLoading(true);
    fetch(`${AUTH_API_URL}/warden_forgot_password`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    })
    .then((response) => {
      setIsLoading(false);
      if (response.status === 200) {
        showToast("You can reset your password!");
        navigation.navigate("WardenResetPassword", { email });
      } else if (response.status === 404) {
        updateError("Warden with this Email does not exist!", setError);
      } else {
        console.error(response);
        updateError("An error occurred, please try again later", setError);
      }
    })
    .catch((error) => {
      console.error(error);
      setIsLoading(false);
      updateError("An error occurred, please try again later", setError);
    });
  };


  return (
    <View>
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
        <Text style={styles.Help_Text}>Forgot Your{"\n"} Password?</Text>
      </View>

      <View style={styles.icon_border}>
        <Entypo name="key" size={105} color="black" />
      </View>
      <ScrollView>
        <View
          style={{
            marginTop: responsiveHeight(2),
            alignItems: "center",
          }}
        >
          {error ? (
            <Text
              style={{
                color: "red",
                fontSize: responsiveFontSize(2.5),
                textAlign: "center",
                marginTop: responsiveHeight(2),
              }}
            >
              {error}
            </Text>
          ) : null}
          <TextInput
            style={[globalStyles.textInput, { marginTop: responsiveHeight(7) }]}
            onChangeText={setEmail}
            value={email}
            label="Enter your email"
            keyboardType="alphabet"
            mode="outlined"
            activeOutlineColor="rgba(10,76,118,1)"
            outlineColor="rgba(24,154,180,1)"
            editable
            autoCapitalize="none"
          />

          <TouchableOpacity
            style={styles.submit_btn}
            onPress={() => {
              handleForgotPassword();
            }}
          >
            <AntDesign
              name="arrowright"
              size={25}
              color="white"
              style={styles.backArrowInBtn}
            />
            <Text style={styles.submit_text}>Next</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {isLoading ? <AppLoader /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  icon_border: {
    marginTop: responsiveHeight(-10),
    alignItems: "center",
  },
  purple_background: {
    backgroundColor: "rgba(10,76,118,1)",
    width: responsiveWidth(100),
    height: responsiveHeight(40),
  },
  Help_Text: {
    color: "white",
    textAlign: "center",
    fontSize: responsiveFontSize(3.5),
    textAlign: "center",
    letterSpacing: 1.0,
    fontFamily: "poppins-bold",
    lineheight: 114.99999761581421,
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
