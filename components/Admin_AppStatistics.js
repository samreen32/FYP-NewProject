import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { responsiveHeight } from "react-native-responsive-dimensions";
import { PieChart } from "react-native-chart-kit";
import { Ionicons } from "@expo/vector-icons";
import { STATISTICS_API_URL } from "../Custom_Api_Calls/api_calls";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userLogin } from "../context/AuthContext";

export default function Admin_AppStatistics({ navigation }) {
  const [appStatsCount, setAppStatsCount] = useState([]);
  const { showToast } = userLogin();

  /******* Function to fetch total challans added *******/
  const fetchChallanData = async () => {
    const token = await AsyncStorage.getItem("token");
    try {
      if (token != null) {
        const response = await fetch(
          `${STATISTICS_API_URL}/count_appStatistics`,
          {
            headers: {
              "auth-token": token,
            },
          }
        );
        const data = await response.json();
        setAppStatsCount([
          {
            name: "Citizens",
            count: data.citizenCount,
            color: "blue",
            legendFontColor: "white",
            legendFontSize: 15,
          },
          {
            name: "Wardens",
            count: data.wardenCount,
            color: "#4CAF50",
            legendFontColor: "white",
            legendFontSize: 15,
          },
          {
            name: "Admins",
            count: data.adminCount,
            color: "#FFEB3B",
            legendFontColor: "white",
            legendFontSize: 15,
          },
          {
            name: "Challans",
            count: data.totalChallanCount,
            color: "#F44336",
            legendFontColor: "white",
            legendFontSize: 15,
          },
          {
            name: "Paid",
            count: data.totalPaidChallans,
            color: "purple",
            legendFontColor: "white",
            legendFontSize: 15,
          },
          {
            name: "Unpaid",
            count: data.totalUnpaidChallans,
            color: "gray",
            legendFontColor: "white",
            legendFontSize: 15,
          },
          {
            name: "Complaints",
            count: data.totalComplaints,
            color: "black",
            legendFontColor: "white",
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
      <View style={globalStyles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={globalStyles.headerText}>STATISTICS</Text>
        <View style={{ width: 24 }}></View>
      </View>

      <View
        style={[
          globalStyles.easeTraffic_Rect,
          { height: responsiveHeight(60) },
        ]}
      >
        <PieChart
          style={styles.PieChart}
          data={appStatsCount}
          width={360}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  PieChart: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
