import React, { useState, useCallback, useRef, useEffect } from "react";
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
import {
  CHALLAN_API_URL,
  LANG_API_URL,
  THEME_API_URL,
  NOTIFI_API_URL,
} from "../Custom_Api_Calls/api_calls";
import { useFocusEffect } from "@react-navigation/native";
import { translation } from "./translation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { globalStyles } from "../styles/globalStyles";
import * as Notifications from "expo-notifications";

//Default Notification settings
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function PayChallan_CheckOut({ navigation, route }) {
  const { challan } = route.params;
  const [phoneNumber, setPhoneNumber] = useState("");
  const [response, setResponse] = useState("");
  const { updateError, error, setError, showToast, setBadgeValue } =
    userLogin();

  const [selectedlang, setselectedlang] = useState(0);
  const [selectedApp, setselectedApp] = useState(0);
  const [notification, setNotification] = useState(false); //for configuring expo notifications
  const notificationListener = useRef();
  const responseListener = useRef();

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
          addNotification();
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

  /********** Method to fetch Citizen Language **********/
  const fetchLanguage = async () => {
    try {
      const authToken = await AsyncStorage.getItem("token");
      const response = await fetch(`${LANG_API_URL}/citizen_languageId`, {
        headers: {
          "auth-token": authToken,
        },
      });
      const data = await response.json();
      console.log(data);
      const langs = data.language;

      setselectedlang(langs);
      console.log("chk" + selectedlang);
      console.log("lang is" + langs);
    } catch (err) {
      console.error(err);
    }
  };

  /********** Method to fetch Citizen Theme **********/
  const fetchTheme = async () => {
    try {
      const authToken = await AsyncStorage.getItem("token");
      const response = await fetch(`${THEME_API_URL}/citizen_themeId`, {
        headers: {
          "auth-token": authToken,
        },
      });
      const data = await response.json();
      console.log(data);
      const themes = data.theme;
      setselectedApp(themes);

      console.log("theme is" + themes);
    } catch (err) {
      console.error(err);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchLanguage();
      fetchTheme();
    }, [])
  );

  /************* Schedule Notification Method *************/
  const addNotification = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token != null) {
        await fetch(`${NOTIFI_API_URL}/schedule_notification`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
          body: JSON.stringify({
            title: "New Notification",
            body: "You have payed a Challan.",
          }),
        });

        // Retrieve the updated badge value from the server
        const response = await fetch(`${NOTIFI_API_URL}/badge_value`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        });
        const { badgeValue } = await response.json();

        // Use the Notifications module to schedule the notification
        const { status } = await Notifications.requestPermissionsAsync();
        const time = new Date().toLocaleString();
        if (status === "granted") {
          const schedulingOptions = {
            content: {
              title: "New Notification",
              body: "You have payed a Challan.",
              data: { time },
              read: false,
              badge: badgeValue,
            },
            trigger: { seconds: 1 },
          };
          await Notifications.scheduleNotificationAsync(schedulingOptions);
          setBadgeValue(badgeValue);
        }
      }
    } catch (error) {
      showToast(error.message);
    }
  };

  /************* Adding permissions for notifications *************/
  useEffect(() => {
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });
    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <>
      <View
        style={
          selectedApp == 1
            ? [{ backgroundColor: "black" }, globalStyles.header]
            : [{ backgroundColor: "rgba(10,76,118,1)" }, globalStyles.header]
        }
      >
        <Ionicons
          name="arrow-back"
          size={24}
          color="white"
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text style={[globalStyles.headerText, { textTransform: "uppercase" }]}>
          {selectedlang == 0 ? translation[126].English : translation[126].Urdu}{" "}
        </Text>
        <View style={{ width: 24 }}></View>
      </View>

      <View>
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
          <Text style={styles.inputLabel}>
            {selectedlang == 0
              ? translation[127].English
              : translation[127].Urdu}{" "}
          </Text>
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
          <Text style={styles.inputLabel}>
            {selectedlang == 0 ? translation[52].English : translation[52].Urdu}{" "}
            {selectedlang == 0 ? translation[53].English : translation[53].Urdu}
          </Text>
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
          <Text style={styles.inputLabel}>
            {selectedlang == 0 ? translation[56].English : translation[56].Urdu}{" "}
          </Text>
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

        <TouchableOpacity
          style={
            selectedApp == 1
              ? [{ backgroundColor: "black" }, styles.payButton]
              : [{ backgroundColor: "rgba(24,154,180,1)" }, styles.payButton]
          }
          onPress={handleChallanStatus}
        >
          <Text style={styles.payButtonText}>Pay</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    marginTop: 2,
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: "hidden",
    left: 100,
  },
  logoImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  inputContainer: {
    marginTop: 5,
    width: "80%",
    // alignItems: "flex-start",
    left: 35,
  },
  inputLabel: {
    fontSize: 18,
    fontWeight: "bold",
    // marginBottom: 10,
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
    //backgroundColor: "#1e90ff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    left: 33,
  },
  payButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});
