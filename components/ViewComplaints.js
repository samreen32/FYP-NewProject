import { React, useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  Animated,
  FlatList,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import { Entypo, Ionicons } from "@expo/vector-icons";

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { COMPLAINT_API_URL } from "../Custom_Api_Calls/api_calls";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Card, Paragraph } from "react-native-paper";
import { globalStyles } from "../styles/globalStyles";
import NoComplaint_Box from "../Loader/NoComplaint_Box";

export default function ViewComplaints({ navigation }) {
  const [complaints, setComplaints] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalDetails, setModalDetails] = useState([]);
  const [images, setImages] = useState([]);
  const animation = useRef(new Animated.Value(0)).current;
  const scrollView = useRef();
  let number_id = 0;

  /************** View all the Complaint Function ****************/
  const viewComplaints = async () => {
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
      viewComplaints();
    } else {
      redirect("/AdminLogin");
    }
    // eslint-disable-next-line
  }, []);

  /************** View Details of Single Complaint Function ****************/
  const viewSingleComplaint = (id) => {
    fetch(`${COMPLAINT_API_URL}/handleSingleComplaint/${id}`)
      .then((response) => response.json())
      .then((res) => {
        setModalDetails(res);
        setImages(res.any_image);
      });
    setModalVisible(true);
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
        <Text style={globalStyles.headerText}>COMPLAINTS</Text>
        <View style={{ width: 24 }}></View>
      </View>

      <FlatList
        data={complaints}
        renderItem={({ item }) => (
          <View style={styles.Complain_Container}>
            <TouchableOpacity onPress={() => viewSingleComplaint(item._id)}>
              <View style={styles.Image} resizeMode="contain">
                <Text style={styles.imageText}>View Image</Text>
              </View>
            </TouchableOpacity>

            <View>
              <Text style={styles.Name_Text}>{item.name}</Text>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={[
                  styles.description_Text,
                  { width: responsiveWidth(60) },
                ]}
              >
                {item.description}
              </Text>
            </View>
          </View>
        )}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Entypo
              name="cross"
              size={30}
              color="black"
              onPress={() => setModalVisible(!modalVisible)}
              style={{ marginLeft: responsiveWidth(60), bottom: 10 }}
            />
            {/* Display selected Images */}
            <ScrollView
              ref={scrollView}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              scrollEventThrottle={16}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: animation } } }],
                { useNativeDriver: false }
              )}
            >
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
              {images.map((item, index) => (
                <Card key={index} style={styles.cardContainer}>
                  <Card.Content>
                    <Paragraph>Image {(number_id += 1)}</Paragraph>
                    <Card.Cover source={{ uri: item }} />
                  </Card.Content>
                </Card>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
      {complaints.length === 0 && <NoComplaint_Box />}
    </>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: responsiveWidth(70),
    height: responsiveHeight(35),
    marginTop: responsiveHeight(-1),
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modalView: {
    margin: responsiveHeight(2.5),
    backgroundColor: "white",
    borderRadius: responsiveHeight(5),
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    height: responsiveHeight(50),
    shadowOpacity: 0.25,
    shadowRadius: 7,
    elevation: 100,
  },
  Complain_Container: {
    flexDirection: "row",
    backgroundColor: "rgba(24,154,180,1)",
    height: responsiveHeight(15),
    marginLeft: responsiveWidth(5),
    marginTop: responsiveHeight(3),
    marginRight: responsiveWidth(5),
    marginVertical: responsiveHeight(-1),
    borderRadius: 15,
  },
  Image: {
    width: responsiveWidth(17),
    height: responsiveHeight(10),
    marginLeft: responsiveWidth(3),
    marginTop: responsiveHeight(2.5),
    borderRadius: responsiveWidth(7),
    borderColor: "black",
    borderWidth: 2,
  },
  imageText: {
    marginTop: responsiveHeight(2),
    color: "white",
    fontFamily: "poppins-regular",
    textAlign: "center",
  },
  Name_Text: {
    color: "#000000",
    fontFamily: "poppins-bold",
    fontSize: responsiveFontSize(2.3),
    marginLeft: responsiveWidth(5),
    marginTop: responsiveHeight(0.5),
    paddingTop: responsiveHeight(2),
  },
  description_Text: {
    width: responsiveWidth(65.3),
    height: responsiveHeight(20),
    marginLeft: responsiveWidth(5),
    marginTop: responsiveHeight(-1),
    color: "#FFFFFF",
    fontFamily: "poppins-regular",
  },
});
