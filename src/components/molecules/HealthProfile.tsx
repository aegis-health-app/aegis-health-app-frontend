import React from 'react';
import { Text, View } from 'native-base';
import Spacer from '../atoms/Spacer';
import { ProfileItem } from '../../hooks/useUserValidation';

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
    <View>
      {data.map((item, key) => {
        return (
          <HealthInfoItem label={item.label} value={item.value} key={key} />
        );
      })}
    </View>
  );
};

export default HealthProfile;
