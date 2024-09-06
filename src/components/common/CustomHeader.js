import { Image, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, FS, IMAGES } from '../../constants';
import { useNavigation } from '@react-navigation/native';

const CustomHeader = ({ title = '', isbackIcon = false, displayBackupRestore = false, onBackUpPress = () => { }, onRestorePress = () => { }  }) => {
    const Navigation = useNavigation();
    return (
        <View style={{ height: 60, backgroundColor: COLORS.BG_GREY, padding: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            {isbackIcon &&
                <TouchableOpacity style={{ alignSelf: 'center', paddingHorizontal: 10 }} onPress={() => { Navigation.goBack() }}>
                    <Image source={IMAGES.BACK_ARROW} style={{ height: 22, width: 22, resizeMode: 'contain' }} />
                </TouchableOpacity>}
            <Text style={{ fontSize: FS.FS20, fontWeight: '600', marginLeft: 10, flex: 1, color: COLORS.BLACK, right: isbackIcon ? 22 : 0, textAlign: 'left' }}>{title}</Text>
            {displayBackupRestore && <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                <TouchableOpacity onPress={onBackUpPress}><Image source={IMAGES.BACKUP} style={{ height: 25, width: 25, resizeMode: 'contain', marginHorizontal: 5 }} /></TouchableOpacity>
                <TouchableOpacity onPress={onRestorePress}><Image source={IMAGES.RESTORE} style={{ height: 25, width: 25, resizeMode: 'contain', marginHorizontal: 5 }} /></TouchableOpacity>
            </View>}
        </View>
    )
}

export default CustomHeader;