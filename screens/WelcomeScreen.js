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

            <Text style={globalStyles.style_Just_Try}>
                Just Try to
            </Text>
            <Text style={globalStyles.style_design}>design our App</Text>
            <View style={globalStyles.style_in_publishing}>
                <Text style={globalStyles.in_pub_text}>In publishing asss;s'nd in a graphic{'\n'}
                    design,ipsum placeholder text{'\n'}
                    commonly ussaonstrate_:
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