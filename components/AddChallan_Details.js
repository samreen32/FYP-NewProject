import React, { useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { TextInput } from "react-native-paper";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { globalStyles } from "../styles/globalStyles";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CHALLAN_API_URL } from "../Custom_Api_Calls/api_calls";
import axios from "axios";
import { userLogin } from "../context/AuthContext";
import Progress from "../Loader/Progress";

export default function AddChallan({ navigation, route }) {
  const { challanId, challanNum, cameraImage } = route.params;
  const [challanDetails, setChallanDetails] = useState({
    vehicleNo: "",
    carType: "",
    amount: "",
    anyComment: "",
  });
  const { vehicleNo, carType, amount, anyComment } = challanDetails;
  const [uploadProgress, setUploadProgress] = useState(0);
  const { updateError, error, setError, showToast } = userLogin();

  
  /***************** Function to save challan details ***************/
  const handleChallanDetails = async () => {
    if (vehicleNo == "") {
      return updateError("Enter a Vehicle Number!", setError);
    }
    if (carType == "") {
      return updateError("Enter a Car type!", setError);
    }
    if (amount == "") {
      return updateError("Enter Challan Amount!", setError);
    }
    const formData = new FormData();
    formData.append("vehicleNo", vehicleNo);
    formData.append("carType", carType);
    formData.append("amount", amount);
    formData.append("anyComment", anyComment);

    const DEMO_TOKEN = await AsyncStorage.getItem("token");
    try {
      if (DEMO_TOKEN != null) {
        const response = await axios.put(
          `${CHALLAN_API_URL}/updateChallan/${challanId}`,
          formData,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "multipart/form-data",
              "auth-token": DEMO_TOKEN,
            },
            onUploadProgress: ({ loaded, total }) =>
              setUploadProgress(loaded / total),
          }
        );
        if (response.data.success) {
          showToast("Challan Details has been added.");
          navigation.navigate("AddChallan_PrintDetails", {
            challanId: response.data.updatedChallanDetails._id,
            challanNum,
            cameraImage,
            vehicleNo,
            carType,
            amount,
            anyComment,
          });
          setChallanDetails({
            vehicleNo: "",
            carType: "",
            amount: "",
            anyComment: "",
          });
          setUploadProgress(0);
        } else {
          showToast("Try again after some time!");
        }
      }
    } catch (error) {
      showToast("Error occur", error.message);
    }
  };

  const onChange = (value, fieldName) => {
    setChallanDetails({ ...challanDetails, [fieldName]: value });
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
        <Text style={styles.headerText}>CHALLAN DETAILS</Text>
        <View style={{ width: 24 }}></View>
      </View>

      {error ? (
        <Text
          style={{
            color: "red",
            fontSize: responsiveFontSize(2.5),
            textAlign: "center",
            marginTop: responsiveHeight(25),
          }}
        >
          {error}
        </Text>
      ) : null}

      <View
        style={[
          globalStyles.easeTraffic_Rect,
          { marginTop: responsiveHeight(16) },
        ]}
      >
        {cameraImage ? (
          <Image source={{ uri: cameraImage }} style={styles.cameraPicture} />
        ) : (
          <Text>Nothing to Display.</Text>
        )}
      </View>

      <View
        style={[
          globalStyles.bottomGroup,
          {
            width: responsiveWidth(33),
            marginTop: responsiveHeight(7),
            marginLeft: responsiveWidth(0),
          },
        ]}
      >
        <TextInput
          style={globalStyles.textInput}
          onChangeText={(value) => onChange(value, "vehicleNo")}
          value={vehicleNo}
          label="Enter Vehicle Number"
          keyboardType="default"
          mode="outlined"
          activeOutlineColor="rgba(10,76,118,1)"
          outlineColor="rgba(24,154,180,1)"
          editable
          autoCapitalize="none"
        />
        <TextInput
          style={[globalStyles.textInput, { marginTop: responsiveHeight(44) }]}
          onChangeText={(value) => onChange(value, "carType")}
          value={carType}
          label="Enter Car Type"
          keyboardType="default"
          mode="outlined"
          activeOutlineColor="rgba(10,76,118,1)"
          outlineColor="rgba(24,154,180,1)"
          editable
          autoCapitalize="none"
        />
        <TextInput
          style={[globalStyles.textInput, { marginTop: responsiveHeight(56) }]}
          onChangeText={(value) => onChange(value, "amount")}
          value={amount}
          label="Enter Amount"
          keyboardType="numeric"
          mode="outlined"
          activeOutlineColor="rgba(10,76,118,1)"
          outlineColor="rgba(24,154,180,1)"
          editable
          autoCapitalize="none"
        />
        <TextInput
          style={[globalStyles.textInput, { marginTop: responsiveHeight(68) }]}
          onChangeText={(value) => onChange(value, "anyComment")}
          value={anyComment}
          label="Any Comment"
          keyboardType="default"
          mode="outlined"
          activeOutlineColor="rgba(10,76,118,1)"
          outlineColor="rgba(24,154,180,1)"
          editable
          autoCapitalize="none"
        />
      </View>

      <TouchableOpacity
        style={[
          globalStyles.submitChallan_btn,
          { marginTop: responsiveHeight(87.5) },
        ]}
        onPress={() => {
          handleChallanDetails();
        }}
      >
        <Text style={globalStyles.submitChallan_Text}>Next</Text>
      </TouchableOpacity>

      {uploadProgress ? <Progress /> : null}
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 80,
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
  cameraPicture: {
    alignItems: "center",
    justifyContent: "center",
    height: responsiveHeight(15),
    width: responsiveWidth(50),
    backgroundColor: "#D9D9D9",
    marginTop: responsiveHeight(2.5),
    marginLeft: responsiveWidth(21),
    borderRadius: responsiveWidth(7),
  },
});
