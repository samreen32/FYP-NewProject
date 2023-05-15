import React, { useState, useCallback } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import PayChallan from "./PayChallan";
import Help from "./Help";
import {
  responsiveHeight,
} from "react-native-responsive-dimensions";
import { Ionicons } from "@expo/vector-icons";
import FileComplaint from "./FileComplaint";
import ChallanHistory from "./ChallanHistory";
import Places from "./Places";
import CitizenSetting from "./CitizenSetting";
import { globalStyles } from "../styles/globalStyles";
import { Searchbar } from "react-native-paper";
import NoSearch from "../Loader/NoSearch";
import CitizenProfile from "./CitizenProfile";
import Citizen_Logout from "./Citizen_Logout";
import Citizen_Notifications from "./Citizen_Notifications";
import Guidelines from "./Guidelines";
import { LANG_API_URL, THEME_API_URL } from "../Custom_Api_Calls/api_calls";
import { useFocusEffect } from "@react-navigation/native";
import { translation } from "./translation";
import AsyncStorage from "@react-native-async-storage/async-storage";

const data = [
  { id: 1, name: "Pay Challan", component: PayChallan },
  { id: 2, name: "File Complaint", component: FileComplaint },
  { id: 3, name: "Challan History", component: ChallanHistory },
  { id: 4, name: "Help", component: Help },
  { id: 5, name: "Places", component: Places },
  { id: 6, name: "Settings", component: CitizenSetting },
  { id: 7, name: "Profile", component: CitizenProfile },
  { id: 8, name: "Notifications", component: Citizen_Notifications },
  { id: 9, name: "Traffic Guidelines", component: Guidelines },
  { id: 10, name: "Logout", component: Citizen_Logout },
];

const CitizenSearch = ({ navigation }) => {
  const [selectedlang, setselectedlang] = useState(0);
  const [selectedApp, setselectedApp] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  const SearchResult = ({ item, onPress }) => (
    <TouchableOpacity
      onPress={onPress}
      style={
        selectedApp == 1
          ? [
              { backgroundColor: "grey", height: responsiveHeight(11) },
              globalStyles.NotificationItem,
            ]
          : [
              {
                backgroundColor: "rgba(217,217,217,1)",
                height: responsiveHeight(11),
              },
              globalStyles.NotificationItem,
            ]
      }
    >
      <Text style={{ fontFamily: "poppins-regular" }}>{item.name}</Text>
    </TouchableOpacity>
  );

  const handleSearch = (text) => {
    const newData = data.filter((item) => {
      const itemData = item.name.toLowerCase();
      const textData = text.toLowerCase();
      return itemData.indexOf(textData) > -1;
    });
    setFilteredData(newData);
    setSearchQuery(text);
  };

  const handleResultPress = (item) => {
    navigation.navigate(item.component);
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

  return (
    <View
      style={
        selectedApp == 1
          ? { backgroundColor: "#333333", flex: 1 }
          : { backgroundColor: "white", flex: 1 }
      }
    >
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
          {selectedlang == 0 ? translation[116].English : translation[116].Urdu}{" "}
        </Text>
        <View style={{ width: 24 }}></View>
      </View>

      <Searchbar
        placeholder="Search your component here..."
        value={searchQuery}
        onChangeText={handleSearch}
      />

      <ScrollView>
        {filteredData.map((item) => (
          <SearchResult
            key={item.id}
            item={item}
            onPress={() => handleResultPress(item)}
          />
        ))}
      </ScrollView>

      {filteredData.length === 0 && <NoSearch />}
    </View>
  );
};

export default CitizenSearch;
