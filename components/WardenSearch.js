import React, { useState, useCallback } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import Help from "./Help";
import { responsiveHeight } from "react-native-responsive-dimensions";
import AddChallan from "../components/AddChallan";
import { Ionicons } from "@expo/vector-icons";
import Places from "./Places";
import WardenSetting from "./WardenSetting";
import Statistics from "./Statistics";
import WardenProfile from "./WardenProfile";
import ChallanHistory from "./ChallanHistory";
import ViewComplaints from "./ViewComplaints";
import { globalStyles } from "../styles/globalStyles";
import { Searchbar } from "react-native-paper";
import NoSearch from "../Loader/NoSearch";
import Warden_Logout from "./Warden_Logout";
import Warden_Notifications from "./Warden_Notifications";
import Guidelines from "./Guidelines";
import { LANG_API_URL, THEME_API_URL } from "../Custom_Api_Calls/api_calls";
import { useFocusEffect } from "@react-navigation/native";
import { translation } from "./translation";
import AsyncStorage from "@react-native-async-storage/async-storage";

const data = [
  { id: 1, name: "Add Challan", component: AddChallan },
  { id: 2, name: "View Complaint", component: ViewComplaints },
  { id: 3, name: "Challan History", component: ChallanHistory },
  { id: 4, name: "Statistics", component: Statistics },
  { id: 5, name: "Profile", component: WardenProfile },
  { id: 6, name: "Help", component: Help },
  { id: 7, name: "Places", component: Places },
  { id: 8, name: "Settings", component: WardenSetting },
  { id: 9, name: "Traffic Guidelines", component: Guidelines },
  { id: 10, name: "Notifications", component: Warden_Notifications },
  { id: 11, name: "Logout", component: Warden_Logout },
];

const WardenSearch = ({ navigation }) => {
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

export default WardenSearch;
