import { React, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import { TextInput } from "react-native-paper";
import { globalStyles } from "../styles/globalStyles";
import {
  responsiveHeight,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userLogin } from "../context/AuthContext";
import auth_api from "../Custom_Api_Calls/auth_api";

export default function CitizenRegister({ navigation }) {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const { name, email, password, cpassword } = credentials;
  const [error, setError] = useState("");
  const {
    setIsLoading,
    isValidEmail,
    isValidObjField,
    updateError,
    isPassSecure,
    setIsPassSecure,
    showToast
  } = userLogin();

  //Citizen Register function
  const register = async (name, email, password) => {
    try {
      if (!isValidObjField(credentials)) {
        return updateError("Require all fields!", setError);
      }
      if (!name.trim() || name.length < 3) {
        return updateError("Name is not valid!", setError);
      }
      if (!isValidEmail(email)) {
        return updateError("Enter a valid emai!", setError);
      }
      if (!password.trim() || password.length < 5) {
        return updateError("Password must be 5 character long!", setError);
      }
      if (password !== cpassword) {
        return updateError("Password do not match!", setError);
      }
      setIsLoading(true);
      const response = await auth_api.post("/create_citizen", {
        name,
        email,
        password,
      });
      console.log(response.data);
      if (response.data.success) {
        AsyncStorage.setItem("token", response.data.authToken);
        showToast("Your account has been created.");
        setCredentials({
          name: "",
          email: "",
          password: "",
          cpassword: "",
        });
        setIsLoading(false);
      }
    } catch (e) {
      alert(`register error ${e}`);
      setIsLoading(false);
    }
  };

  const onChange = (value, fieldName) => {
    setCredentials({ ...credentials, [fieldName]: value });
  };


  return (
    <View
      style={{
        marginTop: responsiveHeight(3),
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
          style={globalStyles.textInput_register}
          onChangeText={(value) => onChange(value, "name")}
          value={name}
          label="Name"
          mode="outlined"
          activeOutlineColor="rgba(10,76,118,1)"
          outlineColor="rgba(24,154,180,1)"
          ////keyboardType="alphabet"
          editable
          autoCapitalize="none"
        />
        <TextInput
          style={[globalStyles.textInput_register]}
          value={email}
          onChangeText={(value) => onChange(value, "email")}
          label="Email"
          mode="outlined"
          activeOutlineColor="rgba(10,76,118,1)"
          outlineColor="rgba(24,154,180,1)"
          //keyboardType="alphabet"
          editable
          autoCapitalize="none"
        />
        <TextInput
          style={[globalStyles.textInput_register]}
          value={password}
          onChangeText={(value) => onChange(value, "password")}
          label="Password"
          mode="outlined"
          activeOutlineColor="rgba(10,76,118,1)"
          outlineColor="rgba(24,154,180,1)"
          //keyboardType="alphabet"
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
          style={[globalStyles.textInput_register]}
          value={cpassword}
          onChangeText={(value) => onChange(value, "cpassword")}
          label="Confirm Password"
          mode="outlined"
          activeOutlineColor="rgba(10,76,118,1)"
          outlineColor="rgba(24,154,180,1)"
          //keyboardType="alphabet"
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
          style={[globalStyles.register_SignUp]}
          onPress={() => {
            register(name, email, password);
          }}
        >
          <Text style={globalStyles.Sign_in_Text}>Sign Up</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
