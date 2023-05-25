import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { translation } from "../components/translation";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LANG_API_URL, THEME_API_URL } from "../Custom_Api_Calls/api_calls";

const FAQScreen_Warden = () => {
  const windowWidth = Dimensions.get("window").width;
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const [selectedlang, setselectedlang] = useState(0);
  const [selectedApp, setselectedApp] = useState(0);

  const handleQuestionClick = (index) => {
    if (expandedQuestion === index) {
      setExpandedQuestion(null);
    } else {
      setExpandedQuestion(index);
    }
  };

   /********** Method to fetch warden Language **********/
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

  /********** Method to fetch warden Theme **********/
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

  const faqData = [
    {
      question:
        selectedlang == 0 ? translation[137].English : translation[137].Urdu,
      answer:
        selectedlang == 0 ? translation[141].English : translation[141].Urdu,
    },
    {
      question:
        selectedlang == 0 ? translation[138].English : translation[138].Urdu,
      answer:
        selectedlang == 0 ? translation[142].English : translation[142].Urdu,
    },
    {
      question:
        selectedlang == 0 ? translation[139].English : translation[139].Urdu,
      answer:
        selectedlang == 0 ? translation[143].English : translation[143].Urdu,
    },
    {
      question:
        selectedlang == 0 ? translation[140].English : translation[140].Urdu,
      answer:
        selectedlang == 0 ? translation[144].English : translation[144].Urdu,
    },
    // Add more FAQ items here
  ];
  return (
    <View
      style={
        selectedApp == 1
          ? [{ backgroundColor: "#333333" }, styles.container]
          : [{ backgroundColor: "#fff" }, styles.container]
      }
    >
      <View
        style={
          selectedApp == 1
            ? [{ backgroundColor: "black" }, styles.header]
            : [{ backgroundColor: "rgba(10,76,118,1)" }, styles.header]
        }
      >
        <TouchableOpacity onPress={() => {}}>
          <Ionicons name="arrow-back-outline" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>
          {" "}
          {selectedlang == 0
            ? translation[47].English
            : translation[47].Urdu}{" "}
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={{ marginHorizontal: 20 }}>
        {faqData.map((faq, index) => (
          <View
            key={index}
            style={[styles.boxContainer, { width: windowWidth - 40 }]}
          >
            <TouchableOpacity
              style={
                selectedApp == 1
                  ? [{ backgroundColor: "grey" }, styles.box]
                  : [{ backgroundColor: "rgba(24,154,180,1)" }, styles.box]
              }
              onPress={() => handleQuestionClick(index)}
            >
              <Text style={styles.boxText}>{faq.question}</Text>
            </TouchableOpacity>
            {expandedQuestion === index && (
              <View
                style={
                  selectedApp == 1
                    ? [{ backgroundColor: "white" }, styles.answerBox]
                    : [{ backgroundColor: "#BDDAEC" }, styles.answerBox]
                }
              >
                <Text style={styles.answerText}>{faq.answer}</Text>
              </View>
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 80,
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  boxContainer: {
    marginTop: 20,
  },
  box: {
    width: "100%",
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    marginVertical: 3,
  },
  boxText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  answerBox: {
    width: "100%",
    // backgroundColor: '#FCE4FF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopWidth: 1,
    borderColor: "#ccc",
  },
  answerText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default FAQScreen_Warden;
