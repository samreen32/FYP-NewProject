import { React, useState, useRef, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from "react-native";
import LottieView from "lottie-react-native";
import { AntDesign } from "@expo/vector-icons";
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
import { useNavigation } from "@react-navigation/native";

export default function CitizenResetPassword({ route }) {
  const [credentials, setCredentials] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const { newPassword, confirmPassword } = credentials;
  const {
    isLoading,
    setIsLoading,
    isValidObjField,
    updateError,
    isPassSecure,
    setIsPassSecure,
    error,
    setError,
    showToast
  } = userLogin();
  const navigation = useNavigation();
  const { email } = route.params;
  const animationRef = useRef(null);

  useEffect(() => {
    animationRef.current.play();
    return () => {
      if (animationRef.current) {
        animationRef.current.reset();
      }
    };
  }, []);

  /*************** Function to reset password ********************/
  const handleResetPassword = async () => {
    if (!isValidObjField(credentials)) {
      return updateError("Require all fields!", setError);
    }
    if (!newPassword.trim() || newPassword.length < 5) {
      return updateError("New password must be 5 character long!", setError);
    }
    if (newPassword !== confirmPassword) {
      return updateError("Passwords do not match!", setError);
    }
    setIsLoading(true);
    fetch(`${AUTH_API_URL}/citizen_reset_password`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        newPassword: newPassword,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        setIsLoading(false);
        navigation.navigate("CitizenLogin");
        showToast(`Your password has been reset${"\n"}You can Login!`);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };

  const onChange = (value, fieldName) => {
    setCredentials({ ...credentials, [fieldName]: value });
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
        <Text style={styles.Help_Text}>Reset Your{"\n"}Password</Text>
      </View>

      <View style={[StyleSheet.absoluteFillObject, styles.icon_border]}>
        <LottieView
          source={require("../assets/JSON_Animations/lock.json")}
          ref={animationRef}
          autoPlay={false}
          loop={false}
        />
      </View>
      <ScrollView>
        <View
          style={{
            marginTop: responsiveHeight(8),
            alignItems: "center",
          }}
        >
          {error ? (
            <Text
              style={{
                color: "red",
                fontSize: responsiveFontSize(2.5),
                textAlign: "center",
                marginTop: responsiveHeight(-2),
              }}
            >
              {error}
            </Text>
          ) : null}

          <TextInput
            style={[globalStyles.textInput, { marginTop: responsiveHeight(0) }]}
            onChangeText={(value) => onChange(value, "newPassword")}
            value={newPassword}
            label="Enter your new password"
            keyboardType="alphabet"
            mode="outlined"
            activeOutlineColor="rgba(10,76,118,1)"
            outlineColor="rgba(24,154,180,1)"
            editable
            autoCapitalize="none"
            secureTextEntry={isPassSecure}
            right={
              <TextInput.Icon
                icon={isPassSecure ? "eye" : "eye-off"}
                onPress={() => {
                  setIsPassSecure((prev) => !prev);
                }}
              />
            }
          />

          <TextInput
            style={[
              globalStyles.textInput,
              { marginTop: responsiveHeight(12) },
            ]}
            onChangeText={(value) => onChange(value, "confirmPassword")}
            value={confirmPassword}
            label="Confirm password"
            keyboardType="alphabet"
            mode="outlined"
            activeOutlineColor="rgba(10,76,118,1)"
            outlineColor="rgba(24,154,180,1)"
            editable
            autoCapitalize="none"
            secureTextEntry={isPassSecure}
            right={
              <TextInput.Icon
                icon={isPassSecure ? "eye" : "eye-off"}
                onPress={() => {
                  setIsPassSecure((prev) => !prev);
                }}
              />
            }
          />
          <TouchableOpacity
            style={styles.submit_btn}
            onPress={() => {
              handleResetPassword();
            }}
          >
            <Text style={styles.submit_text}>Done</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {isLoading ? <AppLoader /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  icon_border: {
    marginTop: responsiveHeight(6),
    marginLeft: responsiveWidth(25),
    alignItems: "center",
    width: responsiveWidth(50),
    height: responsiveHeight(50),
  },
  purple_background: {
    backgroundColor: "rgba(10,76,118,1)",
    width: responsiveWidth(100),
    height: responsiveHeight(35),
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
    width: responsiveWidth(30),
    height: responsiveHeight(7),
    borderRadius: responsiveWidth(7),
    marginTop: responsiveHeight(30),
  },
  submit_text: {
    fontSize: responsiveFontSize(2.5),
    justifyContent: "center",
    textAlign: "center",
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
