import React, { useEffect } from "react";
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
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import Tabs from "../routes/Tabs";
// import SearchBar from './SearchBar';

export default function WardenScreen({ navigation }) {
  return (
    <View style={globalStyles.twMain}>
      <View
        style={[
          globalStyles.Notifi_MenuIcon,
          { marginLeft: responsiveWidth(6) },
        ]}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.openDrawer("WardenDrawer");
          }}
        >
          <Ionicons name="menu" size={33} color="black" />
        </TouchableOpacity>
      </View>

      <View
        style={[
          globalStyles.Notifi_MenuIcon,
          { marginLeft: responsiveWidth(85) },
        ]}
      >
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
        <Text style={globalStyles.letsEase_theTraffic}>
          Lets Ease the Traffic
        </Text>
      </View>

      <View style={globalStyles.viewPlaces_btn}>
        <View style={globalStyles.viewPlaces}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ViewPlaceWarden");
            }}
          >
            <Text style={globalStyles.viewPlaces_Text}>View Places</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* <Image
         style={globalStyles.carImage}
         source={require("./assets/images/car.jpg")}
       /> */}

      <View
        style={[globalStyles.challan_Rect, { marginLeft: responsiveWidth(4) }]}
      >
        <View>
          <TouchableOpacity>
            <Text
              style={[
                globalStyles.addView_Challan_Text,
                { width: responsiveWidth(25), height: responsiveHeight(10) },
              ]}
            >
              Add Challan
            </Text>
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

      <View
        style={[globalStyles.challan_Rect, { marginLeft: responsiveWidth(51) }]}
      >
        <View>
          <TouchableOpacity>
            <Text
              style={[
                globalStyles.addView_Challan_Text,
                { width: responsiveWidth(29), height: responsiveHeight(9) },
              ]}
            >
              View Complaints
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={globalStyles.hisStat_Group}>
        <View
          style={[
            globalStyles.hisStat_btn,
            {
              width: responsiveWidth(54),
              marginLeft: responsiveWidth(1),
              backgroundColor: "rgba(24,154,180,1)",
            },
          ]}
        >
          <View>
            <TouchableOpacity>
              <Text
                style={[
                  globalStyles.hisStat_Text,
                  {
                    width: responsiveWidth(29),
                    marginLeft: responsiveWidth(7),
                  },
                ]}
              >
                History
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={[
            globalStyles.hisStat_btn,
            {
              width: responsiveWidth(53),
              marginLeft: responsiveWidth(40),
              backgroundColor: "rgba(33,182,168,1)",
            },
          ]}
        >
          <View>
            <TouchableOpacity>
              <Text
                style={[
                  globalStyles.hisStat_Text,
                  {
                    width: responsiveWidth(33),
                    marginLeft: responsiveWidth(11),
                  },
                ]}
              >
                Statistics
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View
        style={[
          globalStyles.bottomGroup,
          {
            width: responsiveWidth(35),
            marginTop: responsiveHeight(-1),
            marginLeft: responsiveWidth(2),
          },
        ]}
      >
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
            <TouchableOpacity
              onPress={() => {
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
            <TouchableOpacity
            onPress={() => {
              navigation.navigate("Rules");
            }}
            >
              <Ionicons name="newspaper" size={30} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text style={globalStyles.rules_Text}>Rules</Text>
        </View>

        <View style={globalStyles.helpCircle}>
          <View style={globalStyles.helpIcon}>
            <TouchableOpacity 
             onPress={() => {
              navigation.navigate("Help");
            }}
            >
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
