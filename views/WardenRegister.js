import { React, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { TextInput } from "react-native-paper";
import { globalStyles } from "../styles/globalStyles";
import {
  responsiveHeight,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AUTH_API_URL } from "../Custom_Api_Calls/api_calls";
import { userLogin } from "../context/AuthContext";

export default function WardenRegister() {
  const [wardenCredentials, setwardenCredentials] = useState({
    name: "",
    email: "",
    password: "",
    liscenceID: "",
    phone: "",
  });
  const { name, email, password, liscenceID, phone } = wardenCredentials;
  const [isPassSecure, setIsPassSecure] = useState(true);
  const [error, setError] = useState("");
  const {
    setIsLoading,
    isValidEmail,
    isValidPhone,
    isValidObjField,
    updateError,
    showToast,
  } = userLogin();

  //Warden Register function
  const registerWarden = async (name, email, password, liscenceID, phone) => {
    try {
      if (!isValidObjField(wardenCredentials)) {
        return updateError("Require All Fields!", setError);
      }
      if (!name.trim() || name.length < 3) {
        return updateError("Name must be 3 Character long!", setError);
      }
      if (!isValidEmail(email)) {
        return updateError("Enter a valid emai!", setError);
      }
      if (!password.trim() || password.length < 5) {
        return updateError("Password must be 5 character long!", setError);
      }
      if (!isValidPhone(phone)) {
        return updateError("Phone number is not Valid!", setError);
      }
      setIsLoading(true);
      const response = await fetch(`${AUTH_API_URL}/createwarden`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, liscenceID, phone }),
      });
      const json = await response.json();
      console.log(json);

      if (json.success) {
        AsyncStorage.setItem("token", json.authToken);
        showToast("Your have created your account as Warden.");
        setwardenCredentials({
          name: "",
          email: "",
          password: "",
          liscenceID: "",
          phone: "",
        });
        setIsLoading(false);
      } else {
        showToast("Invalid Credentials");
        setIsLoading(false);
      }
    } catch (e) {
      showToast(`Warden register error ${e}`);
      setIsLoading(false);
    }
  };

  const onChange = (value, fieldName) => {
    setwardenCredentials({ ...wardenCredentials, [fieldName]: value });
  };

  return (
    <View
      style={{
        marginTop: responsiveHeight(2),
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
          onChangeText={(value) => onChange(value, "name")}
          value={name}
          label="Name"
          mode="outlined"
          activeOutlineColor="rgba(10,76,118,1)"
          outlineColor="rgba(24,154,180,1)"
          keyboardType="default"
          editable
          autoCapitalize="none"
        />
        <TextInput
          style={[
            globalStyles.textInput_register,
            { height: responsiveHeight(9) },
          ]}
          value={email}
          onChangeText={(value) => onChange(value, "email")}
          label="Email"
          mode="outlined"
          activeOutlineColor="rgba(10,76,118,1)"
          outlineColor="rgba(24,154,180,1)"
          keyboardType="default"
          editable
          autoCapitalize="none"
        />
        <TextInput
          style={[
            globalStyles.textInput_register,
            { height: responsiveHeight(9) },
          ]}
          value={password}
          onChangeText={(value) => onChange(value, "password")}
          label="Password"
          mode="outlined"
          activeOutlineColor="rgba(10,76,118,1)"
          outlineColor="rgba(24,154,180,1)"
          keyboardType="default"
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
            globalStyles.textInput_register,
            { height: responsiveHeight(9) },
          ]}
          onChangeText={(value) => onChange(value, "liscenceID")}
          value={liscenceID}
          label="Liscence Number"
          mode="outlined"
          activeOutlineColor="rgba(10,76,118,1)"
          outlineColor="rgba(24,154,180,1)"
          keyboardType="default"
          editable
          autoCapitalize="none"
        />
        <TextInput
          style={[
            globalStyles.textInput_register,
            { height: responsiveHeight(9) },
          ]}
          value={phone}
          onChangeText={(value) => onChange(value, "phone")}
          label="Phone Number"
          mode="outlined"
          activeOutlineColor="rgba(10,76,118,1)"
          outlineColor="rgba(24,154,180,1)"
          keyboardType="numeric"
          editable
          autoCapitalize="none"
        />
      </ScrollView>

      <TouchableOpacity
        style={[
          globalStyles.register_SignUp,
          {
            marginTop: responsiveHeight(2),
            height: responsiveHeight(8),
          },
        ]}
        onPress={() => {
          registerWarden(name, email, password, liscenceID, phone);
        }}
      >
        <Text style={globalStyles.Sign_in_Text}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}
