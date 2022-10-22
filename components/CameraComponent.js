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
        
        let savePhoto = () => {
            MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
                setPhoto(undefined);
            });
        };

        return (
        <SafeAreaView style={globalStyles.camera}>
            <Image style={{ alignSelf: 'stretch', flex: 1}} 
                source={{ uri: "data:image/jpg;base64," + photo.base64 }} 
            />
            <Button title="Share" onPress={sharePic} />
            {hasMediaLibraryPermission ? <Button title="Save" onPress={savePhoto} /> : undefined}
            <Button title="Discard" onPress={() => setPhoto(undefined)} />
        </SafeAreaView>
        );
    }

    return (
        <Camera style={globalStyles.camera} ref={cameraRef}>
            <View style={globalStyles.camera}>
                <Button title='Take Picture' onPress={takePicture} />
            </View>
        </Camera>
    );
}