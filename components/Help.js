import React from 'react';
import { Text, View } from 'react-native';
import { Appbar } from 'react-native-paper';

export default function Help({navigation}) {
   const goBack =()=>{
    navigation.navigate("WardenScreen");
  }
  return (
  <Appbar.Header>
      <Appbar.BackAction onPress={goBack}/>
      <Appbar.Content title="Help"/>
    </Appbar.Header>

  );
}
