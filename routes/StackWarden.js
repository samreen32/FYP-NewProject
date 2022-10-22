import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChallanSecond from "../components/ChallanSecond";
import CitizenScreen from "../screens/CitizenScreen";
import ViewPlaceWarden from "../screens/ViewPlaceWarden";
import Notifications from "../components/Notifications";
import PayChallan from "../components/PayChallan";
import WardenScreen from "../screens/WardenScreen";
import PayChaSecond from "../components/PayChaSecond";
import CameraComponent from "../components/CameraComponent";
import Challan from "../components/Challan";


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
                <Stack.Screen name="PayChallan" component={PayChallan} 
                options={{
                    headerShown: false,
                }}
                />
                <Stack.Screen name="PayChaSecond" component={PayChaSecond} 
                options={{
                    headerShown: false,
                }}
                />
                <Stack.Screen name="CameraComponent" component={CameraComponent} 
                options={{
                    headerShown: false,
                }}
                />
                <Stack.Screen name="Challan" component={Challan} 
                options={{
                    headerShown: false,
                }}
                />
            </Stack.Navigator>
     
    );
}
