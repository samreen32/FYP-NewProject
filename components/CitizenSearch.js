import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import PayChallan from "./PayChallan";
import Help from "./Help";
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

const SearchResult = ({ item, onPress }) => (
  <TouchableOpacity onPress={onPress} style={globalStyles.NotificationItem}>
    <Text style={{ fontFamily: "poppins-regular" }}>{item.name}</Text>
  </TouchableOpacity>
);

const CitizenSearch = ({ navigation }) => {
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
    <View>
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
