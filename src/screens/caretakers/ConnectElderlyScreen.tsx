import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { Image, ZStack, View, Box, Text, Button } from 'native-base';
import { useTranslation } from 'react-i18next';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

const QRPlaceholder = require('../../assets/images/QRPlaceholder.png');
const QRBackground = require('../../assets/images/QRBackground.png');

const ConnectElderlyScreen = () => {
  const { t } = useTranslation();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View>
      <Button.Group isAttached justifyContent="center" my="2">
        <Button
          borderRadius="0"
          width="45%"
          onPress={() => navigation.navigate('ConnectElderlyScreen')}>
          {t('userLink.scanQR')}
        </Button>
        <Button
          borderWidth="1"
          borderColor="#1D84DF"
          backgroundColor="#FAFAFA"
          _text={{ color: '#1D84DF' }}
          _pressed={{
            borderColor: '#7CC2FF',
            _text: { color: '#7CC2FF' }
          }}
          borderRadius="0"
          width="45%"
          onPress={() => navigation.navigate('InputCodeScreen')}>
          {t('userLink.enterCode')}
        </Button>
      </Button.Group>
      <ZStack mb="2" width="100%" height="100%">
        <QRCodeScanner
          customMarker={<Box
            top="-20"
            height="230"
            width="230"
            alignSelf="center"
            borderWidth="3"
            borderColor="#005DB4"
            justifyContent="center"
            alignItems="center"></Box>}
          showMarker={true}
          containerStyle={{justifyContent: "center", marginBottom: 120}}
          onRead={(e) => {
            console.log('success', e)
            navigation.navigate('ConfirmConnectScreen')
        }}
          />
      </ZStack>
      <Text position="absolute" alignSelf="center" bottom="24">
        {t('userLink.cameraHelpText')}
      </Text>
    </View>
  );
};

export default ConnectElderlyScreen;
