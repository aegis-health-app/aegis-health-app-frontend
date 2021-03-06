import { Text, View, Image, Button } from 'native-base';
import React, { useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps
} from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { useTranslation } from 'react-i18next';
import { client } from '../../config/axiosConfig';
import { UserContext } from '../../contexts/UserContext';
import { FallbackImageLarge } from '../../components/molecules/FallbackImage';
import { Elderly } from './../../dto/modules/user.dto';
import { CaretakerContext } from '../../contexts/CaretakerContext';
import Alert, { AlertType } from '../../components/organisms/Alert';

const ProfilePic = require('../../assets/images/profile.png');

const ConfirmConnectScreen = ({
  route
}: NativeStackScreenProps<RootStackParamList, 'ConfirmConnectScreen'>) => {
  const { info } = route.params;

  const { t } = useTranslation();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { user } = useContext(UserContext);
  const { caretakerHomeProfile, setCaretakerHomeProfile } =
    useContext(CaretakerContext);

    const [showErrorAlert, setShowErrorAlert] = useState<boolean>(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);

  //TODO: error handling
  const handlePress = async () => {
    try {
      await client.post('/user/relationship', {
        eid: info.uid,
        cid: user?.uid
      }) as Elderly;
      setShowSuccessAlert(true);
    } catch (err) {
      console.log(err)
      setShowErrorAlert(true);
    }
  };

  return (
    <View>
      <View flexDir="column" alignItems="center" my="10">
      <Alert
          isOpen={showErrorAlert}
          close={() => setShowErrorAlert(false)}
          type={AlertType.ERROR}
          message="connectElderlyError"
        />
        <Alert
          isOpen={showSuccessAlert}
          close={() => {
            setShowSuccessAlert(false);
            navigation.navigate('CaretakerHomeScreen');
          }}
          type={AlertType.SUCCESS}
          message="connectElderlySuccess"
        />
        <Text fontWeight="600" fontSize="lg">
          {t('userLink.connectText1')}
          {info.fname} {info.lname}
          {t('userLink.connectText2')}
        </Text>
        <Image
          mt="10"
          source={info.imageid ? {uri:info.imageid}: ProfilePic}
          w={160}
          h={160}
          borderRadius={10}
          fallbackElement={FallbackImageLarge}
          alt="Profile Picture"
        />
        <Text mt="2" fontWeight="600" fontSize="2xl">
          {info.dname}
        </Text>
        <Text fontWeight="300" color="#A1A1AA" fontSize="sm">
          {info.fname} {info.lname}
        </Text>
        <Button mt="10" width="90%" onPress={() => handlePress()}>
          {t('userLink.connectButton')}
        </Button>
        <Button
          borderWidth="1"
          borderColor="#F97316"
          backgroundColor="#FAFAFA"
          _text={{ color: '#F97316' }}
          _pressed={{
            borderColor: '#F94000',
            _text: { color: '#F94000' }
          }}
          colorScheme="danger"
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
