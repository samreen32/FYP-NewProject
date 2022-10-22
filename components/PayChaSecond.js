import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Button, Platform } from 'react-native';
import { Appbar } from 'react-native-paper';
import { globalStyles } from "../styles/globalStyles";
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { FontAwesome } from '@expo/vector-icons';

export default function PayChaSecond({ navigation }) {
    const [text, setText] = useState('');
    const [date, setDate] = useState(new Date());
    const [curDateTime, setCurDateTime] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'android' || Platform.OS === 'ios');
        setShow(false);
        setDate(currentDate);

        let tempDate = new Date(currentDate);
        let fDate = 'Date: ' + tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + (tempDate.getFullYear());
        let fTime = 'Time: ' + tempDate.getHours() + ':' + tempDate.getMinutes() + ':' + tempDate.getSeconds();
        setText(fDate + '\n    ' + fTime)
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };


    return (
        <View>
            <View style={globalStyles.challanSecond_Rect}></View>
            <View style={globalStyles.challanSecond_Group}>

                <Text style={globalStyles.challanNum_Text}>Challan{'\n'}Number</Text>
                <TextInput style={globalStyles.challanNum_TextInput} onChangeText={(value) => setText(value)}
                    placeholder="     01234567" keyboardType="numeric" editable maxLength={100} />

                <Text style={globalStyles.vehicleDetail_Text}>Vehicle{'\n'}Details</Text>
                <TextInput style={globalStyles.vehicleDetail_TextInput} onChangeText={(value) => setText(value)}
                    placeholder="     Cultus" keyboardType="alphabet" editable maxLength={100} />

                <Text style={globalStyles.regNum_Text}>Registration Number</Text>
                <TextInput style={globalStyles.regNum_TextInput} onChangeText={(value) => setText(value)}
                    placeholder="     RIM 0234" keyboardType="alphabet" editable maxLength={100} />

                <Text style={globalStyles.amount_Text}>Amount</Text>
                <TextInput style={globalStyles.amount_TextInput} onChangeText={(value) => setText(value)}
                    placeholder="     300" keyboardType="numeric" editable maxLength={100} />

                <View style={globalStyles.lineStyle}></View>

                <Text style={globalStyles.dateTime_Text}>Date &{'\n'}Time</Text>
                <TextInput style={globalStyles.dateTime_TextInput}
                    placeholder={`${'     '}${curDateTime.toLocaleString()}`} keyboardType="alphabet" editable={false} maxLength={100}
                />

                <Text style={globalStyles.location_Text}>Location</Text>
                <TextInput style={globalStyles.location_TextInput} onChangeText={(value) => setText(value)}
                    placeholder="     Islamabad" keyboardType="alphabet" editable maxLength={100} />


                <Text style={globalStyles.dueDate_Text}>Due Date</Text>
                <TextInput style={globalStyles.dueDate_TextInput} placeholder={`${'    '}${text}`}
                    editable={false} keyboardType="alphabet" maxLength={100} />
                <TouchableOpacity style={globalStyles.dueDate_Icon}
                    onPress={() => showMode('date')}
                >
                    <FontAwesome name="calendar" size={24} color="black" />
                </TouchableOpacity>
                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        onChange={onChange}
                    />)}


            </View>
            <TouchableOpacity style={globalStyles.printChallan_btn}>
                <Text style={globalStyles.submitChallan_Text}>Pay</Text>
            </TouchableOpacity>
        </View>

    );
}

