import { React, useState, useCallback } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Ionicons, AntDesign, Entypo } from "@expo/vector-icons";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import NoComplaint_Box from "../Loader/NoComplaint_Box";
import { Card } from "react-native-paper";
import { globalStyles } from "../styles/globalStyles";
import {
  COMPLAINT_API_URL,
  THEME_API_URL,
  LANG_API_URL,
} from "../Custom_Api_Calls/api_calls";
import { useFocusEffect } from "@react-navigation/native";
import { translation } from "./translation";

export default function HandleComplaints({ navigation }) {
  const [complaints, setComplaints] = useState([]);
  let redirect = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalDetails, setModalDetails] = useState([]);
  const [images, setImages] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [measured, setMeasured] = useState(false);
  const [textHeight, setTextHeight] = useState(0);
  const [selectedlang, setselectedlang] = useState(0);
  const [selectedApp, setselectedApp] = useState(0);

  /************** View all the Complaint Function ****************/
  const handleComplaints = async () => {
    const response = await fetch(`${COMPLAINT_API_URL}/handleComplaints`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    setComplaints(json);
  };

  useEffect(() => {
    if (AsyncStorage.getItem("token")) {
      handleComplaints();
    } else {
      redirect("/AdminLogin");
    }
    // eslint-disable-next-line
  }, []);

  /************** View Details of Single Complaint Function ****************/
  const handleSingleComplaint = (id) => {
    fetch(`${COMPLAINT_API_URL}/handleSingleComplaint/${id}`)
      .then((response) => response.json())
      .then((res) => {
        setModalDetails(res);
        setImages(res.any_image);
      });
    setModalVisible(true);
  };

  /************* Functions for details to read more and show less text *************/
  const handleLayout = (event) => {
    if (!measured) {
      setTextHeight(event.nativeEvent.layout.height);
      setMeasured(true);
      setShowButton(true);
    }
  };

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  /********** Method to fetch Admin Language **********/
  const fetchLanguage = async () => {
    try {
      const authToken = await AsyncStorage.getItem("token");
      const response = await fetch(`${LANG_API_URL}/admin_languageId`, {
        headers: {
          "auth-token": authToken,
        },
      });
      const data = await response.json();
      console.log(data);
      const langs = data.language;

      setselectedlang(langs);
      console.log("chk" + selectedlang);
      console.log("lang is" + langs);
    } catch (err) {
      console.error(err);
    }
  };

  /********** Method to fetch Admin Theme **********/
  const fetchTheme = async () => {
    try {
      const authToken = await AsyncStorage.getItem("token");
      const response = await fetch(`${THEME_API_URL}/admin_themeId`, {
        headers: {
          "auth-token": authToken,
        },
      });
      const data = await response.json();
      console.log(data);
      const themes = data.theme;
      setselectedApp(themes);

      console.log("theme is" + themes);
    } catch (err) {
      console.error(err);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchLanguage();
      fetchTheme();
    }, [])
  );

  return (
    <View
      style={
        selectedApp == 1
          ? { backgroundColor: "#333333", flex: 1 }
          : { backgroundColor: "white", flex: 1 }
      }
    >
      <View
        style={
          selectedApp == 1
            ? [{ backgroundColor: "black" }, globalStyles.header]
            : [{ backgroundColor: "rgba(10,76,118,1)" }, globalStyles.header]
        }
      >
        <Ionicons
          name="arrow-back"
          size={24}
          color="white"
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text style={[globalStyles.headerText, { textTransform: "uppercase" }]}>
          {selectedlang == 0 ? translation[90].English : translation[90].Urdu}{" "}
        </Text>
        <View style={{ width: 24 }}></View>
      </View>

      <FlatList
        data={complaints}
        renderItem={({ item }) => (
          <View
            style={[
              selectedApp == 1
                ? { backgroundColor: "grey" }
                : { backgroundColor: "rgba(24,154,180,1)" },
              styles.Complain_Container,
            ]}
            key={item._id}
          >
            <View style={styles.complaint_details}>
              <Text style={styles.Name_Text}>{item.name}</Text>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={[
                  styles.description_Text,
                  { width: responsiveWidth(67) },
                ]}
              >
                {item.description}
              </Text>

              <TouchableOpacity onPress={() => handleSingleComplaint(item._id)}>
                <AntDesign
                  name="right"
                  size={50}
                  color="black"
                  style={{
                    marginTop: responsiveHeight(-6),
                    marginLeft: responsiveWidth(74),
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item) => item._id}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={
            selectedApp == 1
              ? [{ backgroundColor: "#333333" }, styles.modalView]
              : [{ backgroundColor: "rgba(10,76,118,1)" }, styles.modalView]
          }
        >
          <Entypo
            name="cross"
            size={30}
            color="black"
            onPress={() => setModalVisible(!modalVisible)}
            style={{ left: 120, bottom: 15 }}
          />

          <Card
            mode="outlined"
            style={{
              borderRadius: responsiveWidth(7),
              width: responsiveWidth(80),
              height: responsiveHeight(60),
            }}
          >
            <Card.Title title="Citizen Complaint" />

            {images.length === 0 && (
              <Text
                style={{
                  top: 65,
                  width: 295,
                  height: 190,
                  textAlign: "center",
                }}
              >
                {/* There is no such relevent image! */}
                {selectedlang == 0
                  ? translation[136].English
                  : translation[136].Urdu}
              </Text>
            )}
            <FlatList
              data={images}
              keyExtractor={(item, index) => index.toString()}
              horizontal={true}
              renderItem={({ item }) => (
                <Card.Cover
                  source={{ uri: item }}
                  style={{
                    width: 295,
                    height: 190,
                  }}
                />
              )}
            />

            <Card.Content style={{ top: 20 }}>
              <Text
                style={{
                  fontFamily: "poppins-bold",
                  fontSize: responsiveFontSize(2),
                  textAlign: "center",
                }}
              >
                {/* Citizen Details */}
                {selectedlang == 0
                  ? translation[133].English
                  : translation[133].Urdu}
              </Text>
              <Text
                variant="titleLarge"
                style={{
                  fontFamily: "poppins-regular",
                  textAlign: "center",
                }}
              >
                {/* Name */}
                {selectedlang == 0
                  ? translation[132].English
                  : translation[132].Urdu}
                : {modalDetails.name}
              </Text>
              <Text
                variant="titleLarge"
                style={{
                  fontFamily: "poppins-regular",
                  textAlign: "center",
                }}
              >
                {/* Email */}
                {selectedlang == 0
                  ? translation[6].English
                  : translation[6].Urdu}
                : {modalDetails.email}
              </Text>
              <Text
                variant="titleLarge"
                style={{
                  fontFamily: "poppins-regular",
                  textAlign: "center",
                }}
              >
                {/* Officer Name */}
                {selectedlang == 0
                  ? translation[134].English
                  : translation[134].Urdu}
                : {modalDetails.officer_Name}
              </Text>
              <Text
                variant="bodyMedium"
                numberOfLines={showMore ? undefined : 2}
                onLayout={handleLayout}
                style={{
                  fontFamily: "poppins-regular",
                  textAlign: "center",
                }}
              >
                {/* Details */}
                {selectedlang == 0
                  ? translation[135].English
                  : translation[135].Urdu}
                : {modalDetails.description}
              </Text>
              {showButton && (
                <TouchableOpacity onPress={toggleShowMore}>
                  <Text
                    style={{ color: "rgba(24,154,180,1)", textAlign: "center" }}
                  >
                    {showMore ? "Show less" : "Read more"}
                  </Text>
                </TouchableOpacity>
              )}
            </Card.Content>
          </Card>
        </View>
      </Modal>
      {complaints.length === 0 && <NoComplaint_Box />}
    </View>
  );
}

const styles = StyleSheet.create({
  modalView: {
    margin: responsiveHeight(2.5),
    // backgroundColor: "white",
    top: 90,
    borderRadius: responsiveHeight(5),
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 50,
  },
  NoComplaint_Text: {
    color: "black",
    fontFamily: "poppins-bold",
    fontSize: responsiveFontSize(3.5),
    textAlign: "center",
    marginTop: responsiveHeight(30),
  },
  complaint_details: {
    marginTop: responsiveHeight(1),
  },
  Complain_Container: {
    flexDirection: "row",
    // backgroundColor: "rgba(24,154,180,1)",
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
});
