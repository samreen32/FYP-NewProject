import { React, useState } from 'react';
import { Text, View, Linking, TextInput, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { globalStyles } from '../styles/globalStyles';

export default function Register({ navigation }) {
    const [name, setname] = useState('');

    return (
        <View>
            <View style={globalStyles.register_hello}>
                <Text style={globalStyles.register_hello}>     Hello! {'\n'}  Signup to {'\n'} get started</Text>
            </View>

            <View style={globalStyles.CitizenWarden_btn_Group}>
                <TouchableOpacity
                    style={globalStyles.Register_btn}
                    onPress={() => { navigation.navigate("") }}
                >
                    <Text style={globalStyles.Register_Text}>Warden</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={globalStyles.Sign_in_btn}
                    onPress={() => { navigation.navigate("") }}
                >
                    <Text style={globalStyles.SignIn_Text}>Citizen</Text>
                </TouchableOpacity>
            </View>

            <TextInput style={globalStyles.textInput_1} onChangeText={(value) => setname(value)}
                placeholder="     Enter username" keyboardType="alphabet" editable maxLength={20} />

            <TextInput style={globalStyles.textInput_2}
                onChangeText={(value) => setname(value)} placeholder="    Email" keyboardType="alphabet" editable maxLength={20} />

            <TextInput style={globalStyles.textInput_3}
                onChangeText={(value) => setname(value)} placeholder="    Password" keyboardType="alphabet" editable maxLength={20} />

            <TextInput style={globalStyles.textInput_4}
                onChangeText={(value) => setname(value)} placeholder="    Confirm Password" keyboardType="alphabet" editable maxLength={20} />

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