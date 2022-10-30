import React from 'react';
import { Text, View } from 'react-native';
import { Appbar } from 'react-native-paper';

export default function Sign_Out({navigation}) {
  
  return (
    <Appbar.Header>
      <Appbar.BackAction onPress={()=>{navigation.goBack()}}/>
      <Appbar.Content title="Sign Out"/>
    </Appbar.Header>
  );
}