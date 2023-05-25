import { React, useState, useEffect, useCallback } from "react";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Pressable,
} from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyModal from "./GuidelineModal";
import { userLogin } from "../context/AuthContext";
import { globalStyles } from "../styles/globalStyles";
import { useFocusEffect } from "@react-navigation/native";
import { translation } from "./translation";
import { LANG_API_URL, THEME_API_URL } from "../Custom_Api_Calls/api_calls";

export default function Guidelines_Warden({ navigation }) {
  const [selectedlang, setselectedlang] = useState(0);
  const [selectedApp, setselectedApp] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [RuleNo, setRuleNo] = useState("");
  const [Ruledesc, setRuledisc] = useState("");
  const [DATA, setData] = useState([{ id: "", title: "", description: "" }]);
  const route = useRoute();
  const screenPath = route.name;
  const showPlusIcon = ["Add Guidelines"].includes(screenPath);
  const { showToast } = userLogin();

  useEffect(() => {
    async function getData() {
      try {
        const storedItems = await AsyncStorage.getItem("items");
        if (storedItems !== null) {
          setData(JSON.parse(storedItems));
        }
      } catch (e) {
        console.error(e);
      }
    }
    getData();
  }, []);

  const saveData = async (newItems) => {
    try {
      await AsyncStorage.setItem("items", JSON.stringify(newItems));
      setData(newItems);
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddItem = () => {
    const newItems = [
      ...DATA,
      { id: Math.random().toString(), title: RuleNo, description: Ruledesc },
    ];
    saveData(newItems);
    showToast("New Guideline has been added.");
  };

  const handleDeleteItem = (id) => {
    const index = DATA.findIndex((item) => item.id === id);
    const newData = [...DATA.slice(0, index), ...DATA.slice(index + 1)];
    setData(newData);
    AsyncStorage.setItem("items", JSON.stringify(newData));
    AsyncStorage.removeItem(id);
    showToast("Guideline has been Deleted.");
  };

  /********** Method to fetch Warden Language **********/
  const fetchLanguage = async () => {
    try {
      const authToken = await AsyncStorage.getItem("token");
      const response = await fetch(`${LANG_API_URL}/warden_languageId`, {
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

  /********** Method to fetch Warden Theme **********/
  const fetchTheme = async () => {
    try {
      const authToken = await AsyncStorage.getItem("token");
      const response = await fetch(`${THEME_API_URL}/warden_themeId`, {
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
          ? { backgroundColor: "#333333" }
          : { backgroundColor: "white" }
      }
    >
      <View
        style={
          selectedApp == 1
            ? [{ backgroundColor: "black" }, globalStyles.header]
            : [{ backgroundColor: "rgba(10,76,118,1)" }, globalStyles.header]
        }
      >
        <TouchableOpacity>
          <Ionicons
            name="arrow-back"
            size={24}
            color="white"
            onPress={() => {
              navigation.goBack();
            }}
            style={styles.backArrow}
          />
          <Text
            style={
              selectedlang == 1
                ? [{ textAlign: "left", left: 150 }, globalStyles.headerText]
                : [
                    globalStyles.headerText,
                    { left: 118, textTransform: "uppercase" },
                  ]
            }
          >
            {selectedlang == 0 ? translation[18].English : translation[18].Urdu}
          </Text>
          <View style={{ width: 24 }}></View>

          <Pressable onPressIn={() => setModalVisible(true)}>
            {showPlusIcon ? (
              <Ionicons
                name="ios-add"
                size={45}
                color="white"
                style={styles.plus_icon}
              />
            ) : null}
          </Pressable>
        </TouchableOpacity>
      </View>

      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <View
            style={
              selectedApp == 1
                ? [{ backgroundColor: "grey" }, styles.Rule_Container]
                : [
                    { backgroundColor: "rgba(24,154,180,1)" },
                    styles.Rule_Container,
                  ]
            }
          >
            <View>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.Rule_no_Text}>{item.title}</Text>
                <TouchableOpacity
                  style={{
                    marginLeft: responsiveWidth(55),
                    marginTop: responsiveHeight(4),
                  }}
                  onPress={() => handleDeleteItem(item.id)}
                >
                  {showPlusIcon ? (
                    <MaterialIcons name="delete" size={24} color="black" />
                  ) : null}
                </TouchableOpacity>
              </View>
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
            </View>
          </View>
        )}
      />

      <MyModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        RuleNo={RuleNo}
        setRuleNo={setRuleNo}
        Ruledesc={Ruledesc}
        setRuledisc={setRuledisc}
        onClose={() => setModalVisible(false)}
        onAddItem={handleAddItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  Rule_Container: {
    height: responsiveHeight(12),
    marginLeft: responsiveWidth(7),
    marginTop: responsiveHeight(3),
    marginRight: responsiveWidth(7),
    marginVertical: responsiveHeight(-1),
    borderRadius: 15,
    flexDirection: "row",
  },
  Rule_no_Text: {
    color: "#000000",
    fontFamily: "poppins-bold",
    fontSize: responsiveFontSize(2.3),
    marginLeft: responsiveWidth(5),
    marginTop: responsiveHeight(0.5),
    paddingTop: responsiveHeight(2),
  },
  description_Text: {
    fontFamily: "poppins-regular",
    marginLeft: responsiveWidth(5),
    marginTop: responsiveHeight(-1),
    color: "#FFFFFF",
  },
  backArrow: {
    left: 10,
    top: 20,
  },
  plus_icon: {
    marginLeft: responsiveWidth(80),
    marginTop: responsiveHeight(-5),
  },
});
