import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { t } from 'i18next';
import {
  Box,
  Button,
  HStack,
  Icon,
  Image,
  Pressable,
  Text,
  View,
  VStack
} from 'native-base';
import React, { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import images from '../assets/images';
import useAsyncEffect from '../hooks/useAsyncEffect';
import { RootStackParamList } from '../navigation/types';
import { Geolocation, openMapApp, reverseGeocode } from '../utils/geolocation';
import { openDialScreen } from '../utils/phone';

export type EmergencyInfo = {
  name: string;
  address: string;
  location: Geolocation;
  date: string;
  time: string;
  phone: string;
  elderlyImageId: string;
};

const emergencyInfoList = [
  { label: t('emergency.senderName'), value: 'name' },
  { label: t('emergency.location'), value: 'address' },
  { label: t('emergency.date'), value: 'date' },
  { label: t('emergency.time'), value: 'time' },
  { label: t('emergency.phone'), value: 'phone' }
];

const EmergencyInfoScreen = ({ route }) => {
  const { t } = useTranslation();
  const emergencyInfo = useMemo<EmergencyInfo>(
    () => route?.params.info,
    [route]
  );

  const [address, setAddress] = useState<string>('');

  useAsyncEffect(async () => {
    const addressString = await reverseGeocode(
      emergencyInfo.location.latitude,
      emergencyInfo.location.longtitude
    );

    setAddress(addressString);
  }, [emergencyInfo, reverseGeocode]);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const openEmergencyLocation = useCallback(() => {
    openMapApp(emergencyInfo.location);
  }, []);

  const callSender = useCallback(() => {
    openDialScreen(emergencyInfo.phone);
  }, []);

  const closeEmergencyScreen = useCallback(() => {
    if (navigation.canGoBack()) navigation.goBack();
  }, [navigation]);

  return (
    <SafeAreaView edges={['right', 'top', 'left']}>
      <VStack h="full" justifyContent="space-around" alignItems="center">
        <Box flex={1} />
        <Text fontSize="xl" mb="2">
          {t('emergency.alertTitle')}
        </Text>
        <Image
          alt="Emergency Sender Profile Image"
          source={images.sompochImg}
          width={160}
          height={160}
          mb="6"
        />
        <VStack px={6}>
          {emergencyInfoList.map((info) => (
            <HStack w="full" key={info.label} mb={2}>
              <Text flex={1}>{info.label}</Text>
              <View flex={2}>
                <Text bold>
                  {info.value === 'address'
                    ? address
                    : emergencyInfo[info.value]}
                </Text>
                {info.value === 'address' && (
                  <Pressable mt={2} onPress={openEmergencyLocation}>
                    <Text bold underline color="blue.500">
                      {t('emergency.openInMaps')}
                      <Icon
                        as={Ionicons}
                        name="open-outline"
                        size="4"
                        color="blue.500"
                      />
                    </Text>
                  </Pressable>
                )}
              </View>
            </HStack>
          ))}
        </VStack>
        <Box flex={2} />
        <Button
          mb={4}
          w="80%"
          rightIcon={
            <Icon
              mr={2}
              size="sm"
              h="full"
              as={Ionicons}
              name={'call'}
              color="white"
            />
          }
          onPress={callSender}>
          <Text color="white">
            {t('emergency.callSender', { name: emergencyInfo?.name })}
          </Text>
        </Button>
        <Button
          mb={4}
          w="80%"
          borderColor="aegis.danger"
          variant="outline"
          onPress={closeEmergencyScreen}>
          <Text color="aegis.danger">{t('misc.close')}</Text>
        </Button>
      </VStack>
    </SafeAreaView>
  );
};

export default EmergencyInfoScreen;
