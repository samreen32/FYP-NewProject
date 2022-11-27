import React from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles/globalStyles';


export default function WelcomeScreen({ navigation }) {
    return (
        <View>
            
            <Image
                style={globalStyles.welcome_Image}
                source={require('../assets/images/carGif.gif')}
            />

            <Text style={globalStyles.style_Just_Try}> Welcome to 
            </Text>
            <Text style={globalStyles.style_design}>E-Parking Challan App</Text>
            <View style={globalStyles.style_in_publishing}>
                <Text style={globalStyles.in_pub_text}>Let's ease the traffic together!{'\n'}
                    Pay challan one click to go, Manage challan{'\n'}
                    its easy.
                </Text>
            </View>

            <View style={globalStyles.welcome_btn_Group}>
                <TouchableOpacity 
                    style={globalStyles.Register_btn}
                    onPress={()=>{navigation.navigate("Register")}}
                >
                    <Text style={globalStyles.Register_Text}>Register</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={globalStyles.Sign_in_btn}
                    onPress={()=>{navigation.navigate("Login")}}
                >
                    <Text style={globalStyles.SignIn_Text}>Sign in</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}