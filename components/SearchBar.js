import React, {useState, useEffect} from "react";
import { View, Text, FlatList } from "react-native";
import { Searchbar } from 'react-native-paper';
import { globalStyles } from "../styles/globalStyles";


export default function SearchBar({ navigation }) {
    const [searchText, setSearchText] = useState(null);
  
    return (
        <View>
		<Searchbar 
          placeholder="Search another location" 
          onChangeText={(text) => {setSearchText(text)}} 
          value={searchText} 
        />
		</View>
    );
}