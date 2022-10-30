import { React, useState } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  Linking,
  TextInput,
  FlatList,
  TouchableOpacity,
  Button,
  Pressable,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";

const DATA = [
  {
    id: "1",
    title: "RULE # 1",
    description: "Anyone is always complain  about....",
  },
  {
    id: "2",
    title: "RULE # 2",
    description: "Anyone is always complain about....",
  },

  {
    id: "3",
    title: "RULE # 3",
    description: "Anyone is always complain about....",
  },
  {
    id: "4",
    title: "RULE # 4",
    description: "Anyone is always complain about....",
  },
  {
    id: "5",
    title: "RULE # 5",
    description: "Anyone is always complain about....",
  },
  {
    id: "6",
    title: "RULE # 6",
    description: "Anyone is always complain about....",
  },
  {
    id: "7",
    title: "RULE # 7",
    description: "Anyone is always complain about....",
  },
  {
    id: "8",
    title: "RULE # 8",
    description: "Anyone is always complain about....",
  },
  {
    id: "9",
    title: "RULE # 9",
    description: "Anyone is always complain about....",
  },
];

export default function Rules({navigation}) {
  return (
    <View>
      
      <TouchableOpacity
          onPress={()=>{
            navigation.goBack();
          }}
        >
          <Text style={styles.Rule_Text_Header}>Rules</Text>
        <Ionicons name="arrow-back" size={45} color="black" style={styles.backArrow}/>
        </TouchableOpacity>

      <FlatList
        data={DATA}
        renderItem={({ item, description }) => (
          <View style={styles.Rule_Container}>
            <View>
              <Text style={styles.Rule_no_Text}>{item.title}</Text>
              <Text style={styles.description_Text}>{item.description}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  Rule_Text_Header: {
    color: "#D798F6",
    fontFamily: "poppins-bold",
    fontSize: responsiveFontSize(3.5),
    marginLeft: responsiveWidth(37),
    marginTop: responsiveHeight(6),
  },
  Rule_Container: {
    backgroundColor: "#D798F6",
    height: responsiveHeight(12),
    marginLeft: responsiveWidth(7),
    marginTop: responsiveHeight(3),
    marginRight: responsiveWidth(7),
    marginVertical: responsiveHeight(-1),
    borderRadius: 15,
  },
  Rule_no_Text: {
    color: "#000000",
    fontWeight: "bold",
    fontSize: responsiveFontSize(2.3),
    marginLeft: responsiveWidth(5),
    marginTop: responsiveHeight(1),
  },
  description_Text: {
    marginLeft: responsiveWidth(5),
    marginTop: responsiveHeight(0.5),
    color: "#FFFFFF",
  },
  backArrow: {
    marginLeft: responsiveWidth(5),
    marginTop: responsiveHeight(-7.5),
  }
});
