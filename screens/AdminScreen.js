import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { AntDesign, SimpleLineIcons, Ionicons } from '@expo/vector-icons';
import { globalStyles } from "../styles/globalStyles";
import {
  responsiveFontSize, responsiveHeight, responsiveWidth
} from "react-native-responsive-dimensions";


export default function AdminScreen({ navigation }) {
  return (
    <View style={globalStyles.twMain}>
      <View style={[globalStyles.Notifi_MenuIcon, { 
        marginLeft: responsiveWidth(6), width: responsiveWidth(10), 
        }]}
       >
        <TouchableOpacity
          onPress={() => {
            navigation.openDrawer("AdminDrawer");
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
            navigation.navigate("AdminProfile")
            }}
        >
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
          It's easy to manage.
        </Text>
      </View>

      <View style={[globalStyles.viewPlaces_btn, { width: responsiveWidth(40), height: responsiveHeight(5.5) }]}>
        <View style={[globalStyles.viewPlaces, { width: responsiveWidth(35), height: responsiveHeight(5)}]}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ManageChallan");
            }}
          >
            <Text style={[globalStyles.viewPlaces_Text, { fontSize: responsiveFontSize(1.8)}]}>Manage Challan</Text>
          </TouchableOpacity>
        </View>
      </View>

        <View style={[globalStyles.payChallan_Rect, {height: responsiveHeight(23),   backgroundColor: "rgba(33,182,168,1)",}]}>
            <TouchableOpacity onPress={() => {
              navigation.navigate("RemoveWarden");
            }}>
                <AntDesign name="minuscircle" size={50} color="red" style={{marginTop: responsiveHeight(3),
                    marginLeft: responsiveWidth(15),}} />
                <Text style={[globalStyles.payChallan_Text, { 
                  marginTop: responsiveHeight(11), marginLeft: responsiveWidth(7), fontSize: responsiveFontSize(3.2) }]}
                >Remove{'\n'}Warden</Text>
            </TouchableOpacity>
        </View>


        <View style={[globalStyles.payChallan_Rect, { height: responsiveHeight(17), backgroundColor: "rgba(33,182,168,1)",
            marginTop: responsiveHeight(69),}]}>
            <TouchableOpacity onPress={() => {
              navigation.navigate("HandleComplaints");
            }}>
              <AntDesign name="customerservice" size={55} color="black" style={{
                    marginTop: responsiveHeight(1), marginLeft: responsiveWidth(15.5),}}
              />
                <Text style={[globalStyles.payChallan_Text, {marginTop: responsiveHeight(7.5),
                    marginLeft: responsiveWidth(5), fontSize: responsiveFontSize(2.5) }]}>     Handle{'\n'}Complaints</Text>
            </TouchableOpacity>
        </View>



        <View style={[globalStyles.fileHistory_Complaints_Rect, { marginTop: responsiveHeight(45), backgroundColor: "rgba(33,182,168,1)",
        height: responsiveHeight(17) }]}>
          <View>
            <TouchableOpacity onPress={() => {
              navigation.navigate("Places");
            }}>
                <SimpleLineIcons name="location-pin" size={40} color="black"  style={{
                    marginTop: responsiveHeight(1.5),
                    marginLeft: responsiveWidth(16.5),}}/>
                <Text style={[globalStyles.fileHistoryComplaints_Text, { marginLeft: responsiveWidth(13),
                    marginTop: responsiveHeight(8), fontSize: responsiveFontSize(2.5) }]}> View {'\n'}Places</Text>
            </TouchableOpacity>
          </View>
        </View>
 

        <View style={[globalStyles.fileHistory_Complaints_Rect, { marginTop: responsiveHeight(63), backgroundColor: "rgba(33,182,168,1)",
        height: responsiveHeight(23) }]}>
          <View>
            <TouchableOpacity onPress={() => {
              navigation.navigate("ManageChallan");
            }}>
                <Ionicons name="settings" size={50} color="black" style={{
                    marginTop: responsiveHeight(2),
                    marginLeft: responsiveWidth(19),}}
                  />
                  
                  <Ionicons name="settings-outline" size={40} color="black" style={{
                    marginTop: responsiveHeight(-6),
                    marginLeft: responsiveWidth(10),}}
                  />
                  <Ionicons name="settings-outline" size={42} color="white" style={{
                    marginTop: responsiveHeight(-2),
                    marginLeft: responsiveWidth(15),}}
                  />
                <Text style={[globalStyles.fileHistoryComplaints_Text, { marginLeft: responsiveWidth(10),
                    marginTop: responsiveHeight(12.5), fontSize: responsiveFontSize(2.5) }]}>Manage {'\n'}Challan</Text>
            </TouchableOpacity>
          </View>
        </View>

    </View>
  );
}
