import React from 'react';
import { HStack, Text, View } from 'native-base';
import ModuleAlertCard from '../molecules/ModuleAlertCard';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native';
import EmergencyAlertCard from '../molecules/EmergencyAlertCard';

const UpComingAlert = () => {
  const { t } = useTranslation();

  return (
    <View w="full" mt={6}>
      <HStack justifyContent="space-between" alignItems="center">
        <Text fontSize="2xl" fontWeight="600" mb={4}>
          {t('modules.notification')}
        </Text>
        <TouchableOpacity>
          <Text
            fontSize="lg"
            fontWeight="500"
            mb={4}
            color="primary.500"
            underline>
            {t('modules.viewAll')}
          </Text>
        </TouchableOpacity>
      </HStack>
      <ModuleAlertCard
        moduleName="Lorem Ipsum"
        title="Lorem Ipsum"
        description="Lorem Ipsum"
        time={new Date()}
      />
      <EmergencyAlertCard
        sender="Lorem Ipsum"
        title="Lorem Ipsum"
        description="Lorem Ipsum"
        time={new Date()}
      />
    </View>
  );
};

export default UpComingAlert;
