import { View } from 'react-native';
import React, { useState } from 'react';
import EmergencyButton from '../components/organisms/EmergencyButton';
import { Center, VStack, Text, Button } from 'native-base';
import { useTranslation } from 'react-i18next';

const EmergencyScreen = () => {
  const { t } = useTranslation();

  const [isEmergency, setEmergency] = useState<boolean>(false);

  return (
    <View>
      <VStack minH="full" justifyContent="center">
        <EmergencyButton
          isEmergency={isEmergency}
          setEmergency={setEmergency}
        />
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
          <Button onPress={() => setEmergency(false)} />
        </Center>
      </VStack>
    </View>
  );
};

export default EmergencyScreen;
