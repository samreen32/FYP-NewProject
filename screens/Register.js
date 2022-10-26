import { React, useState } from 'react';
import { Text, View, Linking, TextInput, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { globalStyles } from '../styles/globalStyles';
import {
    responsiveFontSize, responsiveHeight, responsiveWidth
  } from "react-native-responsive-dimensions";


export default function Register({ navigation }) {
    const [name, setname] = useState('');

    return (
        <View>
            <View style={globalStyles.register_hello}>
                <Text style={globalStyles.register_hello}>     Hello! {'\n'}  Signup to {'\n'}get started</Text>
            </View>

            <View style={globalStyles.CitizenWarden_btn_Group}>
                <TouchableOpacity
                    style={globalStyles.Register_btn}
                    onPress={() => { navigation.navigate("StackWarden") }}
                >
                    <Text style={globalStyles.Register_Text}>Warden</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={globalStyles.Sign_in_btn}
                    onPress={() => { navigation.navigate("StackWarden") }}
                >
                    <Text style={globalStyles.SignIn_Text}>Citizen</Text>
                </TouchableOpacity>
            </View>

            <View style={[globalStyles.bottomGroup, { width: responsiveWidth(33), marginTop: responsiveHeight(0), marginLeft: responsiveWidth(0) }]}>
            <TextInput style={globalStyles.textInput} onChangeText={(value) => setname(value)}
                placeholder="     Enter username" keyboardType="alphabet" editable maxLength={20} />

            <TextInput style={[globalStyles.textInput, { marginTop: responsiveHeight(44) }]}
                onChangeText={(value) => setname(value)} placeholder="    Email" keyboardType="alphabet" editable maxLength={20} />

            <TextInput style={[globalStyles.textInput, { marginTop: responsiveHeight(56) }]}
                onChangeText={(value) => setname(value)} placeholder="    Password" keyboardType="alphabet" editable maxLength={20} />

            <TextInput style={[globalStyles.textInput, { marginTop: responsiveHeight(68) }]}
                onChangeText={(value) => setname(value)} placeholder="    Confirm Password" keyboardType="alphabet" editable maxLength={20} />
            </View>
            <TouchableOpacity style={globalStyles.register_SignUp}
                onPress={() => { navigation.navigate("Tabs") }}
            >
                <Text style={globalStyles.Sign_in_Text} >Sign Up</Text>
            </TouchableOpacity>


            <Text style={globalStyles.style_Not_A_Member}>Already a member?</Text>
            <Text style={globalStyles.style_Login} onPress={() => { navigation.navigate('Login') }}>Login</Text>

        </View>
    )
}