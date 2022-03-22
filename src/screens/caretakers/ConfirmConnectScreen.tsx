import { Text, View, Image, Button} from 'native-base';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { useTranslation } from 'react-i18next';

const sompochHD = require('../../assets/images/sompochHD.png');

const ConfirmConnectScreen = () => {
    const { t } = useTranslation();

    const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View>
        <View flexDir="column" alignItems="center" my="10">
        <Text fontWeight="600" fontSize="lg">
            {t('userLink.connectText1')}
            Koon Yai
            {t('userLink.connectText2')}
        </Text>
        <Image
            mt="10"
            source={sompochHD}
            w={160}
            h={160}
            borderRadius={10}
            alt="Profile Picture"
        />
        <Text mt="2" fontWeight="600" fontSize="2xl">
            Sompoch Display Name
        </Text>
        <Text fontWeight="300" color="#A1A1AA" fontSize="sm">
            Sompoch Muangyim
        </Text>
        <Button mt="10" width="90%" onPress={() => navigation.navigate('ConnectElderlyScreen')}>{t('userLink.connectButton')}</Button>
        <Button borderWidth="1"
                borderColor="#F97316"
                backgroundColor="#FAFAFA"
                _text={{ color: '#F97316' }}
                _pressed={{
                borderColor: '#F94000',
                _text: { color: '#F94000' }
                }} 
                colorScheme='danger' 
                mt="4"
                width="90%" 
                onPress={() => navigation.navigate('ConnectElderlyScreen')}>
        {t('userLink.cancelButton')}
        </Button>
    

        </View>
    </View>
  );
};

export default ConfirmConnectScreen;
