import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
} from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { CHALLAN_API_URL, MOTORS_API_URL } from "../Custom_Api_Calls/api_calls";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NoComplaint_Box from "../Loader/NoComplaint_Box";

export default function PayChallan({ navigation }) {
  const [challans, setChallans] = useState([]);

  /************** Function to fecth all the challans ****************/
  const fetchChallans = async () => {
    const token = await AsyncStorage.getItem("token");
    try {
      if (token != null) {
        const motorsResponse = await fetch(`${MOTORS_API_URL}/fetch_motors`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        });
        const motorsData = await motorsResponse.json();

        // Extract the vehicle numbers from the fetched motors
        const vehicleNos = motorsData.map((motor) => motor.vehicleNo);

        const challansResponse = await fetch(
          `${CHALLAN_API_URL}/showChallans`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token": token,
            },
            body: JSON.stringify({ vehicleNo: vehicleNos }),
          }
        );
        const challansData = await challansResponse.json();
        setChallans(challansData);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchChallans();
  }, []);

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
        <Text style={styles.headerText}>PAY CHALLAN</Text>
        <View style={{ width: 24 }}></View>
      </View>

      <FlatList
        data={challans}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.Complain_Container}>
            <TouchableOpacity
              style={[
                globalStyles.searchIcon,
                {
                  marginTop: responsiveHeight(5),
                  marginLeft: responsiveWidth(76),
                },
              ]}
              onPress={() => {
                navigation.navigate("PayChaSecond", { challanId: item._id });
              }}              
            >
              <AntDesign name="right" size={50} color="black" />
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={globalStyles.pendingChallanImage}>
                <Image
                  source={{ uri: item.add_img }}
                  style={[
                    globalStyles.pendingChallanImage,
                    {
                      width: responsiveWidth(28),
                      height: responsiveHeight(13),
                    },
                  ]}
                />
              </View>
            </TouchableOpacity>

            <View
              style={[
                globalStyles.hisStat_Group,
                {
                  marginLeft: responsiveWidth(28),
                  marginTop: responsiveHeight(5),
                },
              ]}
            >
              <Text
                style={[
                  globalStyles.tw_Profile_Name,
                  {
                    fontSize: responsiveFontSize(2),
                    marginLeft: responsiveWidth(3),
                  },
                ]}
              >
                {item.vehicleNo}
              </Text>
              <View style={[globalStyles.tw_Profile_goodMorning]}>
                <Text>RS. {item.amount}</Text>
              </View>
              <Text
                style={[
                  styles.description_Text,
                  { width: responsiveWidth(60), marginTop: 52, left: 17 },
                ]}
              >
                {item.due_date}
              </Text>
            </View>
          </View>
        )}
      />

      {challans.length === 0 && <NoComplaint_Box />}
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 100,
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
  Complain_Container: {
    flexDirection: "row",
    backgroundColor: "rgba(24,154,180,1)",
    height: responsiveHeight(18.5),
    marginLeft: responsiveWidth(5),
    marginTop: responsiveHeight(3),
    marginRight: responsiveWidth(5),
    marginVertical: responsiveHeight(-1),
    borderRadius: 15,
  },
  Image: {
    width: responsiveWidth(20),
    height: responsiveHeight(10),
    marginLeft: responsiveWidth(3),
    marginTop: responsiveHeight(2.5),
    borderRadius: responsiveWidth(7),
    borderColor: "black",
    borderWidth: 2,
  },
  imageText: {
    marginTop: responsiveHeight(2),
    color: "white",
    fontFamily: "poppins-regular",
    textAlign: "center",
  },
  description_Text: {
    width: responsiveWidth(65.3),
    height: responsiveHeight(20),
    marginLeft: responsiveWidth(5),
    color: "#FFFFFF",
    fontFamily: "poppins-regular",
  },
  Name_Text: {
    color: "#000000",
    fontFamily: "poppins-bold",
    fontSize: responsiveFontSize(2.3),
    marginLeft: responsiveWidth(5),
    marginTop: responsiveHeight(2),
    paddingTop: responsiveHeight(2),
  },
});
