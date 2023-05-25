import React, { useState, useEffect, useCallback } from "react";
import { globalStyles } from "../styles/globalStyles";
import { Text, View, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  CHALLAN_API_URL,
  LANG_API_URL,
  THEME_API_URL,
} from "../Custom_Api_Calls/api_calls";
import { useFocusEffect } from "@react-navigation/native";
import { translation } from "./translation";

export default function PayChaSecond({ navigation, route }) {
  const [selectedlang, setselectedlang] = useState(0);
  const [selectedApp, setselectedApp] = useState(0);
  const [curDateTime, setCurDateTime] = useState(new Date());
  const [challan, setChallan] = useState([]);

  /***************** Function to add challan details to print ***************/
  useEffect(() => {
    const fetchChallan = async () => {
      const token = await AsyncStorage.getItem("token");
      try {
        if (token != null) {
          const response = await fetch(
            `${CHALLAN_API_URL}/fetch_single_challan/${route.params.challanId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "auth-token": token,
              },
            }
          );
          const data = await response.json();
          setChallan(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchChallan();
  }, [route.params.challanId]);

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

  return (
    <View
      style={
        selectedApp == 1
          ? { backgroundColor: "black", flex: 1 }
          : { backgroundColor: "white" }
      }
    >
      <View
        style={
          selectedApp == 1
            ? [{ backgroundColor: "#333333" }, globalStyles.challanSecond_Rect]
            : [
                { backgroundColor: "rgba(10,76,118,1)" },
                globalStyles.challanSecond_Rect,
              ]
        }
      ></View>
      <View style={globalStyles.challanSecond_Group}>
        <Text style={globalStyles.challanNum_Text}>
          {selectedlang == 0 ? translation[52].English : translation[52].Urdu}{" "}
          {"\n"}{" "}
          {selectedlang == 0 ? translation[53].English : translation[53].Urdu}
        </Text>
        <TextInput
          style={globalStyles.challanNum_TextInput}
          placeholder={
            challan && challan.challanNum ? challan.challanNum.toString() : ""
          }
          mode="outlined"
          activeOutlineColor="rgba(10,76,118,1)"
          outlineColor="rgba(24,154,180,1)"
          autoCapitalize="none"
          editable={false}
        />

        <Text style={globalStyles.vehicleDetail_Text}>
          {selectedlang == 0 ? translation[54].English : translation[54].Urdu}{" "}
          {"\n"}
          {selectedlang == 0
            ? translation[55].English
            : translation[55].Urdu}{" "}
        </Text>
        <TextInput
          style={globalStyles.vehicleDetail_TextInput}
          placeholder={challan.vehicleNo}
          mode="outlined"
          activeOutlineColor="rgba(10,76,118,1)"
          outlineColor="rgba(24,154,180,1)"
          autoCapitalize="none"
          editable={false}
        />

        <Text style={globalStyles.regNum_Text}>
          {selectedlang == 0 ? translation[57].English : translation[57].Urdu}{" "}
          {"\n"}
          {selectedlang == 0
            ? translation[53].English
            : translation[53].Urdu}{" "}
        </Text>
        <TextInput
          style={globalStyles.regNum_TextInput}
          placeholder={challan.regNumber}
          mode="outlined"
          activeOutlineColor="rgba(10,76,118,1)"
          outlineColor="rgba(24,154,180,1)"
          autoCapitalize="none"
          editable={false}
        />

        <Text style={globalStyles.amount_Text}>
          {selectedlang == 0 ? translation[56].English : translation[56].Urdu}{" "}
        </Text>
        <TextInput
          style={globalStyles.amount_TextInput}
          placeholder={
            challan && challan.amount ? challan.amount.toString() : ""
          }
          mode="outlined"
          activeOutlineColor="rgba(10,76,118,1)"
          outlineColor="rgba(24,154,180,1)"
          autoCapitalize="none"
          editable={false}
        />

        <View style={globalStyles.lineStyle}></View>

        <Text style={globalStyles.dateTime_Text}>
          {selectedlang == 0 ? translation[58].English : translation[58].Urdu}{" "}
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
          {selectedlang == 0 ? translation[60].English : translation[60].Urdu}{" "}
        </Text>
        <TextInput
          style={globalStyles.location_TextInput}
          placeholder={
            challan && challan.location ? challan.location.toString() : ""
          }
          mode="outlined"
          activeOutlineColor="rgba(10,76,118,1)"
          outlineColor="rgba(24,154,180,1)"
          autoCapitalize="none"
          editable={false}
        />

        <Text style={globalStyles.dueDate_Text}>
          {selectedlang == 0 ? translation[61].English : translation[61].Urdu}{" "}
        </Text>
        <TextInput
          style={globalStyles.dueDate_TextInput}
          placeholder={challan.due_date}
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
            ? [{ backgroundColor: "black" }, globalStyles.printChallan_btn]
            : [
                { backgroundColor: "rgba(24,154,180,1)" },
                globalStyles.printChallan_btn,
              ]
        }
        onPress={() => {
          navigation.navigate("PayChallan_CheckOut", { challan: challan });
        }}
      >
        <Text style={[globalStyles.submitChallan_Text, { color: "white" }]}>
          {selectedlang == 0 ? translation[36].English : translation[36].Urdu}{" "}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
