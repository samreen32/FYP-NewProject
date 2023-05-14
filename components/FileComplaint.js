import { React, useEffect, useRef, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
  ScrollView,
} from "react-native";
import { Card, Paragraph, TextInput } from "react-native-paper";
import { Ionicons, Entypo } from "@expo/vector-icons";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { globalStyles } from "../styles/globalStyles";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Progress from "../Loader/Progress";
import axios from "axios";
import { StackActions } from "@react-navigation/native";
import * as Notifications from "expo-notifications";
import { userLogin } from "../context/AuthContext";
import {
  COMPLAINT_API_URL,
  NOTIFI_API_URL,
} from "../Custom_Api_Calls/api_calls";

//Default Notification settings
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function FileComplaint({ navigation }) {
  let number_id = 0;
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    officer_Name: "",
    description: "",
  });
  const { name, email, officer_Name, description } = credentials;
  const [images, setImages] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const animation = useRef(new Animated.Value(0)).current;
  const scrollView = useRef();
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const {
    setBadgeValue,
    error,
    setError,
    showToast,
    isValidEmail,
    updateError,
  } = userLogin();

  /***************Function to open image browser for selction*************/
  const pickMultipleImages = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need media library permissions to make this work!");
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const selectedImages = result.assets.map((asset) => {
        return {
          uri: asset.uri,
          name: asset.fileName || "untitled.jpg",
          type: asset.type || "image/jpeg",
        };
      });
      setImages([...images, ...selectedImages]);
    }
  };

  /*************** Function to file complaints ********************/
  const handleFileComplaint = async () => {
    if (name == "") {
      return updateError("Enter your Name!", setError);
    }
    if (name.length < 3) {
      return updateError("Name must be 3 character long!", setError);
    }
    if (email == "") {
      return updateError("Enter your Email!", setError);
    }
    if (!isValidEmail(email)) {
      return updateError("Enter a valid emai!", setError);
    }
    if (description.length < 5) {
      return updateError("Description must be 5 character long!", setError);
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("officer_Name", officer_Name);
    formData.append("description", description);
    formData.append("any_image", images);
    images.forEach((img) => {
      formData.append("any_image", img);
    });

    const DEMO_TOKEN = await AsyncStorage.getItem("token");
    try {
      if (DEMO_TOKEN != null) {
        console.log("tokenresponse", DEMO_TOKEN);
        const response = await axios.post(
          `${COMPLAINT_API_URL}/filecomplaint`,
          formData,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "multipart/form-data",
              "auth-token": DEMO_TOKEN,
            },
            onUploadProgress: ({ loaded, total }) =>
              setUploadProgress(loaded / total),
          }
        );
        if (response.data.success) {
          navigation.dispatch(StackActions.replace("CitizenDrawer"));
          addNotification();
          setUploadProgress(0);
        }
      }
    } catch (error) {
      showToast("Error occur", error.message);
    }
  };

  /************* Schedule Notification Method *************/
  const addNotification = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token != null) {
        await fetch(`${NOTIFI_API_URL}/schedule_notification`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
          body: JSON.stringify({
            title: "New Notification",
            body: "You have Filled a Complaint",
          }),
        });

        // Retrieve the updated badge value from the server
        const response = await fetch(`${NOTIFI_API_URL}/badge_value`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        });
        const { badgeValue } = await response.json();

        // Use the Notifications module to schedule the notification
        const { status } = await Notifications.requestPermissionsAsync();
        const time = new Date().toLocaleString();
        if (status === "granted") {
          const schedulingOptions = {
            content: {
              title: "New Notification",
              body: "You have Filled a Complaint",
              data: { time },
              read: false,
              badge: badgeValue,
            },
            trigger: { seconds: 1 },
          };
          await Notifications.scheduleNotificationAsync(schedulingOptions);
          setBadgeValue(badgeValue);
        }
      }
    } catch (error) {
      showToast(error.message);
    }
  };

  /************* Adding permissions for notifications *************/
  useEffect(() => {
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });
    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const onChange = (value, fieldName) => {
    setCredentials({ ...credentials, [fieldName]: value });
  };

  return (
    <>
      <ScrollView>
        <View style={styles.purple_background}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Text style={styles.File_Complaint_Text}>File Complaint</Text>
            <Ionicons
              name="caret-back-sharp"
              size={40}
              color="white"
              style={styles.backArrow}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.icon_border}>
          <Ionicons name={"chatbubbles"} size={100} color={"white"} />
        </View>

        <View
          style={{
            marginTop: responsiveHeight(4),
            paddingHorizontal: 20,
            width: Dimensions.get("window").width,
          }}
        >
          {error ? (
            <Text
              style={{
                color: "red",
                fontSize: responsiveFontSize(2.5),
                textAlign: "center",
                marginTop: responsiveHeight(-2),
              }}
            >
              {error}
            </Text>
          ) : null}

          <TextInput
            style={globalStyles.textInput_register}
            onChangeText={(value) => onChange(value, "name")}
            value={name}
            label="Name"
            mode="outlined"
            activeOutlineColor="rgba(10,76,118,1)"
            outlineColor="rgba(24,154,180,1)"
            keyboardType="alphabet"
            editable
            autoCapitalize="none"
          />

          <TextInput
            style={[
              globalStyles.textInput_register,
              { marginTop: responsiveHeight(1) },
            ]}
            value={email}
            onChangeText={(value) => onChange(value, "email")}
            label="Email"
            mode="outlined"
            activeOutlineColor="rgba(10,76,118,1)"
            outlineColor="rgba(24,154,180,1)"
            keyboardType="alphabet"
            editable
            autoCapitalize="none"
          />

          <TextInput
            style={[
              globalStyles.textInput_register,
              { marginTop: responsiveHeight(1) },
            ]}
            onChangeText={(value) => onChange(value, "description")}
            value={description}
            label="Description"
            mode="outlined"
            activeOutlineColor="rgba(10,76,118,1)"
            outlineColor="rgba(24,154,180,1)"
            keyboardType="alphabet"
            editable
            autoCapitalize="none"
          />

          <TextInput
            style={[
              globalStyles.textInput_register,
              { marginTop: responsiveHeight(1) },
            ]}
            onChangeText={(value) => onChange(value, "officer_Name")}
            value={officer_Name}
            label="Officer Name(optional)"
            mode="outlined"
            activeOutlineColor="rgba(10,76,118,1)"
            outlineColor="rgba(24,154,180,1)"
            keyboardType="alphabet"
            editable
            autoCapitalize="none"
          />

          <View style={[globalStyles.camera]}>
            {images.length === 0 ? (
              <TouchableOpacity
                style={[
                  globalStyles.cameraButtns,
                  { width: responsiveWidth(86) },
                ]}
                onPress={pickMultipleImages}
              >
                <Text
                  style={[globalStyles.submitChallan_Text, { color: "white" }]}
                >
                  Add Image{"                                     "}
                  <Entypo name="folder-images" size={24} color="white" />
                </Text>
              </TouchableOpacity>
            ) : (
              <>
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
                  {images.map((item, index) => (
                    <Card key={index} style={styles.cardContainer}>
                      <Card.Content>
                        <Paragraph>Image {(number_id += 1)}</Paragraph>
                      </Card.Content>
                      <Card.Cover source={{ uri: item.uri }} />
                    </Card>
                  ))}
                </ScrollView>
              </>
            )}
          </View>

          <TouchableOpacity
            style={styles.submit_btn}
            onPress={handleFileComplaint}
          >
            <Text style={styles.submit_text}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {uploadProgress ? <Progress /> : null}
    </>
  );
}

