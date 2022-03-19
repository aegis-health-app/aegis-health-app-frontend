import { View, Text, Button } from 'native-base';
import React from 'react';
import InputBox from '../../components/atoms/Input';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

const InputCodeScreen = () => {

    const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View my="2">
        <InputBox name="กรอกโค้ดประจำตัวของผู้สูงอายุ" placeholder="XXXXXX"/>
        <View my="5" flexDir="row" justifyContent="center">
            <Button width="90%" onPress={() => navigation.navigate('ConfirmConnectScreen')}>ดำเนินการต่อ</Button>
            </View>
    </View>
  );
};

export default InputCodeScreen;
