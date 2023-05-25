import React, { useState, useEffect, useRef, useCallback } from "react";
import { globalStyles } from "../styles/globalStyles";
import { Text, View, TouchableOpacity, Platform } from "react-native";
import { responsiveHeight } from "react-native-responsive-dimensions";
import { TextInput, List } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { userLogin } from "../context/AuthContext";
import Progress from "../Loader/Progress";
import {
  CHALLAN_API_URL,
  NOTIFI_API_URL,
  LANG_API_URL,
  THEME_API_URL,
} from "../Custom_Api_Calls/api_calls";
import { useFocusEffect } from "@react-navigation/native";
import { translation } from "./translation";
import * as Notifications from "expo-notifications";
import * as Print from "expo-print";
import * as SMS from "expo-sms";

//Default Notification settings
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function AddChallan_PrintDetails({ route }) {
  const { challanId, challanNum, carType, amount, vehicleNo, anyComment } =
    route.params;

  const [RegNo, setRegNo] = useState("");
  const [location, setLocation] = useState("");
  const [due_date, setDue_Date] = useState("");

  const [curDateTime, setCurDateTime] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownList = ["Islamabad", "Rawalpindi"];

  const [notification, setNotification] = useState(false); //for configuring expo notifications
  const notificationListener = useRef();
  const responseListener = useRef();
  const [uploadProgress, setUploadProgress] = useState(0);
  const { updateError, error, setError, showToast, setBadgeValue } =
    userLogin();

  const [selectedlang, setselectedlang] = useState(0);
  const [selectedApp, setselectedApp] = useState(0);

  /***************** Function to add challan details for print ***************/
  const handlePrintDetails = async () => {
    if (RegNo == "") {
      return updateError("Enter a Registration Number!", setError);
    }
    if (location == "") {
      return updateError("Select Location!", setError);
    }
    if (due_date == "") {
      return updateError("Select Due Date!", setError);
    }
    const formData = new FormData();
    formData.append("challanNum", challanNum);
    formData.append("location", location);
    formData.append("regNumber", RegNo);
    formData.append("vehicleNo", vehicleNo);
    formData.append("carType", carType);
    formData.append("amount", amount);
    formData.append("anyComment", anyComment);
    formData.append("due_date", due_date);

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
          showToast("Challan has been added. Print QR.");

          /***** Printing QR Code *****/
          const { qrCode } = response.data.updatedChallanDetails;
          const base64ImageData = qrCode.split(",")[1]; // Generate base64 encoded image data from the QR code

          const htmlContent = `
          <div style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
            <div style="text-align: center;margin-top: 50px;">
              <span style="font-weight: bold; font-size: 30px;">WRONG PARKING CHALLAN</span>
            </div>
            <div style="margin-top: 30px;">
              <img src="data:image/png;base64,${base64ImageData}" style="height: 75vh; width: 75vw; object-fit: contain;" />
            </div>
            <div style="margin-top: 30px; text-align: center;">
              <span style="font-weight: italic; font-size: 30px;">You can download "E-Parking Challan App" to Pay the Challan.</span>
            </div>
          </div>
        `;
          const pdfUrl = await Print.printToFileAsync({ html: htmlContent });
          await Print.printAsync({ uri: pdfUrl.uri });

          /***** Sending SMS *****/
          const phoneNo = response.data.phoneNo;
          if (phoneNo) {
            const message = `Dear Citizen, you have a challan to pay. Challan Number: ${challanNum}. Due Date: ${due_date}. Download the "E-Parking Challan App" to Scan QR and Pay. Thank You.`;
            await SMS.sendSMSAsync([phoneNo], message);
          }

          /***** Sending Notification *****/
          addNotification();
          setUploadProgress(0);
        } else {
          showToast("Try again after some time!");
        }
      }
    } catch (error) {
      showToast(error.message);
    }
  };

  /***************** Method to show date time picker for due date ***************/
  const onChangeDue_date = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "android" || Platform.OS === "ios");
    setShow(false);
    setDate(currentDate);
    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();
    let fTime =
      tempDate.getHours() +
      ":" +
      tempDate.getMinutes() +
      ":" +
      tempDate.getSeconds();
    setDue_Date(fDate + "  " + fTime);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  /***************** Method for selecting location...creating dropdown ***************/
  const handleLocationSelect = (selectedLocation) => {
    setLocation(selectedLocation);
    setShowDropdown(false);
  };

  /************* Schedule Notification Method *************/
  const addNotification = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token != null) {
        await fetch(`${NOTIFI_API_URL}/wardenSchedule_notification`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
          body: JSON.stringify({
            title: "New Notification",
            body: "You have Add a Challan",
          }),
        });

        // Retrieve the updated badge value from the server
        const response = await fetch(`${NOTIFI_API_URL}/wardenBadge_value`, {
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
              body: "You have add a Challan.",
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

  /********** Method to fetch Warden Language **********/
  const fetchLanguage = async () => {
    try {
      const authToken = await AsyncStorage.getItem("token");
      const response = await fetch(`${LANG_API_URL}/warden_languageId`, {
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

  /********** Method to fetch Warden Theme **********/
  const fetchTheme = async () => {
    try {
      const authToken = await AsyncStorage.getItem("token");
      const response = await fetch(`${THEME_API_URL}/warden_themeId`, {
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
  return (
    <View
      style={[
        selectedApp == 1
          ? { backgroundColor: "#271F1F", flex: 1 }
          : { backgroundColor: "rgba(10,76,118,1)", flex: 1 },
      ]}
    >
      <View style={globalStyles.challanSecond_Rect}></View>

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

      <View style={globalStyles.challanSecond_Group}>
        <Text style={globalStyles.challanNum_Text}>
          {selectedlang == 0 ? translation[52].English : translation[52].Urdu}{" "}
          {"\n"}
          {selectedlang == 0
            ? translation[53].English
            : translation[53].Urdu}{" "}
        </Text>
        <TextInput
          style={globalStyles.challanNum_TextInput}
          placeholder={`E-Parking Challan #${challanNum}`}
          mode="outlined"
          activeOutlineColor="rgba(10,76,118,1)"
          outlineColor="rgba(24,154,180,1)"
          autoCapitalize="none"
          editable={false}
        />

        <Text style={globalStyles.vehicleDetail_Text}>
          {selectedlang == 0 ? translation[54].English : translation[54].Urdu}{" "}
          {"\n"}
          {selectedlang == 0 ? translation[55].English : translation[55].Urdu}
        </Text>
        <TextInput
          style={globalStyles.vehicleDetail_TextInput}
          placeholder={carType}
          mode="outlined"
          activeOutlineColor="rgba(10,76,118,1)"
          outlineColor="rgba(24,154,180,1)"
          autoCapitalize="none"
          editable={false}
        />

        <Text style={globalStyles.regNum_Text}>
          {selectedlang == 0 ? translation[57].English : translation[57].Urdu}{" "}
          {"\n"}{" "}
          {selectedlang == 0 ? translation[53].English : translation[53].Urdu}{" "}
        </Text>
        <TextInput
          style={globalStyles.regNum_TextInput}
          value={RegNo}
          onChangeText={setRegNo}
          keyboardType="default"
          mode="outlined"
          activeOutlineColor="rgba(10,76,118,1)"
          outlineColor="rgba(24,154,180,1)"
          autoCapitalize="none"
          editable
        />

        <Text style={globalStyles.amount_Text}>
          {selectedlang == 0 ? translation[56].English : translation[56].Urdu}
        </Text>
        <TextInput
          style={globalStyles.amount_TextInput}
          placeholder={amount}
          mode="outlined"
          activeOutlineColor="rgba(10,76,118,1)"
          outlineColor="rgba(24,154,180,1)"
          autoCapitalize="none"
          editable={false}
        />

        <View style={globalStyles.lineStyle}></View>

        <Text style={globalStyles.dateTime_Text}>
          {" "}
          {selectedlang == 0
            ? translation[58].English
            : translation[58].Urdu}{" "}
          {"\n"}
          {selectedlang == 0
            ? translation[59].English
            : translation[59].Urdu}{" "}
        </Text>
        <TextInput
          style={globalStyles.dateTime_TextInput}
          placeholder={curDateTime.toLocaleString()}
          mode="outlined"
          activeOutlineColor="rgba(10,76,118,1)"
          outlineColor="rgba(24,154,180,1)"
          autoCapitalize="none"
          editable={false}
        />

        <Text style={globalStyles.location_Text}>
          {selectedlang == 0 ? translation[60].English : translation[60].Urdu}
        </Text>

        {/* Dropdown */}
        <View
          style={[
            globalStyles.location_TextInput,
            {
              zIndex: 1,
              width: "100%",
              backgroundColor: "none",
              position: "absolute",
              marginTop: responsiveHeight(56.5),
              top: dropdownList.length * 60 + 20,
            },
          ]}
        >
          {showDropdown &&
            dropdownList.map((location) => (
              <List.Item
                style={{
                  backgroundColor: "white",
                  textAlign: "center",
                  width: globalStyles.location_TextInput.width,
                }}
                key={location}
                title={location}
                onPress={() => handleLocationSelect(location)}
              />
            ))}
        </View>

        <TextInput
          style={globalStyles.location_TextInput}
          value={location}
          placeholder={`${"Enter Location"}${location}`}
          onChangeText={setLocation}
          autoCapitalize="none"
          editable={!showDropdown}
          right={
            <TextInput.Icon
              name={showDropdown ? "chevron-up" : "chevron-down"}
              size={24}
              color="gray"
              onPress={() => setShowDropdown(!showDropdown)}
            />
          }
        />

        <Text style={globalStyles.dueDate_Text}>
          {selectedlang == 0 ? translation[61].English : translation[61].Urdu}{" "}
        </Text>
        <TextInput
          style={globalStyles.dueDate_TextInput}
          value={due_date}
          onChangeText={setDue_Date}
          placeholder={`${"Set Due Date"}${due_date}`}
          keyboardType="default"
          mode="outlined"
          activeOutlineColor="rgba(10,76,118,1)"
          outlineColor="rgba(24,154,180,1)"
          autoCapitalize="none"
          editable={false}
          right={
            <TextInput.Icon
              name={() => (
                <FontAwesome name="calendar" size={24} color="gray" />
              )}
              onPress={() => showMode("date")}
            />
          }
        />

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChangeDue_date}
          />
        )}
      </View>
      
      <TouchableOpacity
        style={[
          selectedApp == 1
            ? { backgroundColor: "rgba(217,217,217,1)" }
            : { backgroundColor: " rgba(24,154,180,1) " },
          globalStyles.printChallan_btn,
        ]}
        onPress={handlePrintDetails}
      >
        <Text style={globalStyles.submitChallan_Text}>
          {selectedlang == 0 ? translation[87].English : translation[87].Urdu}
        </Text>
      </TouchableOpacity>

      {uploadProgress ? <Progress /> : null}
    </View>
  );
}
