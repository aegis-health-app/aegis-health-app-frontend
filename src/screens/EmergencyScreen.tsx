import { View } from 'react-native';
import React, { useCallback, useState } from 'react';
import EmergencyButton from '../components/organisms/EmergencyButton';
import { Center, VStack, Text, Button, Icon, Box } from 'native-base';
import { useTranslation } from 'react-i18next';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { openDialScreen } from '../utils/phone';
import {
  sendEmergencyCancel,
  sendEmergencySignal
} from '../utils/user/notification';
import { useGeolocation } from '../hooks/useGeolocation';

const EmergencyScreen = () => {
  const { t } = useTranslation();
  const { getCurrentLocation } = useGeolocation();

  const [isEmergency, setEmergency] = useState<boolean>(false);

  const callPolice = useCallback(() => {
    openDialScreen('191');
  }, []);

  const callAmbulance = useCallback(() => {
    openDialScreen('1669');
  }, []);

  const reportEmergency = useCallback(async () => {
    await getCurrentLocation(sendEmergencySignal);
    setEmergency(true);
  }, [setEmergency]);

  const cancelEmergency = useCallback(async () => {
    await sendEmergencyCancel();
    setEmergency(false);
  }, [setEmergency]);

  return (
    <View>
      <VStack minH="full" justifyContent="center">
        <EmergencyButton
          isEmergency={isEmergency}
          reportEmergency={reportEmergency}
        />
        {!isEmergency ? (
          <Center>
            <Text
              mt={8}
              mb={4}
              fontWeight="semibold"
              fontSize="24"
              textAlign="center">
              {t('emergency.callToAction')}
            </Text>
            <Text textAlign="center" fontSize="16">
              {t('emergency.callToActionDesc')}
            </Text>
          </Center>
        ) : (
          <Center>
            <VStack justifyContent="space-around">
              <Text
                mt={4}
                mb={4}
                fontWeight="semibold"
                fontSize="24"
                textAlign="center">
                {t('emergency.reportComplete')}
              </Text>
              <Text mb={4} textAlign="center" fontSize="16">
                {t('emergency.reportCompleteDesc')}
              </Text>
              <Button
                mb={4}
                borderColor="gray.700"
                leftIcon={
                  <Icon
                    mr={2}
                    size="sm"
                    h="full"
                    as={Ionicons}
                    name={'call'}
                    color="gray.700"
                  />
                }
                variant="outline"
                onPress={callPolice}>
                <Text>{t('emergency.callPolice')}</Text>
              </Button>
              <Button
                mb={4}
                borderColor="gray.700"
                leftIcon={
                  <Icon
                    mr={2}
                    size="sm"
                    h="full"
                    as={Ionicons}
                    name={'call'}
                    color="gray.700"
                  />
                }
                variant="outline"
                onPress={callAmbulance}>
                <Text>{t('emergency.callAmbulance')}</Text>
              </Button>
            </VStack>
          </Center>
        )}
        {isEmergency && (
          <>
            <Box flex={1} key="emergency-padding" />
            <Button
              key="emergency-cancel"
              mb={6}
              mx={6}
              backgroundColor="red.100"
              onPress={cancelEmergency}>
              <Text color="gray.700">{t('emergency.IAmOK')}</Text>
            </Button>
          </>
        )}
      </VStack>
    </View>
  );
};

export default EmergencyScreen;
