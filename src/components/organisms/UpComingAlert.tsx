import React from 'react';
import { Text, View } from 'native-base';
import ModuleAlertCard from '../molecules/ModuleAlertCard';
import { useTranslation } from 'react-i18next';

const UpComingAlert = () => {
  const { t } = useTranslation();
  return (
    <View w="full">
      <Text fontSize="2xl" fontWeight="600" mb={4}>
        {t('modules.notification')}
      </Text>
      <ModuleAlertCard
        moduleName="Lorem Ipsum"
        title="Lorem Ipsum"
        description="Lorem Ipsum"
        time={new Date()}
      />
    </View>
  );
};

export default UpComingAlert;
