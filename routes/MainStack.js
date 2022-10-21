// import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import WelcomeScreen from "../screens/WelcomeScreen";
// import Register from "../screens/Register";
// import Login from "../screens/Login";
// import WardenScreen from "../screens/WardenScreen";
// import Tabs from "./Tabs";
// import ViewPlaceWarden from "../screens/ViewPlaceWarden";
// import Notifications from "../screens/Notifications";

// const Stack = createNativeStackNavigator();

// export default function StackWarden() {

//     return (
//         <NavigationContainer>

//             <Stack.Navigator initialRouteName="WelcomeScreen"
//                 screenOptions={{
//                     headerShown: false,
//                 }}
//             >
//                 <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
//                 <Stack.Screen name="Register" component={Register} />
//                 <Stack.Screen name="Login" component={Login} />

//                 {/* <Stack.Screen name="WardenScreen" component={WardenScreen} 
//       options={{
//         headerShown: false,
//       }}/> */}
//                 <Stack.Screen name="Tabs" component={Tabs}
//                     options={{
//                         headerShown: false,
//                     }} />
//                 <Stack.Screen name="ViewPlaceWarden" component={ViewPlaceWarden} title="Places"

//                     options={{
//                         headerShown: true,
//                     }} />
//                 <Stack.Screen name="Notifications" component={Notifications}
//                     options={{
//                         headerShown: true,
//                     }} />
              

//             </Stack.Navigator>
//         </NavigationContainer>

//     );
// }
