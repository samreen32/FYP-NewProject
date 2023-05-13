import { React, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
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
import { COMPLAINT_API_URL } from "../Custom_Api_Calls/api_calls";

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

  return (
    <>
      <View style={globalStyles.header}>
        <Ionicons
          name="arrow-back"
          size={24}
          color="white"
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text style={globalStyles.headerText}>HANDLE COMPLAINTS</Text>
        <View style={{ width: 24 }}></View>
      </View>

      <FlatList
        data={complaints}
        renderItem={({ item }) => (
          <View style={styles.Complain_Container} key={item._id}>
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
        <View style={styles.modalView}>
          <Card
            mode="outlined"
            style={{
              borderRadius: responsiveWidth(7),
              width: responsiveWidth(80),
              height: responsiveHeight(80),
            }}
          >
            <Card.Title title="Handle Complaint" subtitle="Citizen Complaint" />

            {images.length === 0 && (
              <Text
                style={{
                  textAlign: "center",
                  marginTop: responsiveHeight(15),
                }}
              >
                There is not such relevent image!
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
                    width: responsiveWidth(80),
                    height: responsiveHeight(37),
                  }}
                />
              )}
            />

            <Card.Content style={{ marginBottom: responsiveHeight(4.5) }}>
              <Text
                style={{
                  fontFamily: "poppins-bold",
                  fontSize: responsiveFontSize(2),
                  textAlign: "center",
                }}
              >
                Citizen Details
              </Text>
              <Text
                variant="titleLarge"
                style={{
                  fontFamily: "poppins-regular",
                  textAlign: "center",
                }}
              >
                Name: {modalDetails.name}
              </Text>
              <Text
                variant="titleLarge"
                style={{
                  fontFamily: "poppins-regular",
                  textAlign: "center",
                }}
              >
                Email: {modalDetails.email}
              </Text>
              <Text
                variant="titleLarge"
                style={{
                  fontFamily: "poppins-regular",
                  textAlign: "center",
                }}
              >
                Officer Name: {modalDetails.officer_Name}
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
                Details: {modalDetails.description}
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
            <Card.Actions
              style={{
                marginBottom: responsiveHeight(5),
                marginLeft: responsiveWidth(17),
              }}
            >
              <TouchableOpacity
                style={[
                  // globalStyles.Register_btn,
                  {
                    backgroundColor: "rgba(10,76,118,1)",
                    width: responsiveWidth(35),
                    height: responsiveHeight(6),
                    borderRadius: responsiveWidth(12),
                    marginRight: responsiveWidth(20),
                    marginTop: responsiveHeight(20),
                  },
                ]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text
                  style={[
                    globalStyles.Register_Text,
                    {
                      marginTop: responsiveHeight(1),
                      marginLeft: responsiveWidth(10),
                    },
                  ]}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
            </Card.Actions>
          </Card>
        </View>
      </Modal>
      {complaints.length === 0 && <NoComplaint_Box />}
    </>
  );
}

const styles = StyleSheet.create({
  modalView: {
    margin: responsiveHeight(2.5),
    backgroundColor: "white",
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
});
