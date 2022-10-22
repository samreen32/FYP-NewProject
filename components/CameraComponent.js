import React, { useState, useRef, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity, Button, Image, SafeAreaView } from 'react-native';
import { globalStyles } from "../styles/globalStyles";
import {
    responsiveFontSize, responsiveHeight, responsiveWidth
} from "react-native-responsive-dimensions";
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { shareAsync } from 'expo-sharing';


export default function CameraComponent({ navigation }) {
    const cameraRef = useRef();
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
    const [photo, setPhoto] = useState();


    useEffect(() => {
        (async () => {
            const CameraPermission = await Camera.requestCameraPermissionsAsync();
            const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
            setHasCameraPermission(CameraPermission.status === 'granted');
            setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
        })();
    }, []);


    if (hasCameraPermission === undefined) {
        return (
            <Text>Requesting Permission....</Text>
        )
    } else if (!hasCameraPermission) {
        return (
            <Text>Permission for camera not granted. Please change this in settings</Text>
        )
    }


    //Take picture method
    const takePicture = async () => {
        let options = {
            quality: 1,
            base64: true,
            exif: false,
        };
        let newPhoto = await cameraRef.current.takePictureAsync(options);
        setPhoto(newPhoto);
    };

    if (photo) {
        let sharePic = () => {
            shareAsync(photo.uri).then(() => {
                setPhoto(undefined);
            });
        };

        //this method will call in save picture touchableoecity for now it doesnot needed.
        let savePhoto = () => {
            MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
                setPhoto(undefined);
            });
        };

        return (
            <View style={globalStyles.camera}>
                <Image style={{ alignSelf: 'stretch', flex: 1 }}
                    source={{ uri: "data:image/jpg;base64," + photo.base64 }}
                />

                <TouchableOpacity style={[globalStyles.cameraButtns, {}]}
                    onPress={sharePic}
                >
                    <Text style={globalStyles.submitChallan_Text}>Share Picture</Text>
                </TouchableOpacity>


                {hasMediaLibraryPermission ?
                    <TouchableOpacity style={[globalStyles.cameraButtns, {}]}
                        onPress={() => { navigation.navigate("Challan") }}
                    >
                        <Text style={globalStyles.submitChallan_Text}>Save Picture</Text>
                    </TouchableOpacity>
                    : undefined}


                <TouchableOpacity style={[globalStyles.cameraButtns, { width: responsiveWidth(95) }]}
                    onPress={() => setPhoto(undefined)}
                >
                    <Text style={globalStyles.submitChallan_Text}>Discard Picture</Text>
                </TouchableOpacity>

            </View>
        );
    }

    return (
        <Camera style={globalStyles.camera} ref={cameraRef}>

            <View style={[globalStyles.camera, { marginTop: responsiveHeight(65) }]}>
                <TouchableOpacity style={[globalStyles.cameraButtns, { width: responsiveWidth(95) }]}
                    onPress={takePicture}
                >
                    <Text style={globalStyles.submitChallan_Text}>Take Picture</Text>
                </TouchableOpacity>
            </View>

        </Camera>
    );
}