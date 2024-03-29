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

export default function CitizenRegister({}) {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    phoneNo: "",
    vehicleNo: "",
    password: "",
  });
  const { name, email, phoneNo, vehicleNo, password } = credentials;
  const [error, setError] = useState("");
  const {
    setIsLoading,
    isValidEmail,
    isValidObjField,
    updateError,
    isPassSecure,
    setIsPassSecure,
    showToast,
  } = userLogin();

  //Citizen Register function
  const register = async (name, email, password, phoneNo, vehicleNo) => {
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
      setIsLoading(true);
      const response = await auth_api.post("/create_citizen", {
        name,
        email,
        password,
        phoneNo,
        vehicleNo,
      });
      console.log(response.data);
      if (response.data.success) {
        AsyncStorage.setItem("token", response.data.authToken);
        showToast("Your account has been created.");
        setCredentials({
          name: "",
          email: "",
          password: "",
          phoneNo: "",
          vehicleNo: "",
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
          value={phoneNo}
          onChangeText={(value) => onChange(value, "phoneNo")}
          label="Phone Number"
          mode="outlined"
          activeOutlineColor="rgba(10,76,118,1)"
          outlineColor="rgba(24,154,180,1)"
          keyboardType="numeric"
          editable
          autoCapitalize="none"
        />
        <TextInput
          style={[
            globalStyles.textInput_register,
            { height: responsiveHeight(9) },
          ]}
          value={vehicleNo}
          onChangeText={(value) => onChange(value, "vehicleNo")}
          label="Vehicle Number"
          keyboardType="default"
          mode="outlined"
          activeOutlineColor="rgba(10,76,118,1)"
          outlineColor="rgba(24,154,180,1)"
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

        <TouchableOpacity
          style={[
            globalStyles.register_SignUp,
            {
              marginTop: responsiveHeight(2),
              height: responsiveHeight(8),
            },
          ]}
          onPress={() => {
            register(name, email, password, phoneNo, vehicleNo);
          }}
        >
          <Text style={globalStyles.Sign_in_Text}>Sign Up</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
