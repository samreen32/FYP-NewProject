import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Appbar } from 'react-native-paper';

export default function Setting({navigation}) {
   const goBack =()=>{
    navigation.navigate("WardenScreen");
  }
  return (
   <Appbar.Header>
      <Appbar.BackAction onPress={goBack}/>
      <Appbar.Content title="Settings"/>
    </Appbar.Header>

  );
}