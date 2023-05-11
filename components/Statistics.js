import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { Ionicons } from "@expo/vector-icons";
import { STATISTICS_API_URL } from "../Custom_Api_Calls/api_calls";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userLogin } from "../context/AuthContext";

export default function Statistics({ navigation }) {
  const [totalChallans, setTotalChallans] = useState([]);
  const { showToast } = userLogin();

  /******* Function to fetch total challans added *******/
  const fetchChallanData = async () => {
    const token = await AsyncStorage.getItem("token");
    try {
      if (token != null) {
        const response = await fetch(`${STATISTICS_API_URL}/countChallans`, {
          headers: {
            "auth-token": token,
          },
        });
        const data = await response.json();
        setTotalChallans([
          {
            name: "Total Challans",
            count: data.totalChallans,
            color: "#F44336",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15,
          },
          {
            name: "Total Paid",
            count: data.paidChallans,
            color: "#4CAF50",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15,
          },
          {
            name: "Total Unpaid",
            count: data.unpaidChallans,
            color: "#FFEB3B",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15,
          },
        ]);
      }
    } catch (error) {
      showToast("Error occur", error.message);
    }
  };

  useEffect(() => {
    fetchChallanData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Statistics</Text>
        <View style={{ width: 24 }}></View>
      </View>

      <PieChart
        style={styles.PieChart}
        data={totalChallans}
        width={350}
        height={250}
        chartConfig={{
          backgroundColor: "#FFFFFF",
          backgroundGradientFrom: "#FFFFFF",
          backgroundGradientTo: "#FFFFFF",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        accessor={"count"}
        backgroundColor={"transparent"}
        paddingLeft={"15"}
        center={[0, 0]}
        absolute
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
    fontSize: 20,
    fontFamily: "poppins-bold",
    color: "white",
  },
  PieChart: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
