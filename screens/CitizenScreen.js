import React from "react";
import {
  Button,
  TextInput,
  Image,
  FlatList,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { globalStyles } from "../styles/globalStyles";
// import SearchBar from './SearchBar';


export default function CitizenScreen({ navigation }) {
  return (
    <View style={globalStyles.twMain}>
      <View style={globalStyles.menuIcon}>
        <TouchableOpacity
          onPress={() => {
            navigation.openDrawer("WardenDrawer");
          }}
        >
          <Ionicons name="menu" size={33} color="black" />
        </TouchableOpacity>
      </View>

      <View style={globalStyles.notificationIcon}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Notifications");
          }}
        >
          <Ionicons name="notifications" size={33} color="black" />
        </TouchableOpacity>
      </View>

      <View style={globalStyles.locationTop}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ViewPlaceWarden");
          }}
        >
          <Text style={globalStyles.locationTop_Text}>
            Blue Area, Islamabad
          </Text>
        </TouchableOpacity>
      </View>

      <View style={globalStyles.tw_ProfileGroup2}>
        <View>
          <Text style={globalStyles.tw_Profile_Name}>Hi, Jhon</Text>
        </View>
        <View>
          <Text style={globalStyles.tw_Profile_goodMorning}>Good Morning</Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="md-person-circle-outline" size={50} />
        </TouchableOpacity>
      </View>

      <View style={globalStyles.searchIcon}>
        <TouchableOpacity>
          <Ionicons name="search" size={30} color="black" />
        </TouchableOpacity>
      </View>

      <View style={globalStyles.easeTraffic_Rect}></View>
      <View>
        <Text style={globalStyles.itsEasy_toPay}>
          Don't Worry {'\n'}it's easy to pay.
        </Text>
      </View>

      <View style={globalStyles.viewPlaces_btn}>
        <View style={globalStyles.viewPlaces}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("");
            }}
          >
            <Text style={globalStyles.viewPlaces_Text}>Pay Challan</Text>
          </TouchableOpacity>
        </View>
      </View>


      {/* <Image
         style={globalStyles.carImage}
         source={require("./assets/images/car.jpg")}
       /> */}

      <View style={globalStyles.payChallan_Rect}>
        <View>
          <TouchableOpacity>
            <Text style={globalStyles.payChallan_Text}>     Pay{'\n'}Challan</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* <Image
         style={globalStyles.challanIcon}
         source={require("../assets/images/asynStorage.png")}
       />

        <Image
         style={globalStyles.challanImage}
         source={require("../assets/images/asynStorage.png")}
       /> */}

      <View style={globalStyles.fileComplaints_Rect}>
        <View>
          <TouchableOpacity>
            <Text style={globalStyles.fileComplaints_Text}>                   File {'\n'}Complaints</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={globalStyles.challanHistory_Rect}>
        <View>
          <TouchableOpacity>
            <Text style={globalStyles.challanHistory_Text}>Challan {'\n'} History</Text>
          </TouchableOpacity>
        </View>
      </View>


      <View style={globalStyles.bottomGroup_Edited}>
        <View style={globalStyles.settingCircle}>
          <View style={globalStyles.settingIcon}>
            <TouchableOpacity>
              <Ionicons name="settings" size={30} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text style={globalStyles.setting_Text}>Setting</Text>
        </View>

        <View style={globalStyles.placesCircle}>
          <View style={globalStyles.placesIcon}>
            <TouchableOpacity onPress={() => {
              navigation.navigate("ViewPlaceWarden");
            }}
            >
              <Ionicons name="location" size={30} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text style={globalStyles.places_Text}>Places</Text>
        </View>

        <View style={globalStyles.rulesCircle}>
          <View style={globalStyles.rulesIcon}>
            <TouchableOpacity>
              <Ionicons name="newspaper" size={30} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text style={globalStyles.rules_Text}>Rules</Text>
        </View>

        <View style={globalStyles.helpCircle}>
          <View style={globalStyles.helpIcon}>
            <TouchableOpacity>
              <MaterialCommunityIcons
                name="chat-question"
                size={30}
                color="black"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text style={globalStyles.help_Text}>Help</Text>
        </View>
      </View>

    </View>
  );
}
