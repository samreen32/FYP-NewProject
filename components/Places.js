import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, FlatList } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { globalStyles } from "../styles/globalStyles";
import SearchBar from '../components/SearchBar';
// import { useSelector, useDispatch } from 'react-redux';
// import { getCities } from '../redux/actions';


export default function Places({ navigation }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  // const { city } = useSelector(state => state.userReducer);
  // const dispatch = useDispatch();
  //const [searchText, setSearchText] = useState(null);

  useEffect(() => {
    // dispatch(getCities());   
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      /*Original work */
      let location = await Location.getCurrentPositionAsync({});
      let address = await Location.reverseGeocodeAsync(location.coords);
      console.log(address);
      setLocation({
        longitude: location.coords.longitude,
        latitude: location.coords.latitude,
        longitudeDelta: 0.0922,
        latitudeDelta: 0.0421,
      });
    })();
  }, []);

  /* Original work*/
  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }


  return (
    <View>
      {/* <Text>Your current location is {text}</Text> */}
      {/* <FlatList
        data={city}
        renderItem={({ item })=>(   //response array consist of country and city.
          <View style={globalStyles.itemRedux}>
            <Text style={globalStyles.titleRedux}>{item.district}</Text>   
            <Text style={globalStyles.subtitleRedux}>{item.city}</Text>
          </View>
        )}
        keyExtractor={(item, index)=> index.toString()}
      />  */}

      <SearchBar />
      <MapView style={globalStyles.map}
        loadingEnabled={true}
        region={location}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
      >
      </MapView>
    </View>
  );
}
