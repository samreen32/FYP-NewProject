import { React, useState } from "react";
import {
  Text,
  View,
  Linking,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { TextInput } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { globalStyles } from "../styles/globalStyles";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackActions } from "@react-navigation/native";
import { userLogin } from "../context/AuthContext";
import auth_api from "../Custom_Api_Calls/auth_api";
import AppLoader from "../Loader/AppLoader";


export default function AdminLogin({ navigation }) {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const { email, password } = credentials;
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
      const response = await auth_api.post("/adminlogin", {
        email,
        password,
      });
      if (response.data.success) {
        AsyncStorage.setItem("token", response.data.authToken);
        setCredentials({ email: "", password: "" });
        setProfile(response.data.admin);
        setIsLogIn(true);
        showToast("You have logged in as admin.");
        navigation.dispatch(
          StackActions.replace("AdminDrawer", {
            response: response.data.authToken,
          })
        );
        setIsLoading(false);
      } else {
        alert("This is a protected route for admins only!");
        setIsLoading(false);
      }
    } catch (e) {
      console.log(`Invalid Credentials Login error ${e}`);
      setIsLoading(false);
    }
  };

  const onChange = (value, fieldName) => {
    setCredentials({ ...credentials, [fieldName]: value });
  };


  return (
    <>
      <View
        style={[
          globalStyles.register_hello,
          { marginTop: responsiveHeight(5) },
        ]}
      >
        <Text style={globalStyles.register_hello}>
          {"  "}E-Parking {"\n"}Challan App!
        </Text>
      </View>

      <View
        style={[
          globalStyles.login_welcome_back,
          { marginTop: responsiveHeight(18) },
        ]}
      >
        <Text
          style={[
            globalStyles.login_welcome_back,
            { marginLeft: responsiveWidth(19) },
          ]}
        >
          {""}<Text style={{color: "rgba(24,154,180,1)", fontFamily: "poppins-bold"}}>Admin</Text> Login{"\n"}to continue.
        </Text>
      </View>

      <View
        style={{
          marginTop: responsiveHeight(6),
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
              marginTop: responsiveHeight(28.5),
            }}
          >
            {error}
          </Text>
        ) : null}

        <TextInput
          style={[globalStyles.textInput, { marginTop: responsiveHeight(25) }]}
          value={email}
          onChangeText={(value) => onChange(value, "email")}
          label="Email"
          mode="outlined"
          activeOutlineColor="rgba(10,76,118,1)"
          outlineColor="rgba(24,154,180,1)"
          editable
          autoCapitalize="none"
        />

        <TextInput
          style={[globalStyles.textInput, { marginTop: responsiveHeight(37) }]}
          value={password}
          onChangeText={(value) => onChange(value, "password")}
          label="Password"
          mode="outlined"
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
            style={[
              globalStyles.Recovery_Password,
              { marginTop: responsiveHeight(50) },
            ]}
            onPress={() => {
              navigation.navigate("AdminForgotPassword");
            }}
          >
            Forgot Password ?
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            globalStyles.login_SignIn,
            { marginTop: responsiveHeight(57) },
          ]}
          onPress={() => {
            login(email, password);
          }}
        >
          <Text style={globalStyles.Sign_in_Text}>Login</Text>
        </TouchableOpacity>

        <Text
          style={[
            globalStyles.login_or_continue,
            { marginTop: responsiveHeight(72) },
          ]}
        >
          Or continue with
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: responsiveHeight(5),
          }}
        >
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

      {isLoading ? <AppLoader /> : null}
    </>
  );
}
