import { React, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { TextInput } from "react-native-paper";
import { globalStyles } from "../styles/globalStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userLogin } from "../context/AuthContext";
import AppLoader from "../Loader/AppLoader";
import { HELP_API_URL } from "../Custom_Api_Calls/api_calls";

export default function Help({ navigation }) {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [description, setdescription] = useState("");
  const [Any_Comment, setAny_Comment] = useState("");
  const {
    isLoading,
    setIsLoading,
    showToast,
    error,
    setError,
    updateError,
    isValidEmail,
  } = userLogin();

  /*************** Function to save help request for citizen ********************/
  const handleHelp = async () => {
    const url = `${HELP_API_URL}/citizenHelp`;
    const data = {
      Name,
      Email,
      description,
      Any_Comment,
    };
    const authToken = await AsyncStorage.getItem("token");
    try {
      if (Name == "") {
        return updateError("Enter your name!", setError);
      }
      if (Email == "") {
        return updateError("Enter your email!", setError);
      }
      if (!isValidEmail(Email)) {
        return updateError("Enter a valid emai!", setError);
      }
      if (description == "") {
        return updateError("Enter a description!", setError);
      }
      setIsLoading(true);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      if (responseData.success) {
        showToast("Form Submitted Successfully!");
        navigation.goBack();
        setIsLoading(false);
      } else {
        showToast("Please fill the Form Correctly!");
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <View style={styles.purple_background}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Text style={styles.Help_Text}>Help</Text>
          <Ionicons
            name="arrow-back"
            size={24}
            color="white"
            style={styles.backArrow}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.icon_border}>
        <Ionicons name={"help-circle"} size={160} color={"white"} />
      </View>
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
        <View
          style={{
            marginTop: responsiveHeight(1.5),
          }}
        >
          <TextInput
            style={[
              globalStyles.textInput,
              { marginTop: responsiveHeight(-2) },
            ]}
            onChangeText={setName}
            value={Name}
            label="Name"
            keyboardType="alphabet"
            mode="outlined"
            activeOutlineColor="rgba(10,76,118,1)"
            outlineColor="rgba(24,154,180,1)"
            editable
            autoCapitalize="none"
          />
          <TextInput
            style={[
              globalStyles.textInput,
              { marginTop: responsiveHeight(10) },
            ]}
            onChangeText={setEmail}
            value={Email}
            label="Email"
            keyboardType="alphabet"
            mode="outlined"
            activeOutlineColor="rgba(10,76,118,1)"
            outlineColor="rgba(24,154,180,1)"
            editable
            autoCapitalize="none"
          />
          <TextInput
            style={[
              globalStyles.textInput,
              { marginTop: responsiveHeight(22) },
            ]}
            onChangeText={setdescription}
            value={description}
            label="Description"
            keyboardType="alphabet"
            mode="outlined"
            activeOutlineColor="rgba(10,76,118,1)"
            outlineColor="rgba(24,154,180,1)"
            editable
            autoCapitalize="none"
          />
          <TextInput
            style={[
              globalStyles.textInput,
              { marginTop: responsiveHeight(34) },
            ]}
            onChangeText={setAny_Comment}
            value={Any_Comment}
            label="Any Comment"
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
              handleHelp();
            }}
          >
            <Text style={styles.submit_text}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {isLoading ? <AppLoader /> : null}
    </>
  );
}

const styles = StyleSheet.create({
  icon_border: {
    marginTop: responsiveHeight(-17),
    marginLeft: responsiveWidth(27),
  },
  purple_background: {
    backgroundColor: "rgba(10,76,118,1)",
    width: responsiveWidth(100),
    height: responsiveHeight(30),
  },
  Help_Text: {
    color: "white",
    textAlign: "center",
    marginTop: responsiveHeight(5),
    fontSize: responsiveFontSize(4),
    letterSpacing: 1.0,
    fontFamily: "poppins-bold",
  },

  submit_btn: {
    backgroundColor: "rgba(24,154,180,1)",
    width: responsiveWidth(30),
    height: responsiveHeight(7),
    marginTop: responsiveHeight(48),
    borderRadius: responsiveWidth(3),
    marginLeft: responsiveWidth(36),
  },
  submit_text: {
    fontSize: responsiveFontSize(2.5),
    justifyContent: "center",
    textAlign: "center",
    letterSpacing: 1.0,
    color: "white",
    fontFamily: "poppins-bold",
    fontWeight: "bold",
    paddingTop: responsiveHeight(1.6),
  },
  backArrow: {
    left: 20,
    top: -45
  },
});
