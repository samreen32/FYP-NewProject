import React, {useState, useEffect} from "react";
import { View, Text, FlatList } from "react-native";
import { Searchbar } from 'react-native-paper';
import { globalStyles } from "../styles/globalStyles";


export default function SearchBar({ navigation }) {
    const [searchText, setSearchText] = useState(null);
    // const [results, setResults] = useState([]);    //filter
    // const [masterData, setMasterData] = useState([]);    
    // const [searchTimer, setSearchTimer] = useState(null);

    // useEffect(() => {
    //     fetchPost();
    // }, [])

    // const fetchPost = ()=>{
    //     const urlApi = 'https://jsonplaceholder.typicode.com/posts';
    //     fetch(urlApi)
    //     .then((response) => response.json())
    //     .then((responseJson) => {
    //        setResults(responseJson);
    //        setMasterData(responseJson);
    //     }).catch((err) => console.log(err));
    // }
  

    //  const ItemView =({item})=>{
    //   return(
    //     <Text>
    //         {item.id}{'.'}{item.title.toUpperCase()}
    //     </Text>
    //   )
    //  }

    //  const ItemSeparatorView =()=>{
    //     return(
    //       <View style={{height: 0, width: '100%'}}> 
    //       </View>
    //     )
    //    }

    // const searchFilter =(text)=>{
    //    if(text){
    //     const newData = masterData.filter((item)=>{
    //         const itemData = item.title ? item.title.toUpperCase(): ''.toUpperCase();
    //         const textData = text.toUpperCase();
    //         return itemData.indexOf(textData)> -1;
    //     });
    //     setResults(newData);
    //     setSearchText(text);
    //    }
    //    else{
    //     setResults(masterData);
    //     setSearchText(text);
    //    }
    // }


    return (
        <View style={globalStyles.SearchBarStyling}>
		<Searchbar 
          placeholder="Search here" 
          onChangeText={(text) => {setSearchText(text)}} 
          value={searchText} 
        />
        {/* <FlatList 
         data={results}
         keyExtractor={(item, index) => index.toString() }
         ItemSeparatorComponent={ItemSeparatorView}
         renderItem = {ItemView}
        /> */}
		</View>
    );
}