import { Text, View, Image, Button} from 'native-base';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';


const sompochHD = require('../../assets/images/sompochHD.png');

const ConfirmConnectScreen = () => {

    const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View>
        <View flexDir="column" alignItems="center" my="10">
        <Text fontWeight="600" fontSize="lg">
            เชื่อมต่อกับ “Koon Yai” ?
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
        <Button mt="10" width="90%" onPress={() => navigation.navigate('ConnectElderlyScreen')}>เชื่อมต่อเลย!</Button>
        <Button variant="outline" colorScheme='danger' mt="4" width="90%" onPress={() => navigation.navigate('ConnectElderlyScreen')}>ยกเลิก</Button>
    

        </View>
    </View>
  );
};

export default ConfirmConnectScreen;
