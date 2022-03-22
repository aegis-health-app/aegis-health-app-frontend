import { Text, View } from 'native-base';
import React from 'react';
import { useTranslation } from 'react-i18next';

const HealthBlogScreen = () => {
  const { t } = useTranslation();

  return (
    <View justifyContent="center" alignItems="center" flex={1}>
      <Text fontSize="xl" fontWeight="400" color="gray.400">
        {t('moduleSelection.comingSoon')}
      </Text>
    </View>
  );
};

export default HealthBlogScreen;
