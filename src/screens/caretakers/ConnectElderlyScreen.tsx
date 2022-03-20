import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { Image, ZStack, View, Box, Text, Button } from 'native-base';
import { useTranslation } from 'react-i18next';
// import { RNCamera } from 'react-native-camera';


const QRPlaceholder = require('../../assets/images/QRPlaceholder.png');
const QRBackground = require('../../assets/images/QRBackground.png');

const ConnectElderlyScreen = () => {
    const { t } = useTranslation();

    const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    return (
        <View>
            <View my="2" flexDir="row" justifyContent="center">
            {/* TODO: change to tab instead */}
            <Button borderRadius="0" width="45%" onPress={() => navigation.navigate('ConnectElderlyScreen')}>Scan QR Code</Button>
            <Button variant="outline" borderRadius="0" width="45%" onPress={() => navigation.navigate('InputCodeScreen')}>Enter Code</Button>
            </View>
            <ZStack mb="2" width="100%" height="100%" alignItems="center">
                <Image height="100%" width="100%" source={QRBackground} alt="QR Background"/>
                <Box top="18%" height="230" width="230" alignSelf="center" borderWidth="3" borderColor="#005DB4" justifyContent="center" alignItems="center">
                <Image height="200" width="200" source={QRPlaceholder} alt="QR Placeholder"/>
                </Box>
                {/* <RNCamera/> */}
            </ZStack>
            <Text position="absolute" alignSelf="center" bottom="24">{t('110')}</Text>
        </View>
    );
};

export default ConnectElderlyScreen;
