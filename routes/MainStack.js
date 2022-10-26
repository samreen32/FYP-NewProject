import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "../screens/WelcomeScreen";
import Register from "../screens/Register";
import Login from "../screens/Login";
import StackWarden from "./StackWarden";


const Stack = createNativeStackNavigator();

export default function MainStack() {

    return (
     
        <NavigationContainer>
            <Stack.Navigator initialRouteName="WelcomeScreen"
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="StackWarden" component={StackWarden} />
               

            </Stack.Navigator>
        </NavigationContainer>
 

    );
}
