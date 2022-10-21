import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChallanSecond from "../components/ChallanSecond";
import CitizenScreen from "../screens/CitizenScreen";
import ViewPlaceWarden from "../screens/ViewPlaceWarden";
import Notifications from "../components/Notifications";

const Stack = createNativeStackNavigator();

export default function StackWarden() {
    return (
 
            <Stack.Navigator initialRouteName="CitizenScreen"
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="CitizenScreen" component={CitizenScreen} />
                <Stack.Screen name="ViewPlaceWarden" component={ViewPlaceWarden} 
                options={{
                    headerShown: true,
                }}
                />
                <Stack.Screen name="Notifications" component={Notifications} 
                options={{
                    headerShown: true,
                }}
                />
                <Stack.Screen name="ChallanSecond" component={ChallanSecond} 
                options={{
                    headerShown: false,
                }}
                />
            </Stack.Navigator>
     
    );
}
