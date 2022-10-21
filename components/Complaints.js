import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Appbar } from 'react-native-paper';


export default function Complaints({ navigation }) {

  const goBack =()=>{
    navigation.navigate("WardenScreen");
  }
  // <View style={styles.container}>
  //     <TouchableOpacity
  //       onPress={() => {
  //         navigation.navigate('WardenScreen');
  //       }}>
  //       <Ionicons name="arrow-back-outline" size={30} color="black" />
  //     </TouchableOpacity>

  //     <Text style={{ fontSize: 15, fontWeight: 'bold', marginTop: 5 }}>
  //       Complaints
  //     </Text>
  //   </View>
  return (
    <Appbar.Header>
      <Appbar.BackAction onPress={goBack}/>
      <Appbar.Content title="Complaints"/>
    </Appbar.Header>

  );
}
