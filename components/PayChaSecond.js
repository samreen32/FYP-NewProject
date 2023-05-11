import React, { useState, useEffect } from "react";
import { globalStyles } from "../styles/globalStyles";
import { Text, View, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CHALLAN_API_URL } from "../Custom_Api_Calls/api_calls";

export default function PayChaSecond({ navigation, route }) {
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

  return (
    <>
      <View style={globalStyles.challanSecond_Rect}></View>
      <View style={globalStyles.challanSecond_Group}>
        <Text style={globalStyles.challanNum_Text}>Challan{"\n"}Number</Text>

        <TextInput
          style={globalStyles.challanNum_TextInput}
          placeholder={
            challan && challan.challanNum ? challan.challanNum.toString() : ""
          }
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
          placeholder={challan.vehicleNo}
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
          placeholder={challan.regNumber}
          keyboardType="alphabet"
          mode="outlined"
          activeOutlineColor="rgba(10,76,118,1)"
          outlineColor="rgba(24,154,180,1)"
          autoCapitalize="none"
          editable={false}
        />

        <Text style={globalStyles.amount_Text}>Amount</Text>
        <TextInput
          style={globalStyles.amount_TextInput}
          placeholder={
            challan && challan.amount ? challan.amount.toString() : ""
          }
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

        <Text style={globalStyles.dueDate_Text}>Due Date</Text>
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
        style={globalStyles.printChallan_btn}
        onPress={() => {
          navigation.navigate("PayChallan_CheckOut", { challan: challan });
        }}
      >
        <Text style={globalStyles.submitChallan_Text}>Pay</Text>
      </TouchableOpacity>
    </>
  );
}
