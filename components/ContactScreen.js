import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ContactScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* Back Arrow Icon */}
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        {/* Header Text */}
        <Text style={styles.headerText}>CONTACT US</Text>
        <View style={{ width: 24 }}></View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.boldText}>Reach out to us at:</Text>
        {/* Phone */}
        <View style={styles.contactInfo}>
          <Ionicons name="call" size={20} color="rgba(24,154,180,1)" />
          <Text style={styles.contactText}>051-256278-5</Text>
        </View>
        {/* Email */}
        <View style={styles.contactInfo}>
          <Ionicons name="mail" size={20} color="rgba(24,154,180,1)" />
          <Text style={styles.contactText}>Eparking@gmail.com</Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        {/* Logo */}
        <View style={styles.logo}>
          <Ionicons name="car" size={20} color="white" />
          <Text style={styles.appName}>E-parking Challan App</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    backgroundColor: "rgba(10,76,118,1)",
  },
  headerText: {
    fontSize: 18,
    fontFamily: "poppins-bold",
    color: "white",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  boldText: {
    fontSize: 20,
    fontFamily: "poppins-bold",
    marginBottom: 10,
  },
  contactInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  contactText: {
    marginLeft: 10,
    fontSize: 16,
    fontFamily: "poppins-regular",
  },
  footer: {
    height: 70,
    backgroundColor: "rgba(10,76,118,1)",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    height: 30,
    width: 140,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  appName: {
    fontSize: 12,
    fontFamily: "poppins-bold",
    color: "white",
  },
});

export default ContactScreen;
