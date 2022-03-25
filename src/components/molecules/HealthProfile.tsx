import React from 'react';
import { FlatList, Text, View } from 'native-base';
import { StyleSheet } from 'react-native';
import Spacer from '../atoms/Spacer';
import { ProfileItem } from '../../interfaces/User';

const HealthInfoItem = ({ label, value }: ProfileItem) => (
  <View>
    <View style={styles.HealthInfoItemRow}>
      <View style={styles.HealthInfoItemLabel}>
        <Text fontSize="md" color="muted.500">
          {label}
        </Text>
      </View>
      <View style={styles.HealthInfoItemValue}>
        <Text fontSize="md">{value}</Text>
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

const styles = StyleSheet.create({
  pageContainer: {
    padding: 16
  },
  HealthInfoItemRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  HealthInfoItemLabel: {
    width: 150
  },
  HealthInfoItemValue: {
    width: '100%'
  },
  toggleButtonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    minWidth: 80
  }
});
