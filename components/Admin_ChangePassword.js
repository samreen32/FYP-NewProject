import { React, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
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
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Admin_ChangePassword({ navigation }) {
  const [credentials, setCredentials] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const { oldPassword, newPassword, confirmPassword } = credentials;
  const {
    isLoading,
    setIsLoading,
    isValidObjField,
    updateError,
    isPassSecure,
    setIsPassSecure,
    error,
    setError,
    showToast,
  } = userLogin();

  /*************** Function to change password ********************/
  const handleChangePassword = async () => {
    if (!isValidObjField(credentials)) {
      return updateError("Require all fields!", setError);
    }
    if (!newPassword.trim() || newPassword.length < 5) {
      return updateError("New password must be 5 character long!", setError);
    }
    if (newPassword !== confirmPassword) {
      return updateError("Passwords do not match!", setError);
    }
    if (oldPassword === newPassword) {
      return updateError("Please enter a different password!", setError);
    }
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        setIsLoading(true);
        const response = await fetch(`${AUTH_API_URL}/admin_change_password`, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "auth-token": token,
          },
          body: JSON.stringify({
            oldPassword: oldPassword,
            newPassword: newPassword,
          }),
        });
        const responseData = await response.json();
        if (responseData.success) {
          showToast("Your password changed successfully.");
          navigation.goBack();
          setIsLoading(false);
        } else {
          updateError("Old password is not correct!", setError);
          setIsLoading(false);
        }
      }
    } catch (error) {
      showToast(error, "Failed to change password.");
      setIsLoading(false);
    }
  };

  const onChange = (value, fieldName) => {
    setCredentials({ ...credentials, [fieldName]: value });
  };

  return (
    <>
      <View style={globalStyles.header}>
        <Ionicons
          name="arrow-back"
          size={24}
          color="white"
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text style={globalStyles.headerText}>CHANGE PASSWORD</Text>
        <View style={{ width: 24 }}></View>
      </View>

      <ScrollView>
        <View
          style={{
            marginTop: responsiveHeight(12),
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
            style={[globalStyles.textInput, { marginTop: responsiveHeight(5) }]}
            onChangeText={(value) => onChange(value, "oldPassword")}
            value={oldPassword}
            label="Enter your old password"
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
              { marginTop: responsiveHeight(17) },
            ]}
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
              { marginTop: responsiveHeight(29) },
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
            style={[styles.submit_btn, { marginTop: responsiveHeight(50) }]}
            onPress={() => {
              handleChangePassword();
            }}
          >
            <Text style={styles.submit_text}>Done</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {isLoading ? <AppLoader /> : null}
    </>
  );
}

const styles = StyleSheet.create({
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
