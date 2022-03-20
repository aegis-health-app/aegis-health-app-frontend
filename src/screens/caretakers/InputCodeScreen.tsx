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
        <InputBox name={t('111')} placeholder="XXXXXX"/>
        <View my="5" flexDir="row" justifyContent="center">
            <Button width="90%" onPress={() => navigation.navigate('ConfirmConnectScreen')}>{t('112')}</Button>
            </View>
    </View>
  );
};

export default InputCodeScreen;
