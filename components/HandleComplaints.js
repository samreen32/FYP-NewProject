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
import { Ionicons, AntDesign } from "@expo/vector-icons";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
const DATA = [
  {
    id: "1",
    Name: "Someone",
    Complain: "Someone is complaining \nabout...",
    image_source: require("../assets/images/addChallan.png"),
  },
  {
    id: "2",
    Name: "Someone",
    Complain: "Someone is complaining \nabout...",
    image_source: require("../assets/images/addChallan.png"),
  },

  {
    id: "3",
    Name: "Someone",
    Complain: "Someone is complaining \nabout...",
    image_source: require("../assets/images/addChallan.png"),
  },
  {
    id: "4",
    Name: "Someone",
    Complain: "Someone is complaining \nabout...",
    image_source: require("../assets/images/addChallan.png"),
  },
  {
    id: "5",
    Name: "Someone",
    Complain: "Someone is complaining \nabout...",
    image_source: require("../assets/images/addChallan.png"),
  },
  {
    id: "6",
    Name: "Someone",
    Complain: "Someone is complaining \nabout...",
    image_source: require("../assets/images/addChallan.png"),
  },
  {
    id: "7",
    Name: "Someone",
    Complain: "Someone is complaining \nabout...",
    image_source: require("../assets/images/addChallan.png"),
  },
  {
    id: "8",
    Name: "Someone",
    Complain: "Someone is complaining \nabout...",
    image_source: require("../assets/images/addChallan.png"),
  },
  {
    id: "9",
    Name: "Someone",
    Complain: "Someone is complaining \nabout...",
    image_source: require("../assets/images/addChallan.png"),
  },
];

export default function HandleComplaints({navigation}) {
  return (
    <View>
      <TouchableOpacity
          onPress={()=>{
            navigation.goBack();
          }}
        >
            <Text style={[styles.Complain_Text_Header]}>Handle Complaints</Text>
        <Ionicons name="arrow-back" size={45} color="black" style={styles.backArrow}/>
      </TouchableOpacity>

      <FlatList
        data={DATA}
        renderItem={({ item, description }) => (
          <View style={styles.Complain_Container}>
            <TouchableOpacity>
              <Image
                style={styles.Image}
                source={item.image_source}
                resizeMode="contain"
              />
            </TouchableOpacity>

            <View>
              <Text style={styles.Name_Text}>{item.Name}</Text>
              <Text style={styles.description_Text}>{item.Complain}</Text>
              <TouchableOpacity>
                <AntDesign
                  name="right"
                  size={50}
                  color="black"
                  style={{
                    marginTop: responsiveHeight(-8.5),
                    marginLeft: responsiveWidth(56),
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  Complain_Text_Header: {
    color: "black",
    fontFamily: "poppins-bold",
    fontSize: responsiveFontSize(3),
    marginLeft: responsiveWidth(20),
    marginTop: responsiveHeight(6),
  },
  Complain_Container: {
    flexDirection: "row",
    backgroundColor: "#D798F6",
    height: responsiveHeight(15),
    marginLeft: responsiveWidth(5),
    marginTop: responsiveHeight(3.5),
    marginRight: responsiveWidth(6),
    marginVertical: responsiveHeight(-2),
    borderRadius: 15,
  },
  Image: {
    width: responsiveWidth(17),
    height: responsiveHeight(10),
    marginLeft: responsiveWidth(3),
    marginTop: responsiveHeight(2.5),
    borderRadius: responsiveWidth(7),
  },
  Name_Text: {
    color: "#000000",
    fontWeight: "bold",
    fontFamily: "poppins-bold",
    fontSize: responsiveFontSize(2.3),
    marginLeft: responsiveWidth(5),
    marginTop: responsiveHeight(0.5),
    paddingTop: responsiveHeight(2),
  },
  description_Text: {
    fontFamily: "poppins-bold",
    marginLeft: responsiveWidth(5),
    marginTop: responsiveHeight(0.5),
    color: "#FFFFFF",
  },
  backArrow: {
    marginLeft: responsiveWidth(5),
    marginTop: responsiveHeight(-6.5),
  }
});
