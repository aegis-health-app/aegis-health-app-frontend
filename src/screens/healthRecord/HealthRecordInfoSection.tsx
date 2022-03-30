import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Image, Text, View } from 'native-base';
import React from 'react';
import { useTranslation } from 'react-i18next';
import EditButton from '../../components/atoms/EditButton';
import Spacer from '../../components/atoms/Spacer';
import { RootStackParamList } from '../../navigation/types';

const tempHealthRecordCover = require('../../assets/images/profile.png');

const HealthRecordInfoSection = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { t } = useTranslation();

  return (
    <View>
      <View flexDir="row" justifyContent="space-between">
        <Text fontSize="xl" fontWeight="700">
          {t('healthRecording.addEntry')}
        </Text>
        <EditButton
          onPress={() => {
            navigation.navigate('ProfileEditScreen');
          }}
        />
      </View>
      <Spacer />
      <View
        display="flex"
        flexDir="row"
        alignItems="center"
        justifyContent="center"
        width="full"
        height={200}
        background="red.100">
        <Image
          source={tempHealthRecordCover}
          borderRadius={4}
          alt="Profile Picture"
          resizeMode="cover"
          height="100%"
          width="100%"
        />
      </View>
      <Spacer />
    </View>
  );
};

export default HealthRecordInfoSection;
