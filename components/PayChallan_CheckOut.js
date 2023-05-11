import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { HmacSHA256 } from "crypto-js";
import moment from "moment";
import axios from "axios";
import { userLogin } from "../context/AuthContext";
import { CHALLAN_API_URL } from "../Custom_Api_Calls/api_calls";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function PayChallan_CheckOut({ navigation, route }) {
  const { challan } = route.params;
  const [phoneNumber, setPhoneNumber] = useState("");
  const [response, setResponse] = useState("");
  const { updateError, error, setError, showToast } = userLogin();

  /***************** Function to update the status of challan ***************/
  const handleChallanStatus = async () => {
    if (phoneNumber == "") {
      return updateError("Enter a Phone Number!", setError);
    }
    const DEMO_TOKEN = await AsyncStorage.getItem("token");
    try {
      if (DEMO_TOKEN != null) {
        const response = await fetch(
          `${CHALLAN_API_URL}/challanStatus/${challan._id}`,
          {
            method: "PUT",
            headers: {
              "auth-token": DEMO_TOKEN,
            },
          }
        );
        const responseData = await response.json();
        if (responseData.success) {
          showToast("Challan has been payed.");
          payment();
          navigation.goBack();
          phoneNumber = "";
        } else {
          showToast("Try again after some time!");
        }
      }
    } catch (error) {
      showToast("Error occur", error.message);
    }
  };

  const payment = async () => {
    const dateandtime = moment().format("YYYYMMDDHHmmss");
    const dexpiredate = moment().add(1, "days").format("YYYYMMDDHHmmss");
    const tre = `T${dateandtime}`;
    const pp_Amount = "10000";
    const pp_BillReference = "billRef";
    const pp_Description = "Description";
    const pp_Language = "EN";
    const pp_MerchantID = "MC54815";
    const pp_Password = "xtu3s00y0x";
    const pp_ReturnURL =
      "https://sandbox.jazzcash.com.pk/ApplicationAPI/API/Payment/DoTransaction";
    const pp_ver = "1.1";
    const pp_TxnCurrency = "PKR";
    const pp_TxnDateTime = dateandtime.toString();
    const pp_TxnExpiryDateTime = dexpiredate.toString();
    const pp_TxnRefNo = tre.toString();
    const pp_TxnType = "MWALLET";
    const ppmpf_1 = phoneNumber.toString();
    const IntegeritySalt = "s3yxwzywav";

    const superdata = `${IntegeritySalt}&${pp_Amount}&${pp_BillReference}&${pp_Description}&${pp_Language}&${pp_MerchantID}&${pp_Password}&${pp_ReturnURL}&${pp_TxnCurrency}&${pp_TxnDateTime}&${pp_TxnExpiryDateTime}&${pp_TxnRefNo}&${pp_TxnType}&${pp_ver}&${ppmpf_1}`;

    const sha256Result = HmacSHA256(superdata, IntegeritySalt);

    const url =
      "https://sandbox.jazzcash.com.pk/ApplicationAPI/API/Payment/DoTransaction";

    const requestData = {
      pp_Version: pp_ver,
      pp_TxnType: pp_TxnType,
      pp_Language: pp_Language,
      pp_MerchantID: pp_MerchantID,
      pp_Password: pp_Password,
      pp_TxnRefNo: tre,
      pp_Amount: pp_Amount,
      pp_TxnCurrency: pp_TxnCurrency,
      pp_TxnDateTime: dateandtime,
      pp_BillReference: pp_BillReference,
      pp_Description: pp_Description,
      pp_TxnExpiryDateTime: dexpiredate,
      pp_ReturnURL: pp_ReturnURL,
      pp_SecureHash: sha256Result.toString(),
      ppmpf_1: ppmpf_1,
    };

    try {
      const response = await axios.post(url, requestData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      setResponse(JSON.stringify(response.data));
      const paymentStatus = response.data.pp_ResponseCode.toString();
      const paymentMessage = response.data.pp_ResponseMessage.toString();
      const paymentStatusMessage = `${paymentStatus}: ${paymentMessage}`;

      Alert.alert("Payment Status:", paymentStatusMessage, [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
        },
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="arrow-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>PAY WITH JAZZCASH</Text>
      </View>

      <View style={styles.title}></View>
      <View style={styles.logo}>
        <Image
          style={styles.logoImage}
          source={{
            uri: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pngkit.com%2Fpng%2Fdetail%2F291-2911793_jazz-cash-jazz-logo.png&f=1&nofb=1&ipt=07b1b1a39afc5a8b3e3be7a2a8225f627490a1e2c2cdbae906408a5db7865110&ipo=images",
          }}
        />
      </View>

      {error ? (
        <Text
          style={{
            color: "red",
            fontSize: 17.5,
            textAlign: "center",
            marginTop: 16.5,
          }}
        >
          {error}
        </Text>
      ) : null}

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Enter Phone Number</Text>
        <TextInput
          style={styles.inputField}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
          placeholder="E.g 03452535658"
          placeholderTextColor="#BEBEBE"
          maxLength={11}
          pattern={"\\b\\d{4}\\d{7}\\b"}
        />
        <Text style={styles.inputLabel}>Challan Number</Text>
        <TextInput
          style={styles.inputField}
          placeholder={
            challan && challan.challanNum ? challan.challanNum.toString() : ""
          }
          mode="outlined"
          activeOutlineColor="rgba(10,76,118,1)"
          outlineColor="rgba(24,154,180,1)"
          autoCapitalize="none"
          editable={false}
        />
        <Text style={styles.inputLabel}>Amount</Text>
        <TextInput
          style={styles.inputField}
          placeholder={
            challan && challan.amount ? challan.amount.toString() : ""
          }
          mode="outlined"
          activeOutlineColor="rgba(10,76,118,1)"
          outlineColor="rgba(24,154,180,1)"
          autoCapitalize="none"
          editable={false}
        />
      </View>

      <TouchableOpacity style={styles.payButton} onPress={handleChallanStatus}>
        <Text style={styles.payButtonText}>Pay</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 20,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#D798F6",
    height: 70,
    width: "100%",
    paddingHorizontal: 20,
  },
  headerText: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  title: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    marginTop: 20,
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: "hidden",
  },
  logoImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  inputContainer: {
    marginTop: 20,
    width: "80%",
    alignItems: "flex-start",
  },
  inputLabel: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  inputField: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  payButton: {
    marginTop: 20,
    width: "80%",
    height: 50,
    backgroundColor: "#1e90ff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  payButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});
