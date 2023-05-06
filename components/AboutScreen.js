import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const AboutScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="arrow-back-outline" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>ABOUT</Text>
        <View style={{ width: 24 }} />
      </View>
      <View style={styles.box}>
        <View style={styles.logoContainer}>
          <Ionicons name="car-outline" size={64} color="white" />
          <Text style={styles.appName}>E-parking Challan App</Text>
          <Text style={styles.version}>Version 1.0.1</Text>
        </View>
        <Text style={styles.description}>
          E-parking is a light weight app that help the traffic warden to
          smoothly handle the challan process and can help the citizens to get
          and pay the challan without any hurdle
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(10,76,118,1)",
    height: 80,
    paddingHorizontal: 20,
  },
  headerText: {
    fontFamily: "poppins-bold",
    fontSize: 20,
    color: "white",
  },
  box: {
    width: "auto",
    height: "55%",
    backgroundColor: "rgba(10,76,118,1)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    marginVertical: 10,
    marginHorizontal: 15,
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  appName: {
    fontFamily: "poppins-bold",
    fontSize: 24,
    marginVertical: 10,
    color: "white",
  },
  version: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: "poppins-regular",
    color: "white",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "poppins-regular",
    color: "white",
  },
});

export default AboutScreen;
