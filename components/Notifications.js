import React from "react";
import { View, Text, ScrollView, SafeAreaView, FlatList } from "react-native";
import { Appbar } from "react-native-paper";
import { globalStyles } from "../styles/globalStyles";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";

export default function Notifications({ navigation }) {
  const DATA = [
    {
      id: "1",
      title: "First Notification",
    },
    {
      id: "2",
      title: "Second Notification",
    },
    {
      id: "3",
      title: "Third Notification",
    },
    {
      id: "4",
      title: "Fourth Notification",
    },
    {
      id: "5",
      title: "Fiveth Notification",
    },
    {
      id: "6",
      title: "Sixeth Notification",
    },
    {
      id: "7",
      title: "Seventh Notification",
    },
    {
      id: "8",
      title: "Eigth Notification",
    },
    {
      id: "9",
      title: "Nineth Notification",
    },
  ];

  const Item = ({ title }) => (
    <View style={globalStyles.NotificationItem}>
      <Text>{title}</Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <View>
      <Item title={item.title} />
    </View>
  );

  return (
    <FlatList
      data={DATA}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
}
