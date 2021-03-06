import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { View, Box, Text, Button } from 'native-base';
import { useTranslation } from 'react-i18next';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { client } from '../../config/axiosConfig';
import { ElderlyLinkResponse } from '../../dto/modules/modules.dto';

const ConnectElderlyScreen = () => {
  const { t } = useTranslation();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleRead = async (val) => {
    try {
      const { data } = await client.get(`/link/elderly/${val}`);
      navigation.navigate('ConfirmConnectScreen', {
        info: data as ElderlyLinkResponse
      });
    } catch (err) {
      console.log(err);
      // show toast to display err to user.
    }
  };

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
      <View mt="16.5%">
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
      </View>
    </View>
  );
};

export default ConnectElderlyScreen;
