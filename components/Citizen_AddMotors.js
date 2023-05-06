import { React, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { TextInput } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userLogin } from "../context/AuthContext";
import { MOTORS_API_URL } from "../Custom_Api_Calls/api_calls";
import AppLoader from "../Loader/AppLoader";

export default function Citizen_AddMotors({ navigation }) {
  const [credentials, setCredentials] = useState({
    motorName: "",
    motorType: "",
    vehicleNo: "",
    regNo: "",
  });
  const { motorName, motorType, vehicleNo, regNo } = credentials;
  const { isLoading, setIsLoading, showToast, updateError, error, setError } =
    userLogin();

  /******  Function to add motors  *****/
  const handleAddMotors = async () => {
    if (motorName == "") {
      return updateError("Enter a Motor Name!", setError);
    }
    if (motorType == "") {
      return updateError("Enter a Motor Type!", setError);
    }
    if (vehicleNo == "") {
      return updateError("Enter a Vehicle Number!", setError);
    }
    if (regNo == "") {
      return updateError("Enter a Registration Number!", setError);
    }

    const token = await AsyncStorage.getItem("token");
    if (token != null) {
      setIsLoading(true);
      await fetch(`${MOTORS_API_URL}/addMotors`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({
          motorName: motorName,
          motorType: motorType,
          vehicleNo: vehicleNo,
          regNo: regNo,
        }),
      })
        .then((response) => response.json())
        .then((responseData) => {
          if (responseData.success) {
            showToast("New Motor has been added.");
            setCredentials({
              motorName: "",
              motorType: "",
              vehicleNo: "",
              regNo: "",
            });
            navigation.navigate("Citizen_ViewChallanMotors");
            setIsLoading(false);
          } else {
            showToast("Try again after some time!");
            setIsLoading(false);
          }
        })
        .catch((error) => {
          showToast(error);
        });
    }
  };

  const onChange = (value, fieldName) => {
    setCredentials({ ...credentials, [fieldName]: value });
  };

  return (
    <>
      <View style={styles.header}>
        <Ionicons
          name="arrow-back"
          size={24}
          color="white"
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text style={styles.headerText}>ADD MOTORS</Text>
        <View style={{ width: 24 }}></View>
      </View>

      <ScrollView>
        <View
          style={{
            height: responsiveHeight(60),
            width: responsiveWidth(100),
            marginTop: responsiveHeight(8),
          }}
        >
          {error ? (
            <Text
              style={{
                color: "red",
                fontSize: responsiveFontSize(2.2),
                textAlign: "center",
              }}
            >
              {error}
            </Text>
          ) : null}

          <TextInput
            style={styles.style_Rectangle}
            onChangeText={(value) => onChange(value, "motorName")}
            value={motorName}
            label="Motor Name"
            keyboardType="alphabet"
            mode="outlined"
            activeOutlineColor="rgba(10,76,118,1)"
            outlineColor="rgba(24,154,180,1)"
            editable
            autoCapitalize="none"
          />
          <TextInput
            style={[
              styles.style_Rectangle,
              { marginTop: responsiveHeight(14) },
            ]}
            onChangeText={(value) => onChange(value, "motorType")}
            value={motorType}
            label="Motor Type"
            keyboardType="alphabet"
            mode="outlined"
            activeOutlineColor="rgba(10,76,118,1)"
            outlineColor="rgba(24,154,180,1)"
            editable
            autoCapitalize="none"
          />
          <TextInput
            style={[
              styles.style_Rectangle,
              { marginTop: responsiveHeight(25) },
            ]}
            onChangeText={(value) => onChange(value, "vehicleNo")}
            value={vehicleNo}
            label="Vehicle No."
            keyboardType="alphabet"
            mode="outlined"
            activeOutlineColor="rgba(10,76,118,1)"
            outlineColor="rgba(24,154,180,1)"
            editable
            autoCapitalize="none"
          />
          <TextInput
            style={[
              styles.style_Rectangle,
              { marginTop: responsiveHeight(36) },
            ]}
            onChangeText={(value) => onChange(value, "regNo")}
            value={regNo}
            label="Registration No."
            keyboardType="alphabet"
            mode="outlined"
            activeOutlineColor="rgba(10,76,118,1)"
            outlineColor="rgba(24,154,180,1)"
            editable
            autoCapitalize="none"
          />
        </View>
        <TouchableOpacity style={styles.save_btn} onPress={handleAddMotors}>
          <Text style={styles.save_text}>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=> {
          navigation.navigate("Citizen_ViewChallanMotors");
        }}>
          <Text style={styles.save_text}>Save</Text>
        </TouchableOpacity>
      </ScrollView>

      {isLoading ? <AppLoader /> : null}
    </>
  );
}

const styles = StyleSheet.create({
  style_Rectangle: {
    marginLeft: responsiveWidth(8),
    marginTop: responsiveHeight(3),
    position: "absolute",
    width: responsiveWidth(87),
    height: responsiveHeight(9),
    opacity: 1,
    color: "grey",
    backgroundColor: "rgba(217,217,217,1)",
    borderRadius: responsiveWidth(6),
  },
  header: {
    height: 120,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    backgroundColor: "rgba(10,76,118,1)",
  },
  headerText: {
    fontFamily: "poppins-bold",
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  save_btn: {
    backgroundColor: "rgba(24,154,180,1)",
    width: responsiveWidth(30),
    height: responsiveHeight(7.5),
    marginTop: responsiveHeight(-6),
    borderRadius: responsiveWidth(3),
    marginLeft: responsiveWidth(35),
  },
  save_text: {
    fontSize: responsiveFontSize(2.5),
    justifyContent: "center",
    textAlign: "center",
    letterSpacing: 1.0,
    fontFamily: "poppins-bold",
    paddingTop: responsiveHeight(1.6),
    color: "white",
  },
});
