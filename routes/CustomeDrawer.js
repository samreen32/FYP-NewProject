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
          <Image
            style={{
              width: 80,
              height: 80,
              marginLeft: 20,
              marginTop: 30,
              marginBottom: 30,
            }}
            // source={require('../assets/pic1.jpg')}
          />
          <TouchableOpacity>
            <Ionicons
              name="close-outline"
              size={60}
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
          }}>
          Hey,{'\n'}Richard
        </Text>
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
          <View
            style={{
              height: 2,
              backgroundColor: 'black',
              alignSelf: 'stretch',
              marginLeft: 20,
              marginRight: 50,
              marginTop: 20,
            }}></View>
          <DrawerItem
            activeBackgroundColor="#FAEBD7"
            icon={({ focused, size, color, fontsize }) => {
              iconName = 'home';
  
              size = focused ? 25 : 20;
              color = focused ? 'yellow' : 'orange';
              return <Ionicons name={iconName} size={size} color={color} />
            }}
            labelStyle={{ marginLeft: -25, color: 'black', fontSize: 15 }}
            onPress={() => {
              props.navigation.navigate('Sign_Out');
            }}
            label="Logout"
          />
        </DrawerContentScrollView>
      </>
    );
  };
  export default CustomDrawer;
  