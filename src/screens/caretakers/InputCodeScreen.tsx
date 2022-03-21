import { View, Text, Button } from 'native-base';
import React from 'react';
import InputBox from '../../components/atoms/Input';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { useTranslation } from 'react-i18next';

const InputCodeScreen = () => {
  const { t } = useTranslation();

    const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View my="2">
        {/* TODO: add tab */}
          <Button.Group isAttached justifyContent="center" mb="4">
            <Button borderWidth="1"
                borderColor="#1D84DF"
                backgroundColor="#FAFAFA"
                _text={{ color: '#1D84DF' }}
                _pressed={{
                  borderColor: '#7CC2FF',
                  _text: { color: '#7CC2FF' }
                }}
                borderRadius="0" 
                width="45%" 
                onPress={() => navigation.navigate('ConnectElderlyScreen')}>
              Scan QR Code
            </Button>
            <Button borderRadius="0" width="45%" onPress={() => navigation.navigate('InputCodeScreen')}>Enter Code</Button>
        </Button.Group>
        <InputBox name={t('111')} placeholder="XXXXXX"/>
        <View my="5" flexDir="row" justifyContent="center">
            <Button width="90%" onPress={() => navigation.navigate('ConfirmConnectScreen')}>{t('112')}</Button>
            </View>
    </View>
  );
};

export default InputCodeScreen;
