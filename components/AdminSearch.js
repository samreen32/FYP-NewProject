import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import Places from "./Places";
import AdminSetting from "./AdminSetting";
import { globalStyles } from "../styles/globalStyles";
import { Searchbar } from "react-native-paper";
import NoSearch from "../Loader/NoSearch";
import RemoveWarden from "./RemoveWarden";
import ManageChallan from "./ManageChallan";
import HandleComplaints from "./HandleComplaints";
import Admin_Notifications from "./Admin_Notifications";
import Admin_Logout from "./Admin_Logout";
import AdminProfile from "./AdminProfile";

const data = [
  { id: 1, name: "Remove Warden", component: RemoveWarden },
  { id: 2, name: "Manage Challan", component: ManageChallan },
  { id: 3, name: "Handle Complaints", component: HandleComplaints },
  { id: 4, name: "Notifications", component: Admin_Notifications },
  { id: 5, name: "Profile", component: AdminProfile },
  { id: 7, name: "Places", component: Places },
  { id: 8, name: "Settings", component: AdminSetting },
  { id: 9, name: "Logout", component: Admin_Logout },
];

const SearchResult = ({ item, onPress }) => (
  <TouchableOpacity onPress={onPress} style={globalStyles.NotificationItem}>
    <Text style={{ fontFamily: "poppins-regular" }}>{item.name}</Text>
  </TouchableOpacity>
);

const AdminSearch = ({ navigation }) => {
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

export default AdminSearch;
