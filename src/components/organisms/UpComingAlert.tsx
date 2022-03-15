import React from 'react';
import { Text, VStack } from 'native-base';
import ModuleAlertCard from '../molecules/ModuleAlertCard';

const UpComingAlert = () => {
  return (
    <VStack space={6}>
      <Text fontSize="2xl" bold>
        Upcoming
      </Text>
      <ModuleAlertCard
        moduleName="Lorem Ipsum"
        title="Lorem Ipsum"
        description="Lorem Ipsum"
        time={new Date()}
      />
    </VStack>
  );
};

export default UpComingAlert;
