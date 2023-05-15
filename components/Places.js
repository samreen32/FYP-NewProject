import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { globalStyles } from "../styles/globalStyles";
import SearchBar from "../components/SearchBar";
import { Ionicons } from "@expo/vector-icons";
import { userLogin } from "../context/AuthContext";

export default function Places({ navigation }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const { setAddressText } = userLogin();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      let address = await Location.reverseGeocodeAsync(location.coords);

      setAddressText(`${address[0].district}, ${address[0].city}`);

      setLocation({
        longitude: location.coords.longitude,
        latitude: location.coords.latitude,
        longitudeDelta: 0.0922,
        latitudeDelta: 0.0421,
      });
    })();
  }, []);

  return (
    <>
      <View style={globalStyles.header}>
        <Ionicons
          name="arrow-back"
          size={24}
          color="white"
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text style={globalStyles.headerText}>YOUR LOCATION</Text>
        <View style={{ width: 24 }}></View>
      </View>

      <SearchBar />
      <MapView
        style={globalStyles.map}
        loadingEnabled={true}
        region={location}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
      ></MapView>
    </>
  );
}