const styles = StyleSheet.create({
  imagePickerContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "white",
    zIndex: 9,
  },
  cardContainer: {
    width: 320,
    marginTop: responsiveHeight(3),
    backgroundColor: "rgba(217,217,217,1)",
  },
  style_Rectangle4: {
    marginLeft: responsiveWidth(8),
    marginTop: responsiveHeight(3),
    position: "absolute",
    width: responsiveWidth(87),
    height: responsiveHeight(10),
    opacity: 1,
    color: "grey",
    backgroundColor: "rgba(217,217,217,1)",
    borderRadius: responsiveWidth(6),
  },
  style_Rectangle6: {
    marginLeft: responsiveWidth(8),
    marginTop: responsiveHeight(25),
    position: "absolute",
    width: responsiveWidth(87),
    height: responsiveHeight(10),
    opacity: 1,
    color: "grey",

    backgroundColor: "rgba(217,217,217,1)",
    borderRadius: responsiveWidth(6),
  },
  style_Rectangle7: {
    marginLeft: responsiveWidth(8),
    marginTop: responsiveHeight(36),
    position: "absolute",
    width: responsiveWidth(87),
    height: responsiveHeight(10),
    opacity: 1,
    color: "grey",

    backgroundColor: "rgba(217,217,217,1)",
    borderRadius: responsiveWidth(6),
  },
  style_Rectangle5: {
    marginLeft: responsiveWidth(8),
    marginTop: responsiveHeight(14),
    position: "absolute",
    width: responsiveWidth(87),
    height: responsiveHeight(10),
    opacity: 1,
    color: "grey",
    background: "#D9D9D9",
    backgroundColor: "rgba(217,217,217,1)",
    borderRadius: responsiveWidth(6),
  },
  icon_border: {
    marginTop: responsiveHeight(-16),
    marginLeft: responsiveWidth(36),
  },
  purple_background: {
    backgroundColor: "rgba(10,76,118,1)",
    width: responsiveWidth(100),
    height: responsiveHeight(30),
  },
  File_Complaint_Text: {
    color: "white",
    textAlign: "center",
    marginTop: responsiveHeight(6),
    marginLeft: responsiveWidth(5),
    fontSize: responsiveFontSize(3.5),
    letterSpacing: 1.0,
    fontFamily: "poppins-bold",
    lineheight: 114.99999761581421,
  },

  submit_btn: {
    backgroundColor: "rgba(24,154,180,1)",
    alignItems: "center",
    textAlign: "center",
    width: responsiveWidth(30),
    height: responsiveHeight(7),
    margin: "auto",
    marginTop: responsiveHeight(1.5),
    borderRadius: responsiveWidth(3),
    marginLeft: responsiveWidth(29),
  },
  submit_text: {
    fontSize: responsiveFontSize(2.5),
    color: "white",
    justifyContent: "center",
    textAlign: "center",
    letterSpacing: 1.0,
    fontFamily: "poppins-bold",
    paddingTop: responsiveHeight(1.6),
  },
  backArrow: {
    marginLeft: responsiveWidth(5),
    marginTop: responsiveHeight(-6.4),
  },
});
