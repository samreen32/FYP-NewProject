import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { globalStyles } from "../styles/globalStyles";
import { AntDesign } from '@expo/vector-icons';
import {
  responsiveFontSize, responsiveHeight, responsiveWidth
} from "react-native-responsive-dimensions";

export default function PayChallan({ navigation }) {
  const [name, setname] = useState('');
  return (

    <View>
      <View style={globalStyles.challan_TopText}>
        <Text style={globalStyles.challan_TopText}>Pay Challan</Text>
      </View>

      {/* <ScrollView> */}
      <View style={[globalStyles.bottomGroup, { width: responsiveWidth(33), marginTop: responsiveHeight(1), marginLeft: responsiveWidth(0) }]}>

        <View style={globalStyles.pendingChallan}>
          <TouchableOpacity style={[globalStyles.searchIcon,
          { marginTop: responsiveHeight(7), marginLeft: responsiveWidth(80) }]}
            onPress={() => { navigation.navigate("PayChaSecond") }}
          >

            <AntDesign name="right" size={30} color="black" />
          </TouchableOpacity>

          <View style={globalStyles.pendingChallanImage}>
            <Image source={require('../assets/images/challan_1.jpg')} style={[globalStyles.pendingChallanImage,
            { width: responsiveWidth(28), height: responsiveHeight(13) }]}
            />
          </View>

          <View style={[globalStyles.hisStat_Group, {
            marginLeft: responsiveWidth(40),
            marginTop: responsiveHeight(5)
          }]}
          >
            <Text style={[globalStyles.tw_Profile_Name, {
              fontSize: responsiveFontSize(2),
              marginLeft: responsiveWidth(3)
            }]}>RIM 2883</Text>
            <View style={[globalStyles.tw_Profile_goodMorning]}>
              <Text>RS 300</Text>
            </View>
          </View>
        </View>

        <View style={[globalStyles.pendingChallan, { marginTop: responsiveHeight(34) }]}>
          <TouchableOpacity style={[globalStyles.searchIcon,
          { marginTop: responsiveHeight(7), marginLeft: responsiveWidth(80) }]}
            onPress={() => { navigation.navigate("PayChaSecond") }}
          >
            <AntDesign name="right" size={30} color="black" />
          </TouchableOpacity>

          <View style={globalStyles.pendingChallanImage}>
            <Image source={require('../assets/images/challan_1.jpg')} style={[globalStyles.pendingChallanImage,
            { width: responsiveWidth(28), height: responsiveHeight(13) }]}
            />
          </View>

          <View style={[globalStyles.hisStat_Group, {
            marginLeft: responsiveWidth(40),
            marginTop: responsiveHeight(5)
          }]}
          >
            <Text style={[globalStyles.tw_Profile_Name, {
              fontSize: responsiveFontSize(2),
              marginLeft: responsiveWidth(3)
            }]}>RIM 2883</Text>
            <View style={[globalStyles.tw_Profile_goodMorning]}>
              <Text>RS 300</Text>
            </View>
          </View>
        </View>

        <View style={[globalStyles.pendingChallan, { marginTop: responsiveHeight(54) }]}>
          <TouchableOpacity style={[globalStyles.searchIcon,
          { marginTop: responsiveHeight(7), marginLeft: responsiveWidth(80) }]}
            onPress={() => { navigation.navigate("PayChaSecond") }}
          >
            <AntDesign name="right" size={30} color="black" />
          </TouchableOpacity>

          <View style={globalStyles.pendingChallanImage}>
            <Image source={require('../assets/images/challan_1.jpg')} style={[globalStyles.pendingChallanImage,
            { width: responsiveWidth(28), height: responsiveHeight(13) }]}
            />
          </View>

          <View style={[globalStyles.hisStat_Group, {
            marginLeft: responsiveWidth(40),
            marginTop: responsiveHeight(5)
          }]}
          >
            <Text style={[globalStyles.tw_Profile_Name, {
              fontSize: responsiveFontSize(2),
              marginLeft: responsiveWidth(3)
            }]}>RIM 2883</Text>
            <View style={[globalStyles.tw_Profile_goodMorning]}>
              <Text>RS 300</Text>
            </View>
          </View>
        </View>

        <View style={[globalStyles.pendingChallan, { marginTop: responsiveHeight(74) }]}>
          <TouchableOpacity style={[globalStyles.searchIcon,
          { marginTop: responsiveHeight(7), marginLeft: responsiveWidth(80) }]}
            onPress={() => { navigation.navigate("PayChaSecond") }}
          >
            <AntDesign name="right" size={30} color="black" />
          </TouchableOpacity>

          <View style={globalStyles.pendingChallanImage}>
            <Image source={require('../assets/images/challan_1.jpg')} style={[globalStyles.pendingChallanImage,
            { width: responsiveWidth(28), height: responsiveHeight(13) }]}
            />
          </View>

          <View style={[globalStyles.hisStat_Group, {
            marginLeft: responsiveWidth(40),
            marginTop: responsiveHeight(5)
          }]}
          >
            <Text style={[globalStyles.tw_Profile_Name, {
              fontSize: responsiveFontSize(2),
              marginLeft: responsiveWidth(3)
            }]}>RIM 2883</Text>
            <View style={[globalStyles.tw_Profile_goodMorning]}>
              <Text>RS 300</Text>
            </View>
          </View>
        </View>
      </View>
      {/* </ScrollView> */}
    </View>
  );
}

