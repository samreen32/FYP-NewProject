import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { globalStyles } from "../styles/globalStyles";

export default function WardenSetting({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={globalStyles.header}>
        <Ionicons
          name="arrow-back"
          size={24}
          color="white"
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text style={globalStyles.headerText}>SETTING</Text>
        <View style={{ width: 24 }}></View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Account */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="person" size={24} color="rgba(24,154,180,1)" />
            <Text style={styles.sectionHeaderText}>Account</Text>
          </View>
          <View style={styles.sectionBody}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("WardenEditProfile");
              }}
            >
              <Text style={styles.sectionItem}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Warden_ChangePassword");
              }}
            >
              <Text style={styles.sectionItem}>Change Password</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Places");
              }}
            >
              <Text style={styles.sectionItem}>Location</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* General */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="settings" size={24} color="rgba(24,154,180,1)" />
            <Text style={styles.sectionHeaderText}>General</Text>
          </View>
          <View style={styles.sectionBody}>
            <Text style={styles.sectionItem}>Appearance</Text>
            <Text style={styles.sectionItem}>Language</Text>
          </View>
        </View>

        {/* Support */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="help-circle" size={24} color="rgba(24,154,180,1)" />
            <Text style={styles.sectionHeaderText}>Support</Text>
          </View>
          <View style={styles.sectionBody}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("FAQScreen");
              }}
            >
              <Text style={styles.sectionItem}>FAQ's</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("AboutScreen");
              }}
            >
              <Text style={styles.sectionItem}>About</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("ContactScreen");
              }}
            >
              <Text style={styles.sectionItem}>Contact Us</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        {/* Logout */}
        <View style={styles.logout}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Warden_Logout");
            }}
          >
            <Ionicons name="log-out" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.logoutText}>LOGOUT</Text>
        </View>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionHeaderText: {
    fontFamily: "poppins-bold",
    fontSize: 18,
    marginLeft: 10,
  },
  sectionBody: {
    backgroundColor: "#F6F6F6",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sectionItem: {
    fontFamily: "poppins-regular",
    fontSize: 16,
    marginBottom: 10,
  },
  footer: {
    height: 50,
    backgroundColor: "rgba(10,76,118,1)",
    justifyContent: "center",
    alignItems: "center",
  },
  logout: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoutText: {
    fontFamily: "poppins-bold",
    fontSize: 16,
    color: "white",
    marginLeft: 10,
  },
});
