import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
  } from '@react-navigation/drawer';
  import React from 'react';
  import { Image, Text, View, TouchableOpacity } from 'react-native';
  import { Ionicons } from "@expo/vector-icons";
  
  const CustomDrawer = (props) => {
    return (
      <>
        <View style={{ marginBottom: 20 }}>
        
         <Ionicons name="person-circle" size={95} color="white"  style={{
              width: 100,
              height: 95,
              marginLeft: 20,
              marginTop: 30,
              marginBottom: 30,
            }} />
          <TouchableOpacity>
            <Ionicons
              name="close-outline"
              size={60}
              color= "white"
              style={{ marginBottom: 20, marginLeft: 230, marginTop: -115 }}
              onPress={() => {
                props.navigation.closeDrawer();
              }}
            />
          </TouchableOpacity>
        </View>
        <Text
          style={{
            fontsize: 35,
            fontWeight: 'bold',
            marginLeft: 23,
            marginBottom: 10,
            fontFamily: "poppins-bold",
            color: "white",
          }}>
          Hey,{'\n'}Richard
        </Text>
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
          <View
            style={{
              width: 245,
              height: 2,
              backgroundColor: 'black',
              alignSelf: 'stretch',
              marginLeft: 20,
              marginRight: 50,
              marginTop: 20,
            }}></View>
          <DrawerItem
            activeBackgroundColor="black"
            icon={({ focused, size, color, fontsize }) => {
              iconName = 'log-out';
  
              size = focused ? 25 : 20;
              color = focused ? 'white' : 'black';
              return <Ionicons name={iconName} size={size} color={color} />
            }}
            labelStyle={{ marginLeft: -25, color: 'white', fontSize: 15 }}
            onPress={() => {
              props.navigation.goBack()
            }}
            label="Logout"
          />
        </DrawerContentScrollView>
      </>
    );
  };
  export default CustomDrawer;
  