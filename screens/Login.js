import { React, useState } from 'react';
import { Text, View, Linking, TextInput, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { globalStyles } from '../styles/globalStyles';
import {
    responsiveFontSize, responsiveHeight, responsiveWidth
  } from "react-native-responsive-dimensions";



export default function Login({ navigation }) {

    const [name, setname] = useState('');

    return (
        <View>
            <View style={globalStyles.login_hello}>
                <Text style={globalStyles.login_hello}>Hello Again!</Text>
            </View>

            <View style={[globalStyles.login_welcome_back, { marginTop: responsiveHeight(20.5) }]}>
                <Text style={[globalStyles.login_welcome_back, { marginLeft: responsiveWidth(6) }]}>    Welcome back{'\n'}you've been missed</Text>
            </View>

            <View style={[globalStyles.bottomGroup, { width: responsiveWidth(33), marginTop: responsiveHeight(0), marginLeft: responsiveWidth(0) }]}>
            <TextInput style={globalStyles.textInput} onChangeText={(value) => setname(value)}
                placeholder="    Enter username" keyboardType="alphabet" editable maxLength={20} />

            <TextInput style={[globalStyles.textInput, { marginTop: responsiveHeight(44) }]}
                onChangeText={(value) => setname(value)} placeholder="    Password" keyboardType="alphabet" editable maxLength={20} />
            </View>

            <TouchableOpacity >
                <Text style={globalStyles.Recovery_Password}>Recovery Password</Text>
            </TouchableOpacity>

            <TouchableOpacity style={globalStyles.login_SignIn}
                onPress={() => { navigation.navigate("AdminDrawer") }}
            >
                <Text style={globalStyles.Sign_in_Text} >Sign In</Text>
            </TouchableOpacity>

            <TouchableOpacity>
                <Text style={globalStyles.login_or_continue}>Or continue with</Text>
            </TouchableOpacity>

            <View style={{ flexDirection: "row" }}>

                <Ionicons style={globalStyles.style_google_icon} name={"logo-google"} size={40} color={"rgba(10,76,118,1)"}
                    onPress={() => { Linking.openURL('http://www.google.com') }} />


                <Ionicons style={globalStyles.style_apple_icon} name={"logo-apple"} size={40} color={"rgba(10,76,118,1)"}
                    onPress={() => { Linking.openURL('http://www.google.com') }} />

                <Ionicons style={globalStyles.style_facebook_icon} name={"logo-facebook"} size={40} color={"rgba(10,76,118,1)"}
                    onPress={() => { Linking.openURL('http://www.google.com') }} />

            </View>

            <Text style={globalStyles.style_Not_A_Member}>Not a member?</Text>
            <Text style={globalStyles.style_register} onPress={() => { navigation.navigate('Register') }}>Register</Text>


        </View>
    );
}