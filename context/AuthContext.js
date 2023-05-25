import React, { createContext, useContext, useState } from "react";
import { useEffect } from "react";
import { Alert, Platform, ToastAndroid } from "react-native";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [greeting, setGreeting] = useState("");
  const [isLoading, setIsLoading] = useState(false); //loading state
  const [isLogIn, setIsLogIn] = useState(false); //logged in state
  const [isPassSecure, setIsPassSecure] = useState(true);
  const [error, setError] = useState("");
  const [profile, setProfile] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [badgeValue, setBadgeValue] = useState(0);
  const [addressText, setAddressText] = useState("Your Location..");

  /********** Function to fetch greetings according to timezone and date ***********/
  useEffect(() => {
    const date = new Date();
    const hours = date.getHours();

    if (hours >= 0 && hours < 12) {
      setGreeting("Good Morning");
    } else if (hours >= 12 && hours < 18) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  }, []);

  /***** Validation methods ******/
  const isValidEmail = (value) => {
    const regx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regx.test(value);
  };

  const isValidPhone = (value) => {
    const regx = /^(?:\+92|0)3\d{2}(?:-)?\d{7}$/;
    return regx.test(value);
  };

  const isValidObjField = (obj) => {
    return Object.values(obj).every((value) => value.trim());
  };
  const updateError = (error, stateUpdater) => {
    stateUpdater(error);
    setTimeout(() => {
      stateUpdater("");
    }, 2500);
  };

  /***** Showing Toast/Alert ******/
  const showToast = (message) => {
    if (Platform.OS === "android") {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      Alert.alert(message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        greeting,
        isValidEmail,
        isValidPhone,
        isValidObjField,
        updateError,
        isPassSecure,
        setIsPassSecure,
        error,
        setError,
        showToast,
        isLogIn,
        setIsLogIn,
        profile,
        setProfile,
        isLoading,
        setIsLoading,
        notifications,
        setNotifications,
        badgeValue,
        setBadgeValue,
        addressText,
        setAddressText,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const userLogin = () => useContext(AuthContext);

export default AuthProvider;
