import React from "react";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
// import Warden from "./routes/WardenDrawer";
import MainStack from "./routes/MainStack";
// import "react-native-reanimated";

// global.__reanimatedWorkletInit = () => {};

export default function App() {
  const [fontsLoaded] = useFonts({
    "poppins-regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "poppins-bold": require("./assets/fonts/Poppins-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return MainStack();
  }
}
