import React from 'react';
import { View, Text, ScrollView, SafeAreaView, FlatList } from "react-native";
import { Appbar } from 'react-native-paper';
import { globalStyles } from '../styles/globalStyles';
import SearchBar from './SearchBar';

export default function Search({ navigation }) {
  const DATA = [
    {
      id: '1',
      title: 'First',
    },
    {
      id: '2',
      title: 'Second',
    },
    {
      id: '3',
      title: 'Third',
    },
    {
      id: '4',
      title: 'Fourth',
    },
    {
      id: '5',
      title: 'Fiveth',
    },
    {
      id: '6',
      title: 'Sixeth',
    },
     {
      id: '7',
      title: 'Seventh',
    },
    {
      id: '8',
      title: 'Eigth',
    },
    {
      id: '9',
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
    <View>

      <SearchBar/>

           <FlatList
           data={DATA}
           renderItem={renderItem}
           keyExtractor={item => item.id}
        />
     
    </View>
    
  );
}
