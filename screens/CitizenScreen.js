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
import { MaterialCommunityIcons, FontAwesome5, Entypo, MaterialIcons } from "@expo/vector-icons";
import { globalStyles } from "../styles/globalStyles";
import {
  responsiveFontSize, responsiveHeight, responsiveWidth
} from "react-native-responsive-dimensions";


export default function CitizenScreen({ navigation }) {
  return (
    <View style={globalStyles.twMain}>
      <View style={[globalStyles.Notifi_MenuIcon, { marginLeft: responsiveWidth(6), width: responsiveWidth(10), }]}>
        <TouchableOpacity
          onPress={() => {
            navigation.openDrawer("CitizenDrawer");
          }}
        >
          <Ionicons name="menu" size={33} color="black" />
        </TouchableOpacity>
      </View>

      <View style={[globalStyles.Notifi_MenuIcon, { marginLeft: responsiveWidth(85) }]}>
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
            navigation.navigate("Places");
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
        <TouchableOpacity 
        onPress={()=>{
          navigation.navigate("Profile")
        }}>
          <Ionicons name="md-person-circle-outline" size={50} />
        </TouchableOpacity>
      </View>

      <View style={globalStyles.searchIcon}>
        <TouchableOpacity 
          onPress={()=>{navigation.navigate("Search")}}
        >
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
              navigation.navigate("PayChallan");
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
          <TouchableOpacity onPress={() => {
            navigation.navigate("PayChallan");
          }}>

          <MaterialCommunityIcons name="credit-card-check-outline" size={100} color="black" style={{
            marginTop: responsiveHeight(1), marginLeft: responsiveWidth(9) }}
          />
            <Text style={globalStyles.payChallan_Text}>     Pay{'\n'}Challan</Text>
          </TouchableOpacity> 
      </View>

    

      <View style={[globalStyles.fileHistory_Complaints_Rect, { marginTop: responsiveHeight(45) }]}>
        <View>
          <TouchableOpacity onPress={() => {
            navigation.navigate("FileComplaint");
          }}>
             <Entypo name="emoji-sad" size={33} color="black" style={{ marginTop: responsiveHeight(2.5),
             marginLeft: responsiveWidth(8.5) }}
            />
            <FontAwesome5 name="comment-alt" size={60} color="black" style={{ marginTop: responsiveHeight(-6),
             marginLeft: responsiveWidth(5) }}
            />
           
            <Text style={[globalStyles.fileHistoryComplaints_Text, { marginLeft: responsiveWidth(12) }]}>                   File {'\n'}Complaints</Text>
          </TouchableOpacity>
        </View>
      </View>
 
      
        <View style={[globalStyles.fileHistory_Complaints_Rect, { marginTop: responsiveHeight(60) }]}>
          <View>
            <TouchableOpacity onPress={() => {
              navigation.navigate("ChallanHistory");
            }}>
              <MaterialIcons name="pending-actions" size={65} color="black"  style={{ 
                marginTop: responsiveHeight(2),
                marginLeft: responsiveWidth(2) }}
              />
              <Text style={[globalStyles.fileHistoryComplaints_Text, { marginLeft: responsiveWidth(20) }]}>Challan {'\n'} History</Text>
            </TouchableOpacity>
          </View>
        </View>


      <View style={[globalStyles.bottomGroup, { marginTop: responsiveHeight(0), marginLeft: responsiveWidth(2), width: responsiveWidth(35) }]}>
        <View style={globalStyles.settingCircle}>
          <View style={globalStyles.settingIcon}>
            <TouchableOpacity
             onPress={() => {
              navigation.navigate("Setting")
            }}
            >
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
              navigation.navigate("Places");
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
