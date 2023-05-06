import { React, useRef, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Linking,
  Dimensions,
  Animated,
} from "react-native";
import { TextInput } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { globalStyles } from "../styles/globalStyles";
import {
  responsiveHeight,
  responsiveFontSize,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackActions } from "@react-navigation/native";
import CitizenRegister from "./CitizenRegister";
import { userLogin } from "../context/AuthContext";
import AppLoader from "../Loader/AppLoader";
import auth_api from "../Custom_Api_Calls/auth_api";

export default function CitizenLogin({ navigation }) {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const { email, password } = credentials;
  const animation = useRef(new Animated.Value(0)).current;
  const scrollView = useRef();
  const {
    isLoading,
    setIsLoading,
    setIsLogIn,
    setProfile,
    isValidEmail,
    isValidObjField,
    updateError,
    isPassSecure,
    setIsPassSecure,
    error,
    setError,
    showToast
  } = userLogin();

  //Login function
  const login = async (email, password) => {
    try {
      if (!isValidObjField(credentials)) {
        return updateError("Require all fields!", setError);
      }
      if (!isValidEmail(email)) {
        return updateError("Enter a valid emai!", setError);
      }
      if (!password.trim() || password.length < 5) {
        return updateError("Password must be 5 character long!", setError);
      }
      setIsLoading(true);
      const response = await auth_api.post("/citizenlogin", {
        email,
        password,
      });
      if (response.data.success) {
        AsyncStorage.setItem("token", response.data.authToken);
        setCredentials({ email: "", password: "" });
        setProfile(response.data.citizen);
        setIsLogIn(true);
        showToast("You have been Loggedin.");
        navigation.dispatch(
          StackActions.replace("CitizenDrawer", {
            response: response.data.authToken,
          })
        );
        setIsLoading(false);
      }
      if (response.status === 404) {
        updateError("Citizen with this Email does not exist!", setError);
        setIsLoading(false);
      }
      if (response.status === 400) {
        updateError("Password incorrect!", setError);
        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);
      updateError("Enter correct credentials!", setError);
    }
  };

  const onChange = (value, fieldName) => {
    setCredentials({ ...credentials, [fieldName]: value });
  };

  /***** Animation of Top header of register page ******/
  const loginOpacity = animation.interpolate({
    inputRange: [0, Dimensions.get("window").width],
    outputRange: [1, 0],
  });

  const registerOpacity = animation.interpolate({
    inputRange: [0, Dimensions.get("window").width],
    outputRange: [0, 1],
  });

  const leftHeaderX = animation.interpolate({
    inputRange: [0, Dimensions.get("window").width],
    outputRange: [0, 7],
  });

  const leftHeaderY = animation.interpolate({
    inputRange: [0, Dimensions.get("window").width],
    outputRange: [0, -20],
  });

  // const wardenBtnColor = animation.interpolate({
  //   inputRange: [0, Dimensions.get("window").width],
  //   outputRange: ["rgba(10,76,118,1)", "rgba(24,154,180,1)"],
  // });

  // const citizenBtnColor = animation.interpolate({
  //   inputRange: [0, Dimensions.get("window").width],
  //   outputRange: ["rgba(24,154,180,1)", "rgba(10,76,118,1)"],
  // });

  return (
    <View>
      <View style={globalStyles.register_hello}>
        <Animated.Text
          style={[
            globalStyles.register_hello,
            {
              opacity: registerOpacity,
              transform: [{ translateX: leftHeaderX }],
            },
          ]}
        >
          Hello!
        </Animated.Text>
        <Animated.Text
          style={[
            globalStyles.register_hello,
            {
              opacity: loginOpacity,
              transform: [{ translateY: leftHeaderY }],
            },
          ]}
        >
          Hello <Text style={{ color: "rgba(24,154,180,1)" }}>Again!</Text>
        </Animated.Text>
        <Animated.Text
          style={[
            globalStyles.login_welcome_back,
            {
              opacity: loginOpacity,
              transform: [{ translateY: leftHeaderY }],
              marginTop: responsiveHeight(8),
            },
          ]}
        >
          {""} Welcome back{"\n"}Login to Continue.
        </Animated.Text>
        <Animated.Text
          style={[
            globalStyles.login_welcome_back,
            {
              opacity: registerOpacity,
              transform: [{ translateX: leftHeaderX }],
              marginTop: responsiveHeight(8),
            },
          ]}
        >
          <Text
            style={{ color: "rgba(24,154,180,1)", fontFamily: "poppins-bold" }}
          >
            SignUp
          </Text>{" "}
          to{"\n"}get Started.
        </Animated.Text>
      </View>

      <Animated.View style={globalStyles.CitizenWarden_btn_Group}>
        <TouchableOpacity
          style={[
            globalStyles.Register_btn,
            { backgroundColor: "rgba(24,154,180,1)" },
          ]}
          onPress={() => {
            scrollView.current.scrollTo({ x: 0 });
          }}
        >
          <Text style={globalStyles.Register_Text}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            globalStyles.Sign_in_btn,
            { backgroundColor: "rgba(10,76,118,1)" },
          ]}
          onPress={() => {
            scrollView.current.scrollTo({ x: Dimensions.get("window").width });
          }}
        >
          <Text style={globalStyles.SignIn_Text}>Register</Text>
        </TouchableOpacity>
      </Animated.View>

      <ScrollView
        ref={scrollView}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: animation } } }],
          { useNativeDriver: false }
        )}
      >
        {/**************************** Citizen Login *****************************/}
        <View
          // enabled
          // behavior={Platform.OS === "ios" ? "padding" : null}
          style={{
            marginTop: responsiveHeight(4),
            paddingHorizontal: 20,
            width: Dimensions.get("window").width,
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

          <ScrollView>
            <TextInput
              style={[
                globalStyles.textInput_register,
                { height: responsiveHeight(9) },
              ]}
              value={email}
              onChangeText={(value) => onChange(value, "email")}
              label="Email"
              //keyboardType="alphabet"
              mode="outlined"
              activeOutlineColor="rgba(10,76,118,1)"
              outlineColor="rgba(24,154,180,1)"
              editable
              autoCapitalize="none"
            />

            <TextInput
              style={[
                globalStyles.textInput_register,
                { height: responsiveHeight(9), marginTop: responsiveHeight(1) },
              ]}
              value={password}
              onChangeText={(value) => onChange(value, "password")}
              label="Password"
              mode="outlined"
              //keyboardType="alphabet"
              editable
              autoCapitalize="none"
              secureTextEntry={isPassSecure}
              activeOutlineColor="rgba(10,76,118,1)"
              outlineColor="rgba(24,154,180,1)"
              right={
                <TextInput.Icon
                  icon={isPassSecure ? "eye" : "eye-off"}
                  onPress={() => {
                    setIsPassSecure((prev) => !prev);
                  }}
                />
              }
            />

            <TouchableOpacity>
              <Text
                style={globalStyles.Recovery_Password}
                onPress={() => {
                  navigation.navigate("CitizenForgotPassword");
                }}
              >
                Forgot Password ?
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                globalStyles.register_SignUp,
                { marginTop: responsiveHeight(8) },
              ]}
              onPress={() => {
                login(email, password);
              }}
            >
              <Text style={globalStyles.Sign_in_Text}>Sign In</Text>
            </TouchableOpacity>
          </ScrollView>
          <TouchableOpacity>
            <Text style={globalStyles.login_or_continue}>Or continue with</Text>
          </TouchableOpacity>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons
              style={globalStyles.style_google_icon}
              name={"logo-google"}
              size={40}
              color={"rgba(10,76,118,1)"}
              onPress={() => {
                Linking.openURL("http://www.google.com");
              }}
            />

            <Ionicons
              style={[
                globalStyles.style_google_icon,
                { marginLeft: responsiveWidth(22) },
              ]}
              name={"logo-apple"}
              size={40}
              color={"rgba(10,76,118,1)"}
              onPress={() => {
                Linking.openURL("http://www.google.com");
              }}
            />

            <Ionicons
              style={[
                globalStyles.style_google_icon,
                { marginLeft: responsiveWidth(22) },
              ]}
              name={"logo-facebook"}
              size={40}
              color={"rgba(10,76,118,1)"}
              onPress={() => {
                Linking.openURL("http://www.google.com");
              }}
            />
          </View>
        </View>

        {/****************************** Citizen Register ********************************/}
        <CitizenRegister />
      </ScrollView>


      {isLoading ? <AppLoader /> : null}
    </View>
  );
}