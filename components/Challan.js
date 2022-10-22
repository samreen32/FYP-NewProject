import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import {
  responsiveFontSize, responsiveHeight, responsiveWidth
} from "react-native-responsive-dimensions";
import { globalStyles } from "../styles/globalStyles";
import { AntDesign } from '@expo/vector-icons';

export default function Challan({ navigation }) {
  const [name, setname] = useState('');
  return (

    <View>
      <View style={globalStyles.challan_TopText}>
        <Text style={globalStyles.challan_TopText}>Add Challan</Text>
      </View>

      <View style={[globalStyles.easeTraffic_Rect, { marginTop: responsiveHeight(14) }]}>

        <TouchableOpacity style={[globalStyles.searchIcon, 
          { marginTop: responsiveHeight(4), marginLeft: responsiveWidth(39) }]}
          onPress={()=>{navigation.navigate("CameraComponent")}}
        >
          <AntDesign name="camera" size={45} color="black" />
        </TouchableOpacity>
        
        <Text style={[globalStyles.locationTop_Text, 
          { marginTop: responsiveHeight(11), marginLeft: responsiveWidth(30) }]}>Capture Image</Text>

      </View>


      <View style={[globalStyles.bottomGroup, { width: responsiveWidth(33), marginTop: responsiveHeight(5), marginLeft: responsiveWidth(0) }]}>
        
        <TextInput style={globalStyles.textInput} onChangeText={(value) => setname(value)}
          placeholder="     Enter Vehicle Number" keyboardType="alphabet" editable maxLength={20} />

        <TextInput style={[globalStyles.textInput, { marginTop: responsiveHeight(44) }]}
          onChangeText={(value) => setname(value)} placeholder="    Select Car Type" keyboardType="alphabet" editable maxLength={20} />

        <TextInput style={[globalStyles.textInput, { marginTop: responsiveHeight(56) }]}
          onChangeText={(value) => setname(value)} placeholder="    Enter Amount" keyboardType="alphabet" editable maxLength={20} />

        <TextInput style={[globalStyles.textInput, { marginTop: responsiveHeight(68) }]}
          onChangeText={(value) => setname(value)} placeholder="    Any Comment" keyboardType="alphabet" editable maxLength={20} />
      
      </View>

      <TouchableOpacity style={globalStyles.submitChallan_btn}
        onPress={() => { navigation.navigate('ChallanSecond') }}
      >
        <Text style={globalStyles.submitChallan_Text}>Add</Text>
      </TouchableOpacity>

    </View>
  );
}

