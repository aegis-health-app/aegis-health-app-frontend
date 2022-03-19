import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { Image, ZStack, View, Box, Text } from 'native-base';


const QRPlaceholder = require('../../assets/images/QRPlaceholder.png');
const QRBackground = require('../../assets/images/QRBackground.png');

const ConnectElderlyScreen = () => {

    const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    return (
        <View>
            <Box top="20" width="100%" height="12">
            </Box>
            <ZStack mb="2" width="100%" height="100%" alignItems="center">
                <Image height="100%" width="100%" source={QRBackground} alt="QR Background"/>
                <Box top="18%" height="230" width="230" alignSelf="center" borderWidth="3" borderColor="#005DB4" justifyContent="center" alignItems="center">
                <Image height="200" width="200" source={QRPlaceholder} alt="QR Placeholder"/>
                </Box>
            </ZStack>
            <Text position="absolute" alignSelf="center" bottom="24">Place QR code inside the scanning frame</Text>
        </View>
    );
};

export default ConnectElderlyScreen;
