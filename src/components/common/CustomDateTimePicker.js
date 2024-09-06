import React, { useState } from 'react';
import { View, Button, Text, Platform, StyleSheet, TouchableOpacity, Image } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { COLORS, FS, IMAGES } from '../../constants';
import Colors from '../../constants/Colors';

const CustomDateTimePicker = ({ date, setDate, pickerMode = 'date' }) => {
    const [mode, setMode] = useState(pickerMode); // 'date' or 'time'
    const [show, setShow] = useState(false);

    const onChange = (_, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
       setDate(currentDate)
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    return (
        <View style={{ padding: 0 }}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                <TouchableOpacity onPress={showDatepicker} style={{ marginBottom: 20, flexDirection: 'row', backgroundColor: Colors.BG_GREY, padding: 10, borderRadius: 15 }}>
                    <Image source={IMAGES.DATE_ICON} style={{ height: 25, width: 25, marginRight: 10 }} />
                    <Text style={{ fontSize: FS.FS20, color: COLORS.BLACK }}>{date.toLocaleDateString()}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={showTimepicker} style={{ marginBottom: 20, flexDirection: 'row', backgroundColor: Colors.BG_GREY, padding: 10, borderRadius: 15 }}>
                    <Image source={IMAGES.TIME_ICON} style={{ height: 25, width: 25, marginRight: 10 }} />
                    <Text style={{ fontSize: FS.FS20, color: COLORS.BLACK }}>{date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                </TouchableOpacity>
            </View>
            {/* <Text style={{ marginTop: 20 }}>
                Selected Date: {date.toLocaleDateString()}
            </Text>
            <Text>
                Selected Time: {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text> */}
            {show && (
                <DateTimePicker
                    value={date}
                    mode={mode}
                    display="default"
                    onChange={onChange}
                />
            )}
        </View>
    );
}

export default CustomDateTimePicker

const styles = StyleSheet.create({})