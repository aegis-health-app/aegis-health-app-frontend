import { StyleSheet } from 'react-native';
import { View, Text, Divider, VStack, HStack, Pressable } from 'native-base';
import moment from 'moment';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { Geolocation } from '../../hooks/useGeolocation';

type EmergencyAlertCardProps = {
  sender: string;
  time: Date;
  title: string;
  description: string | undefined;
};

export interface EmergencyData {
  elderlyImageId: string;
  elderlyName: string;
  location: Geolocation;
  timestamp: Date;
  elderlyPhone: string;
}

export const mockEmergencyInfo = {
  name: 'That dude',
  address:
    'some random location too long to describe in a single screen of Aegis mobile application',
  location: {
    latitude: 13.0,
    longtitude: 25.0
  },
  date: moment(new Date(2022, 8, 12)).format('DD MMM YYYY'),
  time: moment(new Date(2022, 8, 12)).format('hh:mm:ss'),
  phone: '0855555555',
  elderlyImageId: 'abcdef'
};

const EmergencyAlertCard = ({ sender, time }: EmergencyAlertCardProps) => {
  const { t } = useTranslation();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const showEmergencyInfoScreen = useCallback(() => {
    navigation.push('EmergencyInfoScreen', { info: mockEmergencyInfo });
  }, []);

  return (
    <View>
      <VStack px="4" py="2" backgroundColor="aegis.danger" style={styles.card}>
        <HStack justifyContent="space-between">
          <Text fontSize="16" color="#E4E4E7">
            {t('modules.sender', { name: sender })}
          </Text>
          <Text fontSize="16" color="#E4E4E7">
            {moment(time).format('hh:mm')}
          </Text>
        </HStack>
        <View>
          <Text fontSize="2xl" fontWeight="500" color="#fff">
            {t('emergency.alertTitle')}
          </Text>
          <Text fontSize="lg" color="#fff">
            {t('emergency.alertDescription', { name: sender })}
          </Text>
        </View>
        <HStack justifyContent="space-between" mt={4} mb={1}>
          <Pressable
            flex={2}
            alignItems="center"
            onPress={showEmergencyInfoScreen}>
            {({ isPressed }) => (
              <Text
                fontSize={isPressed ? 'md' : 'lg'}
                color={isPressed ? '#fff' : '#E4E4E7'}>
                {t('modules.viewCard')}
              </Text>
            )}
          </Pressable>
          <Divider orientation="vertical" mx="6" bg="gray.200" thickness={2} />
          <View flex={2} alignItems="center">
            <Text fontSize="lg" color="#E4E4E7">
              {t('modules.dismiss')}
            </Text>
          </View>
        </HStack>
      </VStack>
    </View>
  );
};

export default EmergencyAlertCard;

const styles = StyleSheet.create({
  card: {
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2
  }
});
