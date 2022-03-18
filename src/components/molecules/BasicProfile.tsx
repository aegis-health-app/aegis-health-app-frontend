import React from 'react';
import { FlatList, Text, View } from 'native-base';
import { StyleSheet } from 'react-native';
import Spacer from '../atoms/Spacer';

type ProfileInfoItemProp = {
  label: string;
  value: string;
};

const ProfileInfoItem = ({ label, value }: ProfileInfoItemProp) => (
  <View>
    <View style={styles.profileInfoItemRow}>
      <View style={styles.profileInfoItemLabel}>
        <Text fontSize="md" color="muted.500">
          {label}
        </Text>
      </View>
      <View style={styles.profileInfoItemValue}>
        <Text fontSize="md">{value}</Text>
      </View>
    </View>
    <Spacer h={8} />
  </View>
);

type BasicProfileProps = {
  data: ProfileInfoItemProp[];
};

const BasicProfile = ({ data }: BasicProfileProps) => {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <ProfileInfoItem label={item.label} value={item.value} />
      )}
      keyExtractor={(item) => item.label}
      scrollEnabled={false}
    />
  );
};

export default BasicProfile;

const styles = StyleSheet.create({
  pageContainer: {
    padding: 16
  },
  profileInfoItemRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  profileInfoItemLabel: {
    width: 150
  },
  profileInfoItemValue: {
    width: '100%'
  },
  toggleButtonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    minWidth: 80
  }
});
