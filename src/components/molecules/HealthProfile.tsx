import React from 'react';
import { FlatList, Text, View } from 'native-base';
import Spacer from '../atoms/Spacer';
import { ProfileItem } from '../../interfaces/User';

const HealthInfoItem = ({ label, value }: ProfileItem) => (
  <View>
    <View flexDir="row" justifyContent="space-between">
      <View w="1/2">
        <Text fontSize="md" color="muted.500">
          {label}
        </Text>
      </View>
      <View w="full">
        <Text fontSize="md">{value === '' ? '-' : value}</Text>
      </View>
    </View>
    <Spacer h={8} />
  </View>
);

type HealthProfileProps = {
  data: ProfileItem[];
};

const HealthProfile = ({ data }: HealthProfileProps) => {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <HealthInfoItem label={item.label} value={item.value} />
      )}
      keyExtractor={(item) => item.label}
      scrollEnabled={false}
    />
  );
};

export default HealthProfile;
