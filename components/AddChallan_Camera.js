import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { Camera } from "expo-camera";
import { useNavigation } from "@react-navigation/native";

export default function AddChallan_Camera({ route }) {
  let navigation = useNavigation();
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [cameraImage, setCameraImage] = useState(null);

  /************** Camera Permissions ************/
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === "granted");
    })();
  }, []);

  if (hasCameraPermission === null) {
    return <View />;
  }

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  /************** Take picture function ************/
  const takePicture = async () => {
    if (camera) {
      const options = { quality: 1, base64: true };
      const { uri } = await camera.takePictureAsync(options);
      setCameraImage({ uri: uri });
    }
  };

  /************** Move image to AddChallan screen ************/
  const handlePicture = () => {
    navigation.navigate("AddChallan", {
      cameraImage,
    });
  };

  if (cameraImage) {
    return (
      <View style={globalStyles.camera}>
        <Image
          style={{ alignSelf: "stretch", flex: 1 }}
          source={{ uri: cameraImage.uri }}
        />
        <TouchableOpacity
          style={[globalStyles.cameraButtns, { width: responsiveWidth(95) }]}
          onPress={handlePicture}
        >
          <Text style={globalStyles.submitChallan_Text}>Upload Image</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[globalStyles.cameraButtns, { width: responsiveWidth(95) }]}
          onPress={() => setCameraImage(undefined)}
        >
          <Text style={globalStyles.submitChallan_Text}>Discard Picture</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <Camera style={globalStyles.camera} ref={setCamera}>
      <View style={[globalStyles.camera, { marginTop: responsiveHeight(88) }]}>
        <TouchableOpacity
          style={[globalStyles.cameraButtns, { width: responsiveWidth(95) }]}
          onPress={takePicture}
        >
          <Text style={globalStyles.submitChallan_Text}>Take Picture</Text>
        </TouchableOpacity>
      </View>
    </Camera>
  );
}
