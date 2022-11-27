import { React, useState } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  Modal,
  Pressable,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import SearchBar from "./SearchBar";

const DATA = [
  {
    id: "1",
    Name: "Someone",
    Complain: "Liscense No.",
    image_source: require("../assets/images/addChallan.png"),
  },
  {
    id: "2",
    Name: "Someone",
    Complain: "Liscense No.",
    image_source: require("../assets/images/addChallan.png"),
  },

  {
    id: "3",
    Name: "Someone",
    Complain: "Liscense No.",
    image_source: require("../assets/images/addChallan.png"),
  },
  {
    id: "4",
    Name: "Someone",
    Complain: "Liscense No.",
    image_source: require("../assets/images/addChallan.png"),
  },
  {
    id: "5",
    Name: "Someone",
    Complain: "Liscense No.",
    image_source: require("../assets/images/addChallan.png"),
  },
  {
    id: "6",
    Name: "Someone",
    Complain: "Liscense No.",
    image_source: require("../assets/images/addChallan.png"),
  },
  {
    id: "7",
    Name: "Someone",
    Complain: "Liscense No.",
    image_source: require("../assets/images/addChallan.png"),
  },
  {
    id: "8",
    Name: "Someone",
    Complain: "Liscense No.",
    image_source: require("../assets/images/addChallan.png"),
  },
  {
    id: "9",
    Name: "Someone",
    Complain: "Liscense No.",
    image_source: require("../assets/images/addChallan.png"),
  },
];

export default function RemoveWarden({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>

<TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Text style={[styles.Complain_Text_Header]}>Remove Warden</Text>
        <Ionicons
          name="arrow-back"
          size={43}
          color="black"
          style={styles.backArrow}
        />
      </TouchableOpacity>

      <View style={{ height: responsiveHeight(5) }}>
        <SearchBar />
      </View>

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

              <View style={styles.centeredView}>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                  }}
                >
                  <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                      <Text style={styles.modalText}>
                        Do you want to remove this warden?
                      </Text>
                      <Pressable onPress={() => setModalVisible(!modalVisible)}>
                        <Text
                          style={{ marginLeft: responsiveWidth(-24), marginTop: responsiveHeight(1),
                            width: responsiveWidth(10),
                            height: responsiveHeight(4), }}
                        >
                          Yes
                        </Text>
                      </Pressable>

                      <Pressable
                        onPress={() => setModalVisible(!modalVisible)}
                      >
                        <Text
                          style={{
                            width: responsiveWidth(10),
                            height: responsiveHeight(4),
                            marginLeft: responsiveWidth(45),
                            marginTop: responsiveHeight(-3.5),
                          }}
                        >
                          No
                        </Text>
                      </Pressable>
                    </View>
                  </View>
                </Modal>

                <TouchableOpacity onPress={() => setModalVisible(true)}>
                <MaterialCommunityIcons name="backspace-reverse-outline" size={40} color="black"  style={{
                      width: responsiveWidth(92),
                      height: responsiveHeight(10),
                      marginTop: responsiveHeight(-10),
                      marginLeft: responsiveWidth(52),
                    }}/>

                </TouchableOpacity>
              </View>
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
    fontSize: responsiveFontSize(3.5),
    marginLeft: responsiveWidth(20),
    marginTop: responsiveHeight(6),
  },
  Complain_Container: {
    flexDirection: "row",
    backgroundColor: "rgba(24,154,180,1)",
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  backArrow: {
    marginLeft: responsiveWidth(5),
    marginTop: responsiveHeight(-6.6),
  }
});
