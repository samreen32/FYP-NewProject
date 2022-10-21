import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Appbar } from 'react-native-paper';
import { globalStyles } from "../styles/globalStyles";

export default function Challan({ navigation }) {
  const [name, setname] = useState('');
  return (

    <View style={globalStyles.challanSecond_Rect}>
         <View style={globalStyles.challanSecond_Fields_Group}>
            <TextInput style={globalStyles.textInput_1} onChangeText={(value) => setname(value)}
                        placeholder="     Enter Vehicle Number" keyboardType="alphabet" editable maxLength={20} />

            <TextInput style={globalStyles.textInput_2}
                onChangeText={(value) => setname(value)} placeholder="    Select Car Type" keyboardType="alphabet" editable maxLength={20} />

            <TextInput style={globalStyles.textInput_3}
                onChangeText={(value) => setname(value)} placeholder="    Enter Amount" keyboardType="alphabet" editable maxLength={20} />

            <TextInput style={globalStyles.textInput_4}
                onChangeText={(value) => setname(value)} placeholder="    Any Comment" keyboardType="alphabet" editable maxLength={20} />

        </View>  

        <TouchableOpacity style={globalStyles.submitChallan_btn}>
            <Text style={globalStyles.submitChallan_Text}>Print</Text>
        </TouchableOpacity>   
    </View>
  );
}

