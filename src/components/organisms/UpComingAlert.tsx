import React from 'react';
import { Text, VStack, View } from 'native-base';
import ModuleAlertCard from '../molecules/ModuleAlertCard';

const UpComingAlert = () => {
  return (
    <View w="full">
      <Text fontSize="2xl" fontWeight="600" mb={4}>
        Upcoming
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
