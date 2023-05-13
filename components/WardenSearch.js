import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import Help from "./Help";
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

const SearchResult = ({ item, onPress }) => (
  <TouchableOpacity onPress={onPress} style={globalStyles.NotificationItem}>
    <Text style={{ fontFamily: "poppins-regular" }}>{item.name}</Text>
  </TouchableOpacity>
);

const WardenSearch = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(data);

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

  return (
    <>
      <View style={[globalStyles.header]}>
        <Ionicons
          name="arrow-back"
          size={24}
          color="white"
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text style={[globalStyles.headerText, { right: 5 }]}>SEARCH</Text>
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
    </>
  );
};

export default WardenSearch;
