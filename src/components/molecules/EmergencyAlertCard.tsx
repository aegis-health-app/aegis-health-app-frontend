import { StyleSheet } from 'react-native';
import { View, Text, Divider, VStack, HStack } from 'native-base';
import moment from 'moment';
import React from 'react';
import { useTranslation } from 'react-i18next';

type EmergencyAlertCardProps = {
  sender: string;
  time: Date;
  title: string;
  description: string | undefined;
};

const EmergencyAlertCard = ({ sender, time }: EmergencyAlertCardProps) => {
  const { t } = useTranslation();

  return (
    <View>
      <VStack px="4" py="2" backgroundColor="#FF5C5C" style={styles.card}>
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
          <View flex={2} alignItems="center">
            <Text fontSize="lg" color="#fff">
              {t('modules.viewCard')}
            </Text>
          </View>
          <Divider orientation="vertical" mx="6" bg="gray.200" thickness={2} />
          <View flex={2} alignItems="center">
            <Text fontSize="lg" color="#fff">
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
    color: '#fff',
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2
  }
});
