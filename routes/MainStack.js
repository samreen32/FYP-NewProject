import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "../screens/WelcomeScreen";
import Register from "../screens/Register";
import Login from "../screens/Login";
import WardenTabs from "./WardenTabs";
import CitizenTabs from "./CitizenTabs";
import AdminTabs from "./AdminTabs";

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
      
                <Stack.Screen name="WardenTabs" component={WardenTabs} />
                <Stack.Screen name="CitizenTabs" component={CitizenTabs} />
                <Stack.Screen name="AdminTabs" component={AdminTabs} />  

            </Stack.Navigator>
        </NavigationContainer>
 

    );
}
