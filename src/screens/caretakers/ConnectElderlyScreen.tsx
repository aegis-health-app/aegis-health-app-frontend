import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { Image, ZStack, View, Box, Text, Button } from 'native-base';
import { useTranslation } from 'react-i18next';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { client } from '../../config/axiosConfig';

const ConnectElderlyScreen = () => {

  const { t } = useTranslation();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleRead = async (val) => {
    await client
      .get(`/link/elderly/${val}`)
      .then(({ data }) => {
        console.log(data);
        navigation.navigate('ConfirmConnectScreen', { info: data });
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  //remove later
  const handlePress = async (val) => {
    await client
      .get(`/link/elderly/${val}`)
      .then(({ data }) => {
        console.log(data);
        navigation.navigate('ConfirmConnectScreen', { info: data });
      })
      .catch((err) => {
        console.log({ err });
      });
  }

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
      <View mt="16">
        <QRCodeScanner
          customMarker={
            <Box
              top="-20"
              height="230"
              width="230"
              alignSelf="center"
              borderWidth="3"
              borderColor="#005DB4"
              justifyContent="center"
              alignItems="center"></Box>
          }
          showMarker={true}
          containerStyle={{ justifyContent: 'center', marginBottom: 120 }}
          onRead={(e) => handleRead(e.data)}
        />
        <View
          position="absolute"
          alignSelf="center"
          bottom="-400"
          background="white"
          zIndex="100">
          <Text>{t('userLink.cameraHelpText')}</Text>
        </View>
        {/* remove later */}
        <Button position="absolute" alignSelf="center" bottom="-300" width="90%" onPress={() => handlePress('E3QW53')}>test successful QR scan</Button>
      </View>
    </View>
  );
};

export default ConnectElderlyScreen;
