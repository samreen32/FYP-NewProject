import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Button } from 'react-native';
import { Appbar } from 'react-native-paper';
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

      <View style={[globalStyles.bottomGroup, { width: responsiveWidth(33),  marginTop: responsiveHeight(1), marginLeft: responsiveWidth(0) }]}>
        
          <View style={globalStyles.pendingChallan}>
            <TouchableOpacity style={[globalStyles.searchIcon, 
              { marginTop: responsiveHeight(7), marginLeft: responsiveWidth(80) }]}
              onPress={()=>{navigation.navigate("PayChaSecond")}}
              >

              <AntDesign name="right" size={30} color="black" />
            </TouchableOpacity>  
          </View> 

          <View style={[globalStyles.pendingChallan, { marginTop: responsiveHeight(34) }]}>
            <TouchableOpacity style={[globalStyles.searchIcon, 
              { marginTop: responsiveHeight(7), marginLeft: responsiveWidth(80) }]}
              onPress={()=>{navigation.navigate("PayChaSecond")}}
              >
              <AntDesign name="right" size={30} color="black" />
            </TouchableOpacity> 
          </View>

          <View style={[globalStyles.pendingChallan, { marginTop: responsiveHeight(54) }]}>
            <TouchableOpacity style={[globalStyles.searchIcon, 
              { marginTop: responsiveHeight(7), marginLeft: responsiveWidth(80) }]}
              onPress={()=>{navigation.navigate("PayChaSecond")}}
              >
              <AntDesign name="right" size={30} color="black" />
            </TouchableOpacity> 
          </View>

          <View style={[globalStyles.pendingChallan, { marginTop: responsiveHeight(74) }]}>
            <TouchableOpacity style={[globalStyles.searchIcon, 
              { marginTop: responsiveHeight(7), marginLeft: responsiveWidth(80) }]}
              onPress={()=>{navigation.navigate("PayChaSecond")}}
              >
              <AntDesign name="right" size={30} color="black" />
            </TouchableOpacity> 
          </View>
    
      </View>
   
    </View>
  );
}

