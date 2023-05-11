import React, { useState } from "react";
import { globalStyles } from "../styles/globalStyles";
import { Text, View, TouchableOpacity, Platform } from "react-native";
import { TextInput, List } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { userLogin } from "../context/AuthContext";
import Progress from "../Loader/Progress";
import { CHALLAN_API_URL, NOTIFI_API_URL } from "../Custom_Api_Calls/api_calls";
import * as Notifications from "expo-notifications";
import { useRef } from "react";
import { useEffect } from "react";
import * as Print from "expo-print";

import * as SMS from "expo-sms";
import * as Permissions from "expo-permissions";

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
          const { qrCode } = response.data.updatedChallanDetails;
          const base64ImageData = qrCode.split(",")[1]; // Generate base64 encoded image data from the QR code

          // Print the QR code
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
              body: "You have Add a Challan.",
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
        <Text style={globalStyles.challanNum_Text}>Challan{"\n"}Number</Text>
        <TextInput
          style={globalStyles.challanNum_TextInput}
          placeholder={`E-Parking Challan #${challanNum}`}
          keyboardType="alphabet"
          mode="outlined"
          activeOutlineColor="rgba(10,76,118,1)"
          outlineColor="rgba(24,154,180,1)"
          autoCapitalize="none"
          editable={false}
        />

        <Text style={globalStyles.vehicleDetail_Text}>
          Vehicle{"\n"}Details
        </Text>
        <TextInput
          style={globalStyles.vehicleDetail_TextInput}
          placeholder={carType}
          keyboardType="alphabet"
          mode="outlined"
          activeOutlineColor="rgba(10,76,118,1)"
          outlineColor="rgba(24,154,180,1)"
          autoCapitalize="none"
          editable={false}
        />

        <Text style={globalStyles.regNum_Text}>Registratio{"\n"}n Number</Text>
        <TextInput
          style={globalStyles.regNum_TextInput}
          value={RegNo}
          onChangeText={setRegNo}
          keyboardType="alphabet"
          mode="outlined"
          activeOutlineColor="rgba(10,76,118,1)"
          outlineColor="rgba(24,154,180,1)"
          autoCapitalize="none"
          editable
        />

        <Text style={globalStyles.amount_Text}>Amount</Text>
        <TextInput
          style={globalStyles.amount_TextInput}
          placeholder={amount}
          keyboardType="alphabet"
          mode="outlined"
          activeOutlineColor="rgba(10,76,118,1)"
          outlineColor="rgba(24,154,180,1)"
          autoCapitalize="none"
          editable={false}
        />

        <View style={globalStyles.lineStyle}></View>

        <Text style={globalStyles.dateTime_Text}>Date &{"\n"}Time</Text>
        <TextInput
          style={globalStyles.dateTime_TextInput}
          placeholder={curDateTime.toLocaleString()}
          keyboardType="alphabet"
          mode="outlined"
          activeOutlineColor="rgba(10,76,118,1)"
          outlineColor="rgba(24,154,180,1)"
          autoCapitalize="none"
          editable={false}
        />

        <Text style={globalStyles.location_Text}>Location</Text>
        <View style={{ position: "relative" }}>
          {/* Dropdown */}
          <View
            style={[
              globalStyles.location_TextInput,
              {
                zIndex: 1,
                width: "100%",
                backgroundColor: "none",
                position: "absolute",
                top: globalStyles.location_TextInput.height + 10,
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
                name={() => (
                  <MaterialCommunityIcons
                    name={showDropdown ? "chevron-up" : "chevron-down"}
                    size={24}
                    color="gray"
                  />
                )}
                onPress={() => setShowDropdown(!showDropdown)}
              />
            }
          />
        </View>

        <Text style={globalStyles.dueDate_Text}>Due Date</Text>
        <TextInput
          style={globalStyles.dueDate_TextInput}
          value={due_date}
          onChangeText={setDue_Date}
          placeholder={`${"Set Due Date"}${due_date}`}
          keyboardType="alphabet"
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
        style={globalStyles.printChallan_btn}
        onPress={handlePrintDetails}
      >
        <Text style={globalStyles.submitChallan_Text}>Print</Text>
      </TouchableOpacity>

      {uploadProgress ? <Progress /> : null}
    </>
  );
}
