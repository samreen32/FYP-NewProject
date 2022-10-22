import React from 'react';
import { View, Text, ScrollView, SafeAreaView, FlatList } from "react-native";
import { Appbar } from 'react-native-paper';
import { globalStyles } from '../styles/globalStyles';

export default function Search({ navigation }) {
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Fourth',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Fiveth',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Sixeth',
    },
     {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Seventh',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Eigth',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Nineth',
    },
  ];

  const Item = ({ title }) => (
    <View style={globalStyles.NotificationItem}>
      <Text>{title}</Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <Item title={item.title} />
  );

  return (
    <ScrollView>
         <FlatList
         data={DATA}
         renderItem={renderItem}
         keyExtractor={item => item.id}
      />
      </ScrollView>
  );
}
